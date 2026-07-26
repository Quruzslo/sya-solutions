"use client";
import SectionTitles from "../sectionTitles";
import TeamCard from "./teamCard";
import TeamBigPic from "./teamBigPic";
import { useState } from "react";
// képek---------
import Zso from "../../public/images/zso.jpg";
import Dani from "../../public/images/danikep.jpg";
import Zsani from "../../public/images/Zsanipic.jpg";
import Viola from "../../public/images/Viola.jpg";

export default function SectionOne() {
  const [activeMember, setActiveMember] = useState({
    image: Zso,
    title: "Tanácsadó",
    name: "Szőgyényi Zsófia",
    desc: "Higgadt, emberközpontú és hihetetlenül motivált. Számára az a legnagyobb sikerélmény, ha a tudásával másoknak segíthet.",
    isActive: 2,
  });

  return (
    <div
      id="csapat"
      className=" w-[90%] max-w-[2560px] rounded-[20px] flex flex-col mx-auto py-[50px]"
    >
      <SectionTitles
        title={"Csapatunk"}
        bgText={"Akik segítenek az utadon"}
      ></SectionTitles>
      <div className="w-full flex flex-col xl:flex-row gap-[20px] min-h-[650px] items-center overflow-hiden pb-[35px]">
        <div className="flex w-[100%] xl:w-[50%] h-full ">
          <TeamBigPic
            image={activeMember.image}
            title={activeMember.title}
            name={activeMember.name}
            desc={activeMember.desc}
          ></TeamBigPic>
        </div>
        <div className="flex w-full xl:w-1/2 min-h-[350px] items-center justify-center p-4">
          {/* Külső wrapper: Ez felel a négyzet alakért (aspect-square), a méretért és az árnyékért */}
          <div className="w-full max-w-[450px] aspect-square mx-auto drop-shadow-[10px_10px_15px_rgba(0,0,0,0.6)]">
            {/* Belső wrapper: Ez maga a kör, benne a grid-del */}
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full [clip-path:circle(50%_at_50%_50%)] overflow-hidden bg-gray-100">
              <TeamCard
                image={Viola}
                title={"Fiókvezető"}
                name={"Vincze Viola"}
                desc={
                  "Átfogó piaci ismereteivel és precizitásával azon dolgozik, hogy csapatunk a legmegbízhatóbb pénzügyi megoldásokat és maximális biztonságot nyújtsa ügyfeleink számára."
                }
                num={1}
                isActive={activeMember.isActive}
                setActiveMember={setActiveMember}
              />
              <TeamCard
                image={Zso}
                title={"Tanácsadó Leader"}
                name={"Szőgyényi Zsófia "}
                desc={
                  "Higgadt és emberközpontú szakember. Legfontosabb célja, hogy naprakész tudásával érthetővé tegye a pénzügyeket, és stabil hátteret építsen ügyfelei számára."
                }
                num={2}
                isActive={activeMember.isActive}
                setActiveMember={setActiveMember}
              />
              <TeamCard
                image={Dani}
                title={"Tanácsadó"}
                name={"Kis Dániel"}
                desc={
                  "Lendületes, mégis rendkívül megfontolt szakember. A pénzügyek világa számára hivatás és szenvedély, így folyamatosan a legelőnyösebb, személyre szabott megoldásokat kutatja."
                }
                num={3}
                isActive={activeMember.isActive}
                setActiveMember={setActiveMember}
              />
              <TeamCard
                image={Zsani}
                title={"Tanácsadó"}
                name={"Szabó Zsanett"}
                desc={
                  "Proaktív tanácsadó, aki szívvel-lélekkel képviseli a hozzá fordulók érdekeit. Kimeríthetetlen energiájával és lendületével azon dolgozik, hogy ügyfelei pénzügyi céljaiból valóság legyen."
                }
                num={4}
                isActive={activeMember.isActive}
                setActiveMember={setActiveMember}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
