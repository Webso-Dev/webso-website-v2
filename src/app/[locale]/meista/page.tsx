import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MeistaPage } from "@/components/pages/MeistaPage";

export const metadata: Metadata = {
  title: "Meistä",
  description:
    "Webso on suomalainen AI-natiivi ohjelmistokehitysyritys. Tutustuu tiimimme, arvoihimme ja siihen miksi rakennamme ohjelmistoja eri tavalla.",
  openGraph: {
    title: "Meistä — Webso",
    description:
      "Suomalainen AI-natiivi ohjelmistokehitysyritys. Tiimi, arvot ja tarina.",
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
