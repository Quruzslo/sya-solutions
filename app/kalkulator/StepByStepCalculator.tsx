"use client";
import { useState } from "react";
import { Question, EvaluationResult, ZoneType } from "./nyugdij/pension-config";
import SectionTitles from "@/components/sectionTitles";
import { motion, type Variants } from "motion/react";

const servicesList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const serviceItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

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

const services = [
  "Kötelező biztosítások",
  "Hitelkoncepció",
  "Egészségpénztár",
  "Személyvédelem",
];

export default function StepByStepCalculator({
  title,
  description,
  questions,
  maxScore,
  onEvaluate,
  ctaText,
}: CalculatorProps) {
  // kérdés id -> kiválasztott válasz indexe
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const isComplete = currentStep >= questions.length;
  const activeQuestion = questions[currentStep];
  const progressPercent = (currentStep / questions.length) * 100;

  // Csak a már leadott (továbbléptetett) válaszok számítanak bele,
  // így az aktuális kérdésnél nem lehet a mutatót figyelve válaszolni.
  const answers: Record<number, number> = {};
  for (const q of questions.slice(0, currentStep)) {
    answers[q.id] = q.answers[selected[q.id]].points;
  }

  const currentScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const evaluation = onEvaluate(answers, currentScore);
  const currentColor = zoneColors[evaluation.zone];
  const scorePercent =
    maxScore > 0 ? Math.min(100, (currentScore / maxScore) * 100) : 0;

  const hasSelection = !isComplete && selected[activeQuestion.id] !== undefined;
  const isLast = currentStep === questions.length - 1;

  const select = (questionId: number, index: number) =>
    setSelected((prev) => ({ ...prev, [questionId]: index }));

  const handleNext = () => {
    if (hasSelection) setCurrentStep((prev) => prev + 1);
  };

  return (
    <section className="w-full pt-[120px] md:pt-[150px] pb-28 md:pb-20 min-h-screen font-sans">
      <div className="w-[90%] max-w-[2560px] mx-auto">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <SectionTitles
            title={"Készülj fel tudatosan az időskorra"}
            bgText={"Nyugdíj"}
          />
          <p className="mt-3 text-lg leading-relaxed text-zinc-600">
            {description}
          </p>
        </div>

        <div className="grid items-start gap-6 lg:gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* Bal oldal: egy kérdés egyszerre */}
          <div className="overflow-hidden rounded-[10px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)] bg-white">
            {!isComplete ? (
              <>
                <div className="p-[10px]">
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="font-medium text-zinc-900">
                      Kérdés {currentStep + 1}
                      <span className="text-zinc-400">
                        {" "}
                        / {questions.length}
                      </span>
                    </span>
                    <span className="tabular-nums text-zinc-500">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                  <div className="mt-3 h-[15px] w-full overflow-hidden rounded-full bg-zinc-300">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor: currentColor,
                      }}
                    />
                  </div>
                </div>

                <div
                  key={activeQuestion.id}
                  className="animate-fade-in px-6 py-8 md:px-10 md:py-10"
                >
                  <h3 className="mb-6 text-xl md:text-[22px] font-semibold leading-snug text-zinc-900">
                    {activeQuestion.question}
                  </h3>

                  <ChoiceGroup
                    question={activeQuestion}
                    value={selected[activeQuestion.id]}
                    onSelect={(i) => select(activeQuestion.id, i)}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-zinc-100 bg-zinc-50/60 px-6 py-4 md:px-10">
                  <p className="hidden text-sm text-zinc-500 sm:block">
                    A válaszod a továbblépéssel véglegesül.
                  </p>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!hasSelection}
                    className="ml-auto h-11 rounded-full bg-zold px-6 text-[15px] font-semibold text-white transition-colors hover:bg-arany focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zold/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
                  >
                    {isLast ? "Kiértékelés" : "Tovább"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="animate-fade-in px-6 py-10 md:px-10 md:py-14">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zold/10 text-zold shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)]">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-zinc-900">
                    Sikeresen kitöltötted!
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-600">
                    Nézd meg a kiértékelést, és tedd meg a következő lépést a
                    jövőd érdekében.
                  </p>
                </div>

                <div className="bg-zold/50 px-6 py-6 md:px-10">
                  <p className="text-[15px] font-medium text-white">
                    Nem csak a nyugdíjban számíthatsz ránk, hanem:
                  </p>
                  <motion.ul
                    variants={servicesList}
                    initial="hidden"
                    animate="show"
                    className="mt-3 flex flex-wrap gap-2"
                  >
                    {services.map((service) => (
                      <motion.li
                        key={service}
                        variants={serviceItem}
                        className="rounded-[10px] bg-zold px-3 py-2 text-sm font-medium text-white"
                      >
                        {service}
                      </motion.li>
                    ))}
                    <motion.li
                      variants={serviceItem}
                      className="px-1 py-2 text-sm text-white/80"
                    >
                      és még sok más…
                    </motion.li>
                  </motion.ul>
                </div>
              </>
            )}
          </div>

          {/* Eredmény – sticky */}
          <aside
            id="eredmeny"
            className="scroll-mt-[100px] md:sticky md:top-[100px]"
          >
            <div className="overflow-hidden rounded-[10px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)] bg-white">
              <div
                className="px-6 pt-6 pb-8 md:px-8"
                style={{
                  background: `linear-gradient(180deg, ${currentColor}14 0%, transparent 100%)`,
                }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[17px] font-semibold text-zinc-900">
                    Kockázati mutató
                  </h3>
                  <span className="text-sm tabular-nums text-zinc-500">
                    {isComplete
                      ? "Kitöltve"
                      : `${currentStep} / ${questions.length} kérdés`}
                  </span>
                </div>

                <Gauge
                  percent={scorePercent}
                  color={currentColor}
                  score={currentScore}
                  maxScore={maxScore}
                />
              </div>

              <div className="px-6 pb-6 md:px-8">
                <h4
                  className="text-xl font-semibold transition-colors duration-500"
                  style={{ color: currentColor }}
                >
                  {evaluation.title}
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                  {evaluation.text}
                </p>

                {evaluation.isCritical && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-relaxed text-red-700"
                  >
                    {evaluation.criticalMessage}
                  </p>
                )}
              </div>

              <div className="border-t border-zinc-100 px-6 py-6 md:px-8">
                <h4 className="font-semibold text-zinc-900">
                  Mi a következő lépés?
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Ez a kalkuláció csak egy gyors iránymutatás. A pontos
                  helyzeted megértéséhez kérj egy{" "}
                  <strong className="font-semibold text-zinc-900">
                    ingyenes tanácsadást
                  </strong>
                  , ahol részletes, személyre szabott elemzést kapsz.
                </p>
                <a
                  href="/kapcsolat"
                  className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-zold px-6 text-[15px] font-semibold text-white transition-colors hover:bg-arany focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zold/40 focus-visible:ring-offset-2"
                >
                  {ctaText}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobilon az eredmény a kérdés alá kerül, ez a sáv mutatja közben a pontot */}
      {!isComplete && (
        <a
          href="#eredmeny"
          className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur md:hidden"
        >
          <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-zinc-900">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: currentColor }}
            />
            <span className="truncate">{evaluation.title}</span>
          </span>
          <span
            className="shrink-0 text-sm font-semibold tabular-nums"
            style={{ color: currentColor }}
          >
            {currentScore} / {maxScore}
          </span>
        </a>
      )}
    </section>
  );
}

