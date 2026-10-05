"use client";
import { useState } from "react";
import rolunkData from "./rolunkData";
import Image from "next/image";
import SectionTitles from "@/components/sectionTitles";
import { motion, AnimatePresence } from "framer-motion";

type MemberType = (typeof rolunkData)[0];

export default function Rolunk() {
  const [selectedState, setSelectedState] = useState<{
    member: MemberType;
    layoutId: string;
  } | null>(null);

  // Desktop layout (8-7-8-7 elem)
  const desktopHiveLayout: Array<{
    memberId?: number;
    isDecorative?: boolean;
  }> = [
    // 1. sor (8 elem)
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 0 },
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 1 },
    { isDecorative: true },
    { isDecorative: true },
    // 2. sor (7 elem)
    { isDecorative: true },
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 2 },
    { isDecorative: true },
    { isDecorative: true },
    { isDecorative: true },
    // 3. sor (8 elem)
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 4 },
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 3 },
    { isDecorative: true },
    { isDecorative: true },
    // 4. sor (7 elem)
    { isDecorative: true },
    { isDecorative: true },
    { isDecorative: true },
    { memberId: 5 },
    { isDecorative: true },
    { isDecorative: true },
    { isDecorative: true },
  ];

  // Mobile layout (4-3-4-3 elem)
  const mobileHiveLayout: Array<{ memberId?: number; isDecorative?: boolean }> =
    [
      // 1. sor (4 elem)
      { memberId: 0 },
      { isDecorative: true },
      { isDecorative: true },
      { memberId: 1 },
      // 2. sor (3 elem)
      { isDecorative: true },
      { memberId: 2 },
      { isDecorative: true },
      // 3. sor (4 elem)
      { memberId: 4 },
      { isDecorative: true },
      { isDecorative: true },
      { memberId: 3 },
      // 4. sor (3 elem)
      { isDecorative: true },
      { memberId: 5 },
      { isDecorative: true },
    ];

  const getMember = (id?: number) =>
    rolunkData.find((member) => member.id === id);

  const handleSelectMember = (member: MemberType, layoutId: string) => {
    setSelectedState({ member, layoutId });
    document.documentElement.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedState(null);
    document.documentElement.style.overflow = "unset";
  };

  return (
    <section className="w-full flex flex-col mb-[50px] ">
      <SectionTitles title={"Csapatunk"} bgText={"Akik segítenek az utadon"} />

      {/* MOBIL KAPTÁR */}
      <div className="flex flex-col items-center py-6 lg:hidden w-full max-w-[480px] mx-auto px-2">
        <div className="flex justify-center w-full">
          {mobileHiveLayout.slice(0, 4).map((cell, i) => (
            <HiveCell
              key={`m-row1-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
              viewType="mobile"
            />
          ))}
        </div>
        <div className="flex justify-center w-full -mt-[6.8%]">
          {mobileHiveLayout.slice(4, 7).map((cell, i) => (
            <HiveCell
              key={`m-row2-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
              viewType="mobile"
            />
          ))}
        </div>
        <div className="flex justify-center w-full -mt-[6.8%]">
          {mobileHiveLayout.slice(7, 11).map((cell, i) => (
            <HiveCell
              key={`m-row3-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
              viewType="mobile"
            />
          ))}
        </div>
        <div className="flex justify-center w-full -mt-[6.8%]">
          {mobileHiveLayout.slice(11, 14).map((cell, i) => (
            <HiveCell
              key={`m-row4-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
              viewType="mobile"
            />
          ))}
        </div>
      </div>

      {/* DESKTOP KAPTÁR */}
      <div className="hidden lg:flex flex-col items-center py-6 w-full max-w-[1100px] mx-auto px-4">
        <div className="flex justify-center w-full">
          {desktopHiveLayout.slice(0, 8).map((cell, i) => (
            <HiveCell
              key={`d-row1-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
              viewType="desktop"
            />
          ))}
        </div>
        <div className="flex justify-center w-full -mt-[3.6%]">
          {desktopHiveLayout.slice(8, 15).map((cell, i) => (
            <HiveCell
              key={`d-row2-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
              viewType="desktop"
            />
          ))}
        </div>
        <div className="flex justify-center w-full -mt-[3.6%]">
          {desktopHiveLayout.slice(15, 23).map((cell, i) => (
            <HiveCell
              key={`d-row3-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
              viewType="desktop"
            />
          ))}
        </div>
        <div className="flex justify-center w-full -mt-[3.6%]">
          {desktopHiveLayout.slice(23, 30).map((cell, i) => (
            <HiveCell
              key={`d-row4-${i}`}
              cell={cell}
              getMember={getMember}
              onSelect={handleSelectMember}
              viewType="desktop"
            />
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pt-[100px] md:pt-[130px] pb-10 z-50 flex items-start justify-center bg-black/60 overflow-y-auto backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              layoutId={selectedState.layoutId}
              className="relative w-full  md:w-[650px] min-h-[500px] h-full max-h-[1200px] bg-neutral-900 rounded-[10px] flex flex-col justify-end items-center text-center my-auto overflow-hidden shadow-2xl "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-feher transition duration-300 p-1 z-[20] border-2 border-transparent hover:border-red-300 rounded-full bg-black/30"
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

              <div className="w-full h-full absolute inset-0 mx-auto z-0">
                <Image
                  src={selectedState.member.img}
                  alt={selectedState.member.name}
                  fill
                  className="object-cover object-top rounded-[10px]"
                  sizes="(max-width: 768px) 100vw, 650px"
                  priority
                />
              </div>

              <div className="flex flex-col absolute top-[5px] left-[5px] bg-gradient-to-r from-zold to-transparent p-4 rounded-l-md pr-12 z-10">
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                  {selectedState.member.name}
                </h3>

                <p className="text-sm font-semibold text-feher/80 mb-3">
                  {(selectedState.member as any).role}
                </p>
              </div>

              <div className="z-10 w-full p-[10px] rounded-b-[10px] bg-gradient-to-t from-black to-transparent pt-[100px]">
                <p className="text-neutral-100 text-start text-[15px] overflow-y-auto max-h-[150px]">
                  {(selectedState.member as any).description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function HiveCell({
  cell,
  getMember,
  onSelect,
  viewType,
}: {
  cell: { memberId?: number; isDecorative?: boolean };
  getMember: (id?: number) => MemberType | undefined;
  onSelect: (member: MemberType, layoutId: string) => void;
  viewType: "mobile" | "desktop";
}) {
  const member = getMember(cell.memberId);

  const currentLayoutId = member
    ? `hive-member-${viewType}-${member.id}`
    : undefined;

  return (
    <div
      onClick={() =>
        member && currentLayoutId && onSelect(member, currentLayoutId)
      }
      className={`relative w-[23%] lg:w-[12%] aspect-[1/1.15] shrink-0 transition-transform duration-300 ${
        member ? "cursor-pointer hover:z-10 active:z-10" : ""
      }`}
    >
      <motion.div
        layoutId={currentLayoutId}
        className="w-full h-full filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]"
      >
        <div className="w-full h-full [mask-image:url(/masks/hexagon.svg)] [-webkit-mask-image:url(/masks/hexagon.svg)] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-position:center]">
          {member ? (
            <Image
              alt={member.name}
              fill
              src={member.img}
              className="object-cover object-top origin-top translate-y-[5%]"
              sizes="(max-width: 1024px) 25vw, 150px"
            />
          ) : (
            <div className="w-full h-full bg-zold/20" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
