import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground italic">
        hi
      </div>
    );
  },
});
