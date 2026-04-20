import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DietaCasePage } from "@/components/pages/DietaCasePage";

export default function DietaCase() {
  return (
    <>
      <Nav />
      <main>
        <DietaCasePage />
      </main>
      <Footer />
    </>
  );
}
