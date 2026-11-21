/* =====================================================================
   DATA · contenido alineado con "Speak Out A2" (Student's Book + Grammar/Vocabulary/Writing Bank)
   U5 = Past simple (irregulares, wh-, time phrases, life events)
   U6 = Present perfect, comparatives/superlatives, travel phrases, irregular participles
   U7 = Present continuous (future), going to / will / shall, indefinite pronouns
   ===================================================================== */
(function () {
  const D = {};

  /* ---------- Irregular verbs [infinitive, past, participle, español] ---------- */
  D.verbs = [
    ["be", "was/were", "been", "ser / estar"], ["become", "became", "become", "convertirse en"],
    ["begin", "began", "begun", "empezar"], ["break", "broke", "broken", "romper"],
    ["bring", "brought", "brought", "traer"], ["build", "built", "built", "construir"],
    ["buy", "bought", "bought", "comprar"], ["catch", "caught", "caught", "atrapar / tomar (bus)"],
    ["choose", "chose", "chosen", "elegir"], ["come", "came", "come", "venir"],
    ["do", "did", "done", "hacer"], ["draw", "drew", "drawn", "dibujar"],
    ["drink", "drank", "drunk", "beber"], ["drive", "drove", "driven", "conducir"],
    ["eat", "ate", "eaten", "comer"], ["fall", "fell", "fallen", "caer"],
    ["feel", "felt", "felt", "sentir"], ["find", "found", "found", "encontrar"],
    ["fly", "flew", "flown", "volar"], ["forget", "forgot", "forgotten", "olvidar"],
    ["get", "got", "got", "conseguir / obtener"], ["give", "gave", "given", "dar"],
    ["go", "went", "gone/been", "ir"], ["grow", "grew", "grown", "crecer"],
    ["have", "had", "had", "tener / haber"], ["hear", "heard", "heard", "oír"],
    ["keep", "kept", "kept", "guardar / mantener"], ["know", "knew", "known", "saber / conocer"],
    ["learn", "learnt/learned", "learnt/learned", "aprender"], ["leave", "left", "left", "irse / dejar"],
    ["lose", "lost", "lost", "perder"], ["make", "made", "made", "hacer / fabricar"],
    ["meet", "met", "met", "conocer / encontrarse"], ["pay", "paid", "paid", "pagar"],
    ["put", "put", "put", "poner"], ["read", "read", "read", "leer"],
    ["ride", "rode", "ridden", "montar (moto, caballo)"], ["run", "ran", "run", "correr"],
    ["say", "said", "said", "decir"], ["see", "saw", "seen", "ver"],
    ["sell", "sold", "sold", "vender"], ["send", "sent", "sent", "enviar"],
    ["sing", "sang", "sung", "cantar"], ["sit", "sat", "sat", "sentarse"],
    ["sleep", "slept", "slept", "dormir"], ["speak", "spoke", "spoken", "hablar"],
    ["spend", "spent", "spent", "gastar / pasar (tiempo)"], ["swim", "swam", "swum", "nadar"],
    ["take", "took", "taken", "tomar / llevar"], ["teach", "taught", "taught", "enseñar"],
    ["tell", "told", "told", "contar / decir"], ["think", "thought", "thought", "pensar"],
    ["understand", "understood", "understood", "entender"], ["wake", "woke", "woken", "despertar"],
    ["wear", "wore", "worn", "vestir / llevar puesto"], ["win", "won", "won", "ganar"],
    ["write", "wrote", "written", "escribir"]
  ];

  /* ---------- Life events (Unit 5, Vocabulary: life events) [en, past, es, example] ---------- */
  D.events = [
    ["be born", "was born", "nacer", "I was born in 2001 in Mendoza."],
    ["leave school", "left school", "terminar / dejar el colegio", "She left school when she was eighteen."],
    ["get a job", "got a job", "conseguir un trabajo", "He got a job in a restaurant."],
    ["leave a job", "left a job", "dejar un trabajo", "I left my job last year."],
    ["get married", "got married", "casarse", "They got married in 2018."],
    ["meet your best friend", "met my best friend", "conocer a tu mejor amigo/a", "I met my best friend at school."],
    ["meet your future husband/wife", "met my future husband/wife", "conocer a tu futuro esposo/a", "She met her future husband at a party."],
    ["learn to swim", "learnt to swim", "aprender a nadar", "I learnt to swim when I was six."],
    ["learn to drive", "learnt to drive", "aprender a manejar", "I learnt to drive when I was nineteen."],
    ["pass your exams", "passed my exams", "aprobar los exámenes", "He passed his exams and went to university."],
    ["pass your driving test", "passed my driving test", "aprobar el examen de conducir", "She passed her driving test at the first try."],
    ["become a doctor", "became a doctor", "convertirse en médico/a", "Paola became a doctor in 2015."],
    ["become a teacher", "became a teacher", "convertirse en docente", "My aunt became a teacher in 1998."],
    ["get to school", "got to school", "llegar al colegio", "I got to school late today."],
    ["have a party", "had a party", "hacer una fiesta", "We had a party for my 21st birthday."],
    ["go to university", "went to university", "ir a la universidad", "He went to university in Buenos Aires."],
    ["move to a new house", "moved to a new house", "mudarse de casa", "We moved to a new house in 2020."],
    ["have a baby", "had a baby", "tener un bebé", "My sister had a baby last summer."]
  ];

  /* ---------- Travel phrases (Unit 6, Vocabulary Bank: travel phrases) [en, es, example] ---------- */
  D.travel = [
    ["on the border between A and B", "en la frontera entre A y B", "The town is on the border between Wetland and Tinato."],
    ["on the north/south/east/west coast of", "en la costa norte/sur/este/oeste de", "Denville is on the south coast of Tinato."],
    ["in the north/south/east/west of", "en el norte/sur/este/oeste de", "Allentown is in the northwest of Wetland."],
    ["to the east of (a place)", "al este de (un lugar)", "The airport is to the east of Allentown."],
    ["on the other side of", "del otro lado de", "Enfield is on the other side of the sea."],
    ["on the way to / on my way to", "de camino a / camino a", "I saw Henri on my way to work."],
    ["from ... to ...", "de ... a ...", "It's 300 kilometres from New York to Boston."],
    ["a journey (from A to B)", "un viaje / trayecto (de A a B)", "The journey takes five hours by bus."],
    ["How was your journey?", "¿Cómo fue tu viaje?", "Come in! How was your journey?"],
    ["a trip (the whole visit)", "un viaje / una excursión (toda la visita)", "I went on a business trip to Uruguay."],
    ["a weekend trip / a day trip", "una escapada de fin de semana / de un día", "We're planning a weekend trip to the mountains."],
    ["travel (uncountable)", "viajar / los viajes (no contable)", "Travel can be difficult with young children."],
    ["the best route", "la mejor ruta", "What's the best route to the ocean?"],
    ["the quickest way", "el camino más rápido", "What's the quickest way to the station?"],
    ["the distance between", "la distancia entre", "What's the distance between your home and the airport?"],
    ["air travel / rail travel", "viajes en avión / en tren", "I don't enjoy rail travel."],
    ["a long journey by boat", "un largo viaje en barco", "Have you ever been on a long journey by boat?"],
    ["in the direction of", "en dirección a", "He rode his motorbike in the direction of Europe."]
  ];

  /* ---------- Exercise bank ---------- */
  const ex = [];
  const counters = {};
  function push(topic, unit, sec, type, o) {
    counters[topic] = (counters[topic] || 0) + 1;
    ex.push(Object.assign({ id: topic + "-" + counters[topic], topic, unit, sec, type }, o));
  }
  const mc = (t, u, s, q, opts, ans, why) => push(t, u, s, "mc", { q, opts, ans, why });
  const fill = (t, u, s, q, ans, why) => push(t, u, s, "fill", { q, ans: Array.isArray(ans) ? ans : [ans], why });
  const ord = (t, u, s, ans, why) => push(t, u, s, "ord", { q: "Ordená las palabras para formar la oración.", ans, why });
  const err = (t, u, s, sentence, bad, corrected, why) => push(t, u, s, "err", { q: sentence, bad, ans: corrected, why });

  /* ===== U5 · Past simple ===== */
  const P = "past", W = "wh", T = "time";
  mc(P, 5, "g", "Last year I ___ a new job.", ["get", "got", "getted", "have got"], "got", "'Get' es irregular: get → got.");
  mc(P, 5, "g", "She ___ to the party because she was ill.", ["didn't go", "didn't went", "not go", "wasn't go"], "didn't go", "Negativo en pasado: didn't + infinitivo (sin -ed ni forma pasada).");
  mc(P, 5, "g", "___ you enjoy the film yesterday?", ["Did", "Do", "Were", "Have"], "Did", "Preguntas en pasado simple: Did + sujeto + infinitivo.");
  mc(P, 5, "g", "They ___ a taxi to a small restaurant in the city centre.", ["taked", "took", "take", "taken"], "took", "take → took (pasado). 'Taken' es el participio.");
  mc(P, 5, "g", "My sister's son ___ his wedding last summer.", ["had", "has", "haved", "have"], "had", "have → had.");
  mc(P, 5, "g", "Mak-rye ___ a restaurant and worked from 4 a.m. to 10 p.m.", ["opened", "opens", "opend", "was open"], "opened", "Verbo regular: infinitivo + -ed.");
  mc(P, 5, "g", "He ___ that race, but later he started running regularly.", ["didn't enjoy", "didn't enjoyed", "not enjoyed", "doesn't enjoy"], "didn't enjoy", "didn't + infinitivo. El verbo principal NO lleva -ed.");
  mc(P, 5, "g", "I ___ all day and arrived early in the evening.", ["drove", "drived", "driven", "drive"], "drove", "drive → drove (pasado) → driven (participio).");
  fill(P, 5, "g", "Mak-rye ______ (cook) and cleaned for all the family.", ["cooked"], "Regular: cook + -ed = cooked.");
  fill(P, 5, "g", "He ______ (not / enjoy) that race.", ["didn't enjoy", "did not enjoy"], "Negativo: didn't + infinitivo.");
  fill(P, 5, "g", "Her husband ______ (go) to the supermarket and bought frozen desserts.", ["went"], "go → went.");
  fill(P, 5, "g", "Liam ______ (leave) the Los Angeles Times in 2019.", ["left"], "leave → left.");
  fill(P, 5, "g", "I ______ (learn) to drive when I was nineteen.", ["learnt", "learned"], "learn → learnt / learned (ambas válidas).");
  fill(P, 5, "g", "People ______ (say) goodbye to me and left.", ["said"], "say → said.");
  fill(P, 5, "g", "We ______ (stay) in a hotel last year.", ["stayed"], "stay → stayed (vocal + y: solo se agrega -ed).");
  fill(P, 5, "g", "She ______ (study) English every day last year.", ["studied"], "Consonante + y → ies/ied: study → studied.");
  fill(P, 5, "g", "My parents ______ (have) a restaurant in the centre of town.", ["had"], "have → had.");
  fill(P, 5, "g", "We ______ (not / have) a party last year.", ["didn't have", "did not have"], "didn't + have (infinitivo).");

  fill(W, 5, "g", "Why ______ the chef phone?", ["did"], "Wh- + did + sujeto + verbo en infinitivo.");
  fill(W, 5, "g", "What ______ the sister do?", ["did"], "Wh- + did + sujeto + infinitivo.");
  fill(W, 5, "g", "Where ______ you go on Friday night?", ["did"], "Wh- + did + sujeto + infinitivo.");
  fill(W, 5, "g", "When ______ you learn to drive?", ["did"], "When + did + sujeto + infinitivo.");
  mc(W, 5, "g", "Which question is correct?", ["Where did they went?", "Where they went?", "Where did they go?", "Where went they?"], "Where did they go?", "Después de did el verbo vuelve al infinitivo: Where did they go?");
  mc(W, 5, "g", "___ did Olivia decide to do in the end?", ["What", "Who", "When", "Why"], "What", "Preguntamos por una cosa/acción → What.");
  mc(W, 5, "g", "___ did Kingsley change jobs? — In 2019.", ["When", "Where", "Who", "How"], "When", "La respuesta es un momento → When.");
  ord(W, 5, "g", "Why did the chef phone?", "Wh- + did + sujeto + verbo: Why did the chef phone?");
  ord(W, 5, "g", "When did you learn to drive?", "Wh- + did + sujeto + verbo.");
  ord(W, 5, "g", "What did you do last weekend?", "What + did + sujeto + do.");
  ord(W, 5, "g", "Where did they go on holiday?", "Where + did + they + go (infinitivo).");
  ord(W, 5, "g", "How did you feel when he arrived?", "How + did + you + feel.");
  ord(P, 5, "g", "He didn't enjoy that race.", "Sujeto + didn't + infinitivo + objeto.");
  ord(P, 5, "g", "I got married in 2018.", "Sujeto + verbo en pasado + complemento de tiempo.");
  ord(P, 5, "g", "Did she pass her driving test?", "Did + sujeto + infinitivo + objeto.");

  mc(T, 5, "g", "She worked hard ___ her life.", ["all", "for", "from", "before"], "all", "'all my life/day/week' = durante toda la vida.");
  mc(T, 5, "g", "___ morning to night, she cooked and cleaned.", ["From", "For", "All", "Before"], "From", "'from ... to ...' indica un periodo: from morning to night.");
  mc(T, 5, "g", "I lived in Spain ___ three years.", ["for", "from", "all", "later"], "for", "'for' + duración: for three years.");
  mc(T, 5, "g", "I posted the photo. Two days ___ they phoned me.", ["later", "before", "for", "all"], "later", "'two days later' = dos días después.");
  mc(T, 5, "g", "___ I was nineteen, I phoned her.", ["When", "All", "For", "Later"], "When", "'When' + sujeto + verbo para decir cuándo.");
  mc(T, 5, "g", "I studied English ___ 2015 to 2020.", ["from", "for", "all", "before"], "from", "'from 2015 to 2020'.");
  mc(T, 5, "g", "___ breakfast, I read the news. (antes de desayunar)", ["Before", "Later", "From", "All"], "Before", "'before breakfast' = antes del desayuno.");
  fill(T, 5, "g", "He played football ______ he was twenty. (antes de los veinte)", ["before"], "'before' + edad / evento.");
  fill(T, 5, "g", "We were in Spain ______ three weeks. (durante 3 semanas)", ["for"], "'for' + cantidad de tiempo.");

  err(P, 5, "g", "I didn't went to school yesterday.", "went", "I didn't go to school yesterday.", "Después de didn't va el infinitivo: didn't go.");
  err(P, 5, "g", "Did she called you last night?", "called", "Did she call you last night?", "Después de did va el infinitivo: Did she call?");
  err(P, 5, "g", "When did you bought that car?", "bought", "When did you buy that car?", "Después de did va el infinitivo: buy.");
  err(P, 5, "g", "He teached me to swim.", "teached", "He taught me to swim.", "teach es irregular: teach → taught.");
  err(P, 5, "g", "We maked a cake yesterday.", "maked", "We made a cake yesterday.", "make → made.");
  err(T, 5, "g", "She worked for 4 a.m. to 10 p.m.", "for", "She worked from 4 a.m. to 10 p.m.", "Para 'de ... a ...' usamos from ... to ...");

  /* ===== U6 · Present perfect + contrast with past simple ===== */
  const PP = "pp", CT = "contrast";
  mc(PP, 6, "g", "___ you ever tried Thai food?", ["Have", "Did", "Has", "Do"], "Have", "Experiencias de vida: Have + you + ever + participio.");
  mc(PP, 6, "g", "She ___ seen snow before.", ["hasn't", "haven't", "didn't", "isn't"], "hasn't", "She → has / hasn't + participio.");
  mc(PP, 6, "g", "I've never ___ on a roller coaster.", ["been", "went", "gone", "be"], "been", "'been' = estuve/fui y volví (experiencia).");
  mc(PP, 6, "g", "My brother ___ to Spain. He's in Spain now.", ["has gone", "has been", "went", "was"], "has gone", "'has gone to' = se fue y sigue allá. 'has been to' = fue y volvió.");
  mc(PP, 6, "g", "I ___ to Spain three times. I love it!", ["have been", "have gone", "was", "am going"], "have been", "'have been to' para experiencias que ya terminaron.");
  mc(PP, 6, "g", "We ___ stayed in this hotel three times.", ["have", "has", "did", "are"], "have", "We → have + participio (stayed).");
  mc(PP, 6, "g", "Elena ___ a bus. She's a professional driver.", ["has driven", "have driven", "driven", "has drove"], "has driven", "has + participio: drive → driven.");
  mc(PP, 6, "g", "He hasn't ___ a live match, only on TV.", ["seen", "saw", "see", "sees"], "seen", "see → saw → seen. Con hasn't va el participio.");
  fill(PP, 6, "g", "I ______ (never / see) a giraffe.", ["have never seen"], "have + never + participio. see → seen.");
  fill(PP, 6, "g", "______ you ______ (ever / try) to make a cake?", ["have ever tried", "have you ever tried"], "Have you ever + participio.");
  fill(PP, 6, "g", "Chris ______ (never / watch) a football match.", ["has never watched"], "has never + participio regular (watched).");
  fill(PP, 6, "g", "Jamil ______ (work) in India.", ["has worked"], "has + participio. Los regulares: igual que el pasado.");
  fill(PP, 6, "g", "They ______ (never / be) to Canada.", ["have never been"], "have never been to...");
  fill(PP, 6, "g", "Alicia ______ (not / eat) chocolate.", ["hasn't eaten", "has not eaten"], "hasn't + participio: eat → eaten.");
  fill(PP, 6, "g", "How many videos ______ (she / make)?", ["has she made"], "Wh- + has + sujeto + participio: make → made.");
  fill(PP, 6, "g", "______ (you / ever / swim) in a river?", ["have you ever swum"], "swim → swam → swum.");
  err(PP, 6, "g", "I've saw this film before.", "saw", "I've seen this film before.", "Con have necesitás participio: seen (no saw).");
  err(PP, 6, "g", "Have you ever eat sushi?", "eat", "Have you ever eaten sushi?", "Have you ever + participio: eaten.");
  err(PP, 6, "g", "I've never swam in the ocean.", "swam", "I've never swum in the ocean.", "swim → swam (pasado) → swum (participio).");
  err(PP, 6, "g", "My brother have been to Peru twice.", "have", "My brother has been to Peru twice.", "He/She/It → has.");
  ord(PP, 6, "g", "Have you ever been to Peru?", "Have + you + ever + been + to...");
  ord(PP, 6, "g", "I have never eaten sushi.", "Sujeto + have + never + participio.");
  ord(PP, 6, "g", "She hasn't seen a live match.", "Sujeto + hasn't + participio + objeto.");

  mc(CT, 6, "g", "I ___ to Malaysia in 2020.", ["went", "have been", "have gone", "go"], "went", "Si decimos CUÁNDO (2020) usamos pasado simple.");
  mc(CT, 6, "g", "A: Have you ever been to China? B: Yes, I have. A: When ___ you go?", ["did", "have", "do", "are"], "did", "Pedimos detalles de un momento concreto → pasado simple (did).");
  mc(CT, 6, "g", "She ___ a bungee jump last year.", ["did", "has done", "does", "have done"], "did", "'last year' es un tiempo específico → pasado simple.");
  mc(CT, 6, "g", "I ___ a lot of countries, but I've never been to Asia.", ["have visited", "visited", "did visit", "was visiting"], "have visited", "Experiencia de vida sin decir cuándo → present perfect.");
  mc(CT, 6, "g", "Dan ___ in Auckland in 2010 for a month.", ["stayed", "has stayed", "have stayed", "stays"], "stayed", "2010 = tiempo específico → pasado simple.");
  mc(CT, 6, "g", "I ___ this programme before. I loved it.", ["have seen", "saw", "was seeing", "did see"], "have seen", "'before' = en mi vida hasta ahora, sin decir cuándo → present perfect.");
  mc(CT, 6, "g", "A: Have you ever eaten Thai food? B: Yes, I ___ it last year.", ["ate", "have eaten", "eat", "had eaten"], "ate", "Aparece 'last year' → pasado simple.");
  mc(CT, 6, "g", "Which sentence is correct?", ["I've been to Italy in 2019.", "I went to Italy in 2019.", "I have went to Italy.", "I did go to Italy twice."], "I went to Italy in 2019.", "Con 2019 usamos pasado simple. No se mezcla present perfect con fecha concreta.");
  fill(CT, 6, "g", "I ______ (go) to Italy in 2019.", ["went"], "Fecha concreta → pasado simple.");
  fill(CT, 6, "g", "I ______ (be) to Italy twice.", ["have been"], "No hay fecha → present perfect.");
  fill(CT, 6, "g", "When ______ (you / meet) her?", ["did you meet"], "When pide un momento → pasado simple.");
  fill(CT, 6, "g", "He ______ (never / ride) a horse.", ["has never ridden"], "ride → rode → ridden.");
  err(CT, 6, "g", "She has visited Rome in 2019.", "has", "She visited Rome in 2019.", "Con '2019' se usa pasado simple: visited.");
  err(CT, 6, "g", "Did you ever try Thai food? (experiencia de vida)", "Did", "Have you ever tried Thai food?", "Para experiencias de vida: Have you ever + participio.");

  /* ===== U6 · Comparatives & superlatives ===== */
  const CS = "comp";
  mc(CS, 6, "g", "Rachel is ___ than her sister.", ["younger", "more young", "youngest", "the younger"], "younger", "Adjetivo corto: + -er + than.");
  mc(CS, 6, "g", "My bedroom is the ___ room in the house.", ["coldest", "colder", "more cold", "most cold"], "coldest", "Superlativo de adjetivo corto: the + -est.");
  mc(CS, 6, "g", "This is ___ book I've ever read.", ["the most interesting", "more interesting", "the interestingest", "most interesting"], "the most interesting", "Adjetivo largo: the most + adjetivo.");
  mc(CS, 6, "g", "Patagonia was ___ than I expected.", ["windier", "more windy", "windy", "the windiest"], "windier", "Consonante + y → -ier: windy → windier.");
  mc(CS, 6, "g", "Today is ___ than yesterday. (hot)", ["hotter", "hoter", "more hot", "hottest"], "hotter", "CVC: se duplica la consonante: hot → hotter.");
  mc(CS, 6, "g", "She's the ___ student in the class.", ["best", "goodest", "most good", "better"], "best", "good → better → best (irregular).");
  mc(CS, 6, "g", "Paris is ___ from Berlin than Warsaw.", ["further", "far", "more far", "farest"], "further", "far → further/farther → furthest/farthest.");
  mc(CS, 6, "g", "English grammar is ___ than German grammar.", ["easier", "more easy", "easy", "the easiest"], "easier", "easy → easier (y → ier).");
  mc(CS, 6, "g", "It was the ___ day of my life.", ["worst", "baddest", "most bad", "worse"], "worst", "bad → worse → worst.");
  mc(CS, 6, "g", "Which is ___, the Nile or the Amazon?", ["longer", "more long", "the longest", "long"], "longer", "Entre DOS cosas → comparativo.");
  mc(CS, 6, "g", "Your phone is the same colour ___ mine.", ["as", "than", "like", "to"], "as", "the same ... as.");
  mc(CS, 6, "g", "His answer is similar ___ mine.", ["to", "as", "of", "than"], "to", "similar to.");
  fill(CS, 6, "g", "Your computer is older ______ mine.", ["than"], "Comparativo + than.");
  fill(CS, 6, "g", "Mount Everest is the ______ (high) mountain in the world.", ["highest"], "the + -est.");
  fill(CS, 6, "g", "This hotel is ______ (expensive) than that one.", ["more expensive"], "Adjetivo largo: more + adjetivo + than.");
  fill(CS, 6, "g", "Jack was the ______ (young) person to go around the world on a motorbike.", ["youngest"], "Superlativo: the youngest.");
  fill(CS, 6, "g", "The north is ______ (dry) than the south.", ["drier"], "dry → drier.");
  fill(CS, 6, "g", "The most exciting moment was the ______ (good) one of the trip.", ["best"], "good → best.");
  fill(CS, 6, "g", "My answer is different ______ your answer.", ["from"], "different from.");
  err(CS, 6, "g", "English grammar is more easy than German grammar.", "easy", "English grammar is easier than German grammar.", "easy → easier (no 'more easy').");
  err(CS, 6, "g", "Your computer is older that mine.", "that", "Your computer is older than mine.", "Comparativo + than.");
  err(CS, 6, "g", "It was the baddest day of my life.", "baddest", "It was the worst day of my life.", "bad → worse → worst.");
  err(CS, 6, "g", "My birthday was the most wettest day of the year.", "most", "My birthday was the wettest day of the year.", "wet es corto: the wettest (sin 'most').");
  err(CS, 6, "g", "Your phone is similar of Ricki's.", "of", "Your phone is similar to Ricki's.", "similar to.");
  err(CS, 6, "g", "This meal is the same like yesterday's meal.", "like", "This meal is the same as yesterday's meal.", "the same as.");
  ord(CS, 6, "g", "She is taller than her brother.", "Sujeto + be + comparativo + than + ...");
  ord(CS, 6, "g", "This is the most exciting trip of my life.", "the most + adjetivo largo.");
  ord(CS, 6, "g", "Who is the youngest student in the class?", "Who + is + the + superlativo + noun.");

  /* ===== U6 · Travel vocabulary ===== */
  const TV = "travel";
  mc(TV, 6, "v", "Branville is ___ the border between Wetland and Tinato.", ["on", "in", "at", "to"], "on", "on the border between A and B.");
  mc(TV, 6, "v", "Denville is on the south coast ___ Tinato.", ["of", "from", "to", "in"], "of", "on the south coast of + país.");
  mc(TV, 6, "v", "I saw Henri ___ my way to work.", ["on", "in", "at", "by"], "on", "on my way to = camino a.");
  mc(TV, 6, "v", "I'm so tired. That was a long ___!", ["journey", "travel", "route", "borders"], "journey", "'journey' = ir de un lugar a otro. 'travel' no es contable.");
  mc(TV, 6, "v", "We're planning a weekend ___ to the mountains.", ["trip", "travel", "journey", "way"], "trip", "'trip' = toda la visita (ida, estadía y vuelta).");
  mc(TV, 6, "v", "___ can be difficult with young children.", ["Travel", "A travel", "A journey", "Trips"], "Travel", "Travel es incontable: no se dice 'a travel'.");
  mc(TV, 6, "v", "What's the quickest ___ to the station?", ["way", "trip", "travel", "border"], "way", "the quickest way / route = camino.");
  mc(TV, 6, "v", "We went on a business ___ to Uruguay.", ["trip", "travel", "journey", "route"], "trip", "go on a business trip.");
  mc(TV, 6, "v", "The airport is ___ the east of Allentown.", ["to", "in", "at", "from"], "to", "to the east of + lugar (fuera del lugar).");
  mc(TV, 6, "v", "What's the ___ between your home and the airport?", ["distance", "route", "journey", "trip"], "distance", "distance between A and B.");
  mc(TV, 6, "v", "It's 300 kilometres ___ New York ___ Boston.", ["from / to", "of / in", "on / at", "to / from"], "from / to", "from ... to ...");
  mc(TV, 6, "v", "We went on a ___ to Amsterdam. (NOT 'a travel')", ["trip", "travel", "borders", "way"], "trip", "Travel es incontable; usamos trip.");
  fill(TV, 6, "v", "How was your ______? (el viaje hasta aquí)", ["journey"], "journey = trayecto de un lugar a otro.");
  fill(TV, 6, "v", "Enfield is on the other ______ of the sea.", ["side"], "on the other side of.");

  /* ===== U5 · Life events vocabulary ===== */
  const LE = "events";
  fill(LE, 5, "v", "She ______ (get) married in 2015.", ["got"], "get married → got married.");
  fill(LE, 5, "v", "He ______ (pass) his driving test last week.", ["passed"], "pass your driving test.");
  fill(LE, 5, "v", "I ______ (become) a teacher in 2010.", ["became"], "become → became.");
  fill(LE, 5, "v", "We ______ (meet) in 2012 at university.", ["met"], "meet → met.");
  fill(LE, 5, "v", "He ______ (leave) school when he was eighteen.", ["left"], "leave school → left school.");
  fill(LE, 5, "v", "She ______ (learn) to swim as a child.", ["learnt", "learned"], "learn to swim.");
  mc(LE, 5, "v", "Which collocation is correct?", ["get married", "make married", "do a job", "become your exams"], "get married", "get married / get a job / pass your exams / become a doctor.");
  mc(LE, 5, "v", "She ___ her exams and went to university.", ["passed", "became", "learnt", "met"], "passed", "pass your exams = aprobar los exámenes.");
  mc(LE, 5, "v", "He ___ a doctor in 2015 after seven years of study.", ["became", "got", "left", "learnt"], "became", "become a doctor.");
  mc(LE, 5, "v", "I ___ my best friend at school when I was six.", ["met", "got", "passed", "left"], "met", "meet your best friend → met.");

  /* ===== U7 · Present continuous (future) + other future forms ===== */
  const FU = "future";
  mc(FU, 7, "g", "A: Do you have any plans for tomorrow? B: Yes, Ivan and I ___ tennis.", ["are playing", "play", "'ll playing", "plays"], "are playing", "Arreglo ya acordado → present continuous.");
  mc(FU, 7, "g", "A: Oh, I feel ill. B: I'm sorry. ___ the meeting?", ["Shall I cancel", "Am I cancelling", "Do I cancel", "Will I cancelled"], "Shall I cancel", "Shall I...? para ofrecer algo.");
  mc(FU, 7, "g", "Look at those black clouds! It ___ rain.", ["is going to", "will to", "is going", "goes to"], "is going to", "Predicción por evidencia → going to.");
  mc(FU, 7, "g", "The phone's ringing. I ___ it!", ["'ll answer", "'m going to answer", "answer", "am answering"], "'ll answer", "Decisión en el momento / ofrecimiento → will ('ll).");
  mc(FU, 7, "g", "A: What are you having for dessert? B: I can't decide... OK, I ___ the ice cream.", ["'ll have", "'m having", "have", "'m going have"], "'ll have", "Decisión tomada al hablar → 'll.");
  mc(FU, 7, "g", "___ we have a rest? I'm tired.", ["Shall", "Will", "Are", "Do"], "Shall", "Shall we ...? = sugerencia.");
  mc(FU, 7, "g", "Why are you buying flour? — I ___ make a cake.", ["'m going to", "'ll", "shall", "make"], "'m going to", "Plan o intención previa → going to.");
  mc(FU, 7, "g", "I'm going on holiday to the UK ___.", ["in a month", "a month later", "a month ago", "last month"], "in a month", "'in + periodo' para el futuro: in a month.");
  mc(FU, 7, "g", "What ___ you ___ this weekend? (arreglo)", ["are / doing", "do / do", "will / doing", "are / do"], "are / doing", "Present continuous: are + you + doing.");
  mc(FU, 7, "g", "Paola's birthday is on Saturday. What ___ her?", ["are you getting", "do you get", "you get", "will you getting"], "are you getting", "Plan concreto → present continuous.");
  mc(FU, 7, "g", "We're not ___ bowling this Saturday.", ["going", "go", "went", "to go"], "going", "Present continuous con 'go': we're going.");
  fill(FU, 7, "g", "I ______ (meet) my manager tomorrow at three.", ["am meeting", "'m meeting"], "Arreglo con hora → present continuous.");
  fill(FU, 7, "g", "Eduardo ______ (try) to speak to the engineer later.", ["is going to try"], "Intención → is going to + infinitivo.");
  fill(FU, 7, "g", "Just a minute. I ______ (help) you.", ["will help", "'ll help"], "Ofrecimiento espontáneo → 'll.");
  fill(FU, 7, "g", "______ I carry that bag for you?", ["shall"], "Shall I ...? ofrece ayuda.");
  fill(FU, 7, "g", "We ______ (not / go) bowling this Saturday. (ya lo planificamos)", ["are not going", "aren't going"], "Present continuous negativo: aren't going.");
  fill(FU, 7, "g", "What ______ (you / do) after the exam? (plan)", ["are you doing", "are you going to do"], "Plan: present continuous o going to.");
  err(FU, 7, "g", "Do you need some money? I lend you some.", "lend", "Do you need some money? I'll lend you some.", "Ofrecimiento espontáneo: I'll + infinitivo.");
  err(FU, 7, "g", "Thank you for the invitation. What will I bring?", "will", "Thank you for the invitation. What shall I bring?", "Para pedir sugerencia/ofrecer: Shall I...?");
  err(FU, 7, "g", "We landing in five minutes.", "landing", "We're landing in five minutes.", "Falta 'be': We're landing (present continuous).");
  err(FU, 7, "g", "I'm seeing Ali in a month time.", "month", "I'm seeing Ali in a month's time.", "in a month's time (con 's).");
  err(FU, 7, "g", "When they're going to sign the contract?", "they're", "When are they going to sign the contract?", "En preguntas el verbo be va antes del sujeto: When are they going to...?");
  ord(FU, 7, "g", "We're leaving for the airport at midday.", "Present continuous + hora = arreglo.");
  ord(FU, 7, "g", "What are you going to do tomorrow?", "What + are + you + going to + infinitivo.");
  ord(FU, 7, "g", "I'll help you carry that.", "'ll + infinitivo (ofrecimiento).");
  ord(FU, 7, "g", "Shall we go to the cinema?", "Shall we + infinitivo = sugerencia.");
  ord(FU, 7, "g", "She is meeting her parents on Sunday.", "Sujeto + is + verbo-ing + tiempo futuro.");

  /* ===== U7 · Indefinite pronouns ===== */
  const IP = "pronouns";
  mc(IP, 7, "v", "I don't know ___ about the history of this place.", ["anything", "nothing", "something", "everything"], "anything", "Con verbo negativo usamos any-: don't know anything.");
  mc(IP, 7, "v", "___ is wearing really bright colours this winter.", ["Everyone", "Anyone", "No one", "Someone"], "Everyone", "everyone = todas las personas.");
  mc(IP, 7, "v", "We're looking for ___ to look after our cat while we are away.", ["someone", "anyone", "nobody", "everyone"], "someone", "someone = una persona (no importa quién), oración afirmativa.");
  mc(IP, 7, "v", "I pushed the button, but ___ happened.", ["nothing", "anything", "something", "everything"], "nothing", "Verbo afirmativo + no- = sentido negativo: nothing happened.");
  mc(IP, 7, "v", "Has ___ seen my keys?", ["anyone", "no one", "everything", "nowhere"], "anyone", "En preguntas usamos any-.");
  mc(IP, 7, "v", "A: Where have you been? B: ___.", ["Nowhere", "Anywhere", "Somewhere", "Everywhere"], "Nowhere", "Respuesta corta negativa: Nowhere.");
  mc(IP, 7, "v", "I've looked ___ for my glasses, but I can't find them.", ["everywhere", "nowhere", "anywhere", "somewhere"], "everywhere", "everywhere = en todos los lugares.");
  mc(IP, 7, "v", "Would you like ___ to drink?", ["something", "anything", "nothing", "everything"], "something", "En ofrecimientos usamos some-.");
  mc(IP, 7, "v", "Is there ___ good on TV tonight?", ["anything", "nothing", "something", "everything"], "anything", "Pregunta general → any-.");
  mc(IP, 7, "v", "The shop is ___ on the other side of the city.", ["somewhere", "anywhere", "nowhere", "everything"], "somewhere", "somewhere = en algún lugar (no sabemos exactamente).");
  mc(IP, 7, "v", "Everybody ___ chocolate.", ["likes", "like", "liking", "to like"], "likes", "every- + verbo en 3ª persona singular.");
  mc(IP, 7, "v", "I didn't see ___ at the party.", ["anybody", "nobody", "somebody", "everybody"], "anybody", "Con didn't usamos any-. NO: didn't see nobody.");
  fill(IP, 7, "v", "Did ______ call while I was out?", ["anyone", "anybody"], "Pregunta → any-.");
  fill(IP, 7, "v", "Yes, ______ called, but they didn't leave their name.", ["someone", "somebody"], "some- en afirmativa.");
  fill(IP, 7, "v", "I can't find the remote ______.", ["anywhere"], "Negativo → anywhere.");
  fill(IP, 7, "v", "______ knows the answer. (nadie)", ["no one", "nobody"], "no one / nobody + verbo afirmativo.");
  fill(IP, 7, "v", "We've got ______ to stay tonight. (ningún lugar)", ["nowhere"], "nowhere to stay.");
  fill(IP, 7, "v", "There's ______ to eat in the house. (nada)", ["nothing"], "nothing to eat.");
  fill(IP, 7, "v", "What did Katie do on Saturday? — ______.", ["nothing"], "Respuesta corta: Nothing.");
  fill(IP, 7, "v", "Is ______ all right? (todo)", ["everything"], "everything + verbo singular.");
  err(IP, 7, "v", "Everyone are happy today.", "are", "Everyone is happy today.", "everyone + verbo singular (is).");
  err(IP, 7, "v", "I didn't see nobody at the party.", "nobody", "I didn't see anybody at the party.", "No usamos doble negación: didn't + anybody.");
  err(IP, 7, "v", "There isn't nothing in the fridge.", "nothing", "There isn't anything in the fridge.", "isn't + anything (no doble negación).");
  err(IP, 7, "v", "I've got anywhere to stay tonight. (no tengo dónde quedarme)", "anywhere", "I've got nowhere to stay tonight.", "Con verbo afirmativo y sentido negativo: nowhere.");
  ord(IP, 7, "v", "Is there anything good on TV?", "Is there + anything + adjetivo.");
  ord(IP, 7, "v", "I didn't know anyone at the party.", "didn't + know + anyone.");
  ord(IP, 7, "v", "Nobody knows the answer.", "Nobody + verbo afirmativo.");

  D.ex = ex;

  /* ---------- Oral questions [unit, question, model answer, grammar target] ---------- */
  D.oral = [
    [5, "What did you do last weekend?", "Last weekend I stayed at home on Saturday. I cleaned my room and watched a film. On Sunday I visited my grandparents and we had lunch together. It was a nice weekend.", "past"],
    [5, "When did you last go on holiday? Where did you go?", "I went on holiday last January. I travelled to the beach with my family. We stayed in a small hotel for a week. I swam every day and I took a lot of photos.", "past"],
    [5, "Tell me about your last birthday.", "My last birthday was in March. I had a small party at home with my friends. My mum made a cake and we played games. I got some nice presents. I was very happy.", "past"],
    [5, "When did you learn to drive (or to swim)?", "I learnt to swim when I was six years old. My father taught me at a club. At first I was afraid, but after a few weeks I swam very well.", "past"],
    [5, "What did you do yesterday morning?", "Yesterday morning I got up at seven. I had breakfast and then I went to work. I started at eight and I finished at one o'clock.", "past"],
    [5, "Where were you born and where did you go to school?", "I was born in Mendoza. I went to a primary school near my house, and then I went to a high school in the city centre. I finished high school in 2019.", "past"],
    [5, "Tell me about an important event in your life.", "An important event in my life was when I finished school. I had a big party with my family and friends. We ate, danced and took photos. I felt very happy and a little sad.", "past"],
    [5, "What did you eat for dinner last night?", "Last night I ate pasta with chicken and a salad. I didn't eat dessert, but I drank a glass of juice. After dinner I washed the dishes.", "past"],
    [5, "How did you feel on your first day at school or work?", "On my first day at work I felt nervous. I didn't know anyone. But the people were very friendly and they helped me. At the end of the day I was happy.", "past"],
    [5, "Did you have a party last year? What did you celebrate?", "Yes, I did. I had a party for my birthday. I invited ten friends. We ate pizza and listened to music. We had a lot of fun.", "past"],
    [6, "Have you ever been to another country? Where?", "Yes, I have. I've been to Chile twice. I went there in 2022 and last year. I visited Santiago and the beach. I haven't been to Brazil, but I'd like to go.", "perfect"],
    [6, "What is the most exciting thing you have ever done?", "The most exciting thing I've ever done is a parachute jump. I did it last summer. I was nervous, but it was amazing. It was the best day of my life.", "perfect"],
    [6, "Have you ever met a famous person?", "No, I haven't. I've never met a famous person, but I've seen a singer in a restaurant. I'd like to meet my favourite footballer.", "perfect"],
    [6, "Have you ever tried Japanese or Thai food?", "Yes, I've tried sushi. I tried it for the first time last year. It was interesting, but I prefer pizza. I've never eaten Thai food.", "perfect"],
    [6, "Compare Mendoza with another city you know.", "Mendoza is smaller than Buenos Aires and it's quieter. Buenos Aires is bigger and busier. In my opinion, Mendoza is more beautiful because it has mountains.", "comp"],
    [6, "What is the best place you have ever visited?", "The best place I've ever visited is Bariloche. It's the most beautiful place I know. The lake is amazing and the people are friendly. It was colder than Mendoza.", "perfect"],
    [6, "Have you ever travelled by plane or by boat?", "I've travelled by plane three times, but I've never travelled by boat. The journey by plane was short. I'd like to go on a long trip by boat.", "perfect"],
    [6, "What's the quickest way to get from your home to the city centre?", "The quickest way is by bus. It's on the way to my work. The journey takes about twenty minutes. By car it's faster, but I don't have a car.", "comp"],
    [6, "Tell me about a trip you have taken. How was the journey?", "I went on a trip to the mountains last winter. The journey was long, five hours by bus, but the views were beautiful. It was the best trip I've ever taken.", "perfect"],
    [6, "What is the most difficult thing about learning English for you?", "For me, the most difficult thing is speaking. I'm more nervous when I speak than when I write. But I've practised a lot and now I'm better.", "comp"],
    [7, "What are you doing this weekend?", "This weekend I'm meeting my friends on Saturday. We're going to the cinema. On Sunday I'm visiting my grandmother and we're having lunch together.", "future"],
    [7, "What are you going to do after the exam?", "After the exam I'm going to relax. I'm going to sleep late and then I'm going to go out with my friends. I'm also going to continue studying English.", "future"],
    [7, "Where are you going to go on your next holiday?", "On my next holiday I'm going to travel to the south of Argentina. I'm going to visit Bariloche with my family. We're going to stay in a cabin and walk in the mountains.", "future"],
    [7, "Are you meeting anyone tomorrow?", "Yes, I am. I'm meeting my cousin at four o'clock. We're having coffee in the centre. Nobody else is coming, just the two of us.", "future"],
    [7, "What are your plans for next year?", "Next year I'm going to finish my English course. I'm going to look for a better job. I think I'll travel somewhere, but I haven't decided where.", "future"],
    [7, "Is there anywhere you want to visit? Why?", "Yes, there is. I want to visit Japan because I like the food and the culture. Nowhere is more interesting for me. I'm going to save money for the trip.", "future"],
    [7, "Your friend is ill. Offer to help.", "Oh no! Shall I bring you something to eat? I'll go to the pharmacy and buy some medicine. Is there anything else I can do for you?", "future"],
    [7, "What are you going to do this summer?", "This summer I'm going to work in the morning and go to the pool in the afternoon. In January I'm going to travel to the coast for two weeks.", "future"],
    [7, "Did you go anywhere interesting last weekend?", "No, I didn't go anywhere. I stayed at home and I didn't see anyone. Nothing special happened. Next weekend I'm going to go somewhere nice.", "future"],
    [7, "Is anyone in your family travelling or getting married soon?", "Yes, my sister is getting married next year. Everyone in my family is very excited. They're going to have the party at a farm near the mountains.", "future"]
  ].map((o, i) => ({ id: "o:" + (i + 1), unit: o[0], q: o[1], model: o[2], target: o[3] }));

  D.fillers = [
    ["Let me think…", "Necesito pensar"], ["That's a good question.", "Buena pregunta"],
    ["Well, …", "Bueno…"], ["I think…", "Creo que…"], ["In my opinion, …", "En mi opinión…"],
    ["Actually, …", "En realidad…"], ["To be honest, …", "Para ser sincero…"],
    ["You know, …", "Sabés, …"], ["For example, …", "Por ejemplo…"],
    ["I'm not sure, but…", "No estoy seguro, pero…"], ["What I mean is…", "Lo que quiero decir es…"],
    ["Sorry, could you repeat that, please?", "¿Podés repetir, por favor?"],
    ["How do you say … in English?", "¿Cómo se dice … en inglés?"],
    ["Can you speak more slowly, please?", "¿Podés hablar más despacio?"]
  ];
  D.structure = [
    ["Start", "Answer the question directly: “Yes, I have.” / “Last weekend I…”"],
    ["Develop", "Add 2-3 details with linkers: first, then, because, but."],
    ["Close", "Finish with an opinion: “It was great.” / “I'm very excited.”"]
  ];

  /* ---------- Pronunciation ---------- */
  D.pron = {
    ed: [["/t/", ["worked", "cooked", "watched", "washed", "stopped", "talked"]],
         ["/d/", ["changed", "played", "lived", "studied", "opened", "stayed"]],
         ["/ɪd/", ["wanted", "visited", "decided", "started", "needed", "invited"]]],
    pp: [["/iː/", ["been", "seen", "eaten"]],
         ["/e/", ["met", "slept", "said", "left", "spent", "read"]],
         ["/ɔː/", ["bought", "caught", "taught", "thought", "brought"]],
         ["/ʌ/", ["done", "won", "run", "come", "swum", "drunk"]],
         ["/ɪ/", ["given", "written", "driven", "ridden"]],
         ["/əʊ/", ["flown", "known", "grown", "broken", "spoken", "chosen"]]],
    sentences: [
      "Why did the chef phone?", "I've never been on a roller coaster.", "Have you ever met a famous person?",
      "The most exciting moment was in November.", "She's taller than her sister.", "We're leaving for the airport at midday.",
      "I'm going to travel to the south next year.", "Shall I carry that bag for you?", "I didn't see anyone at the party.",
      "I learnt to drive when I was nineteen."
    ]
  };

  /* ---------- Linking words (Writing) ---------- */
  D.linkers = [
    ["Orden / secuencia", ["First,", "At first,", "Then", "Next,", "After that,", "Later,", "Finally,", "In the end,"]],
    ["Sorpresa / tiempo", ["Suddenly,", "When", "While", "Before", "After", "One day,"]],
    ["Contraste", ["but", "However,", "Although"]],
    ["Causa y resultado", ["because", "so"]],
    ["Sumar ideas", ["and", "also", "too", "For example,"]]
  ];
  D.linkerFlat = D.linkers.flatMap(g => g[1]).map(s => s.replace(/,$/, "").toLowerCase());

  D.writing = {
    steps: [
      { key: "intro", title: "1 · Introducción", hint: "Presentá QUÉ hiciste por primera vez, CUÁNDO y CÓMO te sentías.",
        starters: ["Last summer, I did something for the first time:", "Recently, I tried … for the first time.", "I have never … before, so I was nervous.", "I'm going to tell you about the first time I…"] },
      { key: "body", title: "2 · Desarrollo", hint: "Contá qué pasó en orden (5-6 oraciones) con conectores. Usá pasado simple.",
        starters: ["First, I …", "Then we …", "At first, I was … but …", "Suddenly, …", "However, …", "After that, …"] },
      { key: "end", title: "3 · Conclusión", hint: "Terminá con cómo terminó y cómo te sentís. Podés usar present perfect o going to.",
        starters: ["Finally, …", "In the end, …", "It was the best … I have ever …", "I'm going to … again next …"] }
    ],
    model: {
      title: "Model · My first time rock climbing",
      intro: "Last summer, I did something for the first time: I went rock climbing. I have never done a sport like this before, so I was very nervous.",
      body: "First, an instructor gave me a helmet and some special shoes. Then we walked to a small mountain near my city. At first, I was afraid, but the instructor said, “Don't look down!” After that, I started to climb. Suddenly, my foot slipped and I shouted. However, the rope was strong and I didn't fall. Next, I took a deep breath and kept going.",
      end: "Finally, I reached the top after two hours. The view was the most beautiful I have ever seen. It was the best day of my summer and I'm going to climb again next month!",
      notes: [
        ["Past simple", "went, gave, walked, started, shouted, didn't fall, reached"],
        ["Present perfect", "I have never done…, the most beautiful I have ever seen"],
        ["Linking words", "First, Then, At first, but, After that, Suddenly, However, Next, Finally, because / so"],
        ["Superlative / future", "the most beautiful, the best day · I'm going to climb"]
      ]
    },
    prompt: "Write about a first-time experience (for example: the first time you travelled alone, tried a new food, flew in a plane, or drove a car). Write 60–90 words. Use past simple, linking words (First, Then, Suddenly, However, Finally…) and give details: where, who, how you felt."
  };

  /* ---------- Reference (Resumen de reglas) ---------- */
  D.rules = [
    { unit: 5, title: "U5 · Past simple, wh- questions & time phrases", html: `
      <h4>Afirmativa</h4>
      <p>Regulares: infinitivo + <b>-ed</b> → <i>work → worked, study → studied, stop → stopped</i>. Irregulares: formas propias → <i>go → went, take → took</i>.</p>
      <h4>Negativa y pregunta</h4>
      <p><b>didn't</b> + infinitivo → <i>He didn't enjoy that race.</i><br><b>Did</b> + sujeto + infinitivo → <i>Did he enjoy his day job?</i></p>
      <h4>Wh- questions</h4>
      <p><b>Wh- word + did + sujeto + infinitivo</b> → <i>Why did the chef phone? What did the sister do? When did you learn to drive?</i></p>
      <h4>Time phrases</h4>
      <ul><li><b>all</b> + día/semana/vida: <i>all my life</i></li><li><b>for</b> + duración: <i>for three years</i></li><li><b>from … to …</b>: <i>from 2015 to 2020, from morning to night</i></li><li><b>before / after</b>: <i>before breakfast, before that</i></li><li><b>… later</b>: <i>two years later</i></li><li><b>when</b> + pasado: <i>When I was nineteen…</i></li></ul>
      <h4>Pronunciación -ed</h4><p>/t/ worked · /d/ played · /ɪd/ wanted (después de t/d).</p>` },
    { unit: 6, title: "U6 · Present perfect (y contraste con past simple)", html: `
      <h4>Forma</h4><p><b>have/has + participio</b>. Negativa: <i>haven't / hasn't</i> o <i>never</i> + verbo positivo. Pregunta: <i>Have you ever…? Has she…?</i></p>
      <h4>Uso</h4><p>Experiencias de vida <b>sin decir cuándo</b>: <i>I've driven a bus. Chris has never watched a football match.</i></p>
      <h4>Contraste con past simple</h4>
      <p>Si decimos <b>cuándo</b> (last year, in 2018, yesterday) → <b>past simple</b>.<br><i>Have you ever been to China? Yes, I have. When did you go? I went in 2018.</i></p>
      <h4>been vs gone</h4><p><i>has been to Spain</i> = fue y volvió. <i>has gone to Spain</i> = está allá ahora.</p>
      <h4>Participios</h4><p>Regulares = igual que el pasado. Irregulares: <i>be → been, do → done, eat → eaten, see → seen, swim → swum, write → written…</i></p>` },
    { unit: 6, title: "U6 · Comparatives & superlatives", html: `
      <table class="mini"><tr><th>Regla</th><th>Adjetivo</th><th>Comp.</th><th>Superl.</th></tr>
      <tr><td>1 sílaba</td><td>small</td><td>smaller</td><td>the smallest</td></tr>
      <tr><td>termina en -e</td><td>safe</td><td>safer</td><td>the safest</td></tr>
      <tr><td>CVC (se duplica)</td><td>big</td><td>bigger</td><td>the biggest</td></tr>
      <tr><td>consonante + y</td><td>heavy</td><td>heavier</td><td>the heaviest</td></tr>
      <tr><td>largos</td><td>dangerous</td><td>more dangerous</td><td>the most dangerous</td></tr>
      <tr><td>irregulares</td><td>good / bad / far</td><td>better / worse / further</td><td>the best / worst / furthest</td></tr></table>
      <p><b>than</b> con comparativo: <i>Rachel is younger than her sister.</i> Superlativo con <b>the</b>: <i>the coldest room in the house.</i></p>
      <p><i>the same as · similar to · different from</i></p>` },
    { unit: 7, title: "U7 · Present continuous (futuro) + going to / will / shall", html: `
      <ul><li><b>Present continuous</b>: arreglos ya organizados. <i>I'm meeting my manager tomorrow at three.</i></li>
      <li><b>be going to</b>: planes e intenciones. <i>We're going to look for a new apartment.</i> (con go: <i>I'm going to the park</i>, no “going to go”)</li>
      <li><b>will / 'll</b>: decisiones en el momento, ofrecimientos. <i>I'll have the ice cream. Just a minute, I'll help you.</i></li>
      <li><b>Shall I / Shall we</b>: ofrecer o sugerir. <i>Shall I carry that? What shall we do on Saturday?</i></li></ul>
      <h4>Time phrases del futuro</h4><p>tomorrow (morning), next week, soon, this afternoon, <b>in</b> a few minutes, <b>in</b> two weeks, in a month's time, right now.</p>` },
    { unit: 7, title: "U7 · Indefinite pronouns", html: `
      <table class="mini"><tr><th></th><th>personas</th><th>cosas</th><th>lugares</th></tr>
      <tr><td><b>some-</b></td><td>someone / somebody</td><td>something</td><td>somewhere</td></tr>
      <tr><td><b>any-</b></td><td>anyone / anybody</td><td>anything</td><td>anywhere</td></tr>
      <tr><td><b>no-</b></td><td>no one / nobody</td><td>nothing</td><td>nowhere</td></tr>
      <tr><td><b>every-</b></td><td>everyone / everybody</td><td>everything</td><td>everywhere</td></tr></table>
      <ul><li><b>some-</b>: afirmativas y ofrecimientos (<i>Would you like something to drink?</i>).</li>
      <li><b>any-</b>: preguntas y negativas (<i>I didn't know anyone.</i>).</li>
      <li><b>no-</b>: con verbo afirmativo (<i>Nobody knows. There's nowhere to eat.</i>) — nunca doble negación.</li>
      <li><b>every-</b>: verbo en singular (<i>Everyone likes chocolate.</i>).</li>
      <li>Con to + infinitivo: <i>nothing to read, somewhere to eat.</i></li></ul>` },
    { unit: 5, title: "Writing · Linking words (mini-bio y first-time experience)", html: `
      <ul><li><b>First, Then, Next, After that, Finally</b>: orden de acciones (una después de otra).</li>
      <li><b>Suddenly</b>: algo inesperado. <b>However / but</b>: contraste.</li>
      <li><b>because</b> = causa (Why?) · <b>so</b> = resultado (What happened next?).</li>
      <li><b>Time phrases</b>: seven years ago, in the summer, last year, when I was nineteen.</li></ul>
      <p>Estructura: <b>Introducción</b> (qué y cuándo) → <b>Desarrollo</b> (qué pasó) → <b>Conclusión</b> (final y sentimientos).</p>` }
  ];

  /* ---------- Plan de estudio ---------- */
  D.tasks = [
    { id: "p1d1a", phase: 1, day: 1, text: "Leer reglas U5 y repasar 20 verbos irregulares", link: "#/cards?deck=verbs" },
    { id: "p1d1b", phase: 1, day: 1, text: "Practicar U5: Past simple, Wh- y time phrases", link: "#/practice?unit=5" },
    { id: "p1d1c", phase: 1, day: 1, text: "Life events (tarjetas)", link: "#/cards?deck=events" },
    { id: "p1d1d", phase: 1, day: 1, text: "Practicar U6: Present perfect y contraste", link: "#/practice?unit=6" },
    { id: "p1d2a", phase: 1, day: 2, text: "Comparatives & superlatives + travel phrases", link: "#/cards?deck=travel" },
    { id: "p1d2b", phase: 1, day: 2, text: "U7: Futuro + pronombres indefinidos", link: "#/practice?unit=7" },
    { id: "p1d2c", phase: 1, day: 2, text: "Taller de writing: first-time experience", link: "#/writing" },
    { id: "p1d2d", phase: 1, day: 2, text: "Práctica intercalada (mezcla) + repaso de errores", link: "#/practice?unit=all&weak=1" },
    { id: "p1d2e", phase: 1, day: 2, text: "Simulacro de examen escrito", link: "#/exam" },
    { id: "p2d3", phase: 2, day: 3, text: "Oral U5: 8 preguntas en voz alta", link: "#/oral?unit=5" },
    { id: "p2d4", phase: 2, day: 4, text: "Oral U6: experiencias y comparaciones", link: "#/oral?unit=6" },
    { id: "p2d5", phase: 2, day: 5, text: "Oral U7: planes y pronunciación", link: "#/oral?unit=7" },
    { id: "p2d6", phase: 2, day: 6, text: "Simulacro oral mixto + repaso final", link: "#/oral?mode=sim" }
  ];

  window.DATA = D;
})();

