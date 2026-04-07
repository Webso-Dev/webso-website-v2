"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export function FunnelNav() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.startsWith("/en") ? "en" : "fi";
  const otherLocale = locale === "fi" ? "en" : "fi";

  const switchLocale = () => {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath || `/${otherLocale}`);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 border-b border-dashed border-w-white-15 bg-w-black/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-6 sm:px-8 md:px-10">
        <Link href={`/${locale}`} className="group flex items-center">
          <Image
            src="/images/webso-logo.svg"
            alt="Webso"
            width={88}
            height={26}
            className="h-[1.625rem] w-auto brightness-0 invert opacity-70 transition-opacity duration-200 group-hover:opacity-100"
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30 sm:block">
            {locale === "fi" ? "Ilmainen konsultaatio" : "Free consultation"}
          </span>
          <button
            onClick={switchLocale}
            className="dashed-box px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-30 transition-colors duration-200 hover:text-w-white"
          >
            {otherLocale}
          </button>
        </div>
      </div>
    </nav>
  );
}
