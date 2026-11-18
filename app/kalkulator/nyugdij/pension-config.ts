export type Answer = { text: string; points: number };
export type Question = {
  id: number;
  question: string;
  type?: "choice" | "slider"; // csak megjelenítés, alapértelmezett: choice
  answers: Answer[];
};
export type ZoneType = "green" | "yellow" | "red";

export interface EvaluationResult {
  zone: ZoneType;
  title: string;
  text: string;
  isCritical?: boolean;
  criticalMessage?: string;
}

export const pensionQuestions: Question[] = [
  {
    id: 1,
    question: "Hány éves vagy?",
    type: "slider",
    answers: [
      { text: "25-35", points: 0 },
      { text: "36-45", points: 1 },
      { text: "46-55", points: 2 },
      { text: "56 elmúltam", points: 3 },
    ],
  },
  {
    id: 2,
    question: "Nagyjából hány év van még a nyugdíjig?",
    type: "slider",
    answers: [
      { text: "25 évnél több", points: 0 },
      { text: "15-25 év", points: 1 },
      { text: "10-14 év", points: 2 },
      { text: "10-nél kevesebb", points: 3 },
    ],
  },
  {
    id: 3,
    question: "Mekkora a jelenlegi havi nettó jövedelmed?",
    type: "slider",
    answers: [
      { text: "1 millió Ft felett", points: 0 },
      { text: "600 ezer - 1 millió Ft", points: 1 },
      { text: "300 - 600 ezer Ft", points: 2 },
      { text: "300 ezer Ft alatt", points: 3 },
    ],
  },
  {
    id: 4,
    question: "Nyugdíjasként a mai életszínvonaladhoz képest mit szeretnél?",
    answers: [
      { text: "Jóval szerényebb élet is elég", points: 0 },
      { text: "Kicsit szerényebb, de elfogadható", points: 1 },
      { text: "Nagyjából a mostani szintet szeretném", points: 2 },
      { text: "Aktív, utazós, kényelmes élet", points: 3 },
    ],
  },
  {
    id: 5,
    question: "Van már kifejezetten nyugdíjcélú megtakarításod?",
    answers: [
      {
        text: "Igen, rendszeresen fizetem (a bevételem min. 10%-át)",
        points: 0,
      },
      { text: "Van, de rendszertelenül fizetem / kisebb összeggel", points: 1 },
      { text: "Volt/van, de nem foglalkozom vele", points: 2 },
      { text: "Nincs", points: 3 },
    ],
  },
  {
    id: 6,
    question: "Havonta mennyit teszel félre nyugdíjcélra?",
    type: "slider",
    answers: [
      { text: "Nettó jövedelmem 10%-a felett", points: 0 },
      { text: "5-10%", points: 1 },
      { text: "1-5%", points: 2 },
      { text: "0%", points: 3 },
    ],
  },
  {
    id: 7,
    question: "Mennyire alapozod a nyugdíjas életedet az állami nyugdíjra?",
    answers: [
      { text: "Részben, van saját tervem", points: 0 },
      { text: "Fontos lesz, de nem csak erre építek", points: 1 },
      { text: "Főleg erre számítok", points: 2 },
      { text: "Teljesen az állami nyugdíjra számítok", points: 3 },
    ],
  },
  {
    id: 8,
    question:
      "Van olyan vagyonod, vagy bevételed, ami nyugdíjasként is pénzt termelhet?",
    answers: [
      { text: "Több ilyen forrásom is van", points: 0 },
      {
        text: "Van ingatlanom/befektetésem, de nem tudom mennyit hoz majd",
        points: 1,
      },
      { text: "Van valamim, de nem számottevő", points: 2 },
      { text: "Nincs ilyenem", points: 3 },
    ],
  },
  {
    id: 9,
    question:
      "Lesznek várhatóan eltartottjaid / családi pénzügyi kötelezettségeid nyugdíj előtt vagy alatt?",
    answers: [
      { text: "Nem valószínű", points: 0 },
      { text: "Kisebb kötelezettség lehet", points: 1 },
      { text: "Jelentős családi támogatási igény várható", points: 2 },
      { text: "Biztosan nagy teher lesz", points: 3 },
    ],
  },
  {
    id: 10,
    question: "Mennyire függ a jövedelmed a saját aktív munkaképességedtől?",
    answers: [
      { text: "Van passzív, több lábon álló bevételem", points: 0 },
      { text: "Részben függ tőle", points: 1 },
      { text: "Nagyrészt csak aktív munkából élek", points: 2 },
      { text: "Ha kiesek, azonnal baj van", points: 3 },
    ],
  },
  {
    id: 11,
    question: "Mennyire tervezted meg eddig a nyugdíjas éveidet?",
    answers: [
      { text: "Van konkrét tervem számokkal", points: 0 },
      { text: "Gondolkodtam rajta, de nincs pontos tervem", points: 1 },
      { text: "Halogatom", points: 2 },
      { text: "Egyáltalán nem foglalkoztam még vele", points: 3 },
    ],
  },
  {
    id: 12,
    question: "Melyik mondat igaz rád leginkább?",
    answers: [
      { text: "Már elindítottam és évente felülvizsgálom", points: 0 },
      { text: "Tudom, hogy fontos, hamarosan lépek", points: 1 },
      { text: "Tudom, hogy kellene, de mindig csúszik", points: 2 },
      { text: "Nem akarok ezzel foglalkozni", points: 3 },
    ],
  },
];

