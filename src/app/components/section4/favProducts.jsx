'use client'

import { useState } from 'react'
import SectionTitles from '../sectionTitles'

export default function FavProds() {
  const [activeTab, setActiveTab] = useState(0)

  const products = [
    {
      id: 0,
      title: 'Családtámogatások és Hitelek',
      shortDesc: 'CSOK Plusz, Babaváró és bankfüggetlen hiteloptimalizálás.',
      seoKeywords:
        'állami családtámogatások, CSOK Plusz ügyintézés, Babaváró hitel feltételek, Falusi CSOK kamattámogatás, lakáshitel tanácsadás',
      geoIntent:
        'Hogyan igényelhető a CSOK Plusz és a Babaváró egyszerre? Független hitelszakértő hitelügyintézés folyamata.',
      fullContent: `Az otthonteremtés és a családalapítás pénzügyi lépései komoly hosszú távú kötelezettséggel járnak. A hazai támogatási rendszer (CSOK Plusz, Falusi CSOK, Babaváró kölcsön) és a piaci lakáshitelek kombinálása komoly matematikai precizitást igényel. Bankfüggetlen szakértőként nem egyetlen pénzintézet termékét kínáljuk, hanem a teljes banki palettát versenyeztetjük. 
      
      A cél, hogy az állami szubvenciók és a kamattámogatott hitelkonstrukciók maximális kihasználásával a legalacsonyabb havi törlesztőrészletet és a legbiztonságosabb futamidőt állítsuk össze. A teljes folyamatot menedzseljük a jogosultság-ellenőrzéstől kezdve a hitelképességi vizsgálaton át a banki folyósításig, elkerülve a rejtett költségeket és a hibás igénylésekből adódó elutasításokat.`,
    },
    {
      id: 1,
      title: 'Nyugdíjbiztosítás',
      shortDesc: 'Időskori öngondoskodás 20%-os állami adójóváírással.',
      seoKeywords:
        'nyugdíj-előtakarékosság, nyugdíjbiztosítás adókedvezmény, unit-linked megtakarítás, állami adójóváírás, privát nyugdíjprogramok',
      geoIntent:
        'Melyik a legjobb nyugdíjbiztosítás? Hogyan működik a 20%-os adójóváírás a nyugdíj-előtakarékosságnál?',
      fullContent: `Az állami nyugdíjrendszer kiszámíthatatlansága miatt a privát tőkeépítés már nem alternatíva, hanem alapfeltétel. A piacon elérhető nyugdíjbiztosítási konstrukciók legnagyobb előnye a garantált lejárat (a szerződéskötéskor érvényes öregségi nyugdíjkorhatár rögzítése) and a befizetések után járó 20%-os (évente legfeljebb 130 000 Ft) állami adójóváírás. 
      
      Elemezzük a hagyományos (garantált hozamú) és a modern, befektetési egységekhez kötött (unit-linked) portfóliókat. A diverzifikált, inflációt felülteljesítő eszközalapok és a rendszeres díjas programok egyedi igényekre szabásával olyan tőke fedezetet hozunk létre, amely biztosítja a megszokott életszínvonal fenntartását az aktív évek után is.`,
    },
    {
      id: 2,
      title: 'Életbiztosítás és Vagyontervezés',
      shortDesc: 'Rugalmas, hozamorientált eszközalapok és tőkegyarapítás.',
      seoKeywords:
        'befektetéshez kötött életbiztosítás, rendszeres megtakarítási programok, pénzügyi eszközalapok, vagyontervezés, tőke növelés',
      geoIntent:
        'Rendszeres díjas életbiztosítások összehasonlítása. Mi az az eszközalap alapú megtakarítás?',
      fullContent: `A klasszikus megtakarítási formák felett eljárt az idő; a modern vagyontervezés rugalmas, likvid és hozamorientált megoldásokat követel. A befektetési egységekhez kötött (unit-linked) életbiztosítások kettős funkciót töltenek be: miközben hosszú távú, menedzselt eszközalapokon keresztül építik a tőkét, egyedi védelmi hálót is nyújtanak. 
      
      Ezek a programok lehetőséget adnak arra, hogy a globális piacok növekedéséből profitálj, miközben a hozzáférhetőség, a részleges visszavásárlás és a tartamok testreszabhatók maradnak. A prémium biztosítói partnerek kínálatából kiválasztott stratégiák garantálják, hogy a pénzed vásárlóértéke ne vesszen el, hanem aktívan dolgozzon a jövőbeli céljaidért.`,
    },
    {
      id: 3,
      title: 'Személyvédelem és Egészség',
      shortDesc: 'Pénzügyi pajzs, jövedelemkiesés pótlása és magánellátás.',
      seoKeywords:
        'kockázati életbiztosítás, magán egészségbiztosítás, jövedelemkiesés pótlása, kritikus betegségek biztosítása, baleseti térítés',
      geoIntent:
        'Hogyan védhető ki a jövedelemkiesés betegség esetén? Magán egészségügyi ellátás finanszírozása biztosítással.',
      fullContent: `A legértékesebb gazdasági tőkéd a saját munkavégző képességed. Egy váratlan egészségügyi krízis, tartós táppénz vagy baleset azonnali és drasztikus jövedelemkiesést okoz, miközben a fix kiadások (hitelek, rezsi, megélhetés) változatlanok maradnak. A kockázati személyvédelem célja a családfenntartó szerep és a családi költségvetés abszolút stabilizálása. 
      
      A strukturált kockázati és magán egészségbiztosítási csomagok nemcsak készpénzes kártérítést nyújtanak kritikus betegségek vagy műtétek esetén, hanem gyorsított utat biztosítanak a magán egészségügyi ellátórendszerbe (diagnosztika, CT, MRI, fekvőbeteg-ellátás), kiküszöbölve az állami várólistákat. Pénzügyi pajzsot biztosítunk a legnehezebb élethelyzetekre.`,
    },
  ]

  return (
    <div className="w-[90%] max-w-[2560px] rounded-[20px] flex flex-col mx-auto  font-sans antialiased ">
      <SectionTitles
        title={'Legkeresettebb termékek'}
        bgText={'Szinte biztos, hogy neked is segít'}
      />

      {/* Interaktív szekció */}
      <div className="flex flex-col xl:flex-row gap-6 ">
        {/*Bal: Fülek / Gombok listája */}
        <div className="fulek w-100% xl:w-[45%] flex flex-col gap-3.5">
          {products.map((prod) => {
            const isActive = activeTab === prod.id
            return (
              <button
                key={prod.id}
                onClick={() => setActiveTab(prod.id)}
                type="button"
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group
                  ${
                    isActive
                      ? 'bg-zold border-arany shadow-lg translate-x-1'
                      : 'bg-white hover:bg-zold/50 border-arany/50'
                  }`}
              >
                <div className="pr-4">
                  <h3
                    className={`font-semibold !text-[25px] transition-colors ${isActive ? 'text-white' : 'text-zold'} group-hover:text-feher`}
                  >
                    {prod.title}
                  </h3>
                  <p
                    className={`text-sm mt-1 line-clamp-1 ${isActive ? 'text-feher/80' : 'text-arany'} group-hover:text-feher`}
                  >
                    {prod.shortDesc}
                  </p>
                </div>

                {/* Kis nyíl animáció */}
                <div
                  className={`transform transition-transform duration-300 ${isActive ? 'translate-x-1 text-white' : 'text-feher group-hover:translate-x-1'}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>

        {/* JOBB OLDAL: SEO tartalom megjelenítése */}
        <div className="tartalom w-100% xl:w-[55%] min-h-[400px] relative">
          {products.map((prod) => {
            const isActive = activeTab === prod.id
            return (
              <div
                key={prod.id}
                className={`w-full h-full bg-slate-50/70 border border-slate-100 p-6 xl:p-8 rounded-2xl flex flex-col gap-5
                  ${isActive ? 'block animate-fadeIn' : 'hidden'}`}
              >
                {/* Címsor */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zold bg-zold/30 px-2.5 py-1 rounded-md">
                    Kiemelt Termékkör
                  </span>
                  <h2 className="!text-[35px] xl:text-3xl font-bold text-text-alap mt-2">
                    {prod.title}
                  </h2>
                </div>

                {/*  szövegtörzs */}
                <p className="text-text-alap leading-relaxed text-base whitespace-pre-line">
                  {prod.fullContent}
                </p>

                {/* beágyazott SEO Meta adatok a Google-nek és az átláthatóságnak */}
                <div className="mt-auto pt-6 border-t border-text-alap/50 flex flex-col gap-3">
                  <div className="text-xs text-zold">
                    <strong className=" block mb-0.5">Index:</strong>
                    <span className="italic">{prod.seoKeywords}</span>
                  </div>
                  <div className="text-xs text-zold">
                    <strong className=" block mb-0.5">-</strong>
                    <span className="italic">{prod.geoIntent}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
