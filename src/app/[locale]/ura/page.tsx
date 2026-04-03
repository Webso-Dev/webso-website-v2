import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { UraPage } from "@/components/pages/UraPage";

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
