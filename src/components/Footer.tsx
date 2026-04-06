"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

function WebsoScramble() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const WORD = "WEBSO";
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const els = Array.from(ref.current?.querySelectorAll<HTMLSpanElement>(".sc") ?? []);
    const intervals: ReturnType<typeof setInterval>[] = [];

    gsap.set(els, { opacity: 0 });

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 98%",
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
  }, []);

  return (
    <div ref={ref} className="overflow-hidden p-6 md:p-8">
      <div className="flex select-none items-end justify-center leading-none">
        {"WEBSO".split("").map((ch, i) => (
          <span
            key={i}
            className="sc font-mono font-bold leading-[0.82] tracking-[-0.02em] text-w-white"
            style={{ fontSize: "clamp(7rem, 28vw, 26rem)" }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="border-t border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem]">

        {/* Main footer row */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[1px_1fr_1px_auto_1px_auto_1px]">

          {/* Left border */}
          <div className="hidden self-stretch md:block" style={{ background: "var(--dash-v)" }} />

          {/* Brand column */}
          <div className="py-10 md:pl-10 md:py-16">
            <Image
              src="/images/webso-logo.svg"
              alt="Webso"
              width={88}
              height={26}
              className="h-[1.25rem] w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[17rem] text-[0.8125rem] leading-[1.65] text-w-white-30">
              AI-native software house. We build faster and better than traditional vendors.
            </p>
            <div className="mt-6 flex flex-col gap-1.5">
              <p className="font-mono text-[0.75rem] text-w-white-30">{t("footer.address")}</p>
              <p className="font-mono text-[0.75rem] text-w-white-30">{t("footer.ytunnus")}</p>
            </div>
          </div>

          {/* Dashed vertical divider */}
          <div
            className="hidden self-stretch md:block"
            style={{ background: "var(--dash-v)" }}
          />

          {/* Navigation */}
          <div className="border-t border-dashed border-w-white-15 py-10 md:border-t-0 md:px-14 md:py-16">
            <p className="tag mb-6">Sivut</p>
            <nav className="flex flex-col gap-2.5">
              {[
                { l: t("nav.palvelut"), h: `/${locale}/palvelut` },
                { l: t("nav.yhteistyot"), h: `/${locale}/yhteistyot` },
                { l: t("nav.meista"), h: `/${locale}/meista` },
                { l: t("nav.ura"), h: `/${locale}/ura` },
                { l: t("nav.otaYhteytta"), h: `/${locale}/ota-yhteytta` },
                { l: t("footer.tietosuoja"), h: "#" },
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
          <div
            className="hidden self-stretch md:block"
            style={{ background: "var(--dash-v)" }}
          />

          {/* Contact */}
          <div className="border-t border-dashed border-w-white-15 py-10 md:border-t-0 md:px-14 md:py-16">
            <p className="tag mb-6">Yhteystiedot</p>
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

          {/* Right border */}
          <div className="hidden self-stretch md:block" style={{ background: "var(--dash-v)" }} />

        </div>

        {/* WEBSO — own box, nothing below */}
        <div className="border-t border-dashed border-w-white-15">
          <WebsoScramble />
        </div>

      </div>
    </footer>
  );
}
