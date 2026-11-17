export type Answer = { text: string; points: number };
export type Question = { id: number; question: string; answers: Answer[] };
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

// Valós idejű kiértékelő logika
export const evaluatePension = (
  answers: Record<number, number>,
  score: number,
): EvaluationResult => {
  let zone: ZoneType = "green";
  if (score > 10 && score <= 22) zone = "yellow";
  if (score > 22) zone = "red";

  let isCritical = false;

  // Piros zászlós kivételek ellenőrzése
  const q1 = answers[1];
  const q2 = answers[2];
  const q5 = answers[5];
  const q6 = answers[6];
  const q7 = answers[7];
  const q8 = answers[8];
  const q10 = answers[10];

  const flag1 = q2 === 3 && q5 === 3;
  const flag2 = (q1 === 2 || q1 === 3) && q6 === 3;
  const flag3 = q7 === 3 && (q8 === 3 || q10 === 3);

  if (flag1 || flag2 || flag3) {
    zone = "red";
    isCritical = true;
  }

  // Szövegek generálása a jelenlegi zóna alapján
  if (zone === "red") {
    return {
      zone,
      title: "Piros zóna: Magas kockázat!",
      text: "A jelenlegi válaszaid alapján magas nyugdíjkockázatban vagy. Azonnali beavatkozás szükséges, a következő lépés egy konkrét, számszerű nyugdíjterv elkészítése.",
      isCritical,
      criticalMessage: isCritical
        ? "Kritikus tényező észlelve! Bár a pontjaid alapján még jobb helyzetben lennél, egy konkrét válaszod (pl. közeli nyugdíj megtakarítás nélkül) miatt a helyzet azonnali figyelmet igényel."
        : undefined,
    };
  }

  if (zone === "yellow") {
    return {
      zone,
      title: "Sárga zóna: Figyelmeztetés",
      text: "Válaszaid alapján már szabad szemmel látható nyugdíjkockázatod van. Nincs pánikhelyzet, de nem is érdemes tovább halogatni a tudatos megtakarítást.",
    };
  }

  return {
    zone,
    title: "Zöld zóna: Kezelhető helyzet",
    text: "Jelenlegi válaszaid alapján nem vagy sürgős kockázati helyzetben. Érdemes évente egyszer felülvizsgálni a céljaidat.",
  };
};
