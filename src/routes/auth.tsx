import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success("Welcome back to ABOS");
      navigate({ to: "/app" });
    } catch (err: any) {
      toast.error(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none opacity-20" />
      <div className="absolute top-1/4 left-1/4 size-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Card className="w-full max-w-md glass-surface border-border/40 shadow-elevated relative z-10">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="size-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldCheck className="size-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-black tracking-tight uppercase">ABOS Portal</CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            Adzdrio Business Operating System
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest opacity-70">Enterprise Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@adzdrio.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-surface h-11 border-border/40 focus:border-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest opacity-70">Security Key</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-surface h-11 border-border/40 focus:border-primary/50 transition-all"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full h-11 shadow-elevated font-black uppercase tracking-widest text-[10px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Verifying Identity...
                </>
              ) : (
                "Authorize Session"
              )}
            </Button>
            <p className="text-[10px] text-center text-muted-foreground/60 leading-relaxed uppercase tracking-tighter">
              Authorized personnel only. Access monitored and audited.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}