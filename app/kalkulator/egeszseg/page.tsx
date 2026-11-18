"use client";
import StepByStepCalculator from "../StepByStepCalculator";
import { healthQuestions, evaluateHealth } from "./health-config";
import Hero from "@/components/hero/hero";
import Faq from "../../../components/faq/faq";

const breadcrumbItems = [
  { label: "Kalkulátorok", url: "/#kalkulatorok" },
  { label: "Egészség és baleset kalkulátor", url: "/kalkulator/egeszseg" },
];

export default function HealthCalculatorPage() {
  return (
    <>
      <Hero
        mainTitle={<>Védelmi teszt: mennyire vagy pénzügyileg védett?</>}
        justOnePicture={"/images/egeszsegbiztositas.jpg"}
        crumbs={breadcrumbItems}
        needBtns={false}
        needStat={false}
      ></Hero>

      <StepByStepCalculator
        title="Egészség- és balesetvédelmi kockázati térkép"
        description="12 rövid kérdés, nagyjából 5 perc. Megmutatja, mennyire vagy pénzügyileg védett egy váratlan haláleset, súlyos betegség, baleset vagy hosszabb munkaképtelenség esetén. Nem biztosítási ajánlat és nem orvosi tanács, hanem egy gyors, őszinte előszűrés."
        questions={healthQuestions}
        maxScore={36}
        onEvaluate={evaluateHealth}
        ctaText="Személyre szabott védelmi tervet kérek"
      />
      <Faq slug={"egeszseg-es-balesetbiztositas"}></Faq>
    </>
  );
}
