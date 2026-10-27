interface Results {
  id: number;
  year: string;
  event: string;
  member: string[];
}

const results: Results[] = [
  {
    id: 0,
    year: "2025",
    event: "Q4",
    member: [
      "Szőgyényi Zsófia - tanácsadói kinevezés",
      "Vincze Viola - top fiókvezető 2025. év",
    ],
  },
  {
    id: 1,
    year: "2026",
    event: "Q1",
    member: [
      "Szőgyényi Zsófia - partneri díjazás",
      "Szőgyényi Zsófia - egyéni szerződés darabszám rekord: 32 db",
      "Szőgyényi Zsófia - kiemelt tanácsadói kinevezés",
      "Vincze Viola - csapat szerződés rekord: 126 db",
      "Vincze Viola - 40.000-es egyéni történelmi teljesítményrekord",
    ],
  },
  {
    id: 2,
    year: "2026",
    event: "Q2",
    member: [
      "Kis Dániel - tanácsadói kinevezés",
      "Szőgyényi Zsófia - egyéni szerződés darabszám rekord: 42 db",
    ],
  },
  {
    id: 3,
    year: "2026",
    event: "Q3",
    member: [
      "Szőgyényi Zsófia - partneri díjazás",
      "Szőgyényi Zsófia - AirPods Pro a személybiztosítási kampányban elért teljesítményért",
      "Szőgyényi Zsófia - tenerifei incentive út",
      "Vincze Viola - AirPods Pro a személybiztosítási kampányban elért teljesítményért",
      "Vincze Viola - tenerifei incentive út",
    ],
  },
];
export default results;
