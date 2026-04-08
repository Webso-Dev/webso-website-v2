import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PalvelutPage } from "@/components/pages/PalvelutPage";

export const metadata: Metadata = {
  title: "Palvelut",
  description:
    "AI-natiivi sovelluskehitys, Applied AI Engineering ja legacy-modernisointi. Rakennamme tietojärjestelmiä jotka tuottavat kilpailuetua.",
  openGraph: {
    title: "Palvelut — Webso",
    description:
      "AI-natiivi sovelluskehitys, Applied AI Engineering ja legacy-modernisointi.",
  },
};

export default function Palvelut() {
  return (
    <>
      <Nav />
      <main>
        <PalvelutPage />
      </main>
      <Footer />
    </>
  );
}
