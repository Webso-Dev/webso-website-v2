import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OtaYhteyttaPage } from "@/components/pages/OtaYhteyttaPage";

export const metadata: Metadata = {
  title: "Ota yhteyttä",
  description:
    "Kerro meille projektistasi. Vastaamme vuorokauden sisällä. Pekka Mattinen, CEO — pekka@webso.fi, +358 44 506 6448.",
  openGraph: {
    title: "Ota yhteyttä — Webso",
    description:
      "Kerro meille projektistasi. Vastaamme vuorokauden sisällä.",
  },
};

export default function OtaYhteytta() {
  return (
    <>
      <Nav />
      <main>
        <OtaYhteyttaPage />
      </main>
      <Footer />
    </>
  );
}