// Ponthatárok a teljes (12 kérdéses) kitöltésre
const YELLOW_ABOVE = 10;
const RED_ABOVE = 22;

// Valós idejű kiértékelő logika
export const evaluatePension = (
  answers: Record<number, number>,
  score: number,
): EvaluationResult => {
  const answeredCount = Object.keys(answers).length;

  if (answeredCount === 0) {
    return {
      zone: "green",
      title: "Kezdjük!",
      text: "Válaszolj a kérdésekre, és a mutató minden lépés után megmutatja, hol tartasz.",
    };
  }

  // Menet közben a határokat a megválaszolt kérdések arányában skálázzuk,
  // így pl. 3 db maximális pontú válasz után nem "zöld" az eredmény.
  // A teljes kitöltésnél ez pontosan a 10 / 22 pontos határ.
  const scale = answeredCount / pensionQuestions.length;
  let scoreZone: ZoneType = "green";
  if (score > YELLOW_ABOVE * scale) scoreZone = "yellow";
  if (score > RED_ABOVE * scale) scoreZone = "red";

  // Piros zászlós kivételek – mindegyikhez saját indoklás
  const reasons: string[] = [];

  if (answers[2] === 3 && answers[5] === 3) {
    reasons.push(
      "10 éven belül nyugdíjba mész, és még nincs nyugdíjcélú megtakarításod. Ennyi idő alatt is lehet érdemben javítani a helyzeten, de csak akkor, ha most kezded el.",
    );
  }
  if ((answers[1] === 2 || answers[1] === 3) && answers[6] === 3) {
    reasons.push(
      "46 év felett vagy, és jelenleg nem teszel félre nyugdíjra. Ebben a korban minden halogatott év különösen sokat számít.",
    );
  }
  if (answers[7] === 3 && (answers[8] === 3 || answers[10] === 3)) {
    reasons.push(
      "Teljesen az állami nyugdíjra számítasz, és nincs mögötte olyan tartalék, ami megfogna, ha a bevételed kiesik.",
    );
  }

  const isCritical = reasons.length > 0;
  const zone: ZoneType = isCritical ? "red" : scoreZone;

  if (zone === "red") {
    return {
      zone,
      title: "Magas nyugdíjkockázat",
      text: "A válaszaid alapján komoly esély van rá, hogy az állami nyugdíj nem lesz elég a mostani életszínvonaladhoz. A jó hír: minél előbb lépsz, annál több lehetőséged marad. Egy ingyenes konzultáción kiszámoljuk, mekkora a várható hiány, és havonta mennyit érdemes félretenned.",
      isCritical,
      criticalMessage: isCritical
        ? [
            // csak akkor mondjuk, ha tényleg a kivétel miatt piros
            scoreZone !== "red" &&
              "A pontszámod önmagában nem indokolná a piros zónát, egy válaszod miatt mégis ide kerültél.",
            ...reasons,
          ]
            .filter(Boolean)
            .join(" ")
        : undefined,
    };
  }

  if (zone === "yellow") {
    return {
      zone,
      title: "Közepes kockázat – most még könnyű korrigálni",
      text: "Már látszik egy rés aközött, amire számíthatsz, és amire szükséged lesz. Ez nem vészhelyzet, de minden halogatott év drágábbá teszi a pótlást. Egy ingyenes beszélgetésen megnézzük, hol a legnagyobb a hiány, és mi a legkisebb lépés, amivel elkezdheted bezárni.",
    };
  }

  return {
    zone,
    title: "Jó úton jársz",
    text: "A válaszaid alapján most nincs sürgős teendőd. A jó alapot viszont érdemes karbantartani: egy ingyenes átnézésen ellenőrizzük, hogy a megtakarításaid tényleg elérik-e a céljaidat, és hol lehet többet kihozni belőlük, például az állami adójóváírással.",
  };
};
