import SectionTitles from '../sectionTitles'
import SectionOneCard from '../section1/sectionOneCards'
export default function SectionOne() {
  return (
    <div className=" w-[90%] max-w-[2560px] rounded-[20px] flex flex-col mx-auto py-[50px]">
      <SectionTitles title={'Miben támogatunk téged?'} bgText={'Pénzügyi döntések'}></SectionTitles>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] ">
        <SectionOneCard
          title={'Pénzügyi biztonság és védelem'}
          desc={
            'A stabil háttér alapja a váratlan élethelyzetekre való felkészülés. Személyre szabott életbiztosítási és vagyonbiztosítási megoldásokkal megvédheti saját magát, családját és vállalkozását az anyagi kockázatoktól. Gondoskodjon értékei megfelelő védelméről még ma!'
          }
          number={'1'}
        ></SectionOneCard>

        <SectionOneCard
          title={'Költségcsökkentés és optimalizálás'}
          desc={
            'A tudatos pénzügyi tervezés a felesleges kiadások lefaragásával kezdődik. Szüntesse meg a rejtett banki költségeket, és használja ki a maximális adókedvezményeket, adóvisszatérítéseket, illetve állami támogatásokat. Egy szakértői optimalizálással jelentős összegeket spórolhat meg.'
          }
          number={'2'}
        ></SectionOneCard>

        <SectionOneCard
          title={'Tudatos vagyonépítés és befektetés'}
          desc={
            'Érje el pénzügyi céljait értékálló megtakarításokkal! Ne hagyja, hogy az infláció feleméssze a pénzét: jól megválasztott befektetési portfólióval és hozamorientált megoldásokkal reálértéken növelheti vagyonát. Tegye a pénzét dolgozóvá egy stabilabb jövő érdekében.'
          }
          number={'3'}
        ></SectionOneCard>

        <SectionOneCard
          title={'Családi pénzügyi tervezés'}
          desc={
            'Teremtse meg szerettei számára a hosszú távú anyagi stabilitást! Egy komplex stratégia magában foglalja a gyermekcélú megtakarításokat, az öngondoskodást és a megfelelő pénzügyi védelmet. Alapozza meg családja jövőjét és közös céljait egy átgondolt rendszerrel.'
          }
          number={'4'}
        ></SectionOneCard>
      </div>
    </div>
  )
}
