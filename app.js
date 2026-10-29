'use strict';
(() => {
const CHAVE = 'meu-ingles-v1';
const VERSAO = 'Fase 1 · versão 1.0';
const INT = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 15, 6: 30, 7: 60, 8: 120 };
const app = document.getElementById('app');
const tabsEl = document.getElementById('tabs');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- datas ---------- */
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const pd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const hoje = () => ymd(new Date());
const addDias = (s, n) => { const d = pd(s); d.setDate(d.getDate() + n); return ymd(d); };
const SEM = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const fmtCurta = s => { const d = pd(s); return `${SEM[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`; };
const fmtLonga = s => { const d = pd(s); const w = SEM[d.getDay()]; return `${w.charAt(0).toUpperCase() + w.slice(1)}, ${d.getDate()} de ${MES[d.getMonth()]}`; };
const fds = s => { const w = pd(s).getDay(); return w === 0 || w === 6; };

/* ---------- estado ---------- */
const padrao = () => ({ v: 1, criado: new Date().toISOString(), ajustes: { nome: '', lembrete: '0800', voz: '', rate: 0.9, sons: true, ocultarInstalar: false }, feitas: {}, cards: {}, erros: {}, dias: {}, atual: null });
let S;
function carregar() {
  let x = null;
  try { x = JSON.parse(localStorage.getItem(CHAVE)); } catch (e) { x = null; }
  S = x && x.v ? x : padrao();
  S.ajustes = Object.assign(padrao().ajustes, S.ajustes || {});
  ['feitas', 'cards', 'erros', 'dias'].forEach(k => { if (!S[k] || typeof S[k] !== 'object') S[k] = {}; });
}
function salvar() { try { localStorage.setItem(CHAVE, JSON.stringify(S)); } catch (e) { toast('Não consegui salvar neste aparelho.'); } }
const dia = () => { const h = hoje(); return S.dias[h] || (S.dias[h] = { min: 0, rev: 0, ses: [] }); };

/* ---------- conteúdo ---------- */
const SESSOES = CURSO.sessoes.map((s, i) => Object.assign({}, s, { idx: i, n: i + 1 }));
const SES = {}; const ITENS = {}; const PERG = {};
SESSOES.forEach(s => {
  SES[s.id] = s;
  s.itensObj = (s.itens || []).map((it, k) => {
    const x = it[2];
    const o = { id: `${s.id}-${k}`, en: it[0], pt: it[1], sid: s.id, d: typeof x === 'string' ? x : (x && x.d) || '', alt: (x && x.alt) || [] };
    ITENS[o.id] = o; return o;
  });
  s.pergObj = (s.perguntas || []).map((q, k) => { const o = { id: `${s.id}-q${k}`, p: q[0], op: q[1], c: q[1][q[2]], pq: q[3], sid: s.id }; PERG[o.id] = o; return o; });
});
const semana = n => CURSO.semanas.find(w => w.n === n);
function dataPlanejada(idx) { let d = CURSO.inicio; while (fds(d)) d = addDias(d, 1); let k = 0; while (k < idx) { d = addDias(d, 1); if (!fds(d)) k++; } return d; }
const proxima = () => SESSOES.find(s => !S.feitas[s.id]);

/* ---------- ícones ---------- */
const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const IC = {
  som: svg('<path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>'),
  hoje: svg('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>'),
  trilha: svg('<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7"/>'),
  palavras: svg('<rect x="3" y="6" width="14" height="15" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>'),
  ajustes: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  x: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
  check: svg('<path d="M20 6 9 17l-5-5"/>'),
  seta: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  link: svg('<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>'),
  lixo: svg('<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>')
};

/* ---------- voz ---------- */
let vozes = [];
const temVoz = 'speechSynthesis' in window;
function lerVozes() { if (!temVoz) return; vozes = speechSynthesis.getVoices().filter(v => /^en([-_]|$)/i.test(v.lang)); }
if (temVoz) { lerVozes(); speechSynthesis.onvoiceschanged = () => { lerVozes(); if (R.view === 'ajustes') render(); }; }
function vozAtual() {
  if (!vozes.length) lerVozes();
  let v = S.ajustes.voz && vozes.find(x => x.name === S.ajustes.voz);
  if (v) return v;
  const us = vozes.filter(x => /en[-_]US/i.test(x.lang));
  for (const p of ['Samantha', 'Ava', 'Allison', 'Susan', 'Zoe', 'Nicky', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny']) { v = us.find(x => x.name.includes(p)); if (v) return v; }
  return us[0] || vozes[0] || null;
}
let avisouVoz = false;
function falar(txt, lento) {
  if (!temVoz) { toast('Este navegador não tem voz disponível.'); return; }
  const u = new SpeechSynthesisUtterance(String(txt).replace(/[()]/g, ''));
  const v = vozAtual();
  if (!v && !avisouVoz && speechSynthesis.getVoices().length) { avisouVoz = true; toast('Este aparelho não tem voz em inglês instalada. Veja em Ajustes > Voz.'); }
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
  u.rate = lento ? 0.6 : (Number(S.ajustes.rate) || 0.9);
  const sy = window.speechSynthesis;
  if (sy.speaking || sy.pending) { sy.cancel(); setTimeout(() => sy.speak(u), 80); } else sy.speak(u);
}
let actx = null;
function som(ok) {
  if (!S.ajustes.sons) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime;
    (ok ? [660, 990] : [320, 230]).forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      const t0 = t + i * 0.1;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
      o.connect(g); g.connect(actx.destination); o.start(t0); o.stop(t0 + 0.2);
    });
  } catch (e) { /* sem som */ }
}

