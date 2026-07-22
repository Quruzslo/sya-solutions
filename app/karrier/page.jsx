import Image from "next/image";
import Link from "next/link";
import Csoport from "@/public/images/Csoport.jpg";
import { GoDotFill } from "react-icons/go";
import { SiMinutemailer } from "react-icons/si";
import { ImWink } from "react-icons/im";
import Faq from "../../components/faq/faq";

const carrierData = [
  {
    id: 1,
    title: "Asszisztens állás",
    description:
      "Ha szeretsz rendszerezni, szereted a fiatalos lendületet és fontos a work-life balance, akkor köztünk a helyed!",
    icon: (
      <svg
        fill="#3f4603"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="25px"
        height="25px"
        viewBox="0 0 31.361 31.361"
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path d="M22.277,18.415c-3.574,0-6.474,2.897-6.474,6.474c0,3.574,2.899,6.473,6.474,6.473s6.475-2.897,6.475-6.473 C28.752,21.312,25.853,18.415,22.277,18.415z M20.889,28.869l-3.457-3.456l1.357-1.358l2.1,2.1l4.568-4.568l1.356,1.357 L20.889,28.869z"></path>
            <path d="M4.326,28.289V1.719h13.363v6.884h6.885v9.22c0.612,0.198,1.188,0.478,1.719,0.819V7.891L18.401,0H2.609v30.008h14.293 c-0.486-0.51-0.9-1.087-1.227-1.719H4.326z"></path>
            <circle cx="8.788" cy="11.686" r="2.426"></circle>
            <rect x="13.391" y="10.246" width="8.238" height="2.88"></rect>
            <circle cx="8.788" cy="18.094" r="2.426"></circle>
            <path d="M21.629,17.488v-0.834h-8.238v2.88h3.744C18.324,18.391,19.891,17.639,21.629,17.488z"></path>
            <circle cx="8.788" cy="24.19" r="2.426"></circle>
            <path d="M13.391,22.751v2.88h1.49c-0.024-0.245-0.038-0.492-0.038-0.742c0-0.744,0.113-1.459,0.316-2.138H13.391z"></path>
          </g>
        </g>
      </svg>
    ),
    elvarasok: [
      "Igényesség saját munkádra",
      "Jó kommunikáció",
      "Pontosság",
      "Helyesírás",
      "Legalább minimális tapasztalat Word és Excel terén",
      "Barátságos kommunikáció",
      "Csapatjáték",
    ],
    elonyok: [
      "Érdekel a pénzügy",
      "Lelkes és rugalmas vagy",
      "Motivál a pénzügyi szabadságod",
    ],
  },
  {
    id: 2,
    title: "Pénzügyi Tanácsadó",
    description:
      "Nálunk nem a többéves szakmai múlt, hanem a hozzáállásod a döntő! Ha kiválóan kommunikálsz, érdekel a gazdaság világa és szeretsz emberekkel foglalkozni, egy támogató csapatban építheted fel a saját karrieredet.",
    icon: (
      <svg
        fill="#3f4603"
        width="25px"
        height="25px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path>
      </svg>
    ),
    elvarasok: [
      "Kiváló kommunikációs és kapcsolatteremtő készség",
      "Nyitottság a folyamatos tanulásra és fejlődésre",
      "Céltudatos, sikerorientált és önálló személyiség",
      "Érdeklődés a pénzügyi piacok és a gazdaság iránt",
      "Magabiztos fellépés és empátia",
      "Minimum középfokú végzettség (érettségi)",
    ],
    elonyok: [
      "Van bármilyen értékesítésben vagy ügyfélszolgálaton szerzett tapasztalatod",
      "Rendelkezel kapcsolati tőkével",
      "Nem hoz zavarba a telefonálás",
    ],
  },
];

export default function CarrierPage() {
  return (
    <section className="w-full">
      <div className="w-[90%] max-w-[2560px] flex flex-col mx-auto mt-[150px]">
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

      <div className="w-[90%] max-w-[2560px] flex flex-col xl:flex-row mx-auto my-[50px] gap-[20px]">
        {/* BAL OLDAL */}
        <div className="flex flex-col w-full xl:w-[33%]">
          <Image
            alt="Homeoffice álláslehetőség Budapesten"
            className="rounded-xl"
            src={Csoport}
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
