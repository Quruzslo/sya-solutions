// Ikonok-----------
import {
  FaHandsHoldingChild,
  FaShieldHeart,
  FaSeedling,
} from "react-icons/fa6";
import { TiArrowRightOutline } from "react-icons/ti";
import {
  FaHouseDamage,
  FaCar,
  FaLandmark,
  FaStethoscope,
  FaFileInvoiceDollar,
  FaRunning,
} from "react-icons/fa";
import BreadCrumbs from "../../components/breadCrumbs";

// Komponensek és képek------------
import SectionOneCard from "./SectionOneCard";
import Family from "../../public/images/csaladbiztositas.jpg";
import Image from "next/image";
import Hero from "../../components/hero/hero";
import SectionTitles from "../../components/sectionTitles";
import Faq from "../../components/faq/faq";
import ContactSection from "../../components/contactForm/contactSection";

export const metadata = {
  title: "Családtámogatás és Családi Biztosítások | S.Y.A Solutions",
  description:
    "Személyre szabott pénzügyi megoldások családoknak. Állami támogatások, gyermekmegtakarítás, otthonvédelem és hiteltanácsadás egy helyen. Kérjen konzultációt!",
};

const breadcrumbItems = [
  { label: "Családtámogatás és biztonság", url: "/csalad-tamogatas" },
];

export default function FamilyPage() {
  const productPillars = [
    {
      number: "1",
      title: "Gyermekmegtakarítási Programok",
      icon: <FaHandsHoldingChild size={30} />,
      desc: "Infláció feletti hozamlehetőségek és adóoptimális konstrukciók a gyermek 18. életévének betöltésére. Beépített szülői díjátvállalási védelemmel, hogy a célok minden körülmények között megvalósuljanak.",
    },
    {
      number: "2",
      title: "Prémium Lakásbiztosítások",
      icon: <FaHouseDamage size={30} />,
      desc: "Újragondolt otthonvédelem az alulbiztosítottság ellen. Megemelt építőipari árakhoz igazított limitek, All-Risk kiterjesztés okoseszközökre, napelemekre és családi felelősségbiztosításra.",
    },
    {
      number: "3",
      title: "Gépjármű Biztosítások (KGFB és CASCO)",
      icon: <FaCar size={30} />,
      desc: "A teljes magyar biztosítási piac éves szintű auditálása. Kedvező kötelező biztosítások és asszisztenciával (autómentés, csereautó) kiegészített CASCO csomagok családi logisztikára szabva.",
    },
    {
      number: "4",
      title: "Állami Családtámogatások (CSOK+, Babaváró)",
      icon: <FaLandmark size={30} />,
      desc: "A hazai bankpiac teljes körű, független összehasonlítása az otthonteremtési célok megvalósításához. Díjmentes, sorban állás nélküli ügyintézéssel segítünk maximalizálni a rendelkezésre álló állami támogatásokat.",
    },
    {
      number: "5",
      title: "Családfenntartói Védőernyő",
      icon: <FaShieldHeart size={30} />,
      desc: "Átfogó védőháló a legváratlanabb élethelyzetekre, amely garantálja, hogy a családfenntartó esetleges jövedelemkiesése esetén is fizethető maradjon a lakáshitel, és a gyerekek megszokott életszínvonala ne kerüljön veszélybe.",
    },
    {
      number: "6",
      title: "Generációs Vagyontervezés",
      icon: <FaSeedling size={30} />,
      desc: "Kiszámítható, államilag támogatott és évi 20%-os adójóváírással növelt megtakarítási programok, amelyek tehermentesítik a következő generációt, és biztosítják a nyugodt, kompromisszumok nélküli aktív éveket követő időszakot.",
    },
    {
      number: "7",
      title: "Családi Magánegészségügyi Biztosítások",
      icon: <FaStethoscope size={30} />,
      desc: "Felejtse el a hónapos várólistákat! Gyors és minőségi ellátás a legjobb magánklinikákon az egész család számára. Kiszámítható havidíjak mellett fedezzük a drága diagnosztikai (MRI, CT) vizsgálatokat, a magánorvosi viziteket és az egynapos sebészetet.",
    },
    {
      number: "8",
      title: "Hitelkiváltás és Adósságrendezés",
      icon: <FaFileInvoiceDollar size={30} />,
      desc: "A korábban felvett drága hitelek, folyószámlahitelek és személyi kölcsönök optimalizálása. Megversenyeztetjük a bankokat, és a legkedvezőbb kamatokkal hajtjuk végre a hitelkiváltást, amivel havonta akár tízezreket is megspórolhat a családi kasszának.",
    },
    {
      number: "9",
      title: "Gyermek Baleset- és Sportbiztosítás",
      icon: <FaRunning size={30} />,
      desc: "Aktív életmód, délutáni edzések és nyári táborok? Egy váratlan csonttörés vagy sportsérülés nemcsak ijesztő, de a privát rehabilitáció és a szülői táppénz komoly anyagi teher is. Azonnali, egyösszegű pénzügyi segítség, hogy a fókusz a gyors gyógyuláson lehessen.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-feher pb-[100px]">
      {/* ================= HERO SZEKCIÓ ================= */}
      <Hero
        mainTitle={
          <>
            Családtámogatás és pénzügyi{" "}
            <span className="text-gradient-to-r from-white via-vilagos to-white/70">
              tanácsadás
            </span>{" "}
            minden igényre.
          </>
        }
        justOnePicture={Family}
        crumbs={breadcrumbItems}
      ></Hero>

      {/* ================= SZOLGÁLTATÁSOK SZEKCIÓ ================= */}
      <section className="w-[90%] max-w-[2560px] mx-auto my-[50px]">
        <div className="w-full mx-auto  mb-16">
          <h2 className="!text-[20px] md:!text-[30px] font-bold text-neutral-800 mb-6 tracking-tight">
            Pénzügyi biztonság a család minden generációjának
          </h2>
          <p className=" text-neutral-600 leading-relaxed">
            Családot alapítani és fenntartani nemcsak érzelmi, hanem komoly
            pénzügyi felelősség is. Egy váratlan kiadás, az infláció hatásai
            vagy az egyre nehezebben átlátható állami támogatási rendszerek
            sokszor kihívás elé állítják a szülőket. Független pénzügyi
            tanácsadásunkkal segítünk eligazodni a lehetőségek között:
            optimalizáljuk a családi kasszát, lehívjuk a maximális állami
            támogatásokat, és olyan védőhálót építünk, amely minden
            élethelyzetben garantálja a megszokott életszínvonalat.
          </p>
        </div>

        <SectionTitles
          title={"Független lakossági csomagok és stratégiai öngondoskodás"}
          bgText={"Piaci megoldások"}
        ></SectionTitles>

        {/* Reszponzív Grid elrendezés a kártyáknak */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full mt-10">
          {productPillars.map((item) => (
            <SectionOneCard
              key={item.number}
              number={item.number}
              title={item.title}
              desc={item.desc}
              icon={item.icon}
            />
          ))}
        </div>
      </section>

      {/*2. secu  */}

      <ContactSection></ContactSection>
      <Faq slug={"csalad-tamogatas"}></Faq>
    </main>
  );
}
