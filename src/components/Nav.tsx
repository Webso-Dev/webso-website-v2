"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const locale = pathname.startsWith("/en") ? "en" : "fi";
  const otherLocale = locale === "fi" ? "en" : "fi";

  const switchLocale = () => {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath || `/${otherLocale}`);
  };

  const navLinks = [
    { label: t("palvelut"), href: `/${locale}/palvelut` },
    { label: t("yhteistyot"), href: `/${locale}/yhteistyot` },
    { label: t("meista"), href: `/${locale}/meista` },
    { label: t("ura"), href: `/${locale}/ura` },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-dashed border-w-white-15 bg-w-black/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[4.25rem] max-w-[90rem] items-center justify-between px-6 md:px-10">
          <Link href={`/${locale}`}>
            <Image
              src="/images/webso-logo.svg"
              alt="Webso"
              width={88}
              height={26}
              className="h-[1.35rem] w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-[15px] md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-50 transition-colors duration-200 hover:text-w-white"
                style={{ border: "1px dashed rgba(255,255,255,0.15)" }}
              >
                {link.label}
              </Link>
            ))}

            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30 transition-colors duration-200 hover:text-w-white"
              style={{ border: "1px dashed rgba(255,255,255,0.15)" }}
              >
                {locale}
                <span className={`text-[0.5rem] transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-1 min-w-full border border-dashed border-w-white-15 bg-w-black"
                  >
                    {[locale, otherLocale].map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setLangOpen(false); if (loc !== locale) switchLocale(); }}
                        className={`block w-full px-3 py-1.5 text-left font-mono text-[0.6875rem] uppercase tracking-[0.04em] transition-colors duration-150 hover:text-w-white ${loc === locale ? "text-w-white" : "text-w-white-30"}`}
                      >
                        {loc}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={`/${locale}/ota-yhteytta`}
              className="btn-primary"
            >
              <span className="btn-label">{t("otaYhteytta")}</span>
              <span className="btn-arrow text-w-black/40">→</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="Menu"
          >
            <span className={`block h-px w-5 bg-w-white transition-all duration-300 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-w-white transition-all duration-300 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-w-black px-8 md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-[2rem] font-bold tracking-[-0.04em] text-w-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Link
                  href={`/${locale}/ota-yhteytta`}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-[2rem] font-bold tracking-[-0.04em] text-w-accent"
                >
                  {t("otaYhteytta")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
