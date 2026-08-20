import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth/AuthProvider";
import { getInitializationStatus, provisionFirstOwner } from "@/lib/api/bootstrap.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldPlus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/setup")({
  component: SetupPage,
  head: () => ({
    meta: [
      { title: "ABOS Initialization — First Owner Setup" },
      { name: "description", content: "One-time secure initialization of the ABOS root organization and its owner." },
      { property: "og:title", content: "ABOS Initialization — First Owner Setup" },
      { property: "og:description", content: "One-time secure initialization of the ABOS root organization and its owner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function SetupPage() {
  const { status } = useAuth();
  const navigate = useNavigate();
  const checkStatus = useServerFn(getInitializationStatus);
  const provision = useServerFn(provisionFirstOwner);

  const [initialized, setInitialized] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    void checkStatus()
      .then((res) => setInitialized(res.initialized))
      .catch(() => setInitialized(null));
  }, [status]);

  if (status === "loading") return null;
  if (status !== "authenticated") return <Navigate to="/auth" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await provision({ data: { organizationName: name, organizationSlug: slug } });
      toast.success("Root organization created. Please sign in again to load your OWNER session.");
      window.location.href = "/auth";
    } catch (err: any) {
      toast.error(err?.message || "Initialization failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy p-4">
      <Card className="w-full max-w-md glass-surface border-border/40 shadow-elevated">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="size-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldPlus className="size-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-black tracking-tight uppercase">System Initialization</CardTitle>
          <CardDescription className="text-muted-foreground font-medium">
            One-time creation of the root organization and its OWNER.
          </CardDescription>
        </CardHeader>

        {initialized === true ? (
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              This system has already been initialized. First-owner provisioning is permanently closed.
            </p>
            <Button variant="outline" className="w-full" onClick={() => navigate({ to: "/" })}>
              Return
            </Button>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org" className="text-xs font-bold uppercase tracking-widest opacity-70">
                  Organization Name
                </Label>
                <Input
                  id="org"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adzdrio Group"
                  className="glass-surface h-11 border-border/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-xs font-bold uppercase tracking-widest opacity-70">
                  Organization Slug
                </Label>
                <Input
                  id="slug"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase())}
                  placeholder="adzdrio"
                  className="glass-surface h-11 border-border/40"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isSaving || initialized === null}
                className="w-full h-11 font-black uppercase tracking-widest text-[10px]"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Provisioning...
                  </>
                ) : (
                  "Initialize Root Organization"
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground/60 uppercase tracking-tighter">
                Available only until the first OWNER exists. Audited operation.
              </p>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
