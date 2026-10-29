/* Meu Inglês: conteúdo do Mês 1 (Fase 1 da trilha: do zero)
   Formato dos itens: [inglês, português, extra]
   extra pode ser uma dica (texto) ou {d: dica, alt: [respostas aceitas]}
   Perguntas: [enunciado, [opções], índice da certa, explicação] */
const CURSO = {
  inicio: "2026-11-02",
  fases: [
    { n: 1, titulo: "Do zero", meses: "Meses 1 a 3", texto: "Sons do inglês, palavras do dia a dia, frases prontas e presente. Meta: entender e dizer frases curtas sobre você e seu dia." },
    { n: 2, titulo: "Dia a dia", meses: "Meses 4 a 6", texto: "Passado e futuro, perguntas, situações reais (restaurante, mercado, viagem, morar sozinho), música e vídeos curtos." },
    { n: 3, titulo: "Conversar e se virar", meses: "Meses 7 a 12", texto: "Contar histórias, dar opinião, séries com legenda em inglês e conversa com pessoas. O trabalho entra como um tema entre outros." }
  ],
  marcos: [
    "Mês 2: primeira gravação (opcional) de 3 frases que você já treinou. Só você ouve.",
    "Fim do mês 3: teste rápido do EF SET (15 min), só pra ter uma referência.",
    "Mês 6: EF SET completo (50 min), com certificado."
  ],
  semanas: [
    { n: 1, titulo: "Primeiros passos", bonus: [
      { titulo: "Let's Learn English, Lesson 1 (VOA)", desc: "Vídeo curto sobre se apresentar, com frases pra ouvir e repetir. Pode ligar a legenda.", url: "https://learningenglish.voanews.com/a/lets-learn-english-lesson-one/3111026.html" } ] },
    { n: 2, titulo: "Eu e as pessoas", bonus: [
      { titulo: "Meeting a new team member (British Council)", desc: "Conversa curta entre dois colegas novos. Ouça primeiro, depois abra a transcrição (Transcript).", url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/meeting-new-team-member" } ] },
    { n: 3, titulo: "Meu dia", bonus: [
      { titulo: "A voicemail message (British Council)", desc: "Um recado de voz curto, com exercícios. Ouça quantas vezes quiser.", url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/voicemail-message" } ] },
    { n: 4, titulo: "Casa e comida", bonus: [
      { titulo: "Ordering in a café (British Council)", desc: "Pessoas pedindo comida e bebida num café. Combina com a sessão 17.", url: "https://learnenglish.britishcouncil.org/free-resources/listening/a1/ordering-cafe" },
      { titulo: "My house: listening practice (YouTube)", desc: "Vídeo de 1 min e meio descrevendo uma casa. Combina com a sessão 18.", url: "https://www.youtube.com/watch?v=c1YLZuxrdMM" } ] }
  ],
  sessoes: [
    /* ---------------- SEMANA 1 ---------------- */
    { id: "s1", semana: 1, titulo: "Oi e tchau", resumo: "Cumprimentos e despedidas",
      itens: [
        ["Hello", "Olá", "O H é soprado, parecido com o R de “rato”. Não é mudo como em “hoje”."],
        ["Hi", "Oi"],
        ["Good morning", "Bom dia"],
        ["Good afternoon", "Boa tarde"],
        ["Good evening", "Boa noite (ao chegar)", "Use ao chegar ou cumprimentar alguém à noite."],
        ["Good night", "Boa noite (ao sair ou dormir)", "Só pra se despedir ou na hora de dormir. Nunca pra cumprimentar."],
        ["Bye", "Tchau"],
        ["See you later", "Até mais"],
        ["See you tomorrow", "Até amanhã"],
        ["How are you?", "Como você está?", "Na prática, é quase um “tudo bem?”. A resposta costuma ser curta."],
        ["I'm fine, thanks.", "Estou bem, obrigado.", "I'm é a forma curta de I am (eu estou)."],
        ["And you?", "E você?"],
        ["I'm good.", "Tô bem (bem comum no dia a dia)"]
      ],
      dica: { t: "Boa noite tem duas versões", p: [
        "Em português, “boa noite” serve pra chegar e pra sair. Em inglês são duas expressões diferentes.",
        "<b>Good evening</b> é pra chegar ou cumprimentar alguém à noite. <b>Good night</b> é pra se despedir ou na hora de dormir.",
        "O <b>H</b> do começo de <b>hello</b>, <b>hi</b> e <b>how</b> é um sopro, parecido com o R de “rato”. Ele não é mudo como em “hoje”.",
        "Toque nos exemplos, ouça e repita em voz alta. Pode exagerar, ninguém está ouvindo."],
        ex: [["Good evening! How are you?", "Boa noite! Como você está?"], ["I'm fine, thanks. And you?", "Estou bem, obrigado. E você?"], ["Good night! See you tomorrow.", "Boa noite! Até amanhã."]] },
      perguntas: [
        ["São 8h da manhã. Você chega no trabalho e diz:", ["Good morning!", "Good night!", "Good evening!"], 0, "Good morning é “bom dia”, usado até o meio-dia, mais ou menos."],
        ["São 15h. Você cumprimenta alguém:", ["Good afternoon!", "Good morning!", "Good night!"], 0, "Afternoon é a tarde (depois do meio-dia)."],
        ["Você está indo dormir e se despede:", ["Good night!", "Good evening!", "Hello!"], 0, "Good night é só pra despedida ou hora de dormir."],
        ["Alguém pergunta “How are you?”. Você responde:", ["I'm fine, thanks.", "Good night.", "See you tomorrow."], 0, "How are you? pergunta como você está. A resposta mais comum: I'm fine, thanks."],
        ["Você chega num jantar às 20h e cumprimenta:", ["Good evening!", "Good night!", "Bye!"], 0, "Chegando à noite: good evening. Good night seria pra ir embora."]
      ] },

    { id: "s2", semana: 1, titulo: "Prazer, eu sou...", resumo: "Se apresentar e dizer de onde é",
      itens: [
        ["My name is Ana.", "Meu nome é Ana."],
        ["I'm Ana.", "Eu sou a Ana.", "I'm = I am. É o jeito mais comum de dizer seu nome."],
        ["What's your name?", "Qual é o seu nome?", "What's = What is."],
        ["Nice to meet you.", "Prazer em te conhecer."],
        ["Nice to meet you too.", "O prazer é meu."],
        ["Where are you from?", "De onde você é?"],
        ["I'm from Brazil.", "Eu sou do Brasil.", "Brazil se escreve com Z em inglês."],
        ["I live in Brazil.", "Eu moro no Brasil."],
        ["I'm Brazilian.", "Eu sou brasileiro.", "Nacionalidade sempre com letra maiúscula em inglês."],
        ["Where do you live?", "Onde você mora?"],
        ["me too", "eu também"],
        ["Welcome!", "Bem-vindo!"]
      ],
      dica: { t: "Ser de um lugar: be from", p: [
        "Pra dizer de onde você é, o inglês usa <b>I'm from</b> + lugar. Pra dizer onde mora, <b>I live in</b> + lugar.",
        "O <b>'m</b> de <b>I'm</b> é a forma curta de <b>am</b>. Na conversa, quase todo mundo usa a forma curta: I'm, what's, you're.",
        "Nacionalidades sempre começam com maiúscula: <b>Brazilian</b>, <b>American</b>, <b>English</b>.",
        "Agora treine com o seu nome: diga em voz alta “Hi! I'm...” e “I'm from Brazil”."],
        ex: [["Hi! I'm Ana. What's your name?", "Oi! Eu sou a Ana. Qual é o seu nome?"], ["I'm from Brazil. And you?", "Eu sou do Brasil. E você?"], ["Nice to meet you!", "Prazer em te conhecer!"]] },
      perguntas: [
        ["___ name is Ana.", ["My", "I", "Me"], 0, "My = meu/minha. I é “eu”."],
        ["I'm ___ Brazil.", ["from", "of", "to"], 0, "Ser de um lugar: be from. I'm from Brazil."],
        ["Nice to ___ you.", ["meet", "know", "see"], 0, "Nice to meet you é a frase fixa quando você conhece alguém."],
        ["Eu sou brasileiro: I'm ___.", ["Brazilian", "brazilian", "Brazil"], 0, "Nacionalidade com maiúscula. Brazil é o país."],
        ["Onde você mora?", ["Where do you live?", "Where are you from?", "What's your name?"], 0, "Where are you from? pergunta de onde você é, não onde mora."]
      ] },

    { id: "s3", semana: 1, titulo: "Palavras que salvam", resumo: "Por favor, obrigado, desculpa e “não entendi”",
      itens: [
        ["please", "por favor"],
        ["thank you", "obrigado, obrigada", "TH: ponta da língua entre os dentes, soltando o ar."],
        ["thanks", "valeu, obrigado"],
        ["You're welcome.", "De nada."],
        ["sorry", "desculpa"],
        ["excuse me", "com licença"],
        ["yes", "sim"],
        ["no", "não"],
        ["I don't understand.", "Não estou entendendo."],
        ["Can you repeat that, please?", "Pode repetir, por favor?"],
        ["Can you speak more slowly, please?", "Pode falar mais devagar, por favor?"],
        ["What does it mean?", "O que isso significa?"],
        ["How do you say it in English?", "Como se diz isso em inglês?"]
      ],
      dica: { t: "Sorry ou excuse me?", p: [
        "<b>Excuse me</b> é pra pedir licença ou chamar a atenção de alguém, <b>antes</b>: pra passar, pra perguntar algo.",
        "<b>Sorry</b> é pra pedir desculpa <b>depois</b> que aconteceu: esbarrou, errou, se atrasou. E <b>Sorry?</b>, com tom de pergunta, é “como?”, quando você não ouviu.",
        "O <b>TH</b> de <b>thank you</b>: coloque a ponta da língua entre os dentes e solte o ar. Não é F nem T. É um som que o português não tem, então treine bastante.",
        "Essas frases são suas melhores amigas. Quando não entender, peça pra repetir: ninguém se incomoda."],
        ex: [["Excuse me, where is the bathroom?", "Com licença, onde é o banheiro?"], ["Sorry, I don't understand.", "Desculpa, não estou entendendo."], ["Thank you so much!", "Muito obrigado!"]] },
      perguntas: [
        ["Alguém te agradece: “Thank you!”. Você responde:", ["You're welcome.", "Excuse me.", "Sorry."], 0, "You're welcome = de nada."],
        ["Você precisa passar por alguém no corredor:", ["Excuse me.", "Sorry.", "Thanks."], 0, "Antes de passar, peça licença: excuse me."],
        ["Você esbarra em alguém sem querer:", ["Sorry!", "Excuse me!", "You're welcome!"], 0, "Depois que aconteceu, peça desculpa: sorry."],
        ["Você não entendeu o que a pessoa falou:", ["Can you repeat that, please?", "You're welcome.", "Nice to meet you."], 0, "Pedir pra repetir é a frase mais útil do começo."],
        ["A pessoa fala rápido demais. Você pede:", ["Can you speak more slowly, please?", "Can you speak more fast?", "Slowly you speak."], 0, "More slowly = mais devagar."]
      ] },

    { id: "s4", semana: 1, titulo: "Números de 0 a 12", resumo: "A base pra horas, preços e telefone",
      itens: [
        ["zero", "zero", { alt: ["0"] }],
        ["one", "um", { alt: ["1"] }],
        ["two", "dois", { alt: ["2"] }],
        ["three", "três", { d: "TH de novo: língua entre os dentes.", alt: ["3"] }],
        ["four", "quatro", { alt: ["4"] }],
        ["five", "cinco", { alt: ["5"] }],
        ["six", "seis", { alt: ["6"] }],
        ["seven", "sete", { alt: ["7"] }],
        ["eight", "oito", { d: "O GH é mudo: soa “eit”.", alt: ["8"] }],
        ["nine", "nove", { alt: ["9"] }],
        ["ten", "dez", { alt: ["10"] }],
        ["eleven", "onze", { alt: ["11"] }],
        ["twelve", "doze", { alt: ["12"] }],
        ["What's your phone number?", "Qual é o seu número de telefone?"]
      ],
      dica: { t: "Números no dia a dia", p: [
        "Os números de 0 a 12 são a base de tudo: horas, preços, idade, telefone.",
        "Em número de telefone, o <b>0</b> costuma ser falado como <b>“oh”</b> (igual à letra O). E os números são ditos um por um: 9 8 7 = nine, eight, seven.",
        "Cuidado com <b>three</b> (três, com TH) e <b>tree</b> (árvore). E <b>eight</b> tem GH mudo: soa “eit”."],
        ex: [["What's your phone number?", "Qual é o seu número de telefone?"], ["It's nine, eight, seven, oh, two.", "É 9-8-7-0-2."], ["One, two, three, four, five.", "Um, dois, três, quatro, cinco."]] },
      perguntas: [
        ["Quanto é two + three?", ["five", "four", "six"], 0, "Two (2) + three (3) = five (5)."],
        ["Quanto é ten − one?", ["nine", "eleven", "seven"], 0, "10 − 1 = 9: nine."],
        ["Qual número é “eight”?", ["8", "18", "80"], 0, "Eight = 8. Lembre: o GH é mudo."],
        ["Como se escreve 12?", ["twelve", "twenty", "eleven"], 0, "Twelve = 12. Eleven = 11. Twenty = 20."],
        ["Num telefone, o zero costuma ser falado como:", ["“oh”", "“zi”", "“nada”"], 0, "Em telefones, o 0 vira “oh”, como a letra O."]
      ] },

    { id: "s5", semana: 1, titulo: "Sou ou estou?", resumo: "O verbo to be",
      itens: [
        ["I am", "eu sou, eu estou"],
        ["you are", "você é, você está"],
        ["he is", "ele é, ele está"],
        ["she is", "ela é, ela está"],
        ["it is", "é, está (coisas, tempo, horas)"],
        ["we are", "nós somos, nós estamos"],
        ["they are", "eles são, elas estão"],
        ["I'm tired.", "Estou cansado."],
        ["She's my friend.", "Ela é minha amiga."],
        ["We're from Brazil.", "Nós somos do Brasil."],
        ["It's cold today.", "Está frio hoje."],
        ["They're happy.", "Eles estão felizes."]
      ],
      dica: { t: "Ser e estar são o mesmo verbo", p: [
        "Em português temos <b>ser</b> e <b>estar</b>. Em inglês os dois são um verbo só: <b>to be</b>. Ele muda conforme a pessoa: <b>I am</b>, <b>you are</b>, <b>he/she/it is</b>, <b>we are</b>, <b>they are</b>.",
        "Na conversa, quase sempre se usa a forma curta: <b>I'm</b>, <b>you're</b>, <b>he's</b>, <b>she's</b>, <b>it's</b>, <b>we're</b>, <b>they're</b>.",
        "<b>It</b> é pra coisas, animais, tempo e horas. E em inglês a frase sempre precisa de sujeito: “Está frio” vira <b>It's cold</b>, nunca só “Is cold”."],
        ex: [["I'm Brazilian and I'm tired.", "Sou brasileiro e estou cansado."], ["It's cold today.", "Está frio hoje."], ["They're my friends.", "Eles são meus amigos."]] },
      perguntas: [
        ["I ___ tired.", ["am", "is", "are"], 0, "Com I, sempre am: I am (I'm)."],
        ["She ___ my friend.", ["is", "am", "are"], 0, "Com he, she e it: is."],
        ["We ___ from Brazil.", ["are", "is", "am"], 0, "Com we, you e they: are."],
        ["They ___ happy.", ["are", "is", "am"], 0, "They (eles/elas) usa are."],
        ["“Está frio hoje”:", ["It's cold today.", "Is cold today.", "Cold is today."], 0, "A frase precisa de sujeito. Pra tempo, usa it: It's cold."],
        ["You ___ Brazilian.", ["are", "is", "am"], 0, "You usa are, tanto pra “você” quanto pra “vocês”."]
      ] },

    /* ---------------- SEMANA 2 ---------------- */
    { id: "s6", semana: 2, titulo: "Família e pessoas", resumo: "Família, amigos e meu/seu/dele/dela",
      itens: [
        ["family", "família"],
        ["mother", "mãe", "No dia a dia, também se fala mom."],
        ["father", "pai", "No dia a dia, também se fala dad."],
        ["brother", "irmão"],
        ["sister", "irmã"],
        ["son", "filho"],
        ["daughter", "filha", "O GH é mudo."],
        ["parents", "pai e mãe (os pais)", "Cuidado: parents NÃO é “parentes”. Parentes = relatives."],
        ["friend", "amigo, amiga"],
        ["boyfriend", "namorado"],
        ["girlfriend", "namorada"],
        ["This is my mother.", "Esta é minha mãe."],
        ["I have one brother.", "Eu tenho um irmão."]
      ],
      dica: { t: "Meu, seu, dele, dela", p: [
        "<b>My</b> = meu/minha. <b>Your</b> = seu/sua. <b>His</b> = dele. <b>Her</b> = dela. Em inglês não muda se a coisa é masculina ou feminina: my brother, my sister.",
        "O que importa é <b>quem é o dono</b>: “a irmã dele” = <b>his sister</b>; “o irmão dela” = <b>her brother</b>.",
        "E atenção ao falso amigo: <b>parents</b> são o pai e a mãe. Parentes em geral são <b>relatives</b>."],
        ex: [["This is my sister, Ana.", "Esta é minha irmã, Ana."], ["His father is from Brazil.", "O pai dele é do Brasil."], ["Her parents are happy.", "Os pais dela estão felizes."]] },
      perguntas: [
        ["This is ___ sister. (minha)", ["my", "I", "me"], 0, "My = meu/minha."],
        ["“Parents” significa:", ["pai e mãe", "parentes", "primos"], 0, "Falso amigo! Parents = pai e mãe. Parentes = relatives."],
        ["Ana is ___ daughter. (filha dele)", ["his", "her", "he"], 0, "His = dele. O dono (o pai) é homem."],
        ["Leo is ___ son. (filho dela)", ["her", "his", "she"], 0, "Her = dela. A dona (a mãe) é mulher."],
        ["I ___ two sisters.", ["have", "am", "has"], 0, "Ter = have. Com I, you, we, they: have."]
      ] },

    { id: "s7", semana: 2, titulo: "Trabalho e profissões", resumo: "O que você faz?",
      itens: [
        ["job", "emprego, trabalho"],
        ["work", "trabalhar; trabalho"],
        ["company", "empresa"],
        ["office", "escritório"],
        ["boss", "chefe"],
        ["team", "equipe, time"],
        ["meeting", "reunião"],
        ["student", "estudante"],
        ["What do you do?", "O que você faz? (profissão)"],
        ["I'm a teacher.", "Eu sou professor."],
        ["She's an engineer.", "Ela é engenheira."],
        ["I work in customer support.", "Eu trabalho com atendimento ao cliente."],
        ["I work from home.", "Eu trabalho de casa."]
      ],
      dica: { t: "A ou an antes da profissão", p: [
        "Em português dizemos “sou professor”. Em inglês precisa do <b>a</b> ou <b>an</b>: <b>I'm a teacher</b>.",
        "Use <b>an</b> quando a palavra seguinte começa com som de vogal: <b>an engineer</b>, <b>an architect</b>. Nos outros casos, <b>a</b>: a doctor, a student.",
        "Pra perguntar a profissão de alguém, o natural é <b>What do you do?</b> A resposta pode ser <b>I'm a...</b> ou <b>I work in...</b> (área)."],
        ex: [["What do you do?", "O que você faz?"], ["I'm a student. I work in an office.", "Sou estudante. Trabalho num escritório."], ["My team has a meeting today.", "Minha equipe tem uma reunião hoje."]] },
      perguntas: [
        ["I'm ___ teacher.", ["a", "an", "the"], 0, "Profissão leva a/an. Teacher começa com som de consoante: a."],
        ["She's ___ engineer.", ["an", "a", "the"], 0, "Engineer começa com som de vogal: an."],
        ["What do you ___?", ["do", "make", "are"], 0, "What do you do? é a pergunta fixa pra profissão."],
        ["I work ___ home.", ["from", "in", "of"], 0, "Trabalhar de casa: work from home."],
        ["“Meeting” significa:", ["reunião", "chefe", "escritório"], 0, "Meeting = reunião. Boss = chefe. Office = escritório."]
      ] },

    { id: "s8", semana: 2, titulo: "Números até 100", resumo: "Idade e preços",
      itens: [
        ["thirteen", "treze", { alt: ["13"] }],
        ["fifteen", "quinze", { alt: ["15"] }],
        ["twenty", "vinte", { alt: ["20"] }],
        ["twenty-five", "vinte e cinco", { alt: ["25"] }],
        ["thirty", "trinta", { alt: ["30"] }],
        ["forty", "quarenta", { d: "Sem U! Não é “fourty”.", alt: ["40"] }],
        ["fifty", "cinquenta", { alt: ["50"] }],
        ["sixty", "sessenta", { alt: ["60"] }],
        ["seventy", "setenta", { alt: ["70"] }],
        ["eighty", "oitenta", { alt: ["80"] }],
        ["ninety", "noventa", { alt: ["90"] }],
        ["one hundred", "cem", { alt: ["100", "a hundred"] }],
        ["How much is it?", "Quanto custa?"],
        ["How old are you?", "Quantos anos você tem?"],
        ["I'm thirty years old.", "Eu tenho trinta anos.", "Idade usa o verbo to be, nunca have."]
      ],
      dica: { t: "-teen ou -ty?", p: [
        "De 13 a 19, os números terminam em <b>-teen</b>: thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen. As dezenas terminam em <b>-ty</b>: twenty, thirty, forty, fifty...",
        "A diferença está na força: em <b>thir-TEEN</b> a força vai no fim, longa. Em <b>THIR-ty</b> a força vai no começo e o fim é curto. Ouça os dois várias vezes.",
        "Idade usa o verbo <b>to be</b>: <b>I'm thirty</b> ou <b>I'm thirty years old</b>. Nunca “I have thirty years”."],
        ex: [["thirteen, thirty", "treze, trinta"], ["fifteen, fifty", "quinze, cinquenta"], ["How old are you? I'm twenty-five.", "Quantos anos você tem? Tenho vinte e cinco."]] },
      perguntas: [
        ["Quantos anos você tem?", ["How old are you?", "How many years you have?", "What is your years?"], 0, "A pergunta fixa é How old are you?"],
        ["I ___ thirty years old.", ["am", "have", "has"], 0, "Idade usa to be: I am (I'm) thirty."],
        ["Como se escreve 40?", ["forty", "fourty", "fourteen"], 0, "Forty, sem U. Fourteen é 14."],
        ["Quanto é fifteen + five?", ["twenty", "fifty", "twenty-five"], 0, "15 + 5 = 20: twenty."],
        ["“How much is it?” serve pra perguntar:", ["o preço", "a idade", "as horas"], 0, "How much = quanto (custa)."]
      ] },

    { id: "s9", semana: 2, titulo: "Não e perguntas", resumo: "Negativa e pergunta com to be",
      itens: [
        ["I'm not tired.", "Não estou cansado."],
        ["She isn't here.", "Ela não está aqui."],
        ["We aren't late.", "Nós não estamos atrasados."],
        ["Are you OK?", "Você está bem?"],
        ["Is he your brother?", "Ele é seu irmão?"],
        ["Yes, I am.", "Sim, estou. (resposta curta)"],
        ["No, I'm not.", "Não, não estou."],
        ["Yes, he is.", "Sim, ele é."],
        ["No, he isn't.", "Não, ele não é."],
        ["Is it expensive?", "É caro?"],
        ["expensive", "caro"],
        ["cheap", "barato"],
        ["late", "atrasado; tarde"]
      ],
      dica: { t: "Pra negar e perguntar", p: [
        "Pra <b>negar</b>, coloque <b>not</b> depois de am/is/are: <b>I'm not</b>, <b>she isn't</b> (is not), <b>we aren't</b> (are not).",
        "Pra <b>perguntar</b>, inverta a ordem: <b>You are</b> OK → <b>Are you</b> OK? <b>He is</b> your brother → <b>Is he</b> your brother?",
        "A resposta curta repete o verbo: <b>Yes, I am.</b> / <b>No, I'm not.</b> Detalhe: no “sim” não se usa forma curta. É <b>Yes, I am</b>, nunca “Yes, I'm”."],
        ex: [["Are you tired? No, I'm not.", "Você está cansado? Não, não estou."], ["Is it expensive? Yes, it is.", "É caro? Sim, é."], ["She isn't late.", "Ela não está atrasada."]] },
      perguntas: [
        ["She ___ here. (não está)", ["isn't", "aren't", "not"], 0, "She usa is. Negativa: is not = isn't."],
        ["___ you OK?", ["Are", "Is", "Do"], 0, "You usa are. Na pergunta, are vem antes: Are you...?"],
        ["Is he your brother? Yes, he ___.", ["is", "he's", "are"], 0, "No “sim”, sem forma curta: Yes, he is."],
        ["We ___ late. (não estamos)", ["aren't", "isn't", "not are"], 0, "We usa are. Negativa: are not = aren't."],
        ["Are you tired? (não)", ["No, I'm not.", "No, I not.", "No, I isn't."], 0, "Resposta curta negativa: No, I'm not."],
        ["___ it expensive?", ["Is", "Are", "It"], 0, "It usa is. Pergunta: Is it...?"]
      ] },

    { id: "s10", semana: 2, titulo: "Revisão e sons difíceis", resumo: "TH, H e o “i” que o brasileiro coloca no fim", revisao: 10, perguntasRevisao: 6,
      itens: [
        ["the", "o, a, os, as", "TH vibrado: língua entre os dentes e a garganta vibra."],
        ["this", "este, esta, isto"],
        ["that", "aquele, aquela, aquilo"],
        ["think", "pensar, achar", "TH soprado, sem vibrar."],
        ["house", "casa", "H soprado no começo."],
        ["good", "bom", "Termine seco no D. Não diga “gudi”."],
        ["book", "livro", "Termine seco no K. Não diga “buki”."],
        ["big", "grande", "Termine seco no G. Não diga “bigui”."]
      ],
      dica: { t: "3 armadilhas do brasileiro", p: [
        "<b>1. TH.</b> Ponta da língua entre os dentes. Em <b>think</b>, <b>three</b> e <b>thank</b> só sai ar. Em <b>the</b>, <b>this</b> e <b>that</b> a garganta vibra.",
        "<b>2. H no começo.</b> Em <b>house</b>, <b>hello</b> e <b>how</b>, o H é um sopro, parecido com o R de “rato”.",
        "<b>3. Sem “i” no final.</b> O português coloca um “i” depois de consoante: “gudi”, “buki”, “bigui”. Em inglês a palavra termina seca: <b>good</b>, <b>book</b>, <b>big</b>.",
        "Hoje a prática mistura tudo das duas primeiras semanas. Se errar, ótimo: é assim que a gente descobre o que reforçar."],
        ex: [["I think this is good.", "Eu acho que isso é bom."], ["That is a big house.", "Aquela é uma casa grande."], ["Thank you for the book.", "Obrigado pelo livro."]] },
      perguntas: [] },

    /* ---------------- SEMANA 3 ---------------- */
    { id: "s11", semana: 3, titulo: "Dias da semana", resumo: "Hoje, amanhã, ontem e on Monday",
      itens: [
        ["Monday", "segunda-feira"],
        ["Tuesday", "terça-feira"],
        ["Wednesday", "quarta-feira", "O primeiro D é mudo: soa mais ou menos “uénzdei”."],
        ["Thursday", "quinta-feira", "Começa com TH. Não confunda com Tuesday."],
        ["Friday", "sexta-feira"],
        ["Saturday", "sábado"],
        ["Sunday", "domingo"],
        ["today", "hoje"],
        ["tomorrow", "amanhã"],
        ["yesterday", "ontem"],
        ["week", "semana"],
        ["weekend", "fim de semana"],
        ["on Monday", "na segunda-feira"]
      ],
      dica: { t: "Dias com on", p: [
        "Os dias da semana em inglês sempre começam com letra maiúscula: <b>Monday</b>, <b>Friday</b>.",
        "Pra dizer “na segunda”, “no sábado”, use <b>on</b>: <b>on Monday</b>, <b>on Saturday</b>. No fim de semana: <b>on the weekend</b> (jeito americano).",
        "A confusão mais comum: <b>Tuesday</b> (terça, começa com T) e <b>Thursday</b> (quinta, começa com TH). Ouça os dois algumas vezes."],
        ex: [["I work on Monday.", "Eu trabalho na segunda."], ["Today is Friday!", "Hoje é sexta!"], ["See you on Thursday.", "Até quinta."]] },
      perguntas: [
        ["I work ___ Monday.", ["on", "in", "at"], 0, "Com dias da semana: on."],
        ["Sábado:", ["Saturday", "Sunday", "Thursday"], 0, "Saturday = sábado. Sunday = domingo."],
        ["Quinta-feira:", ["Thursday", "Tuesday", "Wednesday"], 0, "Thursday começa com TH. Tuesday é terça."],
        ["Amanhã:", ["tomorrow", "today", "yesterday"], 0, "Tomorrow = amanhã. Yesterday = ontem."],
        ["“Weekend” significa:", ["fim de semana", "semana", "dia útil"], 0, "Week = semana. Weekend = fim de semana."]
      ] },

    { id: "s12", semana: 3, titulo: "Que horas são?", resumo: "Horas e partes do dia",
      itens: [
        ["What time is it?", "Que horas são?"],
        ["It's eight o'clock.", "São oito horas.", "O'clock só pra hora cheia."],
        ["It's nine thirty.", "São nove e meia."],
        ["at nine", "às nove"],
        ["in the morning", "de manhã"],
        ["in the afternoon", "à tarde"],
        ["in the evening", "à noite (começo da noite)"],
        ["at night", "à noite (mais tarde)"],
        ["noon", "meio-dia"],
        ["early", "cedo"],
        ["hour", "hora", "O H é mudo: soa mais ou menos “áuer”."],
        ["minute", "minuto"]
      ],
      dica: { t: "Horas do jeito fácil", p: [
        "O jeito mais simples de dizer as horas é falar os números: 9:30 = <b>nine thirty</b>; 8:15 = <b>eight fifteen</b>; 7:45 = <b>seven forty-five</b>.",
        "<b>O'clock</b> é só pra hora cheia: <b>eight o'clock</b>. Pra perguntar e responder, usa <b>it</b> (lembra da sessão 5?): <b>What time is it? It's...</b>",
        "Pra dizer “às”, use <b>at</b>: <b>at nine</b>. Partes do dia: <b>in the morning</b>, <b>in the afternoon</b>, <b>in the evening</b>, mas <b>at night</b>."],
        ex: [["What time is it? It's seven fifteen.", "Que horas são? São sete e quinze."], ["I start work at nine in the morning.", "Eu começo a trabalhar às nove da manhã."], ["I study early.", "Eu estudo cedo."]] },
      perguntas: [
        ["Que horas são?", ["What time is it?", "What hour is?", "How many hours?"], 0, "A pergunta fixa: What time is it?"],
        ["I start work ___ nine.", ["at", "in", "on"], 0, "Com horário: at."],
        ["___ the morning", ["in", "on", "at"], 0, "In the morning, in the afternoon, in the evening."],
        ["___ night", ["at", "in", "on"], 0, "A exceção: at night."],
        ["São 10:30:", ["It's ten thirty.", "It's ten three.", "It's thirty ten."], 0, "Fale os números: ten thirty."]
      ] },

    { id: "s13", semana: 3, titulo: "Minha rotina", resumo: "Acordar, trabalhar, almoçar, dormir",
      itens: [
        ["wake up", "acordar"],
        ["get up", "levantar (da cama)"],
        ["take a shower", "tomar banho"],
        ["have breakfast", "tomar café da manhã"],
        ["go to work", "ir para o trabalho"],
        ["have lunch", "almoçar"],
        ["go home", "ir para casa", "Sem “to”: go home."],
        ["have dinner", "jantar"],
        ["go to bed", "ir dormir"],
        ["study", "estudar"],
        ["I wake up at seven.", "Eu acordo às sete."],
        ["I have lunch at noon.", "Eu almoço ao meio-dia."],
        ["I go to bed at eleven.", "Eu vou dormir às onze."]
      ],
      dica: { t: "Have pras refeições", p: [
        "Pras refeições, o inglês usa <b>have</b>: <b>have breakfast</b> (café da manhã), <b>have lunch</b> (almoço), <b>have dinner</b> (jantar).",
        "<b>Go home</b> não leva “to”: é <b>go home</b>, nunca “go to home”. Mas é <b>go to work</b> e <b>go to bed</b>.",
        "Monte a sua rotina em voz alta: “I wake up at...”, “I go to work at...”. Usar com a sua vida é o que faz grudar."],
        ex: [["I wake up at seven and I take a shower.", "Eu acordo às sete e tomo banho."], ["I go to work at eight thirty.", "Eu vou pro trabalho às oito e meia."], ["I go home at six and I have dinner.", "Eu vou pra casa às seis e janto."]] },
      perguntas: [
        ["Ir para casa:", ["go home", "go to home", "go at home"], 0, "Go home, sem “to”."],
        ["Eu almoço ao meio-dia:", ["I have lunch at noon.", "I take lunch in noon.", "I lunch at the noon."], 0, "Refeição com have; horário com at."],
        ["I wake ___ at seven.", ["up", "on", "in"], 0, "Acordar = wake up."],
        ["I go ___ bed at eleven.", ["to", "at", "in"], 0, "Ir dormir = go to bed."],
        ["Tomar banho:", ["take a shower", "make a shower", "do a shower"], 0, "Tomar banho (de chuveiro) = take a shower."]
      ] },

    { id: "s14", semana: 3, titulo: "Ele trabalha", resumo: "O -s do presente e o don't/doesn't",
      itens: [
        ["I work.", "Eu trabalho."],
        ["She works.", "Ela trabalha."],
        ["He lives in New York.", "Ele mora em Nova York."],
        ["I don't work on Sunday.", "Eu não trabalho no domingo."],
        ["She doesn't drink coffee.", "Ela não bebe café."],
        ["drink", "beber"],
        ["eat", "comer"],
        ["like", "gostar"],
        ["watch TV", "ver TV"],
        ["read", "ler"],
        ["listen to music", "ouvir música"],
        ["every day", "todo dia"]
      ],
      dica: { t: "He, she e it ganham -s", p: [
        "No presente, com <b>he</b>, <b>she</b> e <b>it</b> o verbo ganha <b>-s</b>: I work → she <b>works</b>; I live → he <b>lives</b>.",
        "Alguns mudam um pouco: <b>watch → watches</b>, <b>go → goes</b>, <b>do → does</b>, <b>have → has</b>.",
        "Pra negar: <b>don't</b> (com I, you, we, they) e <b>doesn't</b> (com he, she, it). Depois do doesn't, o verbo volta ao normal: <b>She doesn't drink</b>, nunca “doesn't drinks”."],
        ex: [["I read every day.", "Eu leio todo dia."], ["He watches TV at night.", "Ele vê TV à noite."], ["She doesn't eat meat.", "Ela não come carne."]] },
      perguntas: [
        ["She ___ in an office.", ["works", "work", "working"], 0, "She ganha -s: works."],
        ["I ___ coffee every day.", ["drink", "drinks", "am drink"], 0, "Com I, o verbo fica normal: drink."],
        ["He ___ TV at night.", ["watches", "watch", "watchs"], 0, "Verbo terminado em -ch ganha -es: watches."],
        ["We ___ work on Sunday.", ["don't", "doesn't", "not"], 0, "We usa don't."],
        ["She doesn't ___ meat.", ["eat", "eats", "eating"], 0, "Depois de doesn't, o verbo volta ao normal: eat."],
        ["He ___ two brothers.", ["has", "have", "haves"], 0, "Have com he/she/it vira has."]
      ] },

    { id: "s15", semana: 3, titulo: "Perguntas no presente", resumo: "Do you...? Does she...?",
      itens: [
        ["Do you like coffee?", "Você gosta de café?"],
        ["Yes, I do.", "Sim, gosto. (resposta curta)"],
        ["No, I don't.", "Não, não gosto."],
        ["Does she work here?", "Ela trabalha aqui?"],
        ["Yes, she does.", "Sim, ela trabalha."],
        ["No, she doesn't.", "Não, ela não trabalha."],
        ["What do you do on the weekend?", "O que você faz no fim de semana?"],
        ["What time do you wake up?", "Que horas você acorda?"],
        ["Where do you work?", "Onde você trabalha?"],
        ["Do you speak English?", "Você fala inglês?"],
        ["a little", "um pouco"]
      ],
      dica: { t: "Do e does pra perguntar", p: [
        "Pra perguntar no presente, coloque <b>do</b> no começo (ou <b>does</b> com he, she, it): <b>Do you like...?</b> <b>Does she work...?</b>",
        "Com palavra de pergunta, ela vem antes: <b>What do you do?</b> <b>Where do you live?</b> <b>What time do you...?</b>",
        "Resposta curta: <b>Yes, I do.</b> / <b>No, I don't.</b> E igual ao doesn't: depois do <b>does</b>, o verbo fica sem -s. <b>Does she work?</b>, nunca “Does she works?”."],
        ex: [["Do you speak English? A little.", "Você fala inglês? Um pouco."], ["Where does he live?", "Onde ele mora?"], ["What do you do on the weekend?", "O que você faz no fim de semana?"]] },
      perguntas: [
        ["___ you like music?", ["Do", "Does", "Are"], 0, "Com you: Do."],
        ["___ he live here?", ["Does", "Do", "Is"], 0, "Com he/she/it: Does."],
        ["Does she work here? Yes, she ___.", ["does", "do", "works"], 0, "A resposta curta repete o auxiliar: Yes, she does."],
        ["Where ___ you work?", ["do", "does", "are"], 0, "Where + do + you."],
        ["Does he ___ coffee?", ["drink", "drinks", "drinking"], 0, "Depois de does, verbo sem -s."],
        ["What time ___ she wake up?", ["does", "do", "is"], 0, "She usa does."]
      ] },

    /* ---------------- SEMANA 4 ---------------- */
    { id: "s16", semana: 4, titulo: "Comida e bebida", resumo: "Fome, sede e o que você come",
      itens: [
        ["water", "água"],
        ["coffee", "café"],
        ["tea", "chá"],
        ["milk", "leite"],
        ["bread", "pão"],
        ["rice", "arroz"],
        ["beans", "feijão"],
        ["meat", "carne"],
        ["chicken", "frango"],
        ["fruit", "fruta"],
        ["juice", "suco"],
        ["I'm hungry.", "Estou com fome."],
        ["I'm thirsty.", "Estou com sede."]
      ],
      dica: { t: "Fome e sede com to be", p: [
        "Fome e sede usam o verbo <b>to be</b>: <b>I'm hungry</b> (estou com fome), <b>I'm thirsty</b> (estou com sede). Nunca “I have hungry”. É igual à idade, lembra? <b>I'm thirty</b>.",
        "<b>Water</b>, <b>milk</b>, <b>bread</b> e <b>rice</b> não vão pro plural. Já <b>beans</b> está quase sempre no plural.",
        "Cuidado com <b>beans</b> (feijão, com “iii” longo) e <b>bins</b> (lixeiras, com “i” curto)."],
        ex: [["I'm hungry. Let's have lunch!", "Estou com fome. Vamos almoçar!"], ["I like rice and beans.", "Eu gosto de arroz e feijão."], ["I don't drink milk.", "Eu não bebo leite."]] },
      perguntas: [
        ["Estou com fome:", ["I'm hungry.", "I have hungry.", "I'm hunger."], 0, "Fome usa to be: I'm hungry."],
        ["Estou com sede:", ["I'm thirsty.", "I have thirsty.", "I'm thirst."], 0, "Sede também usa to be: I'm thirsty."],
        ["Feijão:", ["beans", "bins", "being"], 0, "Beans = feijão."],
        ["I ___ like milk. (não)", ["don't", "doesn't", "not"], 0, "Com I: don't."],
        ["She ___ tea. (gosta)", ["likes", "like", "liking"], 0, "She ganha -s: likes."]
      ] },

    { id: "s17", semana: 4, titulo: "No café e no restaurante", resumo: "Pedir, pagar e pedir pra levar",
      itens: [
        ["Can I have a coffee, please?", "Pode me ver um café, por favor?"],
        ["I'd like an orange juice, please.", "Eu gostaria de um suco de laranja, por favor."],
        ["menu", "cardápio"],
        ["a table for two", "uma mesa para dois"],
        ["For here or to go?", "Pra comer aqui ou pra levar?"],
        ["To go, please.", "Pra levar, por favor."],
        ["The check, please.", "A conta, por favor.", "Check é americano. No Reino Unido: the bill."],
        ["delicious", "delicioso"],
        ["small", "pequeno"],
        ["large", "grande (tamanho de bebida, porção)"],
        ["with ice", "com gelo"],
        ["without sugar", "sem açúcar"]
      ],
      dica: { t: "Pedindo com educação", p: [
        "<b>I'd like</b> = <b>I would like</b> = eu gostaria. É o jeito educado de pedir. <b>Can I have...?</b> também é muito natural.",
        "Termine com <b>please</b> e agradeça com <b>thank you</b> quando receber. Em inglês isso pesa bastante.",
        "No balcão, é comum perguntarem <b>For here or to go?</b> (pra comer aqui ou pra levar?). E na hora de pagar: <b>The check, please</b>."],
        ex: [["Can I have a small coffee without sugar, please?", "Pode me ver um café pequeno sem açúcar, por favor?"], ["I'd like a table for two, please.", "Eu gostaria de uma mesa para dois, por favor."], ["It was delicious. The check, please.", "Estava delicioso. A conta, por favor."]] },
      perguntas: [
        ["Pedir de forma educada:", ["I'd like a coffee, please.", "I want coffee now.", "Give me coffee."], 0, "I'd like + please é o jeito educado."],
        ["A conta, por favor:", ["The check, please.", "The count, please.", "The account, please."], 0, "Conta de restaurante = check (EUA) ou bill (Reino Unido)."],
        ["Pra levar:", ["to go", "to take", "for go"], 0, "Pra levar = to go."],
        ["Sem açúcar:", ["without sugar", "no with sugar", "less sugar"], 0, "Sem = without."],
        ["___ I have a tea, please?", ["Can", "Do", "Am"], 0, "Can I have...? = pode me ver...?"]
      ] },

    { id: "s18", semana: 4, titulo: "Minha casa", resumo: "Cômodos, móveis e o “tem” do inglês",
      itens: [
        ["home", "lar, casa (onde você mora)"],
        ["apartment", "apartamento"],
        ["bedroom", "quarto"],
        ["bathroom", "banheiro"],
        ["kitchen", "cozinha", "Não confunda com chicken (frango)."],
        ["living room", "sala"],
        ["bed", "cama"],
        ["table", "mesa"],
        ["chair", "cadeira"],
        ["door", "porta"],
        ["window", "janela"],
        ["There is a sofa in the living room.", "Tem um sofá na sala."],
        ["There are two chairs.", "Tem duas cadeiras."]
      ],
      dica: { t: "There is, there are: o nosso “tem”", p: [
        "Em português falamos “tem um sofá na sala”. Em inglês, esse “tem” é <b>there is</b> (uma coisa) ou <b>there are</b> (várias).",
        "<b>There is a bed</b> (tem uma cama). <b>There are two chairs</b> (tem duas cadeiras). Pra perguntar: <b>Is there a...?</b> <b>Are there...?</b>",
        "Quando é posse, aí sim usa have: <b>My apartment has one bedroom</b> (meu apartamento tem um quarto).",
        "E cuidado com a dupla <b>kitchen</b> (cozinha) e <b>chicken</b> (frango). Muita gente troca!"],
        ex: [["My apartment has one bedroom.", "Meu apartamento tem um quarto."], ["There is a table in the kitchen.", "Tem uma mesa na cozinha."], ["Is there a bathroom here?", "Tem banheiro aqui?"]] },
      perguntas: [
        ["___ a bed in the bedroom.", ["There is", "There are", "Have"], 0, "Uma coisa: there is."],
        ["___ two chairs in the kitchen.", ["There are", "There is", "Have"], 0, "Várias coisas: there are."],
        ["Cozinha:", ["kitchen", "chicken", "kitten"], 0, "Kitchen = cozinha. Chicken = frango. Kitten = gatinho."],
        ["Banheiro:", ["bathroom", "bedroom", "living room"], 0, "Bathroom = banheiro. Bedroom = quarto."],
        ["Is there a window? Yes, there ___.", ["is", "are", "it"], 0, "Resposta curta: Yes, there is."]
      ] },

    { id: "s19", semana: 4, titulo: "Cores e como as coisas são", resumo: "Adjetivo vem antes",
      itens: [
        ["new", "novo"],
        ["old", "velho, antigo"],
        ["hot", "quente"],
        ["cold", "frio"],
        ["happy", "feliz"],
        ["red", "vermelho"],
        ["blue", "azul"],
        ["green", "verde"],
        ["black", "preto"],
        ["white", "branco"],
        ["a big house", "uma casa grande"],
        ["a new car", "um carro novo"],
        ["The car is red.", "O carro é vermelho."]
      ],
      dica: { t: "O adjetivo vem antes", p: [
        "Em inglês, a característica vem <b>antes</b> da coisa: <b>a big house</b> (uma casa grande), <b>a red car</b> (um carro vermelho).",
        "E o adjetivo não muda: não tem plural nem feminino. <b>a red car</b>, <b>red cars</b>, <b>a new house</b>, <b>new houses</b>.",
        "Depois do to be, ele fica no fim, igual ao português: <b>The car is red.</b>"],
        ex: [["I have a new black car.", "Eu tenho um carro preto novo."], ["The coffee is hot.", "O café está quente."], ["Two white chairs.", "Duas cadeiras brancas."]] },
      perguntas: [
        ["Uma casa grande:", ["a big house", "a house big", "a bigs house"], 0, "Adjetivo antes da coisa: a big house."],
        ["Carros vermelhos:", ["red cars", "reds cars", "cars reds"], 0, "Adjetivo não tem plural: red cars."],
        ["Uma janela nova:", ["a new window", "a window new", "an new window"], 0, "A new window. An só antes de som de vogal."],
        ["The coffee is ___. (quente)", ["hot", "cold", "old"], 0, "Hot = quente. Cold = frio."],
        ["Azul:", ["blue", "black", "brown"], 0, "Blue = azul. Black = preto."]
      ] },

    { id: "s20", semana: 4, titulo: "Revisão do mês 1", resumo: "Tudo do mês, com mais peso no que você errou", tipo: "checkpoint", revisao: 16, perguntasRevisao: 8,
      itens: [],
      dica: { t: "Seu primeiro mês", p: [
        "Hoje não tem palavra nova. A prática mistura tudo do mês, com mais peso no que você errou.",
        "No final você vê quanto acertou de primeira e o que ainda vale reforçar. Errar aqui é bom: mostra o caminho do mês 2.",
        "No mês 2 entram: passado (o que você fez ontem), mais perguntas do dia a dia e, se quiser, a primeira gravação de 3 frases que você já treinou."],
        ex: [["I study English every day.", "Eu estudo inglês todo dia."], ["I don't understand. Can you repeat that, please?", "Não estou entendendo. Pode repetir, por favor?"], ["See you next month!", "Até o mês que vem!"]] },
      perguntas: [] }
  ]
};
