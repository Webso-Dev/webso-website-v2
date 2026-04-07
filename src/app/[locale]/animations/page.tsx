import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NeuralNetIllustration } from "@/components/illustrations/NeuralNetIllustration";
import { DataStreamIllustration } from "@/components/illustrations/DataStreamIllustration";
import { RadarIllustration } from "@/components/illustrations/RadarIllustration";
import { TimeSeriesIllustration } from "@/components/illustrations/TimeSeriesIllustration";
import { DecisionTreeIllustration } from "@/components/illustrations/DecisionTreeIllustration";
import { ScatterIllustration } from "@/components/illustrations/ScatterIllustration";

const ILLUSTRATIONS = [
  {
    name: "Neural Network",
    desc: "3-layer feedforward network with traveling signal pulses",
    component: NeuralNetIllustration,
  },
  {
    name: "Data Stream",
    desc: "Parallel data pipelines with a highlighted primary channel",
    component: DataStreamIllustration,
  },
  {
    name: "Radar Scan",
    desc: "Rotating sweep with a blue detected anomaly",
    component: RadarIllustration,
  },
  {
    name: "Time Series",
    desc: "Historical trend with a blue AI prediction extension",
    component: TimeSeriesIllustration,
  },
  {
    name: "Decision Tree",
    desc: "Binary tree traversal with beams flowing toward the result",
    component: DecisionTreeIllustration,
  },
  {
    name: "Scatter Plot",
    desc: "Data points with a blue regression line",
    component: ScatterIllustration,
  },
];

export default function AnimationsPage() {
  return (
    <>
      <Nav />
      <main className="bg-w-black">
        <section className="border-b border-dashed border-w-white-15">
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <div className="py-16 md:py-24">
              <span className="tag mb-8 inline-block">Illustrations</span>
              <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white">
                Data &amp; AI illustration pack
              </h1>
              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-w-white-50">
                GSAP-animated SVG illustrations. White wireframe + blue accent.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <div className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3 md:py-14">
              {ILLUSTRATIONS.map(({ name, desc, component: Illust }) => (
                <div key={name} className="dashed-box flex flex-col overflow-hidden">
                  {/* Illustration area */}
                  <div className="flex items-center justify-center bg-w-black px-8 py-10">
                    <Illust className="w-full max-w-[280px]" />
                  </div>
                  {/* Label */}
                  <div className="border-t border-dashed border-w-white-15 px-5 py-4">
                    <p className="font-mono text-[0.75rem] uppercase tracking-[0.04em] text-w-white">
                      {name}
                    </p>
                    <p className="mt-1 text-[0.75rem] leading-[1.5] text-w-white-30">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
