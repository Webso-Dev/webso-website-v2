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

export function LogoMarquee() {
  return (
    <section className="border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem] py-6 sm:py-10">
        <p className="mb-8 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-w-white-30">
          Yhteistyössä
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="flex items-center justify-center p-5 sm:p-7"
              style={{ border: "1px dashed rgba(255,255,255,0.06)", marginTop: "-1px", marginLeft: "-1px" }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={56}
                className="h-[32px] w-auto brightness-0 invert sm:h-[44px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
