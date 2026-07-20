import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="w-[100%] py-[35px] mx-auto mt-[100px] md:mt-[150px] bg-transparent text-zold">
      <div className="w-[90%] mx-auto border-t border-zold/15 pt-14 md:pt-20">
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-12 justify-between w-full">
          {/* Bal oldal */}
          <div className="flex flex-col w-full xl:w-[52%]">
            <p className=" text-xs tracking-[0.2em] text-zold/50 mb-4">
              FÜGGETLEN PÉNZÜGYI TANÁCSADÁS
            </p>
            <h3 className="text-[22px] md:text-[28px] font-black tracking-tight leading-tight mb-10 max-w-lg">
              Miért a független tanácsadás a legjobb választás a családjának?
            </h3>

            <div className="flex flex-col">
              {[
                {
                  tag: "FÜGGETLEN",
                  title: "Nincs elköteleződés egyetlen márka felé sem",
                  text: "Nem egyetlen pénzintézet vagy ügynökség zárt, korlátozott termékeit erőltetjük Önre. A teljes szabad piacot monitorozzuk, így kizárólag az Ön egyéni igényei és a család biztonsága diktál.",
                },
                {
                  tag: "EGYEDI",
                  title: "Személyre szabott, torzításmentes analízis",
                  text: "Nem hiszünk az előre csomagolt, sablonos megoldásokban. Minden család élethelyzete, teherbíró képessége és jövőbeli célrendszere teljesen egyedi – a javasolt konstrukcióink is ehhez igazodnak.",
                },
                {
                  tag: "TARTÓS",
                  title: "Hosszú távú, aktív partnerség",
                  text: "Nem tűnünk el a szerződések aláírását követően. Évente felülvizsgáljuk a meglévő csomagokat, hogy azok mindig a legfrissebb piaci trendeknek, adókedvezményeknek és a család aktuális élethelyzetének megfelelően fussanak.",
                },
              ].map((item, i) => (
                <div
                  key={item.tag}
                  className={`flex flex-col md:flex-row gap-3 md:gap-8 py-8 ${
                    i === 0 ? "" : "border-t border-zold/10"
                  }`}
                >
                  <span className="tracking-wider font-black text-zold/50 shrink-0 md:w-[120px] pt-1">
                    {item.tag} -
                  </span>
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-zold">
                      {item.title}
                    </h4>
                    <p className="text-zold/80 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jobb oldal - konzultációs szelvény */}
          <div className="relative w-full xl:w-[42%] h-fit shrink-0">
            <div className="relative rounded-xl bg-zold p-8 md:p-10">
              <div className="grid grid-cols-3 place-items-center absolute top-0 right-0 p-3 gap-3">
                {Array.from({ length: 9 }).map((_, index) => {
                  const randomSize = Math.floor(Math.random() * 11) + 10;
                  return (
                    <div
                      key={index}
                      className="rounded-full bg-white/90 shadow-sm"
                      style={{
                        width: `${randomSize}px`,
                        height: `${randomSize}px`,
                      }}
                    />
                  );
                })}
              </div>
              <p className=" text-xs tracking-[0.2em] text-[#e7ebe3]/60 mb-4">
                DÍJMENTES ELEMZÉS
              </p>
              <h3 className="text-[20px] md:text-[24px] font-bold leading-snug text-[#e7ebe3] max-w-md mb-8">
                További részletekért kérj díjmentes elemzést,
                kötelezettségvállalás nélkül!
              </h3>

              <div className="border-t border-dashed border-[#e7ebe3]/25 pt-6">
                <Link
                  href="/kapcsolat"
                  className="group rounded-xl inline-flex w-full sm:w-auto items-center justify-between sm:justify-start gap-6 border border-[#e7ebe3] px-6 py-3.5 text-sm font-semibold text-[#e7ebe3] transition-colors duration-300 hover:bg-[#e7ebe3] hover:text-zold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7ebe3]"
                >
                  Konzultációt szeretnék
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
