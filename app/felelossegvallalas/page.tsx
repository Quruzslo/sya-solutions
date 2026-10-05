"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7 as const, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const medalContainerVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1 as const,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const ribbonPathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2 as const, ease: "easeInOut" as const },
      opacity: { duration: 0.2 } as const,
    },
  },
};

export default function Felelossegvallalas() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section className="w-[90%] max-w-[2560px] mx-auto flex flex-col min-h-[100vh] py-[100px] md:py-[120px] gap-[50px]">
      {/* Hero rész */}
      <div className="mb-10 text-center w-full  md:mt-[50px] bg-zold/70 rounded-xl flex flex-col md:flex-row items-center justify-center shadow-[0px_0px_10px_2px_rgba(0,0,0,0.6)]">
        <div className="w-full md:w-1/2 p-[15px]">
          <p className="text-feher text-[15px] font-bold">Diákoktatás</p>
          <div className="w-[40px] h-[4px] mx-auto bg-feher rounded-full my-[15px]" />
          <h1
            style={{ fontFamily: "var(--font-inter)" }}
            className="!text-[20px] md:!text-[35px] font-bold text-feher mb-4 "
          >
            Tudást adunk, amely értéket teremt a jövőben.
          </h1>
          <div className="flex flex-row gap-[15px] mx-auto items-center justify-center">
            <div className="felelosseg-wrapper relative flex flex-col border-2 border-feher rounded-full p-[5px]">
              <Image
                width={45}
                height={45}
                alt="Iskolai pénzügyi oktatás"
                src="/icons/schoolkid.svg"
                className=""
              />
              <div className="felelosseg-leiras w-fit md:w-[300px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.6)] flex flex-col absolute top-[calc(100%+15px)] bg-white z-[2] p-[10px] rounded-[10px]">
                <div className="w-[30px] h-[30px] bg-white rounded-md mx-auto rotate-[45deg] mt-[-15px]" />
                <p className="text-zold font-bold ">
                  Pénzügyi tudatosság már az iskolában.
                </p>
              </div>
            </div>

            <div className="w-[35px] h-[6px] rounded-full bg-feher/50 my-auto" />
            <div className="felelosseg-wrapper relative flex flex-col border-2 border-feher rounded-full p-[5px]">
              <Image
                width={45}
                height={45}
                alt="Iskolai pénzügyi oktatás"
                src="/icons/university.svg"
                className=" md:w-[60px] md:h-[60px]"
              />
              <div className="felelosseg-leiras w-fit md:w-[300px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.6)] flex flex-col absolute top-[calc(100%+15px)] bg-white z-[2] p-[10px] rounded-[10px]">
                <div className="w-[30px] h-[30px] bg-white rounded-md mx-auto rotate-[45deg] mt-[-15px]" />
                <p className="text-zold font-bold ">
                  Célirányos egyetemi tanulmányok
                </p>
              </div>
            </div>
            <div className="w-[35px] h-[6px] rounded-full bg-feher/50 my-auto" />
            <div className="felelosseg-wrapper relative flex flex-col border-2 border-feher rounded-full p-[10px]">
              <Image
                width={45}
                height={45}
                alt="Iskolai pénzügyi oktatás"
                src="/icons/family.svg"
                className=" md:w-[75px] md:h-[75px]"
              />
              <div className="felelosseg-leiras w-fit md:w-[300px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.6)] flex flex-col absolute top-[calc(100%+15px)] bg-white z-[2] p-[10px] rounded-[10px]">
                <div className="w-[30px] h-[30px] bg-white rounded-md mx-auto rotate-[45deg] mt-[-15px]" />
                <p className="text-zold font-bold ">
                  Családi biztonság megteremtése, kiszámítható pénzügyi modell.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col relative  ">
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="origin-right relative w-full md:w-fit rounded-[10px]  felelosseg-herokep md:ml-auto"
          >
            {/* <div className="absolute w-full h-full border-3 border-feher top-[0px] left-[0px] rounded-[10px]" /> */}
            <Image
              width={1300}
              height={1300}
              alt="Pénzügyi szemléletmód oktatás oskolásoknak. Pénzügyi tanácsadás felnőtteknek"
              src="/images/diakok.png"
              className="relative h-fit w-full md:h-[450px] object-contain rounded-[10px] mx-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] xl:mt-[-100px]"
            />

            <div className="absolute bottom-0 left-0 w-full z-1 text-feher pt-[35px] bg-gradient-to-t from-black to-transparent  rounded-[10px]">
              <h2 className="!text-[20px] font-bold">
                - Iskolai pénzügyi oktatás -
              </h2>
              <p>Keressen minket bizalommal!</p>
              <div className="flex flex-row gap-[5px] p-[10px] justify-center items-center">
                <p>kapcsolat@sya-solutions.hu</p>
                <p>|</p>
                <p>+36 20 369 4251</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="!text-[20px] font-bold">
          Számunkra a pénzügyi tanácsadás többet jelent, mint számok,
          megtakarítások és pénzügyi döntések. Hiszünk abban, hogy a valódi
          értékteremtés ott kezdődik, amikor tudást és szemléletet adunk át,
          amely hosszú távon is hozzájárul az emberek biztonságához és
          lehetőségeihez.
        </h2>
      </div>
      <div className=" mb-10 grid grid-cols-1 md:grid-cols-3 gap-[25px]">
        <div className="flex flex-col relative bg-zold/70 text-white p-[10px] rounded-[10px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]">
          <p>
            Kiemelten fontosnak tartjuk a fiatal generáció pénzügyi edukációját.
            A mai fiatalok hamar kerülnek olyan élethelyzetekbe, ahol önálló
            pénzügyi döntéseket kell meghozniuk, miközben sok esetben kevés
            gyakorlati ismerettel rendelkeznek a pénzügyek világáról.
          </p>
        </div>
        <div className="flex flex-col relative bg-zold/70 text-white p-[10px] rounded-[10px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]">
          <p>
            Szakmai tudásunkkal rendszeresen jelen vagyunk iskolákban, ahol a
            diákok számára közérthető, gyakorlatias és életközeli módon mutatjuk
            be a pénzügyi tudatosság alapjait. Beszélgetünk a pénz értékéről, a
            tudatos gazdálkodásról, a megtakarításokról, a hosszú távú
            tervezésről és a felelős pénzügyi döntések jelentőségéről.
          </p>
        </div>
        <div className="flex flex-col relative bg-zold/70 text-white p-[10px] rounded-[10px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]">
          <p>
            Célunk, hogy a fiatalok ne csupán pénzügyi fogalmakat ismerjenek
            meg, hanem kialakítsanak egy olyan tudatos pénzügyi szemléletet,
            amelyre önálló életük során magabiztosan építhetnek. Mert hisszük,
            hogy a pénzügyi biztonság egyik legfontosabb alapja a megfelelő
            tudás.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] items-center">
        <div className="flex flex-col gap-[25px]">
          <h2 className="!text-[20px] font-bold">
            A jövő generációjának pénzügyi tudatosságába fektetett energia a
            társadalom egyik legértékesebb befektetése. Mi pedig szeretnénk
            ennek aktív részesei lenni.
          </h2>

          <div className="relative flex flex-col items-center justify-center w-full py-6">
            <div className="relative z-10 flex flex-col gap-[15px] text-[18px] md:text-[20px] font-bold bg-arany text-feher p-[15px] px-[25px] rounded-full items-center justify-center shadow-lg">
              <p className="text-center">
                Nemcsak pénzügyi megoldásokat építünk. Tudatosabb jövőt is.
              </p>
            </div>

            <motion.div
              className="relative flex items-center justify-center w-[150px] h-[70px] mx-auto mt-[-10px]"
              variants={medalContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <svg
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
                viewBox="0 0 150 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 15 10 C 15 90, 135 90, 135 10"
                  stroke="var(--color-arany)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  variants={ribbonPathVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                />
              </svg>

              <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-[50px] h-[50px] rounded-full bg-arany mt-[25px]">
                <Image
                  alt="Pénzügyi tudatosság medál"
                  width={30}
                  height={30}
                  sizes="50px"
                  src="/icons/ribbon.svg"
                  className="w-[30px] h-[30px] object-contain "
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
        >
          <motion.div
            variants={imageVariants}
            onClick={() =>
              setSelectedImage({
                src: "/images/suli-oktatas1.jpg",
                alt: "Pénzügyi tudatosság oktatás az iskolákban",
              })
            }
            className="sm:row-span-2 relative overflow-hidden rounded-[10px] shadow-lg group h-[280px] sm:h-full min-h-[300px] cursor-pointer"
          >
            <Image
              alt="Pénzügyi tudatosság oktatás az iskolákban"
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              src="/images/suli-oktatas1.jpg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
          </motion.div>

          <motion.div
            variants={imageVariants}
            onClick={() =>
              setSelectedImage({
                src: "/images/suli-oktatas-2.jpg",
                alt: "Pénzügyi tudatosság oktatás az iskolákban",
              })
            }
            className="relative overflow-hidden rounded-[10px] shadow-lg group h-[180px] sm:h-[145px] cursor-pointer"
          >
            <Image
              alt="Pénzügyi tudatosság oktatás az iskolákban"
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              src="/images/suli-oktatas-2.jpg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
          </motion.div>

          <motion.div
            variants={imageVariants}
            onClick={() =>
              setSelectedImage({
                src: "/images/suli-oktatas-3.jpg",
                alt: "Pénzügyi tudatosság oktatás az iskolákban",
              })
            }
            className="relative overflow-hidden rounded-[10px] shadow-lg group h-[180px] sm:h-[145px] cursor-pointer"
          >
            <Image
              alt="Pénzügyi tudatosság oktatás az iskolákban"
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              src="/images/suli-oktatas-3.jpg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 pt-[120px] z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-[120px] right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 z-10 cursor-pointer"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[calc(100vh-160px)] mt-auto w-full h-full flex items-center justify-center cursor-default"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain rounded-lg drop-shadow-2xl"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
