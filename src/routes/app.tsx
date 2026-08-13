import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex-1">
      <h1>Dashboard Content</h1>
    </div>
  );
}
