import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { UraPage } from "@/components/pages/UraPage";

export const metadata: Metadata = {
  title: "Ura",
  description:
    "Liity Webson tiimiin. Teemme sovelluskehitystä eri tavalla — AI on osa jokaista projektia. Katso avoimet paikat.",
  openGraph: {
    title: "Ura — Webso",
    description:
      "Liity Webson tiimiin. AI on osa jokaista projektia. Katso avoimet paikat.",
  },
};

export default function Ura() {
  return (
    <>
      <Nav />
      <main>
        <UraPage />
      </main>
      <Footer />
    </>
  );
}
