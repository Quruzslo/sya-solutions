import { headers as getHeaders } from "next/headers.js";

import Hero from "../components/hero/hero";
import SectionOne from "../components/section1/sectionOne";
import SectionTwo from "../components/section2/sectionTwo";
import SectionThree from "../components/section3/sectionThree";
import FavProds from "../components/section4/favProducts";
import PartnerCarousel from "../components/partners/page";

import "./styles.css";

export default async function HomePage() {
  const headers = await getHeaders();

  return (
    <section className="w-full flex flex-col  ">
      <Hero
        mainTitle={
          <>
            Független pénzügyi tanácsadás{" "}
            <span className=" text-white">személyre szabott</span> stratégiával
          </>
        }
        needBtns={true}
        needStat={true}
        justOnePicture={false}
        crumbs={null}
      ></Hero>
      <SectionOne></SectionOne>
      <SectionTwo></SectionTwo>

      <FavProds></FavProds>
      <PartnerCarousel></PartnerCarousel>
    </section>
  );
}
