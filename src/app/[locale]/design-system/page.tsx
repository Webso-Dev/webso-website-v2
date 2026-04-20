import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WaveCanvas } from "@/components/WaveCanvas";
import { AINativeIllustration } from "@/components/illustrations/AINativeIllustration";
import { TalentFilterIllustration } from "@/components/illustrations/TalentFilterIllustration";
import { CollaborationIllustration } from "@/components/illustrations/CollaborationIllustration";
import { NeuralNetIllustration } from "@/components/illustrations/NeuralNetIllustration";
import { DataStreamIllustration } from "@/components/illustrations/DataStreamIllustration";
import { RadarIllustration } from "@/components/illustrations/RadarIllustration";
import { TimeSeriesIllustration } from "@/components/illustrations/TimeSeriesIllustration";
import { DecisionTreeIllustration } from "@/components/illustrations/DecisionTreeIllustration";
import { ScatterIllustration } from "@/components/illustrations/ScatterIllustration";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { AINetworkIllustration } from "@/components/illustrations/AINetworkIllustration";
import { CodeStackIllustration } from "@/components/illustrations/CodeStackIllustration";
import { PartnerIllustration } from "@/components/illustrations/PartnerIllustration";
import { ProcessIllustration } from "@/components/illustrations/ProcessIllustration";
import { TalentIllustration } from "@/components/illustrations/TalentIllustration";
import { CodeIllustration, AIIllustration } from "@/components/illustrations/ServiceIllustration";

// ── Inline helpers ──────────────────────────────────────────────────────────

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-b border-dashed border-w-white-15 pb-6 pt-12">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-w-white-30">{n}</span>
        <h2 className="font-display text-[1.375rem] font-normal leading-[1.1] tracking-[-0.02em] text-w-white">
          {label}
        </h2>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.6rem] uppercase tracking-[0.07em] text-w-white-30">
      {children}
    </span>
  );
}

// ── Illustration data ───────────────────────────────────────────────────────

const ILLUSTRATIONS = [
  {
    name: "AINativeIllustration",
    desc: "Pentagon of process nodes with central blue AI core",
    component: AINativeIllustration,
    used: "Lupaus",
  },
  {
    name: "TalentFilterIllustration",
    desc: "Five candidates, two pass through the blue filter gate",
    component: TalentFilterIllustration,
    used: "Lupaus",
  },
  {
    name: "CollaborationIllustration",
    desc: "Two equal nodes building toward a shared blue solution",
    component: CollaborationIllustration,
    used: "Lupaus",
  },
  {
    name: "NeuralNetIllustration",
    desc: "3-layer feedforward network with traveling signal pulses",
    component: NeuralNetIllustration,
    used: "Data & AI pack",
  },
  {
    name: "DataStreamIllustration",
    desc: "Parallel data pipelines, highlighted primary channel",
    component: DataStreamIllustration,
    used: "Data & AI pack",
  },
  {
    name: "RadarIllustration",
    desc: "Rotating sweep with a blue detected anomaly",
    component: RadarIllustration,
    used: "Data & AI pack",
  },
  {
    name: "TimeSeriesIllustration",
    desc: "Historical trend with blue AI prediction extension",
    component: TimeSeriesIllustration,
    used: "Data & AI pack",
  },
  {
    name: "DecisionTreeIllustration",
    desc: "Binary tree traversal with beams flowing to result",
    component: DecisionTreeIllustration,
    used: "Data & AI pack",
  },
  {
    name: "ScatterIllustration",
    desc: "Data points with blue regression line",
    component: ScatterIllustration,
    used: "Data & AI pack",
  },
  {
    name: "HeroIllustration",
    desc: "Curved arc rays with animated blue beams",
    component: HeroIllustration,
    used: "Hero section",
  },
  {
    name: "AINetworkIllustration",
    desc: "Node graph — 5 outer + 1 center blue node",
    component: AINetworkIllustration,
    used: "Palvelut",
  },
  {
    name: "CodeStackIllustration",
    desc: "Stacked horizontal bars narrowing upward",
    component: CodeStackIllustration,
    used: "Palvelut",
  },
  {
    name: "PartnerIllustration",
    desc: "Partnership visual with GSAP DrawSVG beams",
    component: PartnerIllustration,
    used: "Palvelut",
  },
  {
    name: "ProcessIllustration",
    desc: "Animated step-by-step process flow",
    component: ProcessIllustration,
    used: "Sub-pages",
  },
  {
    name: "TalentIllustration",
    desc: "Talent/recruitment visual",
    component: TalentIllustration,
    used: "Ura",
  },
  {
    name: "CodeIllustration",
    desc: "Code/development visual with stack layers",
    component: CodeIllustration,
    used: "Sub-pages",
  },
  {
    name: "AIIllustration",
    desc: "AI concept visual",
    component: AIIllustration,
    used: "Sub-pages",
  },
] as const;

