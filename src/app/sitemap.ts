import { MetadataRoute } from "next";

const BASE = "https://webso.fi";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fi", "en"];

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/palvelut", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/yhteistyot", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/meista", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/ura", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/ota-yhteytta", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/tietosuoja", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );
}
