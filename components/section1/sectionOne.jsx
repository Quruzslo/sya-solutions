import SectionTitles from "../sectionTitles";
import SectionOneCard from "../section1/sectionOneCards";

import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";

const data = [
  {
    id: 1,
    number: "1",
    category: "Védelem és biztonság",
    title: "Pénzügyi biztonság és védelem",
    img: "/images/financial-safety.jpg",
    icon: <AiOutlineSafetyCertificate />,
    desc: "A stabil háttér alapja a váratlan élethelyzetekre való felkészülés. Személyre szabott életbiztosítási és vagyonbiztosítási megoldásokkal megvédheti saját magát, családját és vállalkozását az anyagi kockázatoktól. Gondoskodjon értékei megfelelő védelméről még ma!",
  },
  {
    id: 2,
    number: "2",
    category: "Optimalizálás",
    title: "Költségcsökkentés és optimalizálás",
    img: "/images/cost-reduction.jpg",
    icon: <GiReceiveMoney />,
    desc: "A tudatos pénzügyi tervezés a felesleges kiadások lefaragásával kezdődik. Szüntesse meg a rejtett banki költségeket, és használja ki a maximális adókedvezményeket, adóvisszatérítéseket, illetve állami támogatásokat. Egy szakértői optimalizálással jelentős összegeket spórolhat meg.",
  },
  {
    id: 3,
    number: "3",
    category: "Befektetés",
    img: "/images/investment.jpg",
    icon: <FaArrowUpRightDots />,
    title: "Tudatos vagyonépítés és befektetés",
    desc: "Érje el pénzügyi céljait értékálló megtakarításokkal! Ne hagyja, hogy az infláció feleméssze a pénzét: jól megválasztott befektetési portfólióval és hozamorientált megoldásokkal reálértéken növelheti vagyonát. Tegye a pénzét dolgozóvá egy stabilabb jövő érdekében.",
  },
  {
    id: 4,
    number: "4",
    category: "Család és jövő",
    img: "/images/family-investment.jpg",
    icon: <MdFamilyRestroom />,
    title: "Családi pénzügyi tervezés",
    desc: "Teremtse meg szerettei számára a hosszú távú anyagi stabilitást! Egy komplex stratégia magában foglalja a gyermekcélú megtakarításokat, az öngondoskodást és a megfelelő pénzügyi védelmet. Alapozza meg családja jövőjét és közös céljait egy átgondolt rendszerrel.",
  },
];

export default function SectionOne() {
  return (
    <div className="w-[90%] max-w-[2560px] rounded-[20px] flex flex-col mx-auto py-[50px] ">
      <SectionTitles
        title={"Miben támogatunk téged?"}
        bgText={"Pénzügyi döntések"}
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] ">
        {data.map((item) => (
          <SectionOneCard
            key={item.id}
            number={item.number}
            category={item.category}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
}
