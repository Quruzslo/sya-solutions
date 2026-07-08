import { headers as getHeaders } from "next/headers.js";

import Hero from "../components/hero/hero";
import SectionOne from "../components/section1/sectionOne";
import SectionTwo from "../components/section2/sectionTwo";
import SectionThree from "../components/section3/sectionThree";
import FavProds from "../components/section4/favProducts";

import "./styles.css";

export default async function HomePage() {
  const headers = await getHeaders();

  return (
    <section className="w-full flex flex-col  ">
      <Hero
        mainTitle={
          <>
            Megbízható pénzügyi döntések{" "}
            <span className=" text-gradient-to-r from-white via-vilagos to-white/70">
              személyes
            </span>{" "}
            igényekre szabva
          </>
        }
        needBtns={true}
        needStat={true}
        justOnePicture={false}
        crumbs={null}
      ></Hero>
      <SectionOne></SectionOne>
      <SectionTwo></SectionTwo>
      <SectionThree></SectionThree>
      <FavProds></FavProds>
    </section>
  );
}
