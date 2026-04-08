interface FormSuccessProps {
  fi: boolean;
  variant?: "contact" | "apply";
}

export function FormSuccess({ fi, variant = "contact" }: FormSuccessProps) {
  const heading =
    variant === "apply"
      ? fi ? "Kiitos\nhakemuksestasi." : "Thanks\nfor applying."
      : fi ? "Kiitos.\nPalaamme pian." : "Thanks.\nWe'll be\nin touch.";

  const steps =
    variant === "apply"
      ? [
          fi ? "Hakemus saapuu Pekalle välittömästi" : "Application reaches Pekka immediately",
          fi ? "Otamme yhteyttä kun sopiva paikka aukeaa" : "We'll reach out when the right role opens",
        ]
      : [
          fi ? "Pekka näkee viestisi välittömästi" : "Pekka sees your message immediately",
          fi ? "Vastaamme 24 tunnin sisällä" : "We respond within 24 hours",
          fi ? "Sovimme seuraavat askeleet" : "We agree on next steps",
        ];

  return (
    <div className="flex flex-col gap-5 py-2">

      {/* Check icon */}
      <div className="relative inline-flex h-11 w-11 items-center justify-center">
        <div className="absolute inset-0 border border-dashed border-w-white-15" />
        <span className="relative font-mono text-[1.125rem] leading-none text-w-accent">✓</span>
        <span className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l-2 border-t-2 border-w-accent" />
        <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b-2 border-r-2 border-w-accent" />
      </div>

      {/* Tag */}
      <span className="tag tag-accent self-start">{fi ? "Lähetetty" : "Sent"}</span>

      {/* Heading */}
      <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-w-white whitespace-pre-line">
        {heading}
      </h3>

      {/* Steps */}
      <div className="dashed-box overflow-hidden">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-4 py-3.5${
              i > 0 ? " border-t border-dashed border-w-white-15" : ""
            }`}
          >
            <span className="font-mono text-[0.625rem] tracking-[0.06em] text-w-accent shrink-0">
              0{i + 1}
            </span>
            <span className="text-[0.875rem] leading-snug text-w-white-70">{step}</span>
          </div>
        ))}
      </div>

      {/* Contact fallback */}
      {variant === "contact" && (
        <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
          <a
            href="mailto:pekka@webso.fi"
            className="font-mono text-[0.6875rem] text-w-white-30 transition-colors duration-200 hover:text-w-white"
          >
            pekka@webso.fi
          </a>
          <a
            href="tel:+358445066448"
            className="font-mono text-[0.6875rem] text-w-white-30 transition-colors duration-200 hover:text-w-white"
          >
            +358 44 506 6448
          </a>
        </div>
      )}

    </div>
  );
}
