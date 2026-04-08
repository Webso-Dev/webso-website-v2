import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { YhteistyotPage } from "@/components/pages/YhteistyotPage";

export const metadata: Metadata = {
  title: "Yhteistyöt",
  description:
    "Asiakasprojekteja ja yhteistyöesimerkkejä. Katso miten olemme rakentaneet liiketoimintakriittisiä järjestelmiä suomalaisille yrityksille.",
  openGraph: {
    title: "Yhteistyöt — Webso",
    description:
      "Asiakasprojekteja ja yhteistyöesimerkkejä suomalaisilta yrityksiltä.",
  },
};

export default function Yhteistyot() {
  return (
    <>
      <Nav />
      <main>
        <YhteistyotPage />
      </main>
      <Footer />
    </>
  );
}
