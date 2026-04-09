import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MeistaPage } from "@/components/pages/MeistaPage";

export const metadata: Metadata = {
  title: "Meistä",
  description:
    "Webso on suomalainen AI-natiivi sovelluskehitysyritys. Tutustuu tiimimme, arvoihimme ja siihen miksi rakennamme sovelluksia eri tavalla.",
  openGraph: {
    title: "Meistä — Webso",
    description:
      "Suomalainen AI-natiivi sovelluskehitysyritys. Tiimi, arvot ja tarina.",
  },
};

export default function Meista() {
  return (
    <>
      <Nav />
      <main>
        <MeistaPage />
      </main>
      <Footer />
    </>
  );
}
