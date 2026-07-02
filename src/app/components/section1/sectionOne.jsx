import SectionTitles from '../sectionTitles'
import SectionOneCard from '../section1/sectionOneCards'
export default function SectionOne() {
  return (
    <div className=" w-[90%] max-w-[2560px] rounded-[20px] flex flex-col mx-auto py-[50px]">
      <SectionTitles title={'Miben támogatunk téged?'} bgText={'Pénzügyi döntések'}></SectionTitles>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] ">
        <SectionOneCard
          title={'Biztonság felépítése'}
          desc={
            'A mindennapi biztonságunk alapja a tudatos felkészülés! Legyen szó saját magunkról, családunkról, vállalkozásunkról vagy akár értékeinkről, egy váratlan esemény nem csak anyagi, hanem érzelmi terhet is jelenthet, ezért kulcsfontosságú, hogy megfelelő biztosításokkal előre gondoskodjunk a védelemről.'
          }
          number={'1'}
        ></SectionOneCard>
        <SectionOneCard
          title={'Költségek csökkentése'}
          desc={
            'A pénzügyi tudatosság nem csak a bevételekről, hanem a felesleges kiadások csökkentéséről is szól! Legyen szó banki költségekről, rejtett díjakról, adóvisszaigénylési lehetőségekről vagy különböző támogatásokról, a megfelelő megoldásokkal és átgondolt döntésekkel optimalizálhatók a kiadások.'
          }
          number={'2'}
        ></SectionOneCard>
        <SectionOneCard
          title={'Vagyon felépítése'}
          desc={
            'A vagyonépítés alapja, hogy a pénz dolgozzon érted! Az infláció miatt a megtakarítások értéke idővel csökken, ezért fontos, hogy tudatos, jól megválasztott pénzügyi megoldásokkal minimum ezt az értékvesztést ellensúlyozza a hozam. Így a pénzed hosszú távon hozzájárul egy stabilabb, kiszámíthatóbb jövőhöz.'
          }
          number={'3'}
        ></SectionOneCard>
        <SectionOneCard
          title={'Család anyagi biztonsága'}
          desc={
            'A család anyagi biztonsága nem egyetlen döntésen múlik, hanem egy tudatos rendszeren! Ide tartozik a gyerekek jövőjének megalapozása, a váratlan helyzetekre való felkészülés, a megfelelő védelem és a jól megválasztott pénzügyi megoldások is. A cél egy stabil háttér kialakítása, ami segít elérni a család közös céljait.'
          }
          number={'4'}
        ></SectionOneCard>
      </div>
    </div>
  )
}
