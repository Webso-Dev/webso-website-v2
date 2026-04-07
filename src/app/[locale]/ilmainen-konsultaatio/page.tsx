import { Nav } from "@/components/Nav";
import { FunnelWizard } from "@/components/funnel/FunnelWizard";

export default function IlmainenKonsultaatioPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-w-black">
      <Nav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <FunnelWizard />
      </div>
    </div>
  );
}
