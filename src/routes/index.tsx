import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth/AuthProvider";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { status, user } = useAuth();
  
  if (status === "loading") {
    return null; // Handled by InnerRoot loading screen
  }

  if (status === "authenticated") {
    const roles = user?.roles || [];
    const isOwner = roles.some((r: any) => 
      (typeof r === 'string' ? r : r?.role)?.toUpperCase() === "OWNER"
    );

    if (isOwner) {
      return <Navigate to="/app" replace />;
    }
    
    // Non-owner authenticated users stay on home or go to their respective modules
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">ABOS Home</h1>
          <p className="text-sm text-primary/60 font-medium">Select a module from the command palette (⌘K) to begin.</p>
          <Link
            to="/setup"
            className="inline-block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors"
          >
            System initialization
          </Link>
        </div>
      </div>
    );
  }

  return <Navigate to="/auth" replace />;
}