// ── Page ────────────────────────────────────────────────────────────────────

export default function StyleCanvasPage() {
  return (
    <>
      <Nav />
      <main className="bg-w-black">

        {/* ── Header ── */}
        <section className="border-b border-dashed border-w-white-15">
          <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
            <div className="py-20 md:py-28">
              <span className="tag mb-6 inline-block">Dev · Internal</span>
              <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.035em] text-w-white">
                Webso Design System
              </h1>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.65] text-w-white-50">
                Full canvas of all tokens, components, and illustrations. Live reference for consistent UI development.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Colors", "Typography", "Tags", "Buttons", "Decorative", "Illustrations", "WaveCanvas", "Forms"].map((s, i) => (
                  <span key={s} className="tag">{String(i + 1).padStart(2, "0")} — {s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">

          {/* ── 01 Colors ── */}
          <section className="border-b border-dashed border-w-white-15 pb-14">
            <SectionLabel n="01" label="Color system" />
            <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">

              {/* Background */}
              <ColorSwatch
                bg="#030407"
                border="1px solid rgba(255,255,255,0.2)"
                label="Background"
                sub="#030407"
              />

              {/* Accent */}
              <ColorSwatch bg="#1560D4" label="Accent" sub="#1560D4" />

              {/* White opacities */}
              {[
                { label: "White 100", sub: "rgba(255,255,255,1)", opacity: 1 },
                { label: "White 90", sub: "rgba(255,255,255,0.9)", opacity: 0.9 },
                { label: "White 70", sub: "rgba(255,255,255,0.7)", opacity: 0.7 },
                { label: "White 50", sub: "rgba(255,255,255,0.5)", opacity: 0.5 },
                { label: "White 30", sub: "rgba(255,255,255,0.3)", opacity: 0.3 },
                { label: "White 15", sub: "rgba(255,255,255,0.15)", opacity: 0.15 },
                { label: "White 8", sub: "rgba(255,255,255,0.08)", opacity: 0.08 },
                { label: "White 4", sub: "rgba(255,255,255,0.04)", opacity: 0.04 },
              ].map(({ label, sub, opacity }) => (
                <ColorSwatch
                  key={label}
                  bg={`rgba(255,255,255,${opacity})`}
                  border={opacity < 0.15 ? "1px solid rgba(255,255,255,0.15)" : undefined}
                  label={label}
                  sub={sub}
                />
              ))}
            </div>
          </section>

          {/* ── 02 Typography ── */}
          <section className="border-b border-dashed border-w-white-15 pb-14">
            <SectionLabel n="02" label="Typography scale" />

            {/* Aspekta — Display */}
            <div className="mt-8">
              <Chip>Aspekta — Display headings</Chip>
              <div className="mt-4 space-y-8">
                <TypeRow size="clamp(2.25rem,6vw,4.5rem)" tracking="-0.035em" label="Hero H1">
                  AI-natiivi sovelluskehitys
                </TypeRow>
                <TypeRow size="clamp(2rem,3.8vw,3.75rem)" tracking="-0.03em" label="Section H2">
                  Palvelumme rakentavat menestystä
                </TypeRow>
                <TypeRow size="clamp(1.5rem,2.5vw,2.5rem)" tracking="-0.025em" label="Sub-section H3">
                  Tekoäly ohjaa jokaista vaihetta
                </TypeRow>
                <TypeRow size="1.375rem" tracking="-0.02em" label="Card H4">
                  Applied AI Engineering
                </TypeRow>
                <TypeRow size="1.125rem" tracking="-0.015em" label="Small heading H5">
                  Sovelluskehitys & arkkitehtuuri
                </TypeRow>
              </div>
            </div>

            {/* Body */}
            <div className="mt-10 border-t border-dashed border-w-white-15 pt-8">
              <Chip>Aspekta — Body text</Chip>
              <div className="mt-4 space-y-6">
                <div>
                  <p className="mb-1"><Chip>0.9375rem · leading-1.65 · 70% opacity</Chip></p>
                  <p className="text-[0.9375rem] leading-[1.65] text-w-white-70">
                    Rakennamme yritysten tietojärjestelmiä hyödyntäen tekoälyn koko potentiaalin. Olemme AI-natiivi tiimi, joka toimittaa enemmän, nopeammin ja paremmalla laadulla kuin perinteinen toimittaja.
                  </p>
                </div>
                <div>
                  <p className="mb-1"><Chip>0.9375rem · leading-1.65 · 50% opacity (secondary)</Chip></p>
                  <p className="text-[0.9375rem] leading-[1.65] text-w-white-50">
                    Tukevaa tekstiä, joka täydentää pääkopian. Käytetään korttien kuvauksissa, alaotsikoissa ja viitteellisissä tiedoissa.
                  </p>
                </div>
                <div>
                  <p className="mb-1"><Chip>0.875rem · leading-1.65 · 30% opacity (tertiary)</Chip></p>
                  <p className="text-[0.875rem] leading-[1.65] text-w-white-30">
                    Kolmannen tason teksti meta-tiedoille, aikaleimoille ja lisätiedoille.
                  </p>
                </div>
              </div>
            </div>

            {/* Mono */}
            <div className="mt-10 border-t border-dashed border-w-white-15 pt-8">
              <Chip>PP Supply Mono — Utility</Chip>
              <div className="mt-4 space-y-5">
                <div>
                  <p className="mb-1"><Chip>0.75rem · uppercase · tracking 0.05em — Tags & labels</Chip></p>
                  <p className="font-mono text-[0.75rem] uppercase tracking-[0.05em] text-w-white-70">AI-natiivi · Sovelluskehitys · 2024–2025</p>
                </div>
                <div>
                  <p className="mb-1"><Chip>0.75rem · uppercase · tracking 0.04em — Buttons</Chip></p>
                  <p className="font-mono text-[0.75rem] uppercase tracking-[0.04em] text-w-white">Ota yhteyttä → Tutustu palveluihin →</p>
                </div>
                <div>
                  <p className="mb-1"><Chip>0.6875rem · uppercase · tracking 0.06em — Small caps / section labels</Chip></p>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">Section 01 / Palvelut / Yhteistyöt / Meistä</p>
                </div>
                <div>
                  <p className="mb-1"><Chip>Luvut — display numbers</Chip></p>
                  <p className="font-display text-[3.5rem] font-normal leading-[1] tracking-[-0.03em] text-w-white">124+</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 03 Tags ── */}
          <section className="border-b border-dashed border-w-white-15 pb-14">
            <SectionLabel n="03" label="Tag variants" />
            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-3"><Chip>.tag — default</Chip></p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag">AI-natiivi</span>
                  <span className="tag">Sovelluskehitys</span>
                  <span className="tag">Full-stack</span>
                  <span className="tag">01 — Palvelut</span>
                  <span className="tag">2024 → 2025</span>
                  <span className="tag">· Active</span>
                  <span className="tag">Internal · Dev</span>
                </div>
              </div>
              <div>
                <p className="mb-3"><Chip>.tag.tag-accent — blue filled</Chip></p>
                <div className="flex flex-wrap gap-2">
                  <span className="tag tag-accent">Accent</span>
                  <span className="tag tag-accent">New</span>
                  <span className="tag tag-accent">Live</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── 04 Buttons ── */}
          <section className="border-b border-dashed border-w-white-15 pb-14">
            <SectionLabel n="04" label="Button variants" />
            <div className="mt-8 space-y-10">

              {/* Primary */}
              <div>
                <p className="mb-4"><Chip>.btn-primary — blue accent, shimmer on hover</Chip></p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn-primary">
                    <span className="btn-label">Ota yhteyttä</span>
                    <span className="btn-arrow">→</span>
                  </button>
                  <button className="btn-primary">
                    <span className="btn-label">Tutustu palveluihin</span>
                    <span className="btn-arrow">→</span>
                  </button>
                  <button className="btn-primary">
                    <span className="btn-label">Ilmainen konsultaatio</span>
                    <span className="btn-arrow">→</span>
                  </button>
                  <button className="btn-primary opacity-40" disabled>
                    <span className="btn-label">Disabled</span>
                    <span className="btn-arrow">—</span>
                  </button>
                </div>
              </div>

              {/* Outline */}
              <div>
                <p className="mb-4"><Chip>.btn-outline — white fill slide on hover</Chip></p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn-outline">
                    <span className="btn-label">Lue lisää</span>
                    <span className="btn-arrow">→</span>
                  </button>
                  <button className="btn-outline">
                    <span className="btn-label">Katso kaikki yhteistyöt</span>
                    <span className="btn-arrow">→</span>
                  </button>
                  <button className="btn-outline">
                    <span className="btn-label">Avoin hakemus</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>

              {/* Anatomy */}
              <div>
                <p className="mb-4"><Chip>Anatomy — .btn-label + .btn-arrow inside .btn-primary or .btn-outline</Chip></p>
                <div className="dashed-box p-6">
                  <div className="flex flex-wrap gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <div className="h-[1px] w-8 bg-w-white-30" />
                        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-w-white-30">btn-primary wrapper</span>
                      </div>
                      <button className="btn-primary">
                        <span className="btn-label">Label</span>
                        <span className="btn-arrow">→</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <div className="h-[1px] w-8 bg-w-white-30" />
                        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-w-white-30">btn-outline wrapper</span>
                      </div>
                      <button className="btn-outline">
                        <span className="btn-label">Label</span>
                        <span className="btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 05 Decorative elements ── */}
          <section className="border-b border-dashed border-w-white-15 pb-14">
            <SectionLabel n="05" label="Borders, boxes & brackets" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {/* dashed-box */}
              <div className="space-y-3">
                <Chip>.dashed-box</Chip>
                <div className="dashed-box p-6">
                  <p className="text-[0.875rem] leading-[1.6] text-w-white-70">
                    Content inside a dashed box. The four sides use background-image gradients instead of CSS borders, preserving the dashed pattern on all sides without border-image hacks.
                  </p>
                </div>
              </div>

              {/* corner-brackets */}
              <div className="space-y-3">
                <Chip>.corner-brackets</Chip>
                <div className="corner-brackets p-6">
                  <p className="text-[0.875rem] leading-[1.6] text-w-white-70">
                    Corner bracket decorations via ::before and ::after. 8×8 px at 50% white opacity. Wireframe aesthetic for cards and images.
                  </p>
                </div>
              </div>

              {/* Combined */}
              <div className="space-y-3">
                <Chip>.dashed-box.corner-brackets — combined</Chip>
                <div className="dashed-box corner-brackets p-6">
                  <p className="text-[0.875rem] leading-[1.6] text-w-white-70">
                    Both classes together for full wireframe card with corner ticks. Common pattern for case study cards and feature blocks.
                  </p>
                </div>
              </div>

              {/* Dashed divider */}
              <div className="space-y-3">
                <Chip>border-dashed border-w-white-15 — section divider</Chip>
                <div>
                  <div className="border-b border-dashed border-w-white-15" />
                  <div className="py-4 text-[0.875rem] text-w-white-50">Content between section dividers</div>
                  <div className="border-b border-dashed border-w-white-15" />
                </div>
              </div>

              {/* Vertical dash lines */}
              <div className="space-y-3">
                <Chip>--dash-v — vertical guide lines</Chip>
                <div className="flex h-24 items-stretch gap-10 py-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} style={{ width: "1px", background: "var(--dash-v)" }} />
                  ))}
                </div>
              </div>

              {/* Accent rules */}
              <div className="space-y-3">
                <Chip>Accent rules — scaleX animated on scroll</Chip>
                <div className="space-y-3 py-2">
                  <div className="h-[1px] w-full" style={{ background: "#1560D4" }} />
                  <div className="h-[1px] w-3/4" style={{ background: "#1560D4", opacity: 0.5 }} />
                  <div className="h-[1px] w-1/2" style={{ background: "#1560D4", opacity: 0.25 }} />
                  <div className="h-[1px] w-1/4" style={{ background: "#1560D4", opacity: 0.12 }} />
                </div>
              </div>

              {/* .tag inside a dashed-box card */}
              <div className="space-y-3 md:col-span-2 lg:col-span-3">
                <Chip>Typical card pattern — dashed-box + tag + heading + body</Chip>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {["AI-Engineering", "Sovelluskehitys", "Tietojärjestelmät"].map((title, i) => (
                    <div key={title} className="dashed-box p-6">
                      <span className="tag mb-4 inline-block">{String(i + 1).padStart(2, "0")} — Service</span>
                      <h3 className="font-display text-[1.25rem] font-normal leading-[1.15] tracking-[-0.02em] text-w-white">
                        {title}
                      </h3>
                      <p className="mt-3 text-[0.875rem] leading-[1.6] text-w-white-50">
                        Lyhyt kuvaus palvelusta tai toiminnosta. Kaksi–kolme lausetta riittää.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ── 06 Illustrations ── */}
          <section className="border-b border-dashed border-w-white-15 pb-14">
            <SectionLabel n="06" label="SVG illustration library" />
            <p className="mt-3 text-[0.875rem] leading-[1.6] text-w-white-50">
              GSAP + Framer Motion animated. White wireframe, ONE blue accent element per illustration.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {ILLUSTRATIONS.map(({ name, desc, component: Illust, used }) => (
                <div key={name} className="dashed-box flex flex-col overflow-hidden">
                  <div className="flex items-center justify-center bg-w-black px-8 py-10">
                    <Illust className="w-full max-w-[240px]" />
                  </div>
                  <div className="border-t border-dashed border-w-white-15 px-4 py-3">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.04em] text-w-white">{name}</p>
                      <span className="tag shrink-0">{used}</span>
                    </div>
                    <p className="mt-1 text-[0.7rem] leading-[1.5] text-w-white-30">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 08 Forms ── */}
          <section className="border-b border-dashed border-w-white-15 pb-14">
            <SectionLabel n="08" label="Form elements" />
            <div className="mt-8 max-w-lg space-y-5">
              <div>
                <label className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.06em] text-w-white-50">
                  Text input
                </label>
                <input
                  type="text"
                  placeholder="Nimi tai sähköposti..."
                  className="w-full bg-transparent px-4 py-3 font-mono text-[0.8125rem] text-w-white placeholder-w-white-30 outline-none transition-opacity focus:opacity-90"
                  style={{
                    backgroundImage:
                      "var(--dash-h), var(--dash-h), var(--dash-v), var(--dash-v)",
                    backgroundSize: "100% 1px, 100% 1px, 1px 100%, 1px 100%",
                    backgroundPosition: "top, bottom, left, right",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.06em] text-w-white-50">
                  Textarea
                </label>
                <textarea
                  rows={4}
                  placeholder="Kerro projektistasi..."
                  className="w-full resize-none bg-transparent px-4 py-3 text-[0.9375rem] leading-[1.65] text-w-white placeholder-w-white-30 outline-none"
                  style={{
                    backgroundImage:
                      "var(--dash-h), var(--dash-h), var(--dash-v), var(--dash-v)",
                    backgroundSize: "100% 1px, 100% 1px, 1px 100%, 1px 100%",
                    backgroundPosition: "top, bottom, left, right",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="btn-primary">
                  <span className="btn-label">Lähetä viesti</span>
                  <span className="btn-arrow">→</span>
                </button>
                <button className="btn-outline">
                  <span className="btn-label">Peruuta</span>
                  <span className="btn-arrow">✕</span>
                </button>
              </div>
            </div>
          </section>

        </div>{/* /max-w container */}

        {/* ── 07 WaveCanvas ── */}
        <section className="relative h-[480px] border-b border-dashed border-w-white-15">
          <WaveCanvas />
          <div className="pointer-events-none relative z-10 mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
            <div className="pt-14">
              <span className="tag mb-4 inline-block">07 — WaveCanvas</span>
              <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.025em] text-w-white">
                Perlin noise wave background
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-w-white-50">
                Mouse-interactive canvas. Props: lineColor, bgColor, className.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function ColorSwatch({
  bg,
  border,
  label,
  sub,
}: {
  bg: string;
  border?: string;
  label: string;
  sub: string;
}) {
  return (
    <div>
      <div
        className="aspect-square w-full"
        style={{ background: bg, border: border ?? "none" }}
      />
      <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-w-white-70 leading-[1.3]">
        {label}
      </p>
      <p className="font-mono text-[0.55rem] text-w-white-30 leading-[1.4] break-all">{sub}</p>
    </div>
  );
}

function TypeRow({
  size,
  tracking,
  label,
  children,
}: {
  size: string;
  tracking: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-dashed border-w-white-8 pb-6">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.07em] text-w-white-30">
        {label} · {size} · tracking {tracking}
      </p>
      <p
        className="font-display font-normal text-w-white"
        style={{ fontSize: size, lineHeight: 1.05, letterSpacing: tracking }}
      >
        {children}
      </p>
    </div>
  );
}
