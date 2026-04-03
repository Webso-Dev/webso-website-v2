import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { YhteistyotPage } from "@/components/pages/YhteistyotPage";

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
