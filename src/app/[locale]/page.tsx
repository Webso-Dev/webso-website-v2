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

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <Lupaus />
        <Palvelut />
        <Suosittelijat />
        <Yhteistyot />
        <Luvut />
        <Yhteydenotto />
      </main>
      <Footer />
    </>
  );
}
