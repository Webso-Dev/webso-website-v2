import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MeistaPage } from "@/components/pages/MeistaPage";

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
