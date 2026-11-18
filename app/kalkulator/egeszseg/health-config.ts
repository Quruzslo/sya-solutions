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

export const healthQuestions: Question[] = [
  {
    id: 1,
    question: "Van olyan személy, aki anyagilag függ tőled?",
    answers: [
      { text: "Nincs", points: 0 },
      { text: "Részben igen", points: 1 },
      { text: "Egy-két fő jelentősen függ tőlem", points: 2 },
      { text: "Három vagy több fő függ tőlem", points: 3 },
    ],
  },
  {
    id: 2,
    question: "Van jelenleg hiteled vagy hosszú távú pénzügyi kötelezettséged?",
    answers: [
      { text: "Nincs", points: 0 },
      { text: "Kisebb kötelezettségem van", points: 1 },
      { text: "Jelentős hitelem van", points: 2 },
      { text: "Több hitelem is van", points: 3 },
    ],
  },
  {
    id: 3,
    question:
      "Ha holnaptól 3-6 hónapig nem tudnál dolgozni, mennyi ideig lenne pénzügyileg stabil a család?",
    type: "slider",
    answers: [
      { text: "6 hónapnál tovább", points: 0 },
      { text: "3-6 hónap", points: 1 },
      { text: "1-3 hónap", points: 2 },
      { text: "Kevesebb, mint 1 hónap", points: 3 },
    ],
  },
  {
    id: 4,
    question: "Mennyire függ a család életszínvonala a te munkádtól?",
    answers: [
      { text: "Alig függ tőlem", points: 0 },
      { text: "Részben", points: 1 },
      { text: "Nagyrészt", points: 2 },
      { text: "Szinte teljesen tőlem függ", points: 3 },
    ],
  },
  {
    id: 5,
    question: "Van jelenleg kockázati életbiztosításod?",
    answers: [
      {
        text: "Van, megfelelő összeggel (min. 3 évi bevételem összege)",
        points: 0,
      },
      { text: "Van, de nem tudom, elég-e", points: 1 },
      { text: "Van, de valószínűleg kevés", points: 2 },
      { text: "Nincs", points: 3 },
    ],
  },
  {
    id: 6,
    question: "Van balesetbiztosításod?",
    answers: [
      { text: "Igen, megfelelő fedezettel", points: 0 },
      { text: "Van, de nem tudom, mire elég", points: 1 },
      {
        text: "Csak minimális, munkahelyi / banki / lakásbiztosításon belüli",
        points: 2,
      },
      { text: "Nincs", points: 3 },
    ],
  },
  {
    id: 7,
    question:
      "Van egészségbiztosításod, vagy fedezeted magánegészségügyi szolgáltatásra?",
    answers: [
      { text: "Igen, rendszeresen használható", points: 0 },
      { text: "Van, de korlátozott", points: 1 },
      { text: "Csak eseti, magánorvosi fizetés", points: 2 },
      { text: "Nincs", points: 3 },
    ],
  },
  {
    id: 8,
    question: "Milyen a munkád baleseti vagy egészségügyi kockázata?",
    answers: [
      { text: "Többnyire irodai, alacsony kockázatú", points: 0 },
      { text: "Sokat vezetek, utazom / stresszes a munkám", points: 1 },
      { text: "Fizikai, fokozott felelősségű munka", points: 2 },
      {
        text: "Veszélyes munka / sok közlekedés / magas stressz / vállalkozói termelés",
        points: 3,
      },
    ],
  },
  {
    id: 9,
    question: "Milyen az egészségügyi előzményed, családi kockázatod?",
    answers: [
      { text: "Nincs ismert kockázat", points: 0 },
      { text: "Van kisebb figyelmeztető jel", points: 1 },
      { text: "A családban volt komoly betegség", points: 2 },
      { text: "Volt komolyabb saját egészségügyi problémám", points: 3 },
    ],
  },
  {
    id: 10,
    question:
      "Ha veled történne valami, megoldható lenne a család első 1-2 évének pénzügyi igénye?",
    answers: [
      { text: "Van elegendő tartalék / vagyon", points: 0 },
      { text: "Részben megoldható lenne", points: 1 },
      { text: "Komoly nehézség lenne", points: 2 },
      { text: "Azonnali pénzügyi krízis lenne", points: 3 },
    ],
  },
  {
    id: 11,
    question: "Tudod pontosan, milyen biztosításaid vannak, és mire fizetnek?",
    answers: [
      { text: "Igen, pontosan tudom", points: 0 },
      { text: "Nagyjából tudom", points: 1 },
      { text: "Van pár szerződésem, de nem látom át", points: 2 },
      { text: "Fogalmam sincs / nincs ilyenem", points: 3 },
    ],
  },
  {
    id: 12,
    question: "Melyik mondat igaz rád leginkább?",
    answers: [
      { text: "Rendszeresen felülvizsgálom a védelmemet", points: 0 },
      { text: "Tudom, hogy fontos, időnként ránézek", points: 1 },
      { text: "Tudom, hogy kellene, de halogatom", points: 2 },
      { text: "Nem foglalkozom vele", points: 3 },
    ],
  },
];

