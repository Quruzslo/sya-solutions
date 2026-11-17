"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Question, EvaluationResult, ZoneType } from "./nyugdij/pension-config";
import SectionTitles from "@/components/sectionTitles";

interface CalculatorProps {
  title: string;
  description: string;
  questions: Question[];
  maxScore: number;
  onEvaluate: (
    answers: Record<number, number>,
    currentScore: number,
  ) => EvaluationResult;
  ctaText: string;
}

const zoneColors: Record<ZoneType, string> = {
  green: "#3f4603",
  yellow: "#da941a",
  red: "#c03f3f",
};

export default function StepByStepCalculator({
  title,
  description,
  questions,
  maxScore,
  onEvaluate,
  ctaText,
}: CalculatorProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Kiszámoljuk az eddigi pontokat
  const currentScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const evaluation = onEvaluate(answers, currentScore);
  const currentColor = zoneColors[evaluation.zone];
  const isComplete = currentStep >= questions.length;

  const handleAnswer = (questionId: number, points: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: points }));

    setTimeout(() => {
      if (currentStep < questions.length) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // Recharts adatok
  const chartData = [
    { name: "Pont", value: currentScore },
    { name: "Maradék", value: Math.max(0, maxScore - currentScore) },
  ];

  const activeQuestion = questions[currentStep];
  const progressPercent = (currentStep / questions.length) * 100;

  return (
    <section className="w-full flex flex-col pt-[120px] md:pt-[150px] pb-20  min-h-screen font-sans">
      <div className="w-[90%] max-w-[2560px] mx-auto flex flex-col md:flex-row gap-12 md:gap-8">
        {/* Bal oldal: Kérdés panel */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div>
            <SectionTitles
              title={"Készülj fel tudatosan az időskorra"}
              bgText={"Nyugdíj"}
            ></SectionTitles>
            <p className="text-lg text-gray-600">{description}</p>
          </div>

          {!isComplete ? (
            <div className="flex flex-col flex-grow">
              {/* Vissza gomb és Progress bar dinamikus színnel */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`text-sm font-medium transition-colors ${
                      currentStep === 0
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Vissza
                  </button>
                  <span
                    style={{
                      backgroundColor: currentColor,
                    }}
                    className={`text-sm font-medium text-white p-[5px] rounded-[5px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)]`}
                  >
                    Lépés {currentStep + 1} / {questions.length}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-fit overflow-hidden shadow-[5px_5px_10px_0px_rgba(0,0,0,0.2)]">
                  <div
                    className="h-[15px] rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: currentColor,
                    }}
                  ></div>
                </div>
              </div>

              {/* Aktív Kérdés */}
              <div
                key={activeQuestion.id}
                className="animate-fade-in flex flex-col flex-grow"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 leading-snug">
                  {activeQuestion.question}
                </h3>

                <div className="flex flex-col gap-4 mt-auto">
                  {activeQuestion.answers.map((answer, i) => {
                    const isSelected =
                      answers[activeQuestion.id] === answer.points;
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          handleAnswer(activeQuestion.id, answer.points)
                        }
                        className={`text-left w-full px-6 py-5 rounded-[10px] border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-arany bg-arany/5 text-zold font-bold shadow-sm"
                            : "border-gray-100 bg-white hover:border-gray-300 text-gray-700 font-bold hover:shadow-sm"
                        }`}
                      >
                        {answer.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Befejezett állapot panelja (Bal oldal) */
            <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col items-center justify-center min-h-[450px] animate-fade-in relative overflow-hidden">
              {/* Siker Ikon */}
              <div className="w-16 h-16 bg-zold/10 rounded-full flex items-center justify-center mb-6 text-zold">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                Sikeresen kitöltötted!
              </h2>

              <p className="text-gray-600 mb-8 text-lg text-center max-w-md">
                Nézd meg a kiértékelést a jobb oldalon, és tedd meg a következő
                lépést a jövőd érdekében.
              </p>

              {/* Információs doboz (Figyelmeztetés és tanácsadás) */}
              <div className="w-full bg-red-50 border border-gray-100 rounded-2xl p-5 mb-6 flex items-start gap-4 transition-all hover:border-gray-200">
                <div className="mt-0.5 text-arany shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    Nem ad teljes képet
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Ez a kalkuláció csak egy gyors iránymutatás. A pontos
                    helyzeted megértéséhez érdemes kérned egy{" "}
                    <strong>ingyenes tanácsadást</strong>, ahol részletes és
                    személyre szabott elemzést kapsz.
                  </p>
                </div>
              </div>

              {/* ÚJ: További szolgáltatások blokk */}
              <div className="w-full border-t border-gray-100 pt-6 mb-8 text-center">
                <p className="text-[15px] font-bold text-gray-800 mb-4">
                  Nem csak a nyugdíjban számíthatsz ránk, hanem:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "Kötelező biztosítások",
                    "Hitelkoncepció",
                    "Egészségpénztár",
                    "Személyvédelem",
                  ].map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium bg-zold/70 text-white "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      {service}
                    </span>
                  ))}
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">
                    és még sok más...
                  </span>
                </div>
              </div>

              <a
                href="/kapcsolat"
                className="bg-zold hover:bg-arany text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto text-center"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>

        {/* Jobb oldal */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end">
          <div className="sticky top-[100px] w-full bg-white rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.06)]  p-[10px] flex flex-col items-center">
            <h3 className="text-gray-700 text-[20px] font-bold mb-6">
              Kockázati mutató
            </h3>

            <div className="relative w-full h-[180px] mb-8 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {/* SVG Definiálások: Ragyogás/Árnyék effekt az aktív sávnak */}
                  <defs>
                    <filter
                      id="fancyGlow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite
                        in="SourceGraphic"
                        in2="blur"
                        operator="over"
                      />
                    </filter>
                  </defs>

                  {/* 1. Háttér sáv (vékonyabb, statikus szürke) */}
                  <Pie
                    data={[{ value: 100 }]}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={118}
                    outerRadius={142}
                    dataKey="value"
                    stroke="none"
                    fill="#F1F5F9"
                    isAnimationActive={false}
                  />

                  {/* 2. Aktív sáv (vastagabb, kerekített végekkel, árnyékkal) */}
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={110}
                    outerRadius={150}
                    cornerRadius={15}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={true}
                  >
                    <Cell
                      fill={currentColor}
                      className="transition-all duration-500"
                      style={{ filter: "url(#fancyGlow)" }}
                    />

                    <Cell fill="transparent" stroke="none" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Középső pontszám a diagramban */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-2">
                <span
                  className="text-5xl font-extrabold leading-none transition-colors duration-500"
                  style={{ color: currentColor }}
                >
                  {currentScore}
                </span>
                <span className="text-gray-500 text-sm font-medium mt-2 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                  / {maxScore} PONT
                </span>
              </div>
            </div>

            {/* Szöveges kiértékelés dinamikus címszínnel */}
            <div className="w-full text-center animate-fade-in border-t border-gray-100 pt-6">
              <h4
                className="text-2xl font-bold mb-3 transition-colors duration-500"
                style={{ color: currentColor }}
              >
                {evaluation.title}
              </h4>
              <p className="text-gray-600 text-base leading-relaxed">
                {evaluation.text}
              </p>

              {evaluation.isCritical && (
                <div className="mt-5 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium text-left">
                  {evaluation.criticalMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
