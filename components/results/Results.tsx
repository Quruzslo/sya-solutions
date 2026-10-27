import results from "./resultsData";
import SectionTitles from "../sectionTitles";
import { GiTrophyCup } from "react-icons/gi";

export default function ResultsComp() {
  return (
    <section className="flex flex-col w-full py-[50px]">
      <div className="flex flex-col w-[90%] max-w-[2560px] mx-auto">
        <SectionTitles
          title={"Eredményeink"}
          bgText={"Amikre büszkék vagyunk"}
        />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]">
          {results.map((result) => (
            <div key={result.id} className="w-full flex flex-col gap-[10px] ">
              <div className="flex flex-row gap-[5px] items-center justify-center px-[10%] py-[10px] bg-zold/50 text-white font-bold text-[20px] [clip-path:polygon(90%_0%,100%_50%,90%_100%,0%_100%,10%_50%,0%_0%)]">
                <GiTrophyCup size={25} className="fill-amber-300" />
                <span>
                  {result.year} {result.event}
                </span>
              </div>

              <ul className="flex flex-col gap-5">
                {result.member.map((m) => (
                  <div key={m} className="flex flex-row gap-[5px] items-start">
                    <span className="w-[12px] h-[12px] rounded-full bg-zold shrink-0" />
                    <p>{m}</p>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
