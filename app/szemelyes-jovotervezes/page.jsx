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
import SectionOneCard from "../csalad-tamogatas/SectionOneCard";
import PersonalSecurityImg from "../../public/images/future.jpg";
import Image from "next/image";
import Hero from "../../components/hero/hero";
import SectionTitles from "../../components/sectionTitles";
import Faq from "../../components/faq/faq";
import ContactSection from "../../components/contactForm/contactSection";

export const metadata = {
  title: "Személyes Jövőtervezés és Pénzügyi Biztonság | S.Y.A Solutions",
  description:
    "Személyre szabott öngondoskodási stratégiák, privát megtakarítások és jövedelemvédelem fiataloknak, pároknak és életkezdőknek. Alapozza meg a jövőjét függetlenül!",
};

const breadcrumbItems = [
  { label: "Személyes biztonság és jövőtervezés", url: "/szemelyes-biztonsag" },
];

export default function PersonalSecurityPage() {
  const productPillars = [
    {
      number: "1",
      title: "Életkezdési és Karrierindító Alapok",
      icon: <FaSeedling size={30} />,
      desc: "Az önálló élet megkezdése komoly anyagi ugrás. Olyan rugalmas, kis összegekkel is elindítható programokat építünk, amelyek alkalmazkodnak a pályakezdő jövedelemhez, és szisztematikusan megteremtik a teljes anyagi függetlenséget.",
    },
    {
      number: "2",
      title: "Első Otthonteremtési Stratégia",
      icon: <FaHouseDamage size={30} />,
      desc: "Saját lakásról álmodozni könnyű, de a piaci önerő összegyűjtése tudatosságot igényel. Segítünk átlátni a privát megtakarítási formákat és az elérhető állami támogatásokat, hogy ne adósságcsapdával induljon az életközép.",
    },
    {
      number: "3",
      title: "Személyi Jövedelempótlás és Aktív Védelem",
      icon: <FaRunning size={30} />,
      desc: "Fiatalon és aktívan a legnagyobb tőkéd a saját munkaképességed. Egy váratlan sportsérülés vagy hosszan tartó betegség azonnal lenullázhatja a bevételeidet. Olyan védőhálót biztosítunk, ami pótolja a jövedelmedet a kényszerpihenő alatt.",
    },
    {
      number: "4",
      title: "Tudatos Nyugdíjtervezés az Idő Erejevel",
      icon: <FaLandmark size={30} />,
      desc: "A húszas-harmincas éveidben a nyugdíj távolinak tűnik, de most van a legnagyobb előnyöd: az idő. A kamatos kamat elve alapján most harmadannyi havi ráfordítással sokkal nagyobb privát vagyont építhetsz fel, mint aki csak negyven felett kap észbe.",
    },
    {
      number: "5",
      title: "Korszerű Magánegészségügyi Ellátás",
      icon: <FaStethoscope size={30} />,
      desc: "Aktív életmód mellett nincs idő heteket vagy hónapokat várni egy szakorvosi vizsgálatra vagy diagnosztikára az állami rendszerben. Magánklinikai háttérrel garantáljuk a gyors, soron kívüli ellátást, hogy a betegség ne akassza meg a céljaidat.",
    },
    {
      number: "6",
      title: "Rugalmas Likviditási Tartaléképítés",
      icon: <FaFileInvoiceDollar size={30} />,
      desc: "Az élet kiszámíthatatlan: egy hirtelen jött munkahelyváltás, egy elromlott munkaeszköz vagy egy váratlan kiadás könnyen felboríthatja a mindennapokat. Segítünk egy biztonságos, bármikor hozzáférhető, mégis értékálló likvid alap felépítésében.",
    },
    {
      number: "7",
      title: "Adóoptimalizált Öngondoskodás",
      icon: <FaShieldHeart size={30} />,
      desc: "Kihasználjuk a törvény adta lehetőségeket, hogy ne hagyj pénzt az államnál. Segítünk maximalizálni az évi 20%-os, akár 280 000 forintig terjedő SZJA-visszatérítéseket a privát megtakarítási és egészségügyi programjaidon keresztül.",
    },
    {
      number: "8",
      title: "Életmód- és Értékvédelem",
      icon: <FaCar size={30} />,
      desc: "Nemcsak az ingatlan számít vagyonnak. Fiatalon a mobilitás, a technikai eszközök és az utazások jelentik a legnagyobb értéket. Olyan modern, rugalmas biztosítási konstrukciókat mutatunk, amelyek az egyéni életviteledre vannak szabva.",
    },
    {
      number: "9",
      title: "Pénzügyi Útiterv Fiatal Pároknak",
      icon: <FaHandsHoldingChild size={30} />,
      desc: "Amikor két élet összekapcsolódik, a közös célok (esküvő, utazás, későbbi családalapítás) új megközelítést kívánnak. Segítünk összehangolni a költségvetést, elkerülni a tipikus buktatókat, és egy tiszta, növekedésre fókuszáló közös alapot teremteni.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-feher pb-[100px]">
      {/* ================= HERO SZEKCIÓ ================= */}
      <Hero
        mainTitle={
          <>
            Személyes jövőtervezés és{" "}
            <span className="text-gradient-to-r from-white via-vilagos to-white/70">
              pénzügyi biztonság
            </span>{" "}
            minden élethelyzetre.
          </>
        }
        justOnePicture={PersonalSecurityImg}
        crumbs={breadcrumbItems}
      ></Hero>

      {/* ================= SZOLGÁLTATÁSOK SZEKCIÓ ================= */}
      <section className="w-[90%] max-w-[2560px] mx-auto my-[50px]">
        <div className="w-full mx-auto  mb-16">
          <h2 className="!text-[20px] md:!text-[30px] font-bold text-neutral-800 mb-6 tracking-tight">
            Vedd a kezedbe az irányítást: Alapozd meg a jövődet tudatosan
          </h2>
          <p className=" text-neutral-600 leading-relaxed ">
            Fiatal felnőttként, pályakezdőként vagy friss párként a jövő építése
            egyszerre izgalmas és kihívásokkal teli. A gazdasági változások, az
            infláció és a nehezen átlátható pénzügyi termékek világában könnyű
            szem elől téveszteni a hosszú távú célokat. A tudatos öngondoskodás
            nem a lemondásokról szól, hanem a szabadságról: arról, hogy legyen
            saját lakásod, stabil háttered, és ne függj a külső körülményektől.
            Független szakértőként átvilágítjuk a piaci lehetőségeket, és egy
            olyan egyéni stratégiát adunk a kezedbe, amellyel magabiztosan
            építheted a saját utadat.
          </p>
        </div>

        <SectionTitles
          title={
            "Személyre szabott életstratégiák és független piaci megoldások"
          }
          bgText={"Biztonság"}
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

      {/* ================= MIÉRT A FÜGGETLEN TANÁCSADÁS ================= */}
      <ContactSection></ContactSection>

      <Faq slug={"szemelyes-jovotervezes"}></Faq>
    </main>
  );
}
