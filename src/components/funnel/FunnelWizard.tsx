"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Replace with real Calendly URL when available
const CALENDLY_URL = "https://calendly.com/pekka-webso";

type Step = "hero" | "pain" | "form" | "confirm";
const STEP_ORDER: Step[] = ["hero", "pain", "form", "confirm"];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "6%" : "-6%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-6%" : "6%", opacity: 0 }),
};

const slideTransition = { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

function fieldInputCls(err: boolean) {
  return `w-full bg-transparent px-4 py-3 text-[0.9375rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box${err ? " opacity-70" : ""}`;
}

// ── Step 1: Hero ───────────────────────────────────────────────────────────
function StepHero({ onNext, direction }: { onNext: () => void; direction: number }) {
  const t = useTranslations("funnel");
  const locale = useLocale();

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={slideTransition}
      className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-8 md:px-10"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        <span className="tag mb-6">{t("tag")}</span>

        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-w-white">
          {t("step1.headline")}
        </h1>

        <p className="mt-5 max-w-lg text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-[1.65] text-w-white-50">
          {t("step1.sub")}
        </p>

        <button onClick={onNext} className="btn-primary mt-8">
          <span className="btn-label">{t("step1.cta")}</span>
          <span className="btn-arrow">→</span>
        </button>

        {/* Trust stats */}
        <div className="dashed-box mt-10 flex items-stretch">
          {[
            { value: t("step1.stat1value"), label: t("step1.stat1label") },
            { value: t("step1.stat2value"), label: t("step1.stat2label") },
            { value: t("step1.stat3value"), label: t("step1.stat3label") },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center px-6 py-5 sm:px-10${i > 0 ? " relative before:absolute before:inset-y-0 before:left-0 before:w-px before:[background:var(--dash-v)]" : ""}`}
            >
              <span className="font-mono text-[1.5rem] font-normal tracking-[-0.05em] text-w-white sm:text-[2rem]">
                {stat.value}
              </span>
              <span className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.05em] text-w-white-30">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}`}
          className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30 transition-colors duration-200 hover:text-w-white"
        >
          ← {locale === "fi" ? "Palaa etusivulle" : "Back to homepage"}
        </Link>
      </div>
    </motion.div>
  );
}

// ── Step 2: Pain selector ──────────────────────────────────────────────────
interface PainOption {
  id: string;
  label: string;
  desc: string;
}

function StepPain({
  onNext,
  onBack,
  selected,
  onSelect,
  direction,
}: {
  onNext: () => void;
  onBack: () => void;
  selected: string;
  onSelect: (id: string) => void;
  direction: number;
}) {
  const t = useTranslations("funnel.step2");
  const options = t.raw("options") as PainOption[];

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={slideTransition}
      className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 md:px-10"
    >
      <div className="mx-auto w-full max-w-xl">
        <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium tracking-[-0.03em] text-w-white">
          {t("headline")}
        </h2>
        <p className="mt-2 text-[0.9375rem] text-w-white-50">{t("sub")}</p>

        <div className="mt-7 flex flex-col gap-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`group w-full dashed-box px-5 py-4 text-left transition-all duration-200 ${
                selected === opt.id ? "bg-w-accent/10" : "hover:bg-w-white-4"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`font-display text-[0.9375rem] font-bold tracking-[-0.02em] transition-colors duration-200 ${
                      selected === opt.id
                        ? "text-w-white"
                        : "text-w-white-70 group-hover:text-w-white"
                    }`}
                  >
                    {opt.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30">
                    {opt.desc}
                  </p>
                </div>
                <div
                  className={`ml-4 flex h-5 w-5 shrink-0 items-center justify-center dashed-box transition-all duration-200 ${
                    selected === opt.id ? "bg-w-accent" : ""
                  }`}
                >
                  {selected === opt.id && (
                    <span className="font-mono text-[0.5625rem] text-w-white">✓</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={onNext}
            disabled={!selected}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span className="btn-label">{t("cta")}</span>
            <span className="btn-arrow">→</span>
          </button>
          <button
            onClick={onBack}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30 transition-colors duration-200 hover:text-w-white"
          >
            ← {t("back")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Step 3: Contact form ───────────────────────────────────────────────────
interface FormValues {
  nimi: string;
  sahkoposti: string;
  puhelin: string;
  yritys: string;
}

function StepForm({
  onSubmit,
  onBack,
  direction,
  painPoint,
}: {
  onSubmit: (values: FormValues) => void;
  onBack: () => void;
  direction: number;
  painPoint: string;
}) {
  const t = useTranslations("funnel.step3");
  const locale = useLocale();
  const [values, setValues] = useState<FormValues>({
    nimi: "",
    sahkoposti: "",
    puhelin: "",
    yritys: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);

  const validators: Record<string, (v: string) => boolean> = {
    nimi: (v) => v.trim().length >= 2,
    sahkoposti: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    puhelin: (v) => v.trim().replace(/\s/g, "").length >= 6,
  };

  const fieldErr = (k: string) =>
    !!(touched[k] && validators[k] && !validators[k](values[k as keyof FormValues] ?? ""));
  const fieldOk = (k: string) =>
    !!(touched[k] && validators[k]?.(values[k as keyof FormValues] ?? ""));
  const isComplete = Object.entries(validators).every(
    ([k, fn]) => fn(values[k as keyof FormValues] ?? "")
  );

  const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: string) => () => setTouched((p) => ({ ...p, [k]: true }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ nimi: true, sahkoposti: true, puhelin: true });
    if (!isComplete) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onSubmit(values);
    }, 1400);
  };

  const painLabels: Record<string, Record<string, string>> = {
    fi: {
      "new-system": "Uusi tietojärjestelmä",
      "ai-integration": "AI-integraatio",
      legacy: "Legacy-modernisointi",
      other: "Muu haaste",
    },
    en: {
      "new-system": "New software system",
      "ai-integration": "AI integration",
      legacy: "Legacy modernization",
      other: "Other challenge",
    },
  };
  const painLabel = painPoint ? painLabels[locale]?.[painPoint] : null;

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={slideTransition}
      className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 md:px-10"
    >
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium tracking-[-0.03em] text-w-white">
            {t("headline")}
          </h2>
          {painLabel && (
            <span className="tag hidden shrink-0 sm:inline-flex">{painLabel}</span>
          )}
        </div>
        <p className="text-[0.9375rem] text-w-white-50">{t("sub")}</p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
          {/* Name */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                {t("nimi")} *
              </label>
              {fieldOk("nimi") && (
                <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>
              )}
            </div>
            <input
              type="text"
              autoComplete="name"
              placeholder={t("nimiPlaceholder")}
              value={values.nimi}
              onChange={set("nimi")}
              onBlur={blur("nimi")}
              className={fieldInputCls(fieldErr("nimi"))}
            />
            {fieldErr("nimi") && (
              <p className="mt-1 font-mono text-[0.5625rem] text-w-white-30">{t("nimiError")}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                {t("sahkoposti")} *
              </label>
              {fieldOk("sahkoposti") && (
                <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>
              )}
            </div>
            <input
              type="email"
              autoComplete="email"
              placeholder={t("sahkopostiPlaceholder")}
              value={values.sahkoposti}
              onChange={set("sahkoposti")}
              onBlur={blur("sahkoposti")}
              className={fieldInputCls(fieldErr("sahkoposti"))}
            />
            {fieldErr("sahkoposti") && (
              <p className="mt-1 font-mono text-[0.5625rem] text-w-white-30">
                {t("sahkopostiError")}
              </p>
            )}
          </div>

          {/* Phone + Company side by side */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Phone */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                  {t("puhelin")} *
                </label>
                {fieldOk("puhelin") && (
                  <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>
                )}
              </div>
              <input
                type="tel"
                autoComplete="tel"
                placeholder={t("puhelinPlaceholder")}
                value={values.puhelin}
                onChange={set("puhelin")}
                onBlur={blur("puhelin")}
                className={fieldInputCls(fieldErr("puhelin"))}
              />
              {fieldErr("puhelin") && (
                <p className="mt-1 font-mono text-[0.5625rem] text-w-white-30">
                  {t("puhelinError")}
                </p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                {t("yritys")}{" "}
                <span className="normal-case text-w-white-30">({t("yritysOptional")})</span>
              </label>
              <input
                type="text"
                autoComplete="organization"
                placeholder={t("yritysPlaceholder")}
                value={values.yritys}
                onChange={set("yritys")}
                className={fieldInputCls(false)}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={sending}
              className="btn-primary disabled:opacity-40"
            >
              <span className="btn-label">{sending ? t("sending") : t("cta")}</span>
              <span className="btn-arrow">→</span>
            </button>
            <button
              type="button"
              onClick={onBack}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30 transition-colors duration-200 hover:text-w-white"
            >
              ← {t("back")}
            </button>
          </div>

          <p className="font-mono text-[0.5625rem] tracking-[0.04em] text-w-white-30">
            {t("trust")}
          </p>
        </form>
      </div>
    </motion.div>
  );
}

// ── Step 4: Confirmation ───────────────────────────────────────────────────
function StepConfirm({ direction }: { direction: number }) {
  const t = useTranslations("funnel.step4");
  const tContact = useTranslations("yhteydenotto");
  const locale = useLocale();

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={slideTransition}
      className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 md:px-10"
    >
      <div className="mx-auto w-full max-w-xl">
        <span className="tag tag-accent mb-5 inline-block">{t("tag")}</span>

        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.035em] text-w-white">
          {t("headline")}
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-[1.65] text-w-white-50">{t("sub")}</p>

        {/* What happens next */}
        <div className="dashed-box mt-8 p-5">
          <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
            {t("nextTitle")}
          </p>
          {[t("next1"), t("next2"), t("next3")].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-2.5${
                i > 0
                  ? " relative before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:[background:var(--dash-h)]"
                  : ""
              }`}
            >
              <span className="font-mono text-[0.625rem] text-w-accent">0{i + 1}</span>
              <span className="text-[0.875rem] text-w-white-70">{item}</span>
            </div>
          ))}
        </div>

        {/* Pekka info */}
        <div className="dashed-box mt-4 grid grid-cols-[auto_1fr] gap-4 p-5">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden">
            <Image
              src="/images/team/pekka.avif"
              alt="Pekka Mattinen"
              fill
              className="object-cover object-top"
              sizes="56px"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="font-display text-[0.9375rem] font-bold tracking-[-0.02em] text-w-white">
              {tContact("pekka.name")}
            </p>
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
              {t("pekkaRole")}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={`mailto:${tContact("pekka.email")}`}
                className="font-mono text-[0.75rem] text-w-white-50 transition-colors duration-200 hover:text-w-white"
              >
                {tContact("pekka.email")}
              </a>
              <a
                href={`tel:${tContact("pekka.phone").replace(/\s/g, "")}`}
                className="font-mono text-[0.75rem] text-w-white-50 transition-colors duration-200 hover:text-w-white"
              >
                {tContact("pekka.phone")}
              </a>
            </div>
          </div>
        </div>

        {/* Calendly CTA */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-4 w-full justify-between"
        >
          <span className="btn-label">{t("calendarCta")}</span>
          <span className="btn-arrow">↗</span>
        </a>

        <Link
          href={`/${locale}`}
          className="mt-5 block text-center font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30 transition-colors duration-200 hover:text-w-white"
        >
          ← {t("home")}
        </Link>
      </div>
    </motion.div>
  );
}

// ── Main FunnelWizard ──────────────────────────────────────────────────────
export function FunnelWizard() {
  const [step, setStep] = useState<Step>("hero");
  const [direction, setDirection] = useState(1);
  const [painPoint, setPainPoint] = useState("");
  const locale = useLocale();

  const stepIndex = STEP_ORDER.indexOf(step);

  const goTo = (next: Step) => {
    setDirection(STEP_ORDER.indexOf(next) > stepIndex ? 1 : -1);
    setStep(next);
  };

  const stepLabels: Record<string, string> = locale === "fi"
    ? { hero: "Aloitus", pain: "Haaste", form: "Yhteystiedot" }
    : { hero: "Intro", pain: "Challenge", form: "Contact" };

  const visibleSteps = STEP_ORDER.filter((s) => s !== "confirm");

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Step indicator bar */}
      {step !== "confirm" && (
        <div className="shrink-0 border-b border-dashed border-w-white-15">
          <div className="mx-auto flex max-w-[90rem] px-4 sm:px-8 md:px-10">
            {visibleSteps.map((s, i) => {
              const idx = STEP_ORDER.indexOf(s);
              const isActive = s === step;
              const isDone = idx < stepIndex;
              return (
                <div
                  key={s}
                  className={`flex items-center gap-2 py-3 pr-6 sm:pr-10${
                    i > 0
                      ? " pl-6 sm:pl-10 relative before:absolute before:inset-y-0 before:left-0 before:w-px before:[background:var(--dash-v)]"
                      : ""
                  }`}
                >
                  <span
                    className={`font-mono text-[0.625rem] tracking-[0.06em] transition-colors duration-300 ${
                      isActive ? "text-w-white" : isDone ? "text-w-accent" : "text-w-white-15"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden sm:block font-mono text-[0.625rem] uppercase tracking-[0.06em] transition-colors duration-300 ${
                      isActive ? "text-w-white-50" : isDone ? "text-w-accent/60" : "text-w-white-15"
                    }`}
                  >
                    {stepLabels[s]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Animated steps */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === "hero" && (
            <StepHero key="hero" onNext={() => goTo("pain")} direction={direction} />
          )}
          {step === "pain" && (
            <StepPain
              key="pain"
              selected={painPoint}
              onSelect={setPainPoint}
              onNext={() => goTo("form")}
              onBack={() => goTo("hero")}
              direction={direction}
            />
          )}
          {step === "form" && (
            <StepForm
              key="form"
              painPoint={painPoint}
              onSubmit={() => goTo("confirm")}
              onBack={() => goTo("pain")}
              direction={direction}
            />
          )}
          {step === "confirm" && (
            <StepConfirm key="confirm" direction={direction} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