// Ponthatárok a teljes (12 kérdéses) kitöltésre
const YELLOW_ABOVE = 10;
const RED_ABOVE = 22;

// Valós idejű kiértékelő logika
export const evaluateHealth = (
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

  // Menet közben a határokat a megválaszolt kérdések arányában skálázzuk.
  // A teljes kitöltésnél ez pontosan a 10 / 22 pontos határ.
  const scale = answeredCount / healthQuestions.length;
  let scoreZone: ZoneType = "green";
  if (score > YELLOW_ABOVE * scale) scoreZone = "yellow";
  if (score > RED_ABOVE * scale) scoreZone = "red";

  const noLife = answers[5] === 3;
  const noAccident = answers[6] === 3;
  const noHealth = answers[7] === 3;

  // Piros zászlós kivételek – mindegyikhez saját indoklás
  const reasons: string[] = [];

  if (answers[1] >= 1 && noLife) {
    reasons.push(
      "Van, aki anyagilag függ tőled, de nincs kockázati életbiztosításod. Ha veled történne valami, az ő megélhetésük kerülne veszélybe.",
    );
  }
  if (answers[2] >= 2 && noLife) {
    reasons.push(
      "Jelentős hiteled van, de nincs mögötte életbiztosítás. Egy váratlan helyzetben a törlesztés terhe a családodra maradna.",
    );
  }
  if (answers[3] === 3 && answers[4] >= 2) {
    reasons.push(
      "Egy hónapnál kevesebb tartalékod van, miközben a család főként a te jövedelmedből él. Egy rövid kiesés is azonnali gondot okozna.",
    );
  }
  if ((answers[4] === 3 || answers[8] === 3) && noLife && noAccident) {
    reasons.push(
      "Te tartod el a családot, vagy magas kockázatú a munkád, mégsincs sem élet-, sem balesetbiztosításod.",
    );
  }
  if (answers[9] === 3 && noLife && noAccident && noHealth) {
    reasons.push(
      "Volt már komolyabb egészségügyi problémád, de jelenleg semmilyen biztosítás nem véd egy újabb esetre.",
    );
  }

  const isCritical = reasons.length > 0;
  const zone: ZoneType = isCritical ? "red" : scoreZone;

  if (zone === "red") {
    return {
      zone,
      title: "Magas pénzügyi sérülékenység",
      text: "A válaszaid alapján magas kockázati zónában vagy. Ez nem azt jelenti, hogy baj lesz, hanem azt, hogy ha baj történne, annak komoly pénzügyi következménye lehetne rád és a családodra nézve. A következő lépés egy konkrét család- és jövedelemvédelmi terv összeállítása.",
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
      title: "Közepes kockázat – van látható védelmi hiány",
      text: "A válaszaid alapján van néhány olyan pont, ahol egy váratlan betegség, baleset vagy jövedelemkiesés pénzügyi gondot okozhat. Ez nem krízishelyzet, de érdemes most rendbe tenni, amíg még jó feltételekkel lehet.",
    };
  }

  return {
    zone,
    title: "Jó alapokon állsz",
    text: "A válaszaid alapján jelenleg nincs súlyos védelmi hiányod. Ez jó alap, de érdemes évente egyszer átnézni, hogy a meglévő biztosításaid összege, kedvezményezettjei és szolgáltatásai még mindig megfelelnek-e az élethelyzetednek.",
  };
};
