"use client";

import Image from "next/image";

const logos = [
  { src: "/images/logos/bcare.avif", alt: "BCare" },
  { src: "/images/logos/bongariliitto.avif", alt: "Bongariliitto" },
  { src: "/images/logos/dieta.avif", alt: "Dieta" },
  { src: "/images/logos/flashnode.avif", alt: "Flashnode" },
  { src: "/images/logos/hiq.avif", alt: "HiQ" },
  { src: "/images/logos/insure.avif", alt: "Insure" },
  { src: "/images/logos/logo5.avif", alt: "Partner" },
  { src: "/images/logos/macea.avif", alt: "Macea" },
  { src: "/images/logos/onerva.avif", alt: "Onerva" },
  { src: "/images/logos/parcelexpress.avif", alt: "Parcel Express" },
  { src: "/images/logos/rauhala.avif", alt: "Rauhala" },
  { src: "/images/logos/saarni.avif", alt: "Saarni" },
];

function LogoList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-stretch" aria-hidden={ariaHidden || undefined}>
      {logos.map((logo) => (
        <div
          key={logo.src}
          className="flex items-center justify-center border border-dashed border-w-white-15 px-10 py-7"
          style={{ minWidth: "200px" }}
        >
          <Image
            src={logo.src}
            alt={ariaHidden ? "" : logo.alt}
            width={160}
            height={56}
            className="h-[44px] w-auto brightness-0 invert"
          />
        </div>
      ))}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="border-b border-dashed border-w-white-15 bg-w-black overflow-hidden">
      <div className="py-10">
        <p className="mb-8 px-10 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-w-white-30">
          Yhteistyössä
        </p>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
            style={{ background: "linear-gradient(to right, #030407, transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
            style={{ background: "linear-gradient(to left, #030407, transparent)" }}
          />

          <div className="marquee-track flex w-max">
            <LogoList />
            <LogoList ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
