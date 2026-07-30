import Image from "next/image";
import Link from "next/link";
import Csoport from "@/public/images/Csoport.jpg";
import { GoDotFill } from "react-icons/go";
import { SiMinutemailer } from "react-icons/si";
import { ImWink } from "react-icons/im";
import Faq from "../../components/faq/faq";
import SectionThree from "../../components/section3/sectionThree";
import { carrierData } from "./carrierData";

export default function CarrierPage() {
  return (
    <section className="w-full">
      <div className="w-[90%] max-w-[2560px] flex flex-col mx-auto mt-[150px]">
        <SectionThree></SectionThree>
        <div className="flex flex-col gap-[15px] items-center bg-zold/50 text-feher rounded-xl px-[10px] py-[25px]">
          <h1
            className="font-black tracking-wider !text-[20px] md:!text-[45px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ÁLLÁSLEHETŐSÉG
          </h1>
          <div className="flex flex-row gap-3">
            <p>Budapest - Kaposvár</p>
          </div>
          <div className="bg-transparent text-feher p-2 rounded-full border-2 border-feher flex flex-row gap-4 shadow-md">
            {" "}
            <ImWink size={25} /> Jelenleg van nyitott pozíciónk !
          </div>
        </div>
      </div>

      <div
        id="karrier"
        className="w-[90%] max-w-[2560px] flex flex-col xl:flex-row mx-auto my-[50px] gap-[20px]"
      >
        {/* BAL OLDAL */}
        <div className="flex flex-col w-full xl:w-[33%]">
          <Image
            alt="Homeoffice álláslehetőség Budapesten"
            className="rounded-xl"
            src={Csoport}
            priority
          />
          <div>
            <h3 className="font-black font-mono underline-offset-4 underline mb-[15px]">
              {" "}
              Amit mi kínálunk neked:{" "}
            </h3>
            <div className="flex flex-row flex-wrap gap-4">
              <p className="px-[15px] py-[5px] bg-zold/50 text-feher w-fit rounded-[5px]">
                # Home Office lehetőség
              </p>
              <p className="px-[15px] py-[5px] bg-zold/50 text-feher w-fit rounded-[5px]">
                # Fejlődési lehetőség
              </p>
              <p className="px-[15px] py-[5px] bg-zold/50 text-feher w-fit rounded-[5px]">
                # Igényes, szép irodai környezet
              </p>
              <p className="px-[15px] py-[5px] bg-zold/50 text-feher w-fit rounded-[5px]">
                # Teljesítmény alapú bérezés (nincs felső limit!)
              </p>
              <p className="px-[15px] py-[5px] bg-zold/50 text-feher w-fit rounded-[5px]">
                # Kimagasló jutalék
              </p>
              <p className="px-[15px] py-[5px] bg-zold/50 text-feher w-fit rounded-[5px]">
                # Passzív jövedelem magasabb szinteken
              </p>
            </div>
          </div>
        </div>

        {/* JOBB OLDAL */}
        <div className="flex flex-col md:flex-row  w-full xl:w-[66%] gap-[20px]">
          {carrierData.map((job) => (
            <div
              key={job.id}
              className="flex flex-col w-full xl:w-1/2 bg-text-alap rounded-xl p-[10px]"
            >
              {/* IKON */}
              <div className="w-[40px] h-[40px] rounded-full bg-[#E5FFCC] flex flex-row items-center justify-center">
                {job.icon}
              </div>

              {/* CÍM ÉS LEÍRÁS */}
              <h2
                className="!text-[35px] font-black text-feher mb-[15px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {job.title}
              </h2>
              <p className="text-feher/70 mb-[15px]">{job.description}</p>

              {/* ELVÁRÁSOK  */}
              <div className="flex flex-col gap-3 p-[5px]">
                <p className="font-bold w-fit rounded-sm bg-[#E5FFCC] p-[2]">
                  Elvárások:
                </p>
                {job.elvarasok.map((elvaras, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-2 no-wrap items-center ml-[5px]"
                  >
                    <span className="text-[#E5FFCC] font-black">
                      <GoDotFill />
                    </span>
                    <p className="text-feher">{elvaras}</p>
                  </div>
                ))}
              </div>

              {/* ÖRÜLÜNK HA:*/}
              {job.elonyok && job.elonyok.length > 0 && (
                <div className="flex flex-col gap-3 p-[5px] mt-2 mb-[15px]">
                  <p className="font-bold w-fit rounded-sm bg-[#E5FFCC] p-[2]">
                    Örülünk, ha:
                  </p>
                  {job.elonyok.map((elony, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-2 no-wrap items-center ml-[5px]"
                    >
                      <span className="text-[#E5FFCC] font-black">
                        <GoDotFill />
                      </span>
                      <p className="text-feher">{elony}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* GOMB */}
              <Link
                href="/kapcsolat"
                className="mt-auto w-fit mx-auto kapcsolat-btn flex flex-row items-center gap-3 p-[10px] px-8 rounded-full border-2 border-feher text-feher text-[20px] font-bold hover:bg-[#E5FFCC] hover:text-text-alap transition-all"
              >
                <span className="icon-slot">
                  <span className="before-hover bg-transparent">
                    <SiMinutemailer size={50} className="text-feher" />
                  </span>
                  <span className="after-hover bg-transparent">
                    <SiMinutemailer size={50} className="text-text-alap" />
                  </span>
                </span>
                <p>Kapcsolat</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Faq slug={"karrier"}></Faq>
    </section>
  );
}
