'use client'
import { useState } from 'react'
import { TiArrowRightOutline } from 'react-icons/ti'
import SectionOneCard from './SectionOneCard'

export default function FamilyInsurancePage() {
  // HERO STATE-EK (Megtartva a logikádat, képek helyett ideiglenes színazonosítókkal)
  const [heroBgColor, setHeroBgColor] = useState('bg-zold')
  const [prevBgColor, setPrevBgColor] = useState(null)
  const [currentKey, setCurrentKey] = useState(1)
  const [animationClass, setAnimationClass] = useState('animate-slide-in-left')

  const handleImageChange = (colorValue, targetKey) => {
    if (colorValue === heroBgColor) return

    if (targetKey > currentKey) {
      setAnimationClass('translate-x-0 transition-transform duration-700 ease-out')
    } else {
      setAnimationClass('translate-x-0 transition-transform duration-700 ease-out')
    }

    setPrevBgColor(heroBgColor)
    setHeroBgColor(colorValue)
    setCurrentKey(targetKey)
  }

  // 3 FŐ TERMÉKCSOPORT ADATAI (SEO fókuszú szövegek)
  const productPillars = [
    {
      number: '1',
      title: 'Gyermekmegtakarítási Programok',
      desc: 'Infláció feletti hozamlehetőségek és adóoptimális konstrukciók a gyermek 18. életévének betöltésére. Beépített szülői díjátvállalási védelemmel, hogy a célok minden körülmények között megvalósuljanak.',
    },
    {
      number: '2',
      title: 'Prémium Lakásbiztosítások',
      desc: 'Újragondolt otthonvédelem az alulbiztosítottság ellen. Megemelt építőipari árakhoz igazított limitek, All-Risk kiterjesztés okoseszközökre, napelemekre és családi felelősségbiztosításra.',
    },
    {
      number: '3',
      title: 'Gépjármű Biztosítások (KGFB & CASCO)',
      desc: 'A teljes magyar biztosítási piac éves szintű auditálása. Kedvező kötelező biztosítások és asszisztenciával (autómentés, csereautó) kiegészített CASCO csomagok családi logisztikára szabva.',
    },
  ]

  return (
    <main className="w-full min-h-screen bg-feher pb-[100px]">
      {/* ================= HERO SZEKCIÓ ================= */}
      <div className="hero w-[90%] max-w-[2560px] rounded-[20px] flex flex-col xl:flex-row mx-auto py-[50px] mt-[120px] text-white relative overflow-hidden h-auto xl:h-[calc(100vh-150px)] md:min-h-[650px]">
        {/* ZÖLD HÁTTÉR CONTAINER (Képek helyett szín-alapú placeholder) */}
        <div className="absolute top-0 left-0 w-full h-full hero-kep rounded-[20px] overflow-hidden [transform:translateZ(0)] z-0">
          {prevBgColor && (
            <div className={`absolute inset-0 w-full h-full ${prevBgColor} brightness-75`} />
          )}
          <div
            className={`absolute inset-0 w-full h-full ${heroBgColor} brightness-90 transition-all duration-700 mix-blend-multiply`}
          />
          {/* Prémium sötétítő gradient overlay a szövegek olvashatóságáért */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        </div>

        {/* HERO BAL OLDAL (TARTALOM) */}
        <div className="hero-bal w-[100%] xl:w-[50%] flex flex-col p-[20px] md:p-[40px] relative z-20 justify-between h-full">
          <div className="hero-logo min-h-[50px] relative text-zold text-[20px] md:text-[35px] ml-[-30px] md:ml-[-50px] mt-[-60px] bg-feher w-fit px-[30px] py-[10px] rounded-br-[20px] font-extrabold z-30 shadow-sm">
            <p>S.Y.A Solutions</p>
          </div>

          <h1 className="text-[28px] md:text-[45px] font-extrabold mt-[60px] xl:my-auto ml-[10px] tracking-tight leading-tight max-w-2xl">
            Személyre szabott pénzügyi biztonság és{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-vilagos to-white/70">
              vagyonépítés
            </span>{' '}
            az egész családnak
          </h1>

          {/* Navigációs Gombok */}
          <div className="flex flex-col sm:flex-row gap-3 mt-[40px] xl:mt-0">
            <button
              onClick={() => handleImageChange('bg-zold', 1)}
              className={`flex items-center justify-between gap-4 p-4 px-6 rounded-xl font-bold border transition-all text-left ${
                currentKey === 1
                  ? 'bg-feher text-zold border-feher'
                  : 'bg-transparent text-white border-white/20 hover:bg-white/5'
              }`}
            >
              <span>Családomnak</span>
              <TiArrowRightOutline className="text-xl" />
            </button>

            <button
              onClick={() => handleImageChange('bg-[#4e5705]', 2)} // Finom tónusváltások jelzik a váltást
              className={`flex items-center justify-between gap-4 p-4 px-6 rounded-xl font-bold border transition-all text-left ${
                currentKey === 2
                  ? 'bg-feher text-zold border-feher'
                  : 'bg-transparent text-white border-white/20 hover:bg-white/5'
              }`}
            >
              <span>Vállalkozásomnak</span>
              <TiArrowRightOutline className="text-xl" />
            </button>

            <button
              onClick={() => handleImageChange('bg-[#2d3302]', 3)}
              className={`flex items-center justify-between gap-4 p-4 px-6 rounded-xl font-bold border transition-all text-left ${
                currentKey === 3
                  ? 'bg-feher text-zold border-feher'
                  : 'bg-transparent text-white border-white/20 hover:bg-white/5'
              }`}
            >
              <span>Jövőmnek</span>
              <TiArrowRightOutline className="text-xl" />
            </button>
          </div>
        </div>

        {/* HERO JOBB OLDAL (STATISZTIKÁK) */}
        <div className="hero-jobb self-end mt-auto xl:mt-0 w-[100%] xl:w-[50%] flex flex-col sm:flex-row gap-[30px] p-[20px] md:p-[40px] relative z-20 items-start xl:items-end justify-end">
          <div className="text-[18px] flex flex-row gap-[10px] items-end">
            <span className="text-transparent font-black text-4xl md:text-6xl tracking-tighter [-webkit-text-stroke:1.5px_#ffffff]">
              100+
            </span>
            <p className="font-medium tracking-wide mb-1 opacity-90">elégedett ügyfél</p>
          </div>
          <div className="text-[18px] flex flex-row gap-[10px] items-end">
            <span className="text-transparent font-black text-4xl md:text-6xl tracking-tighter [-webkit-text-stroke:1.5px_#ffffff]">
              250+
            </span>
            <p className="font-medium tracking-wide mb-1 opacity-90">megkötött szerződés</p>
          </div>
        </div>
      </div>

      {/* ================= SECTION 1: 3 FŐ PILLÉR GRID ================= */}
      <section className="w-[90%] max-w-[2560px] mx-auto mt-[80px] md:mt-[120px]">
        <div className="mb-[40px] md:mb-[60px] max-w-3xl">
          <h2 className="text-xs uppercase tracking-[0.25em] text-zold/60 font-bold mb-3">
            Piaci megoldások
          </h2>
          <p className="text-2xl md:text-4xl font-extrabold text-zold tracking-tight">
            Független lakossági csomagok és stratégiai öngondoskodás
          </p>
        </div>

        {/* Reszponzív Grid elrendezés a kártyáknak */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {productPillars.map((item) => (
            <SectionOneCard
              key={item.number}
              number={item.number}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </section>

      {/* ================= SECTION 2: BIZALOMÉPÍTŐ / ÉRVELŐ RÉSZ ================= */}
      <section className="w-[90%] max-w-[2560px] mx-auto mt-[100px] md:mt-[150px] bg-zold rounded-2xl p-8 md:p-16 text-vilagos shadow-xl ring-1 ring-white/10">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            Miért a független tanácsadás a legjobb választás a családjának?
          </h2>

          <div className="flex flex-col gap-8 md:gap-10 mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <span className="text-xl font-bold text-feher/40 shrink-0">01 /</span>
              <div>
                <h4 className="text-xl font-bold mb-2 text-feher">
                  Nincs elköteleződés egyetlen márka felé sem
                </h4>
                <p className="text-vilagos/70 leading-relaxed">
                  Nem egyetlen pénzintézet vagy ügynökség zárt, korlátozott termékeit erőltetjük
                  Önre. A teljes szabad piacot monitorozzuk, így kizárólag az Ön egyéni igényei és a
                  család biztonsága diktál.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 border-t border-white/5 pt-8">
              <span className="text-xl font-bold text-feher/40 shrink-0">02 /</span>
              <div>
                <h4 className="text-xl font-bold mb-2 text-feher">
                  Személyre szabott, torzításmentes analízis
                </h4>
                <p className="text-vilagos/70 leading-relaxed">
                  Nem hiszünk az előre csomagolt, sablonos megoldásokban. Minden család
                  élethelyzete, teherbíró képessége és jövőbeli célrendszere teljesen egyedi – a
                  javasolt konstrukcióink is ehhez igazodnak.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 border-t border-white/5 pt-8">
              <span className="text-xl font-bold text-feher/40 shrink-0">03 /</span>
              <div>
                <h4 className="text-xl font-bold mb-2 text-feher">Hosszú távú, aktív partnerség</h4>
                <p className="text-vilagos/70 leading-relaxed">
                  Nem tűnünk el a szerződések aláírását követően. Évente felülvizsgáljuk a meglévő
                  csomagokat, hogy azok mindig a legfrissebb piaci trendeknek, adókedvezményeknek és
                  a család aktuális élethelyzetének megfelelően fussanak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: PRÉMIUM FAQ (GYAKORI KÉRDÉSEK) ================= */}
      <section className="w-[90%] max-w-[2100px] mx-auto mt-[100px] md:mt-[150px]">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-xs uppercase tracking-[0.25em] text-zold/60 font-bold mb-3">
            Kérdések és válaszok
          </h2>
          <p className="text-2xl md:text-4xl font-extrabold text-zold tracking-tight">
            Tájékozódjon tudatosan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-8">
          <div className="bg-feher border border-zold/10 rounded-xl p-6 md:p-8 shadow-sm">
            <h4 className="text-lg font-bold text-zold mb-3">
              Mikor érdemes elkezdeni a gyermekmegtakarítást?
            </h4>
            <p className="text-sm md:text-base text-zold/80 leading-relaxed">
              Minél hamarabb, annál jobb. A kamatos kamat elve alapján az idő a legnagyobb
              szövetségese. Kis összegekkel, korán elkezdve sokkal nagyobb tőkét lehet felhalmozni a
              18. évre, mint hatalmas havi terhekkel az utolsó 3-5 évben.
            </p>
          </div>

          <div className="bg-feher border border-zold/10 rounded-xl p-6 md:p-8 shadow-sm">
            <h4 className="text-lg font-bold text-zold mb-3">
              Mi a különbség a banki és a biztosítói programok között?
            </h4>
            <p className="text-sm md:text-base text-zold/80 leading-relaxed">
              A banki lekötések fixek, de a hozamuk ritkán veri meg tartósan az inflációt, és nem
              védenek a szülők kiesése esetén. A modern, eszközalapú biztosítói programok magasabb
              hozamot céloznak meg, adómentességet biztosítanak, és beépített családi védelmi
              funkciókkal rendelkeznek.
            </p>
          </div>

          <div className="bg-feher border border-zold/10 rounded-xl p-6 md:p-8 shadow-sm lg:col-span-2">
            <h4 className="text-lg font-bold text-zold mb-3">
              Miért kritikus felülvizsgálni a régi lakásbiztosításokat?
            </h4>
            <p className="text-sm md:text-base text-zold/80 leading-relaxed">
              Ha a biztosítása 3-5 évnél régebbi, szinte biztosan alulbiztosítottá vált. Az
              ingatlanpiaci és építőipari alapanyagárak drasztikus növekedése miatt a régi
              szerződésben rögzített kártérítési összegek egy komolyabb káresemény esetén nem
              lennének elegendők az ingatlan teljes újjáépítésére.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
