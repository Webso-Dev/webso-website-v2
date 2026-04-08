import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="border-b border-dashed border-w-white-15">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-8 md:px-10">
            <div className="flex min-h-[60vh] flex-col justify-center py-24">
              <span className="tag mb-8 inline-block">404</span>
              <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.04em] text-w-white leading-[1] mb-6">
                Sivua ei löydy.
              </h1>
              <p className="text-[1rem] text-w-white-50 mb-12 max-w-md leading-[1.6]">
                Etsimäsi sivu on poistettu tai siirretty.
              </p>
              <div>
                <Link href="/fi" className="btn-primary">
                  <span className="btn-label">Etusivulle</span>
                  <span className="btn-arrow text-w-black/40">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
