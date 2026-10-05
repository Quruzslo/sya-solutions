"use client";
import { useState } from "react";
import rolunkData from "./rolunkData";
import Image from "next/image";
import SectionTitles from "@/components/sectionTitles";

type MemberType = (typeof rolunkData)[0];

export default function Rolunk() {
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);

  // Desktop layout
  const desktopHiveLayout: Array<{
    memberId?: number;
    isDecorative?: boolean;
  }> = [
    // 1. sor (8 elem)
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 0 }, // Viola
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 1 }, // Zsófi
    { isDecorative: true },
    { isDecorative: true },

    // 2. sor (7 elem)
    { isDecorative: true },
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 2 }, // Dani
    { isDecorative: true },
    { isDecorative: true },
    { isDecorative: true },

    // 3. sor (8 elem)
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 4 }, // Inez
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 3 }, // Zsani
    { isDecorative: true },
    { isDecorative: true },

    // 4. sor (7 elem)
    { isDecorative: true },
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 5 }, // Levi
    { isDecorative: true },
    { isDecorative: true },
    { isDecorative: true },
  ];

  // Mobile layout
  const mobileHiveLayout: Array<{ memberId?: number; isDecorative?: boolean }> =
    [
      // 1. sor (4 elem)
      { memberId: 0 }, // Viola
      { isDecorative: true },

      { isDecorative: true },
      { memberId: 1 }, // Zsófi

      // 2. sor (3 elem)
      { isDecorative: true },
      { memberId: 2 }, // Dani
      { isDecorative: true },

      // 3. sor (4 elem)

      { memberId: 4 },
      { isDecorative: true }, // Inez
      { isDecorative: true },
      { memberId: 3 }, // Zsani

      // 4. sor (3 elem)
      { isDecorative: true },
      { memberId: 5 }, // Levi
      { isDecorative: true },
    ];

  const getMember = (id?: number) =>
    rolunkData.find((member) => member.id === id);

  const handleSelectMember = (member?: MemberType) => {
    if (member) {
      setSelectedMember(member);
    }
  };

  return (
    <section className="w-full flex flex-col mb-[50px] overflow-x-auto">
      <SectionTitles title={"Csapatunk"} bgText={"Akik segítenek az utadon"} />

      {/* MOBIL KAPTÁR */}
      <div className="flex flex-col items-center py-6 lg:hidden">
        <div className="flex">
          {mobileHiveLayout.slice(0, 4).map((cell, i) => (
            <HiveCell
              key={`m-row1-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
            />
          ))}
        </div>

        <div className="flex sm:-mt-[15px]">
          {mobileHiveLayout.slice(4, 7).map((cell, i) => (
            <HiveCell
              key={`m-row2-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
            />
          ))}
        </div>

        <div className="flex sm:-mt-[15px]">
          {mobileHiveLayout.slice(7, 11).map((cell, i) => (
            <HiveCell
              key={`m-row3-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
            />
          ))}
        </div>

        <div className="flex sm:-mt-[15px]">
          {mobileHiveLayout.slice(11, 14).map((cell, i) => (
            <HiveCell
              key={`m-row4-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP KAPTÁR */}
      <div className="hidden lg:flex flex-col items-center py-6">
        <div className="flex">
          {desktopHiveLayout.slice(0, 8).map((cell, i) => (
            <HiveCell
              key={`d-row1-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
            />
          ))}
        </div>

        <div className="flex lg:-mt-[20px]">
          {desktopHiveLayout.slice(8, 15).map((cell, i) => (
            <HiveCell
              key={`d-row2-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
            />
          ))}
        </div>

        <div className="flex lg:-mt-[20px]">
          {desktopHiveLayout.slice(15, 23).map((cell, i) => (
            <HiveCell
              key={`d-row3-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
            />
          ))}
        </div>

        <div className="flex lg:-mt-[20px]">
          {desktopHiveLayout.slice(23, 30).map((cell, i) => (
            <HiveCell
              key={`d-row4-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
            />
          ))}
        </div>
      </div>

      {/* popup */}
      {selectedMember && (
        <div
          className="fixed inset-0 pt-[100px] md:pt-[130px] pb-10 z-50 flex items-start justify-center bg-black/60 overflow-y-auto backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full md:w-[650px] min-h-[500px] h-full max-h-[1200px] bg-transparent rounded-[10px] flex flex-col justify-end items-center text-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-feher transition duration-300 p-1 z-[20] border-2 border-transparent hover:border-2 hover:border-red-300 rounded-full"
              aria-label="Bezárás"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Nagyobb kép */}
            <div className="w-full h-full absolute inset-0  mx-auto z-0">
              <Image
                src={selectedMember.img}
                alt={selectedMember.name}
                fill
                className="object-cover object-top rounded-[10px]"
                sizes=""
              />
            </div>

            <div className="flex flex-col absolute top-[5px] left-[5px] bg-gradient-to-r from-zold to-transparent p-4 rounded-l-md pr-12 z-10">
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                {selectedMember.name}
              </h3>

              <p className="text-sm font-semibold text-feher/80 mb-3">
                {(selectedMember as any).role}
              </p>
            </div>

            {/* Név és leírás */}
            <div className="z-10 w-full p-[10px] rounded-b-[10px] bg-gradient-to-t from-black to-transparent pt-[100px]">
              <p className="text-neutral-100 text-start text-[15px] overflow-y-auto max-h-[150px]">
                {(selectedMember as any).description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function HiveCell({
  cell,
  getMember,
  onSelect,
}: {
  cell: { memberId?: number; isDecorative?: boolean };
  getMember: (id?: number) => MemberType | undefined;
  onSelect: (member?: MemberType) => void;
}) {
  const member = getMember(cell.memberId);

  return (
    <div
      onClick={() => member && onSelect(member)}
      className={`relative w-[50px] h-[50px] sm:w-[75px] sm:h-[75px] lg:w-[100px] lg:h-[100px] transition-all ${
        member ? "cursor-pointer hover:scale-105 hover:z-10" : ""
      }`}
    >
      <div className="w-full h-full [mask-image:url(/masks/hexagon.svg)] [-webkit-mask-image:url(/masks/hexagon.svg)] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-position:center]">
        {member ? (
          <Image
            alt={member.name}
            fill
            src={member.img}
            className="object-cover object-top"
            sizes="(max-width: 1024px) 75px, 150px"
          />
        ) : (
          <div className="w-full h-full bg-zold/20" />
        )}
      </div>
    </div>
  );
}
