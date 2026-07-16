import ContactForm from "../../components/contactForm/contactForm";
import Link from "next/link";
import Image from "next/image";
import SectionTitles from "../../components/sectionTitles";

// Ikonok---------------
import { IoMailUnreadOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";

// Képek ----------------------
import Vió from "../../public/images/Viola.jpg";
import Zsó from "../../public/images/zso.jpg";
import Zsani from "../../public/images/Zsanipic.jpg";
import Dani from "../../public/images/danikep.jpg";

const Members = [
  {
    name: "Vincze Viola",
    photo: Vió,
    title: "Fiókvezető",
    tel: "+36201234567",
  },
  {
    name: "Szőgyényi Zsófia",
    photo: Zsó,
    title: "Vezető tanácsadó",
    tel: "+36303694251",
  },
  {
    name: "Szabó Zsanett",
    photo: Zsani,
    title: "Tanácsadó",
    tel: "+36201234567",
  },
  {
    name: "Kiss Dániel",
    photo: Dani,
    title: "Tancsadó",
    tel: "+36201234567",
  },
];

const Advantages = [
  {
    id: "01",
    title: "Teljes piaci rálátás",
    subtitle: '(Nincs „csőlátás")',
  },
  {
    id: "02",
    title: "Valódi objektivitás",
    subtitle: "(nincs részrehajlás)",
  },
  {
    id: "03",
    title: "Személyre szabott csomag",
    subtitle: "(csak amire szükséged van)",
  },
  {
    id: "04",
    title: "Átlátható tervezés",
    subtitle: "(Nincs rejtett költség)",
  },
];

export default function ContactPage() {
  return (
    <section className="w-[90%] max-w-[2560px] mx-auto flex flex-col min-h-[100vh] py-[120px]">
      <SectionTitles
        title={"Keress minket bizalomal"}
        bgText={"KAPCSOLAT"}
      ></SectionTitles>
      <div className="w-full flex flex-col md:flex-row mt-[50px] gap-[15px]">
        {/* BAL OLDAL --------------------------- */}
        <div className="bal-contact w-[90%]  md:w-1/2 flex flex-col border-4 border-zold rounded-md relative p-[10px] min-h-[450px] pr-[75px] xl:pr-[100px] mr-[50px] xl:mr-0">
          <h1 className="mt-[-27px] xl:mt-[-40px] !text-[15px] xl:!text-[30px] text-zold font-bold font-mono bg-feher w-fit p-[5px]">
            Független pénzügyi szakértelem
          </h1>
          <div className="mx-auto w-full p-4 sm:p-6">
            <div className="divide-y divide-stone-200">
              <div className="flex flex-col gap-4">
                {Advantages.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex p-[10px] w-fit flex-col md:flex-row gap-2 border-l-2 border-transparent transition-colors duration-300 hover:border-zold hover:bg-stone-50/60 motion-reduce:transition-none"
                  >
                    <p className="font-mono text-sm tracking-wider text-stone-400 transition-colors duration-300 group-hover:text-zold motion-reduce:transition-none">
                      {item.id}
                    </p>
                    <div>
                      <h3 className="!text-[15px] font-bold text-stone-900">
                        {item.title}{" "}
                        <span className="font-normal text-stone-400">
                          {item.subtitle}
                        </span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tagok képei --------------------- */}
          <div className="absolute right-[-40px] xl:right-[-60px] top-0 flex h-full w-fit flex-col justify-between py-[10px]">
            {Members.map((member, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* 1. Kép konténer  */}
                <div className="peer relative z-10 h-[80px] w-[80px] xl:h-[120px] xl:w-[120px] cursor-pointer overflow-hidden rounded-full border-4 border-zold">
                  <Image
                    src={member.photo}
                    alt={member.name || "Profilkép"}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 2. Dropdown / Tooltip konténer */}
                <div className="pointer-events-none absolute top-[80px] xl:top-[120px] right-0 xl:right-[0px] z-20 w-[150px] -translate-y-2 rounded-sm bg-zold p-[10px] text-white opacity-0 transition-all duration-300 ease-out peer-hover:translate-y-0 peer-hover:opacity-100">
                  <p className="font-bold">{member.name}</p>
                  <p className="text-sm">{member.title}</p>
                  <p className="text-sm">{member.tel}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Alsó szekció balon ----------- */}
          <div className="flex flex-col w-full xl:w-1/2 items-center justify-center gap-4 mt-auto">
            <div className="w-full">
              <Link
                href="mailto:buliii1010@gmail.com"
                className="group relative flex flex-row items-center justify-between
             w-full p-[5px] rounded-full overflow-hidden
             border border-zold bg-transparent
             text-slate-700 hover:text-slate-900
             transition-colors duration-300
             before:content-[''] before:absolute before:inset-0
             before:bg-zold before:translate-x-full
             before:transition-transform before:duration-300 before:ease-out
             hover:before:translate-x-0"
              >
                <span
                  className="relative z-10 flex items-center justify-center shrink-0
                 w-8 h-8 rounded-full border border-feher bg-zold text-white text-xl
                 group-hover:text-feher transition-colors duration-300"
                >
                  <IoMailUnreadOutline />
                </span>
                <p className="relative z-10 font-bold group-hover:text-feher px-2 text-center flex-1 min-w-0 truncate">
                  buliii1010@gmail.com
                </p>

                <div className="w-8 h-8 shrink-0 relative z-10 pointer-events-none" />
              </Link>
            </div>

            <div className="w-full">
              <Link
                href="tel:+36303694251"
                className="group relative flex flex-row items-center justify-between
             w-full p-[5px] rounded-full overflow-hidden
             border border-zold bg-transparent
             text-slate-700 hover:text-slate-900
             transition-colors duration-300
             before:content-[''] before:absolute before:inset-0
             before:bg-zold before:translate-x-full
             before:transition-transform before:duration-300 before:ease-out
             hover:before:translate-x-0"
              >
                <span
                  className="relative z-10 flex items-center justify-center shrink-0
                 w-8 h-8 rounded-full border border-feher bg-zold text-white text-xl
                 group-hover:text-feher transition-colors duration-300"
                >
                  <LuPhoneCall />
                </span>
                <p className="relative z-10 font-bold group-hover:text-feher px-2 text-center flex-1 min-w-0 truncate">
                  +36 30 369 4251
                </p>

                <div className="w-8 h-8 shrink-0 relative z-10 pointer-events-none" />
              </Link>
            </div>

            <div className="w-full">
              <Link
                href="tel:+36303694251"
                className="group relative flex flex-row items-center justify-between
             w-full p-[5px] rounded-full overflow-hidden
             border border-zold bg-transparent
             text-slate-700 hover:text-slate-900
             transition-colors duration-300
             before:content-[''] before:absolute before:inset-0
             before:bg-zold before:translate-x-full
             before:transition-transform before:duration-300 before:ease-out
             hover:before:translate-x-0"
              >
                <span
                  className="relative z-10 flex items-center justify-center shrink-0
                 w-8 h-8 rounded-full border border-feher bg-zold text-white text-xl
                 group-hover:text-feher transition-colors duration-300"
                >
                  <FaMapLocationDot />
                </span>
                <p className="relative z-10 font-bold group-hover:text-feher px-2 text-center flex-1 min-w-0 truncate">
                  Buda, Menő utca 12
                </p>

                <div className="w-8 h-8 shrink-0 relative z-10 pointer-events-none" />
              </Link>
            </div>
            <div className="flex flex-row gap-3 w-full">
              <Link href="https://www.facebook.com/zsofia.szogyenyi">
                <FaFacebookF
                  size={30}
                  className="text-feher bg-zold p-[5px] rounded-full"
                />
              </Link>
              <Link href="https://www.facebook.com/zsofia.szogyenyi">
                <FaInstagram
                  size={30}
                  className="text-feher bg-zold p-[5px] rounded-full"
                />
              </Link>
              <Link href="https://sya-solutions.vercel.app/">
                <CiGlobe
                  size={30}
                  className="text-feher bg-zold p-[5px] rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* JOBB OLDAL -------------------------------- */}
        <div className="jobb-contact w-full md:w-1/2 flex flex-col xl:flex-row gap-[15px] ">
          <div className="flex flex-col md:flex-row w-full  md:w-[80%] ml-auto">
            <ContactForm></ContactForm>
          </div>
        </div>
      </div>
    </section>
  );
}
