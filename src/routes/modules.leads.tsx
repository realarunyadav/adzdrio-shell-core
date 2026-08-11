import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/modules/leads")({
  beforeLoad: () => {
    throw redirect({ to: "/modules/crm" });
  },
});