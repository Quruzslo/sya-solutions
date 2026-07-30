"use client";

import { useState } from "react";
import SectionTitles from "../sectionTitles";
import faqData from "./faq-data";

export default function Faq({ slug }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqData = faqData.filter((data) => data.category === slug);

  return (
    <section className="w-[90%] max-w-[2560px] mx-auto my-[100px] md:my-[150px]">
      <SectionTitles title={"Amiket érdemes tisztán látni"} bgText={"F.A.Q."} />

      <div className="w-full flex flex-col gap-4">
        {filteredFaqData.map((data, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="flex flex-col border border-zold/10 rounded-xl overflow-hidden bg-feher shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                className="flex justify-between items-center p-5 text-left w-full cursor-pointer hover:bg-gray-50 transition-colors gap-[5px]"
              >
                <h3
                  className={`!text-[20px]  relative z-1 faq-title p-3 font-bold m-0 ${isOpen ? "active !text-feher" : "text-zold"}`}
                >
                  {data.title}
                </h3>

                <div className="relative w-5 h-5 flex items-center justify-center cursor-pointer ml-[5px]">
                  <span className="absolute block w-[20px] h-[4px] bg-zold rounded-full transition-transform duration-300"></span>

                  <span
                    className={`absolute block w-[20px] h-[4px] bg-zold rounded-full transition-transform duration-300 ${
                      isOpen ? "rotate-0" : "rotate-90"
                    }`}
                  ></span>
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="!text-[15px] p-5 pt-0 text-zold leading-relaxed m-0">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