/* ---------- comparação de respostas ---------- */
const CONTR = { "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are', "what's": 'what is', "don't": 'do not', "doesn't": 'does not', "isn't": 'is not', "aren't": 'are not', "i'd": 'i would', "can't": 'cannot', "that's": 'that is', "there's": 'there is', "let's": 'let us' };
const norm = t => String(t).toLowerCase().replace(/[’‘`´]/g, "'").replace(/-/g, ' ').replace(/[.,!?;:"“”()¿¡]/g, ' ').replace(/\s+/g, ' ').trim();
const expandir = t => norm(t).split(' ').map(w => CONTR[w] || w).join(' ');
const nPal = t => norm(t).split(' ').filter(Boolean).length;
function confere(resp, it) {
  const r = expandir(resp);
  const lista = [it.en, ...(it.alt || [])];
  const alvos = lista.map(expandir);
  if (alvos.includes(r)) return 'ok';
  const sa = s => s.replace(/'/g, '');
  const brutos = lista.map(norm).map(sa);
  if (alvos.map(sa).includes(sa(r)) || brutos.includes(sa(norm(resp)))) return 'quase';
  const alvo = sa(norm(it.en));
  if (alvo.length >= 6 && lev(sa(norm(resp)), alvo) <= 1) return 'digitacao';
  return 'erro';
}
function lev(a, b) {
  const m = a.length, n = b.length; if (Math.abs(m - n) > 1) return 2;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
function marcarErradas(resp, certo) {
  const alvo = norm(certo).split(' ');
  const pal = String(resp).trim().split(/\s+/).filter(Boolean);
  if (!pal.length) return '(vazio)';
  return pal.map((w, i) => { const n = norm(w); const ok = n && alvo.includes(n) && (alvo[i] === n || alvo.indexOf(n) >= 0); return ok ? esc(w) : `<mark>${esc(w)}</mark>`; }).join(' ');
}
function faltando(resp, certo) {
  const r = norm(resp).split(' ');
  const f = certo.replace(/[.,!?]/g, '').split(/\s+/).filter(w => !r.includes(norm(w)));
  return f;
}

/* ---------- utilidades ---------- */
function emb(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function sortearPeso(lista, n, chave) {
  const pool = lista.slice(); const out = [];
  while (out.length < n && pool.length) {
    const pesos = pool.map(x => 1 + 3 * (S.erros[chave(x)] || 0));
    let r = Math.random() * pesos.reduce((a, b) => a + b, 0);
    let i = 0; while (r > pesos[i]) { r -= pesos[i]; i++; }
    out.push(pool.splice(Math.min(i, pool.length - 1), 1)[0]);
  }
  return out;
}
const ehNum = it => (it.alt || []).some(a => /^\d+$/.test(a));
const digito = it => (it.alt || []).find(a => /^\d+$/.test(a));
const poolAte = idx => SESSOES.slice(0, idx + 1).flatMap(s => s.itensObj);
function distratores(it, pool, campo, n) {
  const alvo = norm(it[campo]); const pre = alvo.slice(0, 8); const multi = nPal(it.en) >= 3;
  const cand = emb(pool.filter(o => o.id !== it.id)).map(o => ({ o, s: (o.sid === it.sid ? 0 : 2) + ((nPal(o.en) >= 3) === multi ? 0 : 1) }));
  cand.sort((a, b) => a.s - b.s);
  const out = []; const vistos = new Set([alvo]);
  for (const { o } of cand) { const v = norm(o[campo]); if (vistos.has(v) || v.slice(0, 8) === pre) continue; vistos.add(v); out.push(o[campo]); if (out.length >= n) break; }
  return out;
}
let toastT = null;
function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600); }
const btnSom = (t, extra) => `<button class="spk ${extra || ''}" data-act="falar" data-t="${esc(t)}" aria-label="Ouvir">${IC.som}</button>`;
const yg = en => nPal(en) <= 4 ? `<a class="mini" href="https://youglish.com/pronounce/${encodeURIComponent(norm(en))}/english/us" target="_blank" rel="noopener">${IC.link} Ouvir em vídeos reais</a>` : '';

/* ---------- cartões (revisão espaçada) ---------- */
function cardInfo(id) { const c = S.cards[id]; if (!c) return null; const it = ITENS[id]; return { id, en: it ? it.en : c.en, pt: it ? it.pt : c.pt, d: it ? it.d : '', c }; }
const devidos = () => { const h = hoje(); return emb(Object.keys(S.cards).filter(id => S.cards[id].due <= h && cardInfo(id))).sort((a, b) => S.cards[a].due.localeCompare(S.cards[b].due)); };
function introduzir(itens) { const am = addDias(hoje(), 1); itens.forEach(it => { if (!S.cards[it.id]) S.cards[it.id] = { box: 1, due: am, ok: 0, err: 0, add: hoje() }; }); }
function avaliarCard(id, acertou) {
  const c = S.cards[id]; if (!c) return;
  if (acertou) { c.box = Math.min((c.box || 1) + 1, 8); c.due = addDias(hoje(), INT[c.box]); c.ok = (c.ok || 0) + 1; }
  else { c.box = 1; c.due = addDias(hoje(), 1); c.err = (c.err || 0) + 1; S.erros[id] = (S.erros[id] || 0) + 1; }
}

/* ---------- runtime ---------- */
const R = { view: 'hoje', ses: null, rev: null, prat: null, celebrar: null, ultimo: 0 };
function tick() {
  const agora = Date.now();
  if (R.ultimo && agora - R.ultimo < 5 * 60000) {
    const dt = agora - R.ultimo;
    if (R.view === 'sessao') { const c = ctx(); if (c) c.ms = (c.ms || 0) + dt; }
    if (R.view === 'revisao' && R.rev) R.rev.ms += dt;
  }
  R.ultimo = agora;
}
const ctx = () => (R.ses && R.ses.modo === 'refazer') ? R.ses : S.atual;

/* ---------- exercícios ---------- */
function exercicio(tipo, it, sIdx) {
  const pool = poolAte(sIdx);
  if (tipo === 'ouvir') {
    if (ehNum(it)) {
      const d = digito(it);
      const outros = [...new Set(emb(pool.filter(o => o.id !== it.id && ehNum(o)).map(digito)))].filter(x => x !== d).slice(0, 3);
      return { t: 'ouvir', it, op: emb([d, ...outros]), c: d };
    }
    return { t: 'ouvir', it, op: emb([it.en, ...distratores(it, pool, 'en', 3)]), c: it.en };
  }
  if (tipo === 'significa') return { t: 'significa', it, op: emb([it.pt, ...distratores(it, pool, 'pt', 3)]), c: it.pt };
  if (tipo === 'inverso') return { t: 'inverso', it, op: emb([it.en, ...distratores(it, pool, 'en', 3)]), c: it.en };
  if (tipo === 'montar') {
    const limpa = s => s.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
    const pal = limpa(it.en); const low = pal.map(w => w.toLowerCase());
    const extras = [...new Set(emb(pool.filter(o => o.id !== it.id).flatMap(o => limpa(o.en))).filter(w => !low.includes(w.toLowerCase())))].slice(0, 2);
    return { t: 'montar', it, pecas: emb([...pal, ...extras]), c: it.en };
  }
  return { t: 'escrever', it, c: it.en };
}
const perguntaEx = q => ({ t: 'escolha', q, op: emb(q.op), c: q.c });
function novaPratica(s) {
  const ex = []; const idx = s.idx;
  let k = 0;
  emb(s.itensObj).slice(0, 10).forEach(it => {
    const tipos = nPal(it.en) >= 3 ? ['montar', 'ouvir', 'significa'] : ['ouvir', 'significa', 'inverso'];
    ex.push(exercicio(tipos[k++ % 3], it, idx));
  });
  const anteriores = SESSOES.slice(0, idx).flatMap(x => x.itensObj);
  if (idx >= 2) {
    const base = s.itensObj.length ? s.itensObj : anteriores;
    emb(base.filter(it => nPal(it.en) <= 5)).slice(0, s.tipo === 'checkpoint' ? 3 : 2).forEach(it => ex.push(exercicio('escrever', it, idx)));
  }
  s.pergObj.forEach(q => ex.push(perguntaEx(q)));
  const nEsp = s.revisao || (idx >= 1 ? 3 : 0);
  sortearPeso(anteriores, nEsp, x => x.id).forEach(it => ex.push(exercicio(emb(['ouvir', 'significa', 'inverso'])[0], it, idx)));
  const pergAnt = SESSOES.slice(0, idx).flatMap(x => x.pergObj);
  if (s.perguntasRevisao) sortearPeso(pergAnt, s.perguntasRevisao, x => x.id).forEach(q => ex.push(perguntaEx(q)));
  else { const errQ = pergAnt.filter(q => S.erros[q.id] > 0); if (errQ.length) ex.push(perguntaEx(sortearPeso(errQ, 1, x => x.id)[0])); }
  const fila = emb(ex);
  return { fila, pos: 0, total: fila.length, acertos: 0, erros: [], resp: null, monta: [] };
}
function enunciado(ex) {
  if (ex.t === 'escolha') return ex.q.p;
  if (ex.t === 'ouvir') return `Áudio: “${ex.it.en}”`;
  if (ex.t === 'significa') return ex.it.en;
  if (ex.t === 'escrever') return `Ditado: “${ex.it.en}”`;
  return ex.it.pt;
}

/* ---------- sessão ---------- */
function iniciarSessao(sid, modo) {
  const s = SES[sid]; R.celebrar = null; R.prat = null; R.rev = null; R.ultimo = Date.now();
  if (modo === 'refazer') {
    R.ses = { sid, modo, passos: [...(s.itensObj.length ? ['pal'] : []), 'dica', 'prat', 'fim'], feitos: [], ms: 0, palIdx: 0 };
  } else {
    if (!S.atual || S.atual.sid !== sid) {
      const temRev = devidos().length > 0;
      S.atual = { sid, inicio: Date.now(), ms: 0, feitos: [], passos: [...(temRev ? ['rev'] : []), ...(s.itensObj.length ? ['pal'] : []), 'dica', 'prat', 'fim'] };
    }
    R.ses = { sid, modo: 'normal', palIdx: 0 };
  }
  R.view = 'sessao';
  entrarPasso();
  salvar(); render(); window.scrollTo(0, 0);
  falarInicioPasso();
}
const passoAtual = () => { const c = ctx(); return c ? c.passos.find(p => !c.feitos.includes(p)) : null; };
function entrarPasso() {
  const p = passoAtual(); const s = SES[R.ses.sid];
  if (p === 'rev') {
    const fila = devidos().slice(0, 20);
    if (!fila.length) { ctx().feitos.push('rev'); return entrarPasso(); }
    R.rev = novaRevisao(fila, 'sessao');
  }
  if (p === 'pal') R.ses.palIdx = 0;
  if (p === 'prat') R.prat = novaPratica(s);
}
function falarInicioPasso() {
  const p = passoAtual(); const s = SES[R.ses.sid];
  if (p === 'pal' && s.itensObj[R.ses.palIdx]) falar(s.itensObj[R.ses.palIdx].en);
  if (p === 'rev' && R.rev) falarCardSeRec();
  if (p === 'prat' && R.prat) falarEx();
}
function concluirPasso(p) {
  const c = ctx(); const s = SES[R.ses.sid];
  if (!c.feitos.includes(p)) c.feitos.push(p);
  if (p === 'pal' && R.ses.modo !== 'refazer') introduzir(s.itensObj);
  if (p === 'prat' && R.prat) c.res = { acertos: R.prat.acertos, total: R.prat.total, erros: R.prat.erros.slice(0, 40) };
  entrarPasso(); salvar(); render(); window.scrollTo(0, 0);
  falarInicioPasso();
}
function concluirSessao() {
  const c = S.atual; if (!c) return;
  const min = Math.max(1, Math.round((c.ms || 0) / 60000));
  const res = c.res || { acertos: 0, total: 0, erros: [] };
  S.feitas[c.sid] = { em: new Date().toISOString(), dia: hoje(), min, acertos: res.acertos, total: res.total, erros: res.erros.slice(0, 30) };
  const d = dia(); d.min += min; if (!d.ses.includes(c.sid)) d.ses.push(c.sid);
  R.celebrar = { sid: c.sid, min, acertos: res.acertos, total: res.total };
  S.atual = null; R.ses = null; R.prat = null; R.rev = null;
  salvar(); R.view = 'hoje'; render(); window.scrollTo(0, 0);
}
function sairSessao() {
  if (temVoz) speechSynthesis.cancel();
  if (R.ses && R.ses.modo === 'refazer') { R.view = 'trilha'; }
  else { R.view = 'hoje'; }
  R.ses = null; R.prat = null; R.rev = null; salvar(); render(); window.scrollTo(0, 0);
}

/* ---------- revisão ---------- */
function novaRevisao(fila, origem) { return { fila: fila.slice(), pos: 0, mostrou: false, rep: {}, origem, ms: 0, feitos: 0 }; }
function cardAtual() { const r = R.rev; if (!r || r.pos >= r.fila.length) return null; const it = r.fila[r.pos]; return { key: it, id: it.replace(/#r$/, ''), rep: /#r$/.test(it) }; }
function modoProducao(cur) { return !cur.rep && (S.cards[cur.id] && S.cards[cur.id].box >= 3); }
function falarCardSeRec() { const cur = cardAtual(); if (cur && !modoProducao(cur)) { const ci = cardInfo(cur.id); if (ci) falar(ci.en); } }
function avaliar(acertou) {
  const r = R.rev; const cur = cardAtual(); if (!cur) return;
  if (!cur.rep) { avaliarCard(cur.id, acertou); r.feitos++; if (!acertou) r.fila.push(cur.id + '#r'); }
  r.pos++; r.mostrou = false; salvar();
  if (r.pos >= r.fila.length) return fimRevisao();
  render(); falarCardSeRec();
}
function fimRevisao() {
  const r = R.rev;
  if (r.origem === 'sessao') { R.rev = null; concluirPasso('rev'); toast('Revisão feita!'); return; }
  const min = Math.round(r.ms / 60000); const d = dia(); d.min += min; d.rev += 1;
  R.rev = null; salvar(); R.view = R.voltar || 'hoje'; render(); window.scrollTo(0, 0);
  toast(`Revisão feita: ${r.feitos} cartões.`);
}
function iniciarRevisaoLivre(volta) {
  const fila = devidos().slice(0, 40);
  if (!fila.length) { toast('Nada pra revisar agora.'); return; }
  R.voltar = volta || 'hoje'; R.rev = novaRevisao(fila, 'livre'); R.view = 'revisao'; R.ultimo = Date.now(); R.celebrar = null;
  render(); window.scrollTo(0, 0); falarCardSeRec();
}
function htmlRevisao() {
  const r = R.rev; const cur = cardAtual(); if (!cur) return '';
  const ci = cardInfo(cur.id); const prod = modoProducao(cur);
  const pct = Math.round(r.pos / r.fila.length * 100);
  let h = `<div class="pbar"><i style="width:${pct}%"></i></div><div class="muted small center">${r.pos + 1} de ${r.fila.length}${cur.rep ? ' · revendo um erro' : ''}</div>`;
  if (!prod) {
    h += `<div class="cardbig"><div class="lbl">Você lembra o que significa?</div><div class="en">${esc(ci.en)}</div><div class="row c">${btnSom(ci.en)}<button class="chip" data-act="falarLento" data-t="${esc(ci.en)}">Devagar</button></div>`;
    h += r.mostrou ? `<div class="pt">${esc(ci.pt)}</div>${ci.d ? `<div class="tip">${esc(ci.d)}</div>` : ''}` : '';
    h += `</div>`;
  } else {
    h += `<div class="cardbig"><div class="lbl">Como se diz em inglês? Fale em voz alta.</div><div class="pt big">${esc(ci.pt)}</div>`;
    h += r.mostrou ? `<div class="en">${esc(ci.en)}</div><div class="row c">${btnSom(ci.en)}<button class="chip" data-act="falarLento" data-t="${esc(ci.en)}">Devagar</button></div>` : '';
    h += `</div>`;
  }
  if (!r.mostrou) h += `<button class="btn" data-act="mostrarCard">${prod ? 'Mostrar resposta' : 'Mostrar significado'}</button>`;
  else h += `<div class="duo"><button class="btn bad" data-act="errei">Errei</button><button class="btn good" data-act="acertei">Acertei</button></div><p class="muted small center">Seja honesto: o “errei” traz o cartão de volta amanhã.</p>`;
  return h;
}

/* ---------- prática ---------- */
function falarEx() { const P = R.prat; if (!P) return; const ex = P.fila[P.pos]; if (ex && (ex.t === 'ouvir' || ex.t === 'escrever' || ex.t === 'significa')) falar(ex.it.en); }
function responder(valor) {
  const P = R.prat; const ex = P.fila[P.pos]; if (P.resp) return;
  let ok = false, quase = false;
  if (ex.t === 'escrever') { const r = confere(valor, ex.it); ok = r !== 'erro'; quase = r === 'quase' || r === 'digitacao' ? r : false; }
  else if (ex.t === 'montar') ok = norm(valor) === norm(ex.c);
  else ok = valor === ex.c;
  P.resp = { valor, ok, quase }; som(ok);
  const chave = ex.q ? ex.q.id : ex.it.id;
  if (!ex.retry) {
    if (ok) P.acertos++;
    else {
      P.erros.push({ tipo: ex.t, chave, pergunta: enunciado(ex), resposta: valor, certo: ex.c });
      S.erros[chave] = (S.erros[chave] || 0) + 1;
      if (ex.it && S.cards[ex.it.id]) { S.cards[ex.it.id].box = 1; S.cards[ex.it.id].due = addDias(hoje(), 1); }
    }
  }
  if (!ok) { const novo = Object.assign({}, ex, { retry: true }); if (novo.op) novo.op = emb(novo.op); if (novo.pecas) novo.pecas = emb(novo.pecas); P.fila.push(novo); }
  salvar(); render();
}
function continuarEx() {
  const P = R.prat; P.pos++; P.resp = null; P.monta = [];
  if (P.pos >= P.fila.length) return concluirPasso('prat');
  render(); window.scrollTo(0, 0); falarEx();
  const inp = document.getElementById('ditado'); if (inp) setTimeout(() => inp.focus(), 50);
}
const ELOGIOS = [['Great!', 'Ótimo!'], ['Nice!', 'Boa!'], ['Correct!', 'Certo!'], ['Well done!', 'Muito bem!'], ['Perfect!', 'Perfeito!']];
function htmlPratica() {
  const P = R.prat; const ex = P.fila[P.pos]; if (!ex) return '';
  const pct = Math.round(P.pos / P.fila.length * 100);
  let h = `<div class="pbar"><i style="width:${pct}%"></i></div><div class="muted small center">${P.pos + 1} de ${P.fila.length}${ex.retry ? ' · revendo um erro' : ''}</div>`;
  const resp = P.resp;
  const opcoes = (lista, ingles) => lista.map(o => {
    let cls = 'opt';
    if (resp) { if (o === ex.c) cls += ' ok'; else if (o === resp.valor) cls += ' err'; else cls += ' dim'; }
    return `<button class="${cls}${ingles ? ' enopt' : ''}" data-act="resp" data-v="${esc(o)}" ${resp ? 'disabled' : ''}>${esc(o)}</button>`;
  }).join('');
  const audio = t => `<div class="row c">${btnSom(t, 'lg')}<button class="chip" data-act="falarLento" data-t="${esc(t)}">Devagar</button></div>`;
  if (ex.t === 'ouvir') h += `<h3 class="q">Ouça e escolha o que você ouviu</h3>${audio(ex.it.en)}${opcoes(ex.op, true)}`;
  if (ex.t === 'significa') h += `<h3 class="q">O que significa?</h3><div class="en mid">${esc(ex.it.en)}</div>${audio(ex.it.en)}${opcoes(ex.op)}`;
  if (ex.t === 'inverso') h += `<h3 class="q">Como se diz em inglês?</h3><div class="pt big">${esc(ex.it.pt)}</div>${opcoes(ex.op, true)}`;
  if (ex.t === 'escolha') h += `<h3 class="q">Escolha a resposta certa</h3><div class="enun">${esc(ex.q.p).replace(/___/g, '<span class="lac">___</span>')}</div>${opcoes(ex.op, true)}`;
  if (ex.t === 'montar') {
    const usados = P.monta;
    h += `<h3 class="q">Monte a frase em inglês</h3><div class="pt big">${esc(ex.it.pt)}</div>`;
    h += `<div class="linha">${usados.length ? usados.map((i, k) => `<button class="tile" data-act="tirar" data-k="${k}" ${resp ? 'disabled' : ''}>${esc(ex.pecas[i])}</button>`).join('') : '<span class="muted small">Toque nas palavras abaixo, na ordem certa</span>'}</div>`;
    h += `<div class="tiles">${ex.pecas.map((w, i) => `<button class="tile ${usados.includes(i) ? 'used' : ''}" data-act="peca" data-i="${i}" ${usados.includes(i) || resp ? 'disabled' : ''}>${esc(w)}</button>`).join('')}</div>`;
    if (!resp) h += `<button class="btn" data-act="verificarMonta" ${usados.length ? '' : 'disabled'}>Verificar</button>`;
  }
  if (ex.t === 'escrever') {
    h += `<h3 class="q">Escreva o que você ouviu</h3>${audio(ex.it.en)}<div class="muted small center">${nPal(ex.it.en)} ${nPal(ex.it.en) === 1 ? 'palavra' : 'palavras'}${ehNum(ex.it) ? ' · pode usar número' : ''}</div>`;
    h += `<input id="ditado" class="inp" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Digite aqui" ${resp ? 'disabled' : ''} value="${resp ? esc(resp.valor) : ''}">`;
    if (!resp) h += `<button class="btn" data-act="verificarDitado">Verificar</button>`;
  }
  if (resp) {
    const ingles = ex.t !== 'significa';
    let fb = `<div class="fb ${resp.ok ? 'ok' : 'err'}">`;
    if (resp.ok) {
      const e = ELOGIOS[Math.floor(Math.random() * ELOGIOS.length)];
      fb += `<b>${e[0]}</b> <span class="muted">${e[1]}</span>`;
      if (resp.quase === 'quase') fb += `<div>Só um detalhe: o certo é <b>${esc(ex.c)}</b> (com apóstrofo).</div>`;
      if (resp.quase === 'digitacao') fb += `<div>Contei como certo, mas atenção à escrita: <b>${esc(ex.c)}</b></div>`;
    } else {
      fb += `<b>Não foi dessa vez.</b> O certo é: <div class="certo">${esc(ex.c)}</div>`;
      if (ex.t === 'escrever' || ex.t === 'montar') {
        const f = faltando(resp.valor || '', ex.c);
        fb += `<div class="small">${ex.t === 'montar' ? 'Você montou' : 'Você escreveu'}: ${marcarErradas(resp.valor || '', ex.c)}${f.length ? `<br>Faltou ou ficou diferente: ${f.map(w => `<mark>${esc(w)}</mark>`).join(' ')}` : '<br>As palavras estão certas, mas a ordem não.'}</div>`;
      }
      fb += `<div class="small muted">${ex.t === 'escolha' ? 'Essa volta no fim da prática e nas próximas sessões.' : 'Essa volta no fim da prática e na revisão de amanhã.'}</div>`;
    }
    if (ex.t === 'escolha' && ex.q.pq) fb += `<div class="why">${esc(ex.q.pq)}</div>`;
    if (ex.it && ex.it.d && !resp.ok) fb += `<div class="why">${esc(ex.it.d)}</div>`;
    if (ex.it && ex.t !== 'escolha') fb += `<div class="small muted">${esc(ex.it.en)} = ${esc(ex.it.pt)}</div>`;
    fb += `<div class="row">${ingles && !/^\d+$/.test(ex.c) ? btnSom(ex.c) : (ex.it ? btnSom(ex.it.en) : '')}<button class="btn grow" data-act="continuar">Continuar</button></div></div>`;
    h += fb;
  }
  return h;
}

/* ---------- telas ---------- */
const NOMES_PASSO = { rev: 'Revisão', pal: 'Palavras', dica: 'Entenda', prat: 'Pratique', fim: 'Resumo' };
function htmlSessao() {
  const s = SES[R.ses.sid]; const c = ctx(); const p = passoAtual();
  let h = `<div class="shead"><button class="icon" data-act="sair" aria-label="Sair">${IC.x}</button><div class="grow"><div class="muted small">Sessão ${s.n} · Semana ${s.semana}${R.ses.modo === 'refazer' ? ' · praticando de novo' : ''}</div><b>${esc(s.titulo)}</b></div></div>`;
  h += `<div class="steps">${c.passos.map(x => `<span class="st ${c.feitos.includes(x) ? 'done' : ''} ${x === p ? 'cur' : ''}">${c.feitos.includes(x) ? IC.check : ''}${NOMES_PASSO[x]}</span>`).join('')}</div>`;
  if (p === 'rev') h += `<div class="sub">Primeiro, os cartões que estão no dia de revisar.</div>` + htmlRevisao();
  if (p === 'pal') {
    const it = s.itensObj[R.ses.palIdx]; const n = s.itensObj.length;
    h += `<div class="pbar"><i style="width:${Math.round(R.ses.palIdx / n * 100)}%"></i></div><div class="muted small center">Palavra nova ${R.ses.palIdx + 1} de ${n}</div>`;
    h += `<div class="cardbig"><div class="en">${esc(it.en)}</div><div class="row c">${btnSom(it.en, 'lg')}<button class="chip" data-act="falarLento" data-t="${esc(it.en)}">Devagar</button></div><div class="pt">${esc(it.pt)}</div>${it.d ? `<div class="tip">${esc(it.d)}</div>` : ''}<div class="muted small">Ouça e repita em voz alta, 2 ou 3 vezes.</div>${yg(it.en)}</div>`;
    h += `<div class="duo">${R.ses.palIdx > 0 ? '<button class="btn sec" data-act="palVoltar">Voltar</button>' : '<span></span>'}<button class="btn" data-act="palProx">${R.ses.palIdx + 1 < n ? 'Próxima' : 'Terminei as palavras'}</button></div>`;
  }
  if (p === 'dica') {
    const d = s.dica;
    h += `<div class="card"><div class="lbl">Entenda</div><h2>${esc(d.t)}</h2>${d.p.map(x => `<p>${x}</p>`).join('')}</div>`;
    h += `<div class="card"><div class="lbl">Exemplos: toque, ouça e repita</div>${d.ex.map(e => `<div class="exl">${btnSom(e[0])}<div><div class="en sm">${esc(e[0])}</div><div class="muted small">${esc(e[1])}</div></div></div>`).join('')}</div>`;
    h += `<button class="btn" data-act="dicaOk">Entendi, vamos praticar</button>`;
  }
  if (p === 'prat') h += htmlPratica();
  if (p === 'fim') {
    const res = (R.ses.modo === 'refazer' ? R.ses.res : c.res) || { acertos: 0, total: 0, erros: [] };
    const pct = res.total ? Math.round(res.acertos / res.total * 100) : 0;
    const msg = pct >= 90 ? 'Mandou muito bem!' : pct >= 70 ? 'Muito bom!' : pct >= 50 ? 'Bom treino. Os erros já entraram na revisão.' : 'Hoje foi puxado, e tudo bem: os erros vão voltar na revisão até grudar.';
    h += `<div class="card center"><div class="lbl">Resumo</div><div class="score">${res.acertos}<small>/${res.total}</small></div><div class="muted">acertos de primeira (${pct}%)</div><p><b>${msg}</b></p><div class="muted small">Tempo ativo: ${Math.max(1, Math.round((c.ms || 0) / 60000))} min</div></div>`;
    if (res.erros.length) {
      h += `<div class="card"><div class="lbl">O que você errou (vale olhar com calma)</div>${res.erros.map(e => `<div class="errl"><div class="small muted">${esc(e.pergunta)}</div><div><span class="bad-t">Você: ${esc(e.resposta || '(vazio)')}</span></div><div><span class="good-t">Certo: ${esc(e.certo)}</span></div></div>`).join('')}</div>`;
    } else h += `<div class="card center"><b>Nenhum erro de primeira.</b><div class="muted small">Os cartões novos voltam na revisão de amanhã.</div></div>`;
    h += R.ses.modo === 'refazer' ? `<button class="btn" data-act="sair">Fechar</button>` : `<button class="btn" data-act="concluir">${IC.check} Concluir sessão</button>`;
  }
  return h;
}

function saudacao() { const h = new Date().getHours(); return h < 12 ? ['Good morning', 'Bom dia'] : h < 18 ? ['Good afternoon', 'Boa tarde'] : ['Good evening', 'Boa noite']; }
const ehIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const instalado = () => window.navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
function sequencia() {
  const tem = s => S.dias[s] && S.dias[s].ses && S.dias[s].ses.length > 0;
  let d = hoje(); let n = 0;
  if (!tem(d)) d = addDias(d, -1);
  for (let i = 0; i < 500; i++) { if (tem(d)) { n++; d = addDias(d, -1); } else if (fds(d)) { d = addDias(d, -1); } else break; }
  return n;
}
function totalMin() { return Object.values(S.dias).reduce((a, d) => a + (d.min || 0), 0); }

function htmlHoje() {
  const h = hoje(); const prox = proxima(); const sd = saudacao(); const nome = S.ajustes.nome.trim();
  const jaFez = (S.dias[h] && S.dias[h].ses || []).length > 0; const due = devidos().length;
  let x = `<div class="top"><div class="muted small">${fmtLonga(h)}</div><h1>${esc(sd[0])}${nome ? ', ' + esc(nome) : ''}! ${btnSom(sd[0] + (nome ? ', ' + nome : '') + '!')}</h1><div class="muted">${sd[1]}${nome ? ', ' + esc(nome) : ''}!</div></div>`;
  if (ehIOS() && !instalado() && !S.ajustes.ocultarInstalar) x += `<div class="card note"><b>Instale no iPhone</b><p class="small">No Safari, toque em <b>Compartilhar</b> (o quadrado com a seta) e depois em <b>Adicionar à Tela de Início</b>. Use sempre pelo ícone: o progresso fica guardado no app.</p><button class="chip" data-act="ocultarInstalar">Já instalei</button></div>`;
  if (R.celebrar) {
    const c = R.celebrar; const s = SES[c.sid];
    x += `<div class="card hero center"><div class="lbl">Sessão ${s.n} concluída</div><h2>${esc(s.titulo)}</h2><div class="muted">${c.acertos}/${c.total} de primeira · ${c.min} min</div><p class="small">Mais um dia na conta. Constância vale mais que intensidade.</p></div>`;
  }
  if (!prox) {
    x += `<div class="card hero"><div class="lbl">Mês 1 completo</div><h2>Você terminou as 20 sessões!</h2><p>O mês 2 está sendo preparado. Enquanto isso, a revisão diária mantém tudo fresco.</p></div>`;
  } else {
    const plan = dataPlanejada(prox.idx); const emAndamento = S.atual && S.atual.sid === prox.id;
    const sem = semana(prox.semana);
    let status = '', btn = `<button class="btn" data-act="iniciar" data-s="${prox.id}">Começar ${IC.seta}</button>`;
    if (emAndamento) { status = 'Você parou no meio. Continua de onde parou.'; btn = `<button class="btn" data-act="iniciar" data-s="${prox.id}">Continuar ${IC.seta}</button>`; }
    else if (jaFez) { status = 'Tem mais tempo hoje? Pode adiantar a próxima.'; btn = `<button class="btn sec" data-act="iniciar" data-s="${prox.id}">Fazer a próxima agora</button>`; }
    else if (h < CURSO.inicio && prox.idx === 0) status = `O plano começa ${fmtCurta(CURSO.inicio)}. Se quiser, já pode começar.`;
    else if (fds(h)) { status = 'Fim de semana é livre. Se quiser adiantar, pode.'; btn = `<button class="btn sec" data-act="iniciar" data-s="${prox.id}">Fazer agora</button>`; }
    else if (plan < h) status = `Estava planejada pra ${fmtCurta(plan)}. Sem problema: o plano espera você, nada é pulado.`;
    else if (plan > h) status = `Planejada pra ${fmtCurta(plan)}. Você está adiantado.`;
    if (jaFez && !emAndamento) x += `<div class="card done"><div class="row">${IC.check}<div><b>Sessão de hoje feita.</b><div class="muted small">Amanhã tem mais. A noite é sua.</div></div></div></div>`;
    const meta = [`~30 min`, prox.itensObj.length ? `${prox.itensObj.length} palavras novas` : 'revisão geral', due && !jaFez ? `${Math.min(due, 20)} cartões pra revisar` : ''].filter(Boolean).join(' · ');
    x += `<div class="card ${jaFez && !emAndamento ? '' : 'hero'}"><div class="lbl">Sessão ${prox.n} de ${SESSOES.length} · Semana ${prox.semana}: ${esc(sem.titulo)}</div><h2>${esc(prox.titulo)}</h2><p class="muted">${esc(prox.resumo)}</p><div class="small muted">${meta}</div>${status ? `<p class="small">${status}</p>` : ''}${btn}</div>`;
  }
  if (due > 0 && (jaFez || fds(h) || !prox)) x += `<div class="card"><div class="row"><div class="grow"><b>Revisão rápida</b><div class="muted small">${due} ${due === 1 ? 'cartão' : 'cartões'} no dia de revisar (~${Math.max(2, Math.round(Math.min(due, 40) * 0.25))} min). Opcional.</div></div><button class="btn sm" data-act="revisar">Revisar</button></div></div>`;
  const cards = Object.keys(S.cards).length; const feitas = Object.keys(S.feitas).length;
  const seq = sequencia();
  x += `<div class="stats"><div><b>${seq}</b><span>${seq === 1 ? 'dia seguido' : 'dias seguidos'}</span></div><div><b>${feitas}/${SESSOES.length}</b><span>sessões</span></div><div><b>${cards}</b><span>palavras</span></div><div><b>${totalMin()}</b><span>minutos</span></div></div>`;
  const fracos = Object.entries(S.erros).filter(([id, n]) => n > 0 && (ITENS[id] || S.cards[id])).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (fracos.length) x += `<div class="card"><div class="lbl">Pra reforçar</div>${fracos.map(([id, n]) => { const ci = ITENS[id] || cardInfo(id); return `<div class="exl">${btnSom(ci.en)}<div class="grow"><div class="en sm">${esc(ci.en)}</div><div class="muted small">${esc(ci.pt)}</div></div><span class="tag">${n}x</span></div>`; }).join('')}</div>`;
  const semB = semana((prox || SESSOES[SESSOES.length - 1]).semana);
  if (semB && semB.bonus) x += `<div class="card"><div class="lbl">Bônus da semana (opcional)</div>${semB.bonus.map(b => `<a class="bonus" href="${b.url}" target="_blank" rel="noopener"><b>${esc(b.titulo)} ${IC.link}</b><span class="muted small">${esc(b.desc)}</span></a>`).join('')}<p class="small muted">É áudio de gente de verdade, mais rápido que o app. Se não entender quase nada, normal: ouça de novo com a transcrição.</p></div>`;
  return x;
}

function htmlTrilha() {
  const prox = proxima();
  let x = `<div class="top"><h1>Sua trilha</h1><div class="muted">Inglês pra vida, do zero. Uma sessão por dia útil, de manhã.</div></div>`;
  x += CURSO.fases.map(f => `<div class="card ${f.n === 1 ? 'hero' : 'dimc'}"><div class="lbl">Fase ${f.n} · ${f.meses}${f.n === 1 ? ' · você está aqui' : ''}</div><h3>${esc(f.titulo)}</h3><p class="small muted">${esc(f.texto)}</p></div>`).join('');
  x += `<h2 class="sec">Mês 1</h2>`;
  CURSO.semanas.forEach(w => {
    x += `<div class="card"><div class="lbl">Semana ${w.n} · ${esc(w.titulo)}</div>`;
    SESSOES.filter(s => s.semana === w.n).forEach(s => {
      const f = S.feitas[s.id]; const ehProx = prox && prox.id === s.id;
      x += `<div class="srow ${f ? 'ok' : ''} ${ehProx ? 'now' : ''}"><span class="dot">${f ? IC.check : s.n}</span><div class="grow"><b>${esc(s.titulo)}</b><div class="muted small">${f ? `feita em ${fmtCurta(f.dia)} · ${f.acertos}/${f.total} de primeira` : `planejada pra ${fmtCurta(dataPlanejada(s.idx))}`}${ehProx ? ' · próxima' : ''}</div></div>${f ? `<button class="chip" data-act="refazer" data-s="${s.id}">Praticar de novo</button>` : ''}</div>`;
    });
    x += (w.bonus || []).map(b => `<a class="bonus sm" href="${b.url}" target="_blank" rel="noopener"><span class="muted small">Bônus:</span> ${esc(b.titulo)} ${IC.link}</a>`).join('');
    x += `</div>`;
  });
  x += `<div class="card"><div class="lbl">Próximos marcos</div>${CURSO.marcos.map(m => `<p class="small">${esc(m)}</p>`).join('')}</div>`;
  return x;
}

function htmlPalavras() {
  const ids = Object.keys(S.cards); const dom = ids.filter(id => S.cards[id].box >= 5).length; const due = devidos().length;
  let x = `<div class="top"><h1>Palavras</h1><div class="muted">Tudo que você já viu, com áudio.</div></div>`;
  x += `<div class="stats three"><div><b>${ids.length}</b><span>no total</span></div><div><b>${dom}</b><span>dominadas</span></div><div><b>${due}</b><span>pra revisar</span></div></div>`;
  if (due) x += `<button class="btn" data-act="revisarPal">Revisar agora (${due})</button>`;
  x += `<div class="card"><div class="lbl">Adicionar uma palavra sua</div><p class="small muted">Viu uma palavra num filme, música ou no trabalho? Coloque aqui e ela entra na revisão.</p><input id="novaEn" class="inp" placeholder="Em inglês (ex.: weather)" autocapitalize="off" autocorrect="off" spellcheck="false"><input id="novaPt" class="inp" placeholder="Em português (ex.: clima, tempo)"><button class="btn sec" data-act="addPalavra">Adicionar</button></div>`;
  x += `<input id="busca" class="inp" placeholder="Buscar palavra" autocapitalize="off" autocorrect="off" spellcheck="false" value="${esc(R.busca || '')}"><div id="lista">${htmlLista()}</div>`;
  return x;
}
function forca(box) { const n = Math.min(5, Math.max(0, (box || 1) - 1)); return `<span class="forca" title="força">${[0, 1, 2, 3, 4].map(i => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`; }
function htmlLista() {
  const q = norm(R.busca || '');
  const linha = ci => `<div class="exl">${btnSom(ci.en)}<div class="grow"><div class="en sm">${esc(ci.en)}</div><div class="muted small">${esc(ci.pt)}</div></div>${forca(ci.c.box)}${ci.c.own ? `<button class="icon sm" data-act="apagarPal" data-id="${ci.id}" aria-label="Apagar">${IC.lixo}</button>` : ''}</div>`;
  const filtra = ci => !q || norm(ci.en).includes(q) || norm(ci.pt).includes(q);
  const proprias = Object.keys(S.cards).filter(id => S.cards[id].own).map(cardInfo).filter(filtra);
  let x = '';
  if (proprias.length) x += `<div class="card"><div class="lbl">Minhas palavras</div>${proprias.map(linha).join('')}</div>`;
  SESSOES.forEach(s => {
    const l = s.itensObj.filter(it => S.cards[it.id]).map(it => cardInfo(it.id)).filter(filtra);
    if (l.length) x += `<div class="card"><div class="lbl">Sessão ${s.n} · ${esc(s.titulo)}</div>${l.map(linha).join('')}</div>`;
  });
  if (!x) x = `<div class="card center muted small">${Object.keys(S.cards).length ? 'Nada encontrado.' : 'As palavras aparecem aqui depois da primeira sessão.'}</div>`;
  return x;
}

const HORARIOS = [['0700', '07:00'], ['0730', '07:30'], ['0800', '08:00'], ['0815', '08:15'], ['0830', '08:30']];
function htmlAjustes() {
  const a = S.ajustes; const va = vozAtual();
  let x = `<div class="top"><h1>Ajustes</h1></div>`;
  x += `<div class="card"><div class="lbl">Seu nome</div><p class="small muted">Só pra te cumprimentar. Fica neste aparelho.</p><input class="inp" data-set="nome" value="${esc(a.nome)}" placeholder="Como quer ser chamado"></div>`;
  x += `<div class="card"><div class="lbl">Lembrete de manhã</div><p class="small muted">Cria um evento de segunda a sexta, a partir de ${fmtCurta(CURSO.inicio)}, com alarme na hora. Depois de adicionar, dá pra mudar no próprio calendário.</p><select class="inp" data-set="lembrete">${HORARIOS.map(([v, t]) => `<option value="${v}" ${a.lembrete === v ? 'selected' : ''}>${t}</option>`).join('')}</select><a class="btn sec" href="lembretes/sessao-${a.lembrete}.ics">Adicionar ao calendário</a><p class="small muted">No iPhone, se nada acontecer pelo app instalado, abra este mesmo endereço no Safari e toque de novo.</p></div>`;
  x += `<div class="card"><div class="lbl">Voz</div>${vozes.length ? `<select class="inp" data-set="voz">${vozes.map(v => `<option value="${esc(v.name)}" ${va && va.name === v.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')}</select>` : (temVoz && speechSynthesis.getVoices().length ? '<p class="small tip">Este aparelho não tem voz em inglês instalada, então o áudio pode sair com sotaque errado. No iPhone já vem instalada. No Windows: Configurações > Hora e idioma > Fala > Adicionar vozes > Inglês (Estados Unidos).</p>' : '<p class="small muted">Carregando vozes...</p>')}<select class="inp" data-set="rate">${[[0.8, 'Mais lenta'], [0.9, 'Normal (recomendado)'], [1, 'Natural']].map(([v, t]) => `<option value="${v}" ${Number(a.rate) === v ? 'selected' : ''}>${t}</option>`).join('')}</select><button class="btn sec" data-act="testarVoz">Testar voz</button><p class="small muted">Dica pro iPhone: em Ajustes > Acessibilidade > Conteúdo Falado > Vozes > Inglês, dá pra baixar vozes melhores. Depois elas podem aparecer nesta lista. Se não sair som, confira o modo silencioso.</p></div>`;
  x += `<div class="card"><label class="sw"><input type="checkbox" data-set="sons" ${a.sons ? 'checked' : ''}><span>Som de acerto e erro</span></label></div>`;
  x += `<div class="card"><div class="lbl">Instalar no iPhone</div><p class="small">1. Abra este endereço no <b>Safari</b>.<br>2. Toque em <b>Compartilhar</b> (quadrado com a seta).<br>3. Toque em <b>Adicionar à Tela de Início</b> e depois em <b>Adicionar</b>.</p><p class="small muted">Depois disso, use sempre pelo ícone. O app funciona sem internet. O progresso do app instalado fica separado do Safari.</p></div>`;
  x += `<div class="card"><div class="lbl">Backup</div><p class="small muted">Seus dados ficam só neste aparelho. Faça um backup de vez em quando (por exemplo, todo fim de mês) e guarde no Arquivos ou no seu e-mail.</p><div class="duo"><button class="btn sec" data-act="exportar">Exportar</button><button class="btn sec" data-act="importar">Importar</button></div><input type="file" id="arqImport" accept=".json,application/json" hidden></div>`;
  x += `<div class="card"><div class="lbl">Sobre</div><p class="small">Meu Inglês · ${VERSAO}</p><p class="small muted">Nada é enviado pra internet: o app só guarda seu progresso neste aparelho. Os links de bônus abrem sites externos.</p><button class="chip danger" data-act="apagarTudo">Apagar todo o progresso</button></div>`;
  return x;
}

/* ---------- render ---------- */
function render() {
  const emSessao = R.view === 'sessao' || R.view === 'revisao';
  document.body.classList.toggle('foco', emSessao);
  let h = '';
  if (R.view === 'sessao' && R.ses) h = htmlSessao();
  else if (R.view === 'revisao' && R.rev) h = `<div class="shead"><button class="icon" data-act="sairRev" aria-label="Sair">${IC.x}</button><div class="grow"><div class="muted small">Revisão</div><b>Cartões do dia</b></div></div>` + htmlRevisao();
  else if (R.view === 'trilha') h = htmlTrilha();
  else if (R.view === 'palavras') h = htmlPalavras();
  else if (R.view === 'ajustes') h = htmlAjustes();
  else { R.view = 'hoje'; h = htmlHoje(); }
  app.innerHTML = h;
  tabsEl.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.tab === R.view));
}
tabsEl.innerHTML = [['hoje', 'Hoje'], ['trilha', 'Trilha'], ['palavras', 'Palavras'], ['ajustes', 'Ajustes']].map(([k, t]) => `<button data-tab="${k}">${IC[k]}<span>${t}</span></button>`).join('');

/* ---------- eventos ---------- */
tabsEl.addEventListener('click', e => { const b = e.target.closest('button[data-tab]'); if (!b) return; R.view = b.dataset.tab; R.celebrar = null; render(); window.scrollTo(0, 0); });
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const a = el.dataset.act;
  if (R.view === 'sessao' || R.view === 'revisao') tick();
  const s = R.ses ? SES[R.ses.sid] : null;
  switch (a) {
    case 'falar': falar(el.dataset.t); break;
    case 'falarLento': falar(el.dataset.t, true); break;
    case 'iniciar': iniciarSessao(el.dataset.s, 'normal'); break;
    case 'refazer': iniciarSessao(el.dataset.s, 'refazer'); break;
    case 'sair': sairSessao(); break;
    case 'concluir': concluirSessao(); break;
    case 'palProx': if (R.ses.palIdx + 1 < s.itensObj.length) { R.ses.palIdx++; render(); window.scrollTo(0, 0); falar(s.itensObj[R.ses.palIdx].en); } else concluirPasso('pal'); break;
    case 'palVoltar': R.ses.palIdx = Math.max(0, R.ses.palIdx - 1); render(); falar(s.itensObj[R.ses.palIdx].en); break;
    case 'dicaOk': concluirPasso('dica'); break;
    case 'resp': responder(el.dataset.v); break;
    case 'peca': R.prat.monta.push(Number(el.dataset.i)); render(); break;
    case 'tirar': R.prat.monta.splice(Number(el.dataset.k), 1); render(); break;
    case 'verificarMonta': { const ex = R.prat.fila[R.prat.pos]; responder(R.prat.monta.map(i => ex.pecas[i]).join(' ')); break; }
    case 'verificarDitado': { const v = (document.getElementById('ditado') || {}).value || ''; responder(v); break; }
    case 'continuar': continuarEx(); break;
    case 'fimPrat': concluirPasso('prat'); break;
    case 'mostrarCard': { R.rev.mostrou = true; render(); const cur = cardAtual(); if (cur && modoProducao(cur)) falar(cardInfo(cur.id).en); break; }
    case 'errei': avaliar(false); break;
    case 'acertei': avaliar(true); break;
    case 'revisar': iniciarRevisaoLivre('hoje'); break;
    case 'revisarPal': iniciarRevisaoLivre('palavras'); break;
    case 'sairRev': { if (temVoz) speechSynthesis.cancel(); const r = R.rev; if (r && r.ms) { const d = dia(); d.min += Math.round(r.ms / 60000); } R.rev = null; R.view = R.voltar || 'hoje'; salvar(); render(); break; }
    case 'ocultarInstalar': S.ajustes.ocultarInstalar = true; salvar(); render(); break;
    case 'addPalavra': {
      const en = document.getElementById('novaEn').value.trim(); const pt = document.getElementById('novaPt').value.trim();
      if (!en || !pt) { toast('Preencha em inglês e em português.'); break; }
      const id = 'own-' + Date.now(); S.cards[id] = { box: 1, due: hoje(), ok: 0, err: 0, en, pt, own: true, add: hoje() };
      salvar(); render(); falar(en); toast('Palavra adicionada. Ela entra na revisão de hoje.'); break;
    }
    case 'apagarPal': if (confirm('Apagar esta palavra?')) { delete S.cards[el.dataset.id]; delete S.erros[el.dataset.id]; salvar(); render(); } break;
    case 'testarVoz': falar("Hello! Nice to meet you. Let's learn English together."); break;
    case 'exportar': exportar(); break;
    case 'importar': document.getElementById('arqImport').click(); break;
    case 'apagarTudo':
      if (confirm('Apagar TODO o progresso deste aparelho? Não dá pra desfazer.') && confirm('Tem certeza? Se tiver backup, dá pra importar depois.')) { localStorage.removeItem(CHAVE); carregar(); R.view = 'hoje'; render(); toast('Progresso apagado.'); }
      break;
  }
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (e.target.id === 'ditado' && R.prat && !R.prat.resp) { e.preventDefault(); tick(); responder(e.target.value || ''); }
  else if (R.prat && R.prat.resp && R.view === 'sessao') { e.preventDefault(); tick(); continuarEx(); }
});
document.addEventListener('input', e => { if (e.target.id === 'busca') { R.busca = e.target.value; const l = document.getElementById('lista'); if (l) l.innerHTML = htmlLista(); } });
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.set;
  if (k) {
    if (k === 'sons') S.ajustes.sons = e.target.checked;
    else if (k === 'rate') S.ajustes.rate = Number(e.target.value);
    else S.ajustes[k] = e.target.value;
    salvar(); if (k !== 'nome') render(); toast('Salvo.');
  }
  if (e.target.id === 'arqImport' && e.target.files && e.target.files[0]) {
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const obj = JSON.parse(fr.result);
        if (!obj || !obj.v || !obj.cards) throw new Error('formato');
        if (!confirm('Importar este backup? O progresso atual deste aparelho será substituído.')) return;
        localStorage.setItem(CHAVE, JSON.stringify(obj)); carregar(); R.view = 'hoje'; render(); toast('Backup importado.');
      } catch (err) { toast('Esse arquivo não parece um backup do Meu Inglês.'); }
    };
    fr.readAsText(e.target.files[0]); e.target.value = '';
  }
});
async function exportar() {
  const nome = `meu-ingles-backup-${hoje()}.json`;
  const blob = new Blob([JSON.stringify(S)], { type: 'application/json' });
  const movel = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
  try {
    const f = new File([blob], nome, { type: 'application/json' });
    if (movel && navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: 'Backup Meu Inglês' }); return; }
  } catch (err) { if (err && err.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}

/* ---------- início ---------- */
carregar();
if (S.atual && !SES[S.atual.sid]) S.atual = null;
render();
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
window.__mi = { S: () => S, R, SES, ITENS, devidos, novaPratica, confere };
})();
