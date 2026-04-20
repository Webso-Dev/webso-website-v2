import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BongariliittoCasePage } from "@/components/pages/BongariliittoCasePage";

export default function BongariliittoCase() {
  return (
    <>
      <Nav />
      <main>
        <BongariliittoCasePage />
      </main>
      <Footer />
    </>
  );
}
