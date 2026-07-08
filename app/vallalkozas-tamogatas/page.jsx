import BreadCrumbs from "../../components/breadCrumbs";

// Komponensek és képek------------
import SectionOneCard from "../csalad-tamogatas/SectionOneCard";
import Business from "../../public/images/car-engineerHQ.jpg";
import Image from "next/image";
import Hero from "../../components/hero/hero";
import SectionTitles from "../../components/sectionTitles";
import Faq from "../../components/faq/faq";
import ContactSection from "../../components/contactForm/contactSection";

import {
  FaChartLine,
  FaStore,
  FaTruck,
  FaHandshake,
  FaUserShield,
  FaPiggyBank,
  FaNotesMedical,
  FaCoins,
  FaWrench,
} from "react-icons/fa";
export const metadata = {
  title: "Vállalkozásfejlesztés és Vállalati Biztosítások | S.Y.A Solutions",
  description:
    "Személyre szabott pénzügyi megoldások vállalkozásoknak. Céges tartalékképzés, nyugdíjtervezés, vagyonvédelem és finanszírozási tanácsadás egy helyen. Kérjen konzultációt!",
};

const breadcrumbItems = [
  {
    label: "Vállalkozás támogatás és biztosítás",
    url: "/vallalkozas-tamogatas",
  },
];

export default function BusinessPage() {
  const productPillars = [
    {
      number: "1",
      title: "Vállalkozói Tartalékképzés",
      icon: <FaChartLine size={30} />,
      desc: 'Hullámzó bevételek és váratlan adóterhek? Kiszámítható, likvid tartalékképzési megoldásokat építünk, hogy a "gyengébb" hónapok, egy váratlan eszközmeghibásodás vagy egy hirtelen kiadás ne rengesse meg a vállalkozást.',
    },
    {
      number: "2",
      title: "Szakmai és Tevékenységi Felelősségbiztosítás",
      icon: <FaStore size={30} />,
      desc: "Kiszámítható védelem szolgáltatóknak, üzlettulajdonosoknak és kivitelezőknek. Ha egy apró hiba vagy baleset miatt kártérítést követelnek a vállalkozástól, a biztosító átvállalja a milliós költségeket, megmentve ezzel a céget.",
    },
    {
      number: "3",
      title: "Céges Autók és KKV Flották",
      icon: <FaTruck size={30} />,
      desc: "Akár 1-2 furgonról, akár egy kisebb gépparkról van szó, megversenyeztetjük a hazai piacot. Költséghatékony KGFB és CASCO csomagok, gyors csereautó-asszisztenciával, hogy a munka egyetlen napra se álljon le.",
    },
    {
      number: "4",
      title: "KKV Finanszírozás és Hitelek",
      icon: <FaHandshake size={30} />,
      desc: "Növekedne, de hiányzik a tőke? Független összehasonlítással segítünk megtalálni a legkedvezőbb forgóeszköz-hiteleket, lízingeket és államilag támogatott (pl. Széchenyi Kártya) konstrukciókat a szintlépéshez.",
    },
    {
      number: "5",
      title: "Cégvezetői és Kulcsember Védelem",
      icon: <FaUserShield size={30} />,
      desc: "Egy kisvállalkozásnál a tulajdonos a motor. Mi történik, ha egy betegség vagy baleset miatt hetekre kiesik a munkából? Jövedelempótló megoldásaink garantálják, hogy a fix költségek és a család életszínvonala ilyenkor is biztosítva legyen.",
    },
    {
      number: "6",
      title: "Vállalkozói Nyugdíjtervezés",
      icon: <FaPiggyBank size={30} />,
      desc: "Egyéni vállalkozóként vagy KATA/átalányadó mellett az állami nyugdíj minimális lesz. Államilag támogatott, adóoptimalizált (akár a cégből költségként elszámolható) nyugdíjprogramokkal segítünk felépíteni a privát biztonságát.",
    },
    {
      number: "7",
      title: "Táppénz-kiegészítés és Jövedelempótlás",
      icon: <FaNotesMedical size={30} />,
      desc: "Fodrász, műkörmös vagy klímaszerelő? Ha egy baleset vagy betegség miatt hetekre kiesik a munkából, a bevétel azonnal nullára csökken, miközben a fix költségek (Kamarai tagdíj, könyvelő, bérleti díj) maradnak. Az állami táppénz minimális – mi olyan védőhálót építünk, ami azonnal fizet, hogy ne élje fel a tartalékait a lábadozás alatt.",
    },
    {
      number: "8",
      title: "Nyugdíjtervezés Átalányadózóknak (és KATA-soknak)",
      icon: <FaCoins size={30} />,
      desc: "Átalányadózóként vagy KATA-sként a minimálbér után fizetett járulékok miatt a várható állami nyugdíj drasztikusan alacsony lesz. Segítünk kihasználni a maximális állami adójóváírásokat, és felépíteni egy olyan privát nyugdíjportfóliót, amivel nem kell élete végéig a szalonban vagy a létrán állnia.",
    },
    {
      number: "9",
      title: "Kiterjesztett Szakmai Felelősségbiztosítás",
      icon: <FaWrench size={30} />,
      desc: "Mi történik, ha egy klímaszerelés közben elázik az ügyfél drága parkettája, vagy egy szépészeti beavatkozás nem a várt eredménnyel zárul? Egy apró hiba is több százezres kártérítést vonhat maga után. Speciális, szakmára szabott felelősségbiztosításokkal védjük meg az egyéni vállalkozókat a váratlan pereskedésektől és kártérítésektől.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-feher pb-[100px]">
      {/* ================= HERO SZEKCIÓ ================= */}
      <Hero
        mainTitle={
          <>
            Védőháló és pénzügyi{" "}
            <span className="text-gradient-to-r from-white via-vilagos to-white/70">
              stabilitás
            </span>{" "}
            hazai vállalkozóknak.
          </>
        }
        justOnePicture={
          Business
        } /* Ide a céges hős-kép változója jöjjön (pl. Business/Company) */
        crumbs={breadcrumbItems}
      ></Hero>

      {/* ================= SZOLGÁLTATÁSOK SZEKCIÓ ================= */}
      <section className="w-[90%] max-w-[2560px] mx-auto my-[50px]">
        <div className="w-full mx-auto mb-16">
          <h2 className="!text-[20px] md:!text-[30px] font-bold text-neutral-800 mb-6 tracking-tight">
            Pénzügyi biztonság a vállalkozás minden életszakaszában
          </h2>
          <p className=" text-neutral-600 leading-relaxed">
            Egy vállalkozást építeni és sikerre vinni nemcsak szakmai, hanem
            komoly pénzügyi kihívás is. A kiszámíthatatlan piaci környezet, a
            változó adójogszabályok és a folyamatos növekedési kényszer sokszor
            próbára teszik a cégvezetőket. Független szakértőként segítünk
            optimalizálni a céges kasszát: felépítjük a megfelelő likviditási
            tartalékokat, gondoskodunk a cégvezetői nyugdíjról, és olyan
            védőhálót biztosítunk, amely garantálja a vállalkozás stabilitását a
            legnehezebb helyzetekben is.
          </p>
        </div>

        <SectionTitles
          title={"Független vállalati csomagok és stratégiai tervezés"}
          bgText={"Üzleti megoldások"}
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

      {/* ================= 2. SZEKCIÓ ================= */}

      <ContactSection></ContactSection>

      <Faq slug={"vallalkozas-tamogatas"}></Faq>
    </main>
  );
}