type InputProps = {
  question: Question;
  value: number | undefined;
  onSelect: (index: number) => void;
};

function ChoiceGroup({ question, value, onSelect }: InputProps) {
  const cols =
    question.answers.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div
      role="radiogroup"
      aria-label={question.question}
      className={`grid gap-3 ${cols}`}
    >
      {question.answers.map((answer, i) => {
        const isSelected = value === i;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(i)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arany/40 ${
              isSelected
                ? "border-arany bg-arany/[0.06] text-zinc-900"
                : "border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                isSelected ? "border-arany" : "border-zinc-300"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full bg-arany transition-transform ${
                  isSelected ? "scale-100" : "scale-0"
                }`}
              />
            </span>
            <span className="font-medium leading-snug">{answer.text}</span>
          </button>
        );
      })}
    </div>
  );
}

// Minden válasz egy lépés a csúszkán (pl. "25 alatt" = 0, "25–35" = 1, ...)
function StepSlider({ question, value, onSelect }: InputProps) {
  const n = question.answers.length;
  const hasValue = value !== undefined;
  const pos = hasValue ? (value / (n - 1)) * 100 : 0;
  // A sín az első és utolsó címke közepéig tart
  const inset = `${50 / n}%`;

  return (
    <div>
      <div
        className="relative h-8"
        style={{ marginLeft: inset, marginRight: inset }}
      >
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-zinc-200" />
        <div
          className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-arany transition-[width] duration-200"
          style={{ width: hasValue ? `${pos}%` : 0 }}
        />
        {question.answers.map((_, i) => (
          <span
            key={i}
            className={`absolute top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              hasValue && i <= value ? "opacity-0" : "bg-zinc-300"
            }`}
            style={{ left: `${(i / (n - 1)) * 100}%` }}
          />
        ))}

        <input
          type="range"
          min={0}
          max={n - 1}
          step={1}
          value={value ?? 0}
          onChange={(e) => onSelect(Number(e.target.value))}
          // az első lépés kiválasztásához is, amikor a csúszka már ott áll
          onPointerUp={(e) => onSelect(Number(e.currentTarget.value))}
          aria-label={question.question}
          aria-valuetext={
            hasValue ? question.answers[value].text : "Nincs kiválasztva"
          }
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />

        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white shadow-sm transition-[left] duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-arany/25 ${
            hasValue ? "border-arany" : "border-zinc-300"
          }`}
          style={{ left: `${pos}%` }}
        />
      </div>

      <div
        className="mt-2 grid"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {question.answers.map((answer, i) => (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            onClick={() => onSelect(i)}
            className={`px-1 text-center text-xs sm:text-sm leading-tight transition-colors ${
              value === i
                ? "font-semibold text-zold"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}

const ARC = "M 24 120 A 96 96 0 0 1 216 120";
const ARC_OUTER = "M 8 120 A 112 112 0 0 1 232 120";

function Gauge({
  percent,
  color,
  score,
  maxScore,
}: {
  percent: number;
  color: string;
  score: number;
  maxScore: number;
}) {
  return (
    <div className="relative mx-auto mt-6 w-full max-w-[340px]">
      <svg viewBox="0 0 240 132" className="w-full" aria-hidden="true">
        <path
          d={ARC_OUTER}
          fill="none"
          strokeWidth={1.5}
          className="transition-all duration-500"
          style={{ stroke: color, strokeOpacity: 0.18 }}
        />
        <path
          d={ARC}
          fill="none"
          strokeWidth={20}
          strokeLinecap="round"
          className="transition-all duration-500"
          style={{ stroke: color, strokeOpacity: 0.12 }}
        />
        <path
          d={ARC}
          pathLength={100}
          fill="none"
          strokeWidth={20}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{
            stroke: color,
            strokeDasharray: `${percent} 100`,
            opacity: percent > 0 ? 1 : 0,
          }}
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span
          className="text-5xl font-bold leading-none tracking-tight tabular-nums transition-colors duration-500"
          style={{ color }}
        >
          {score}
        </span>
        <span className="mt-2 text-sm text-zinc-500">/ {maxScore} pont</span>
      </div>
    </div>
  );
}
