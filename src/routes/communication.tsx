import { createFileRoute } from "@tanstack/react-router";
import { CommunicationCenter } from "@/components/communication/CommunicationCenter";

export const Route = createFileRoute("/communication")({
  component: () => (
    <div className="p-6">
      <CommunicationCenter />
    </div>
  ),
});
