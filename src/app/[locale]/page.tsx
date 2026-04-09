import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Lupaus } from "@/components/Lupaus";
import { Palvelut } from "@/components/Palvelut";
import { Suosittelijat } from "@/components/Suosittelijat";
import { Yhteistyot } from "@/components/Yhteistyot";
import { Luvut } from "@/components/Luvut";
import { Yhteydenotto } from "@/components/Yhteydenotto";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Webso — AI-natiivi sovelluskehitys",
  description:
    "AI-natiivi tiimi toimittaa enemmän, nopeammin ja paremmalla laadulla. Rakennamme yritysten tietojärjestelmiä hyödyntäen tekoälyn koko potentiaalin.",
  openGraph: {
    title: "Webso — AI-natiivi sovelluskehitys",
    description:
      "AI-natiivi tiimi toimittaa enemmän, nopeammin ja paremmalla laadulla.",
    url: "https://webso.fi",
  },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <Lupaus />
        <Palvelut />
        <Yhteistyot />
        <Suosittelijat />
        <Luvut />
        <Yhteydenotto />
      </main>
      <Footer />
    </>
  );
}
