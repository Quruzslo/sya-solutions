import rolunkData from "@/app/rolunk/rolunkData";

interface Results {
  id: number;
  year: string;
  memberId: number;
  name: string;
  img: string;
  event: string;
  description: string;
}

const getMember = (id: number) => {
  const member = rolunkData.find((m) => m.id === id);
  if (!member) {
    throw new Error(`Nem található tag ezzel az ID-val: ${id}`);
  }
  return {
    memberId: member.id,
    name: member.name,
    img: member.img,
  };
};

const results: Results[] = [
  {
    id: 0,
    year: "2025",
    ...getMember(1),
    event: "Q4",
    description: "Tanácsadói kinevezés",
  },
  {
    id: 1,
    year: "2025",
    ...getMember(0),
    event: "Q4",
    description: "Top fiókvezető 2025. év",
  },
  {
    id: 2,
    year: "2026",
    ...getMember(1),
    event: "Q1",
    description: "Partneri díjazás",
  },
  {
    id: 3,
    year: "2026",
    ...getMember(1),
    event: "Q1",
    description: "Egyéni szerződés darabszám rekord: 32 db",
  },
  {
    id: 4,
    year: "2026",
    ...getMember(1),
    event: "Q1",
    description: "Kiemelt tanácsadói kinevezés",
  },
  {
    id: 5,
    year: "2026",
    ...getMember(0),
    event: "Q1",
    description: "Csapat szerződés rekord: 126 db",
  },
  {
    id: 6,
    year: "2026",
    ...getMember(0),
    event: "Q1",
    description: "40.000-es egyéni történelmi teljesítményrekord",
  },
  {
    id: 7,
    year: "2026",
    ...getMember(2),
    event: "Q2",
    description: "Tanácsadói kinevezés",
  },
  {
    id: 8,
    year: "2026",
    ...getMember(1),
    event: "Q2",
    description: "Egyéni szerződés darabszám rekord: 42 db",
  },
  {
    id: 9,
    year: "2026",
    ...getMember(1),
    event: "Q3",
    description: "Partneri díjazás",
  },
  {
    id: 10,
    year: "2026",
    ...getMember(1),
    event: "Q3",
    description:
      "AirPods Pro a személybiztosítási kampányban elért teljesítményért",
  },
  {
    id: 11,
    year: "2026",
    ...getMember(1),
    event: "Q3",
    description: "Tenerifei incentive út",
  },
  {
    id: 12,
    year: "2026",
    ...getMember(0),
    event: "Q3",
    description:
      "AirPods Pro a személybiztosítási kampányban elért teljesítményért",
  },
  {
    id: 13,
    year: "2026",
    ...getMember(0),
    event: "Q3",
    description: "Tenerifei incentive út",
  },
];

export default results;
