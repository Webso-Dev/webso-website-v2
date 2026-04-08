"use client";

import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FormSuccess } from "@/components/FormSuccess";
import Link from "next/link";

export function UraPage() {
  const t = useTranslations("ura");
  const locale = useLocale();
  const fi = locale === "fi";
  const items = t.raw("items") as Array<{ number: string; title: string; description: string }>;

  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({ nimi: "", sahkoposti: "", puhelin: "", viesti: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [attachment, setAttachment] = useState<{ name: string; type: string; data: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const validators: Record<string, (v: string) => boolean> = {
    nimi: (v) => v.trim().length >= 2,
    sahkoposti: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  };
  const fieldErr = (k: string) => !!(touched[k] && validators[k] && !validators[k](values[k as keyof typeof values] ?? ""));
  const fieldOk = (k: string) => !!(touched[k] && validators[k]?.(values[k as keyof typeof values] ?? ""));
  const isComplete = Object.entries(validators).every(([k, fn]) => fn(values[k as keyof typeof values] ?? ""));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAttachment({ name: file.name, type: file.type, data: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ nimi: true, sahkoposti: true });
    if (!isComplete) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, attachment }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setValues({ nimi: "", sahkoposti: "", puhelin: "", viesti: "" });
    setTouched({});
    setStatus("idle");
    setAttachment(null);
  };

  const inputCls = (k: string) =>
    `w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box${fieldErr(k) ? " opacity-80" : ""}`;

  return (
    <main className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-24 md:py-32">
            <span className="tag mb-8 inline-block">{locale === "fi" ? "Ura" : "Careers"}</span>
            <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">
              {locale === "fi"
                ? "Etsimme huippuosaajia jotka haluavat tehdä ohjelmistokehitystä tavalla, joka määrittelee alan suunnan."
                : "We're looking for top talent who want to do software engineering in a way that defines the direction of the industry."}
            </p>
          </div>
        </div>
      </section>

      {/* Reasons matches homepage Palvelut two-column pattern */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="flex flex-col md:flex-row">
            <div className="shrink-0 border-b border-dashed border-w-white-15 py-10 md:sticky md:top-[4.25rem] md:w-[36%] md:self-start md:border-b-0 md:py-0 md:pb-24 md:pt-10 md:pr-14">
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Miksi Webso" : "Why Webso"}</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
                {locale === "fi" ? "Kehitämme huippuosaajia alan eturintamassa." : "We develop top talent at the frontier of the industry."}
              </h2>
              <p className="mt-5 text-[1rem] leading-[1.7] text-w-white-50">
                {locale === "fi"
                  ? "Tiimimme ratkoo haasteita, joita harvat kehittäjät kohtaavat. Tule tekemään parasta työtäsi."
                  : "Our team solves challenges that few developers encounter. Come do your best work."}
              </p>
            </div>

            <div className="hidden shrink-0 self-stretch md:block" style={{ width: "1px", background: "var(--dash-v)" }} />

            <div className="flex-1 py-10 md:pb-24 md:pt-10 md:pl-10">
              {items.map((item, i) => (
                <div key={item.number} className={`dashed-box p-5 sm:p-8 md:p-10 ${i < items.length - 1 ? "mb-4" : ""}`}>
                  <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-16 md:py-20">
            <span className="tag mb-8 inline-block">{locale === "fi" ? "Avoimet paikat" : "Open positions"}</span>

            <div className="flex flex-col gap-4">

              {/* Senior Software Developer */}
              <div className="dashed-box p-5 sm:p-8 md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="tag-accent tag">{locale === "fi" ? "Täyspäiväinen" : "Full-time"}</span>
                      <span className="tag">Helsinki</span>
                    </div>
                    <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">
                      {locale === "fi" ? "Senior Software Developer" : "Senior Software Developer"}
                    </h3>
                    <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-white/70">
                      {locale === "fi"
                        ? "Etsimme kokenutta ohjelmistokehittäjää, joka haluaa rakentaa vaativia järjestelmiä tekoälyn avustuksella. Sinulla on vahva tekninen pohja ja halu viedä alaa eteenpäin."
                        : "We're looking for an experienced software developer who wants to build demanding systems with AI assistance. You have a strong technical foundation and the drive to push the industry forward."}
                    </p>
                  </div>
                  <a href="https://forms.gle/vrN5JfPxdmY8sE9G7" target="_blank" rel="noopener noreferrer" className="btn-outline shrink-0 inline-flex self-start">
                    <span className="btn-label">{locale === "fi" ? "Hae paikkaa" : "Apply"}</span>
                    <span className="btn-arrow text-w-white-30">→</span>
                  </a>
                </div>
              </div>

              {/* Junior Software Developer */}
              <div className="dashed-box p-5 sm:p-8 md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="tag-accent tag">{locale === "fi" ? "Täyspäiväinen" : "Full-time"}</span>
                      <span className="tag">Helsinki</span>
                    </div>
                    <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">
                      {locale === "fi" ? "Junior Software Developer" : "Junior Software Developer"}
                    </h3>
                    <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-white/70">
                      {locale === "fi"
                        ? "Etsimme nälkäistä junior-kehittäjää, joka haluaa oppia nopeasti ja kasvaa maailmanluokan kehittäjäksi. Täällä oppimiskäyrä on jyrkkä ja tuki on poikkeuksellinen."
                        : "We're looking for a hungry junior developer who wants to learn fast and grow into a world-class engineer. Here the learning curve is steep and the support is exceptional."}
                    </p>
                  </div>
                  <a href="https://forms.gle/Rkih2WGYUEFy4oev5" target="_blank" rel="noopener noreferrer" className="btn-outline shrink-0 inline-flex self-start">
                    <span className="btn-label">{locale === "fi" ? "Hae paikkaa" : "Apply"}</span>
                    <span className="btn-arrow text-w-white-30">→</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Open application */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-16 md:py-20">
          <div className="dashed-box p-5 sm:p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="tag mb-4 inline-block">{locale === "fi" ? "Avoin hakemus" : "Open application"}</span>
                <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">
                  {locale === "fi" ? "Kaikki roolit" : "All roles"}
                </h3>
                <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.7] text-white/70">
                  {locale === "fi"
                    ? "Emme löytäneet sopivaa roolia? Lähetä avoin hakemus otamme yhteyttä kun sopiva paikka aukeaa."
                    : "Don't see a fitting role? Send an open application we'll reach out when the right position opens."}
                </p>
              </div>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-outline shrink-0 inline-flex">
                <span className="btn-label">{fi ? "Hae paikkaa" : "Apply"}</span>
                <span className="btn-arrow text-w-white-30">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-16 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "Kuulostaako hyvältä?" : "Sound good?"}
            </h2>
            <Link href={`/${locale}/ota-yhteytta`} className="btn-primary shrink-0">
              <span className="btn-label">{locale === "fi" ? "Ota yhteyttä" : "Get in touch"}</span>
              <span className="btn-arrow text-w-black/40">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Application modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(3,4,10,0.88)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="dashed-box bg-w-black w-full max-w-lg p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 font-mono text-[0.75rem] text-w-white-30 hover:text-w-white transition-colors"
            >
              ✕
            </button>

            {status === "sent" ? (
              <FormSuccess fi={fi} variant="apply" />
            ) : (
              <>
                <span className="tag mb-5 inline-block">{fi ? "Avoin hakemus" : "Open application"}</span>
                <p className="font-display text-[1.25rem] font-normal tracking-[-0.025em] text-w-white mb-6">
                  {fi ? "Kerro itsestäsi" : "Tell us about yourself"}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                        {fi ? "Nimi" : "Name"} *
                      </label>
                      {fieldOk("nimi") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <input
                      type="text" autoFocus autoComplete="name"
                      placeholder={fi ? "Etunimi Sukunimi" : "First Last"}
                      value={values.nimi}
                      onChange={(e) => setValues((v) => ({ ...v, nimi: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, nimi: true }))}
                      className={inputCls("nimi")}
                    />
                    {fieldErr("nimi") && <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">{fi ? "Syötä nimesi" : "Enter your name"}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                        {fi ? "Sähköposti" : "Email"} *
                      </label>
                      {fieldOk("sahkoposti") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <input
                      type="email" autoComplete="email"
                      placeholder={fi ? "sinä@yritys.fi" : "you@email.com"}
                      value={values.sahkoposti}
                      onChange={(e) => setValues((v) => ({ ...v, sahkoposti: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, sahkoposti: true }))}
                      className={inputCls("sahkoposti")}
                    />
                    {fieldErr("sahkoposti") && <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">{fi ? "Tarkista sähköpostiosoite" : "Check your email"}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                      {fi ? "Puhelin" : "Phone"}{" "}
                      <span className="normal-case text-w-white-30">({fi ? "valinnainen" : "optional"})</span>
                    </label>
                    <input
                      type="tel" autoComplete="tel"
                      placeholder={fi ? "+358 40 000 0000" : "+1 000 000 0000"}
                      value={values.puhelin}
                      onChange={(e) => setValues((v) => ({ ...v, puhelin: e.target.value }))}
                      className="w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                      {fi ? "Viesti" : "Message"}{" "}
                      <span className="normal-case text-w-white-30">({fi ? "valinnainen" : "optional"})</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder={fi ? "Kerro osaamisestasi ja mistä rooleista olet kiinnostunut." : "Tell us about your skills and what roles interest you."}
                      value={values.viesti}
                      onChange={(e) => setValues((v) => ({ ...v, viesti: e.target.value }))}
                      className="w-full resize-none bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box"
                    />
                  </div>

                  {/* File attachment */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                      {fi ? "CV / Portfolio" : "CV / Portfolio"}{" "}
                      <span className="normal-case text-w-white-30">({fi ? "valinnainen" : "optional"})</span>
                    </label>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={handleFile}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-full dashed-box px-3 py-2.5 text-left transition-colors duration-200 hover:bg-w-white-4"
                    >
                      {attachment ? (
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[0.75rem] text-w-white truncate">{attachment.name}</span>
                          <span
                            onClick={(e) => { e.stopPropagation(); setAttachment(null); if (fileRef.current) fileRef.current.value = ""; }}
                            className="font-mono text-[0.625rem] text-w-white-30 hover:text-w-white transition-colors shrink-0"
                          >
                            ✕
          </span>
                        </span>
                      ) : (
                        <span className="font-mono text-[0.75rem] text-white/25">
                          {fi ? "Valitse tiedosto (PDF, DOC, DOCX)" : "Choose file (PDF, DOC, DOCX)"}
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="mt-1 flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary shrink-0 disabled:opacity-40"
                    >
                      <span className="btn-label">
                        {status === "sending" ? "..." : fi ? "Lähetä hakemus" : "Send application"}
                      </span>
                      <span className="btn-arrow text-w-black/40">→</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </main>
  );
}
