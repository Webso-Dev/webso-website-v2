import Image from "next/image";

/** Tweak visual weight: logos with lots of empty space in the asset vs. very wide marks. */
const frame = {
  sm: "h-8 max-w-[9.5rem] sm:h-10 sm:max-w-[12rem]",
  md: "h-9 max-w-[11rem] sm:h-12 sm:max-w-[14rem]",
  lg: "h-14 max-w-[15rem] sm:h-[4.5rem] sm:max-w-[20rem]",
} as const;

const logos = [
  { src: "/images/logos/bcare.avif", alt: "BCare", frame: frame.sm },
  { src: "/images/logos/bongariliitto.avif", alt: "Bongariliitto" },
  { src: "/images/logos/dieta.avif", alt: "Dieta" },
  { src: "/images/logos/flashnode.avif", alt: "Flashnode", frame: frame.sm },
  { src: "/images/logos/hiq.avif", alt: "HiQ" },
  { src: "/images/logos/insure.avif", alt: "Insure", frame: frame.lg },
  { src: "/images/logos/logo5.avif", alt: "Partner", frame: frame.lg },
  { src: "/images/logos/macea.avif", alt: "Macea" },
  { src: "/images/logos/onerva.avif", alt: "Onerva" },
  { src: "/images/logos/parcelexpress.avif", alt: "Parcel Express", frame: frame.lg },
  { src: "/images/logos/rauhala.avif", alt: "Rauhala", frame: frame.lg },
  { src: "/images/logos/saarni.avif", alt: "Saarni", frame: frame.lg },
] satisfies { src: string; alt: string; frame?: string }[];

export function LogoMarquee() {
  return (
    <section className="border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 md:px-10 py-6 sm:py-10">
        <p className="mb-8 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-w-white-30">
          Yhteistyössä
        </p>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          style={{ backgroundImage: "var(--dash-h), var(--dash-v)", backgroundSize: "100% 1px, 1px 100%", backgroundPosition: "top, left", backgroundRepeat: "no-repeat" }}
        >
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="flex items-center justify-center p-5 sm:p-7"
              style={{ backgroundImage: "var(--dash-v), var(--dash-h)", backgroundSize: "1px 100%, 100% 1px", backgroundPosition: "right, bottom", backgroundRepeat: "no-repeat" }}
            >
              <div className={`relative w-full ${logo.frame ?? frame.md}`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 640px) 42vw, (max-width: 768px) 28vw, 20rem"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
