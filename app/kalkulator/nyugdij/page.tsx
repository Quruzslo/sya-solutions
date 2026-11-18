"use client";
import StepByStepCalculator from "../StepByStepCalculator";
import { pensionQuestions, evaluatePension } from "./pension-config";
import Hero from "@/components/hero/hero";
import Faq from "../../../components/faq/faq";

const breadcrumbItems = [
  { label: "Nyugdíj kalkulátor", url: "/kalkulator/nyugdij" },
];

export default function PensionCalculatorPage() {
  return (
    <>
      <Hero
        mainTitle={<>Nyugdíjteszt: mennyire vagy felkészülve a nyugdíjra?</>}
        justOnePicture={"/images/nyugdíjkalkuláció.jpg"}
        crumbs={breadcrumbItems}
        needBtns={false}
        needStat={false}
      ></Hero>

      <StepByStepCalculator
        title="Nyugdíjkiegészítési kockázati térkép"
        description="12 rövid kérdés, nagyjából 2 perc. A végén megtudod, mekkora a nyugdíjkockázatod, és mi az első lépés, amivel a megtakarításaidat a céljaidhoz igazíthatod."
        questions={pensionQuestions}
        maxScore={36}
        onEvaluate={evaluatePension}
        ctaText="Személyre szabott nyugdíjtervet kérek"
      />
      <Faq slug={"szemelyes-jovotervezes"}></Faq>
    </>
  );
}
