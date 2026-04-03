import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OtaYhteyttaPage } from "@/components/pages/OtaYhteyttaPage";

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
