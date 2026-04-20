"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// The WEBSO text — fixed to the bottom of the viewport, always behind the page slab
function WebsoFixed({ spacerRef, containerRef }: { spacerRef: React.RefObject<HTMLDivElement | null>; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const WORD = "WEBSO";
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const els = Array.from(ref.current?.querySelectorAll<HTMLSpanElement>(".sc") ?? []);
    const intervals: ReturnType<typeof setInterval>[] = [];

    gsap.set(els, { opacity: 0 });

    // Spacer scrolling out of view = WEBSO being revealed from underneath
    ScrollTrigger.create({
      trigger: spacerRef.current,
      start: "top bottom",
      once: true,
      onEnter() {
        els.forEach((el, i) => {
          gsap.delayedCall(i * 0.11, () => {
            gsap.set(el, { opacity: 1 });
            let n = 0;
            const id = setInterval(() => {
              el.textContent = n < 10
                ? CHARS[Math.floor(Math.random() * CHARS.length)]
                : WORD[i];
              if (++n > 10) clearInterval(id);
            }, 42);
            intervals.push(id);
          });
        });
      },
    });

    return () => intervals.forEach(clearInterval);
  }, [spacerRef]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 bottom-0 bg-w-black overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <div ref={ref} className="py-6 md:py-8">
        <div className="flex select-none items-end justify-center leading-none">
          {"WEBSO".split("").map((ch, i) => (
            <span
              key={i}
              className="sc font-mono font-bold leading-[0.82] tracking-[-0.02em] text-w-white cursor-default"
              style={{ fontSize: "clamp(7rem, 28vw, 26rem)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLSpanElement & { _id?: ReturnType<typeof setInterval> };
                clearInterval(el._id);
                const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                let n = 0;
                el._id = setInterval(() => {
                  el.textContent = n < 8
                    ? CHARS[Math.floor(Math.random() * CHARS.length)]
                    : ch;
                  if (++n > 8) clearInterval(el._id);
                }, 40);
              }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const websoRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  // Spacer height = WEBSO height → creates exact scroll room to fully reveal it
  useLayoutEffect(() => {
    const sync = () => {
      if (websoRef.current && spacerRef.current)
        spacerRef.current.style.height = `${websoRef.current.offsetHeight}px`;
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <>
      <WebsoFixed spacerRef={spacerRef} containerRef={websoRef} />

      {/* Footer links — inside the z-10 page slab, solid bg covers WEBSO below */}
      <footer className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">

          <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_1px_auto_1px_auto]">

            {/* Brand column */}
            <div className="py-10 md:pl-0 md:py-16">
              <Image
                src="/images/webso-logo.svg"
                alt="Webso"
                width={88}
                height={26}
                className="h-[1.25rem] w-auto brightness-0 invert"
              />
              <p className="mt-5 max-w-[17rem] text-[1rem] leading-[1.65] text-w-white-50">
                AI-native software house. We build faster and better than traditional vendors.
              </p>
              <div className="mt-6 flex flex-col gap-1.5">
                <p className="font-mono text-[0.75rem] text-w-white-30">{t("footer.address")}</p>
                <p className="font-mono text-[0.75rem] text-w-white-30">{t("footer.ytunnus")}</p>
              </div>
            </div>

            {/* Dashed vertical divider */}
            <div className="hidden self-stretch md:block" style={{ background: "var(--dash-v)" }} />

            {/* Navigation */}
            <div className="border-t border-dashed border-w-white-15 -mx-4 sm:-mx-8 md:mx-0 px-4 sm:px-8 py-10 md:border-t-0 md:px-8 md:py-16">
              <p className="tag mb-6">{t("footer.sivut")}</p>
              <nav className="flex flex-col gap-2.5">
                {[
                  { l: t("nav.palvelut"), h: `/${locale}/palvelut` },
                  { l: t("nav.yhteistyot"), h: `/${locale}/yhteistyot` },
                  { l: t("nav.meista"), h: `/${locale}/meista` },
                  { l: t("nav.ura"), h: `/${locale}/ura` },
                  { l: t("nav.otaYhteytta"), h: `/${locale}/ota-yhteytta` },
                  { l: t("footer.tietosuoja"), h: `/${locale}/tietosuoja` },
                ].map((n) => (
                  <Link
                    key={n.h}
                    href={n.h}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30 transition-colors duration-200 hover:text-w-white"
                  >
                    {n.l}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Dashed vertical divider */}
            <div className="hidden self-stretch md:block" style={{ background: "var(--dash-v)" }} />

            {/* Contact */}
            <div className="border-t border-dashed border-w-white-15 -mx-4 sm:-mx-8 md:mx-0 px-4 sm:px-8 py-10 md:border-t-0 md:px-8 md:py-16">
              <p className="tag mb-6">{t("footer.yhteystiedot")}</p>
              <div className="flex flex-col gap-2">
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
              <div className="mt-8">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-30">
                  © {new Date().getFullYear()} Webso Oy
                </p>
              </div>
            </div>

          </div>

        </div>

        <div className="border-t border-dashed border-w-white-15" />
      </footer>

      {/* Spacer: same height as fixed WEBSO — creates scroll room to reveal it */}
      <div ref={spacerRef} data-webso-spacer aria-hidden />
    </>
  );
}
