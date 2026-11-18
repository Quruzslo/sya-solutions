"use client";
import StepByStepCalculator from "../StepByStepCalculator";
import { pensionQuestions, evaluatePension } from "./pension-config";
import Hero from "@/components/hero/hero";

const breadcrumbItems = [
  { label: "Nyugdíj kalkulátor", url: "/kalkulator/nyugdij" },
];

export default function PensionCalculatorPage() {
  return (
    <>
      <Hero
        mainTitle={<>Nyugdíj megtakarítás kalkulátor</>}
        justOnePicture={"/images/nyugdíjkalkuláció.jpg"}
        crumbs={breadcrumbItems}
        needBtns={false}
        needStat={false}
      ></Hero>

      <StepByStepCalculator
        title="Nyugdíjkiegészítési kockázati térkép"
        description="5 perc alatt kiderül, milyen zónában vagy és mennyire vagy felkészülve a nyugdíjas éveidre."
        questions={pensionQuestions}
        maxScore={36}
        onEvaluate={evaluatePension}
        ctaText="Személyre szabott nyugdíjtervet kérek"
      />
    </>
  );
}
