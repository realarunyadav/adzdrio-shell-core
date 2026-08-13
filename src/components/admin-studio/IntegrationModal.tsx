import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Share2, Lock, ShieldCheck, Database, Terminal, Globe } from "lucide-react";
import { DemoIntegration } from "@/lib/mock/workspace.demo";

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration?: DemoIntegration | null;
}

export function IntegrationModal({ isOpen, onClose, integration }: IntegrationModalProps) {
  const initialData = {
    name: integration?.name || "",
    status: integration?.status || "Disconnected",
    apiKey: "••••••••••••••••",
    webhookUrl: "https://api.abos.app/webhooks/incoming",
    syncFrequency: "Every 15 Minutes",
    environment: "Production" as const
  };

  const [formData, setFormData] = useState(initialData);

  const handleSave = () => {
    console.log("Saving integration:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl glass-surface border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            <Share2 className="size-5 text-primary" />
            {integration ? `Configure ${integration.name}` : "Establish New Integration"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
            Manage secure API handshake, credential rotation, and data synchronization flows.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Globe className="size-3" /> Runtime Environment
              </Label>
              <Select value={formData.environment} onValueChange={v => setFormData({...formData, environment: v as any})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Production">Production</SelectItem>
                  <SelectItem value="Staging">Staging / Sandbox</SelectItem>
                  <SelectItem value="Development">Local Dev</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Database className="size-3" /> Sync Frequency
              </Label>
              <Select value={formData.syncFrequency} onValueChange={v => setFormData({...formData, syncFrequency: v})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Real-time">Real-time (Webhooks)</SelectItem>
                  <SelectItem value="Every 15 Minutes">Every 15 Minutes</SelectItem>
                  <SelectItem value="Hourly">Hourly Batch</SelectItem>
                  <SelectItem value="Daily">Daily Snapshot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 text-primary">
                <Lock className="size-3" /> API Key / Secret Token
              </Label>
              <div className="relative">
                <Input 
                  type="password"
                  value={formData.apiKey} 
                  onChange={e => setFormData({...formData, apiKey: e.target.value})}
                  className="bg-background/50 border-border/40 h-10 text-xs font-mono pr-20"
                />
                <Button variant="ghost" className="absolute right-1 top-1 h-8 text-[9px] font-black uppercase tracking-tighter">Rotate Key</Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="size-3" /> Webhook Endpoint URL
              </Label>
              <Input 
                value={formData.webhookUrl} 
                onChange={e => setFormData({...formData, webhookUrl: e.target.value})}
                className="bg-background/50 border-border/40 h-10 text-xs font-mono"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-navy/5 border border-border/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[11px] font-bold uppercase tracking-tight">Auto-Retry on Failure</Label>
                <p className="text-[9px] text-muted-foreground font-medium">Retry failed sync attempts up to 3 times with exponential backoff.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-[11px] font-bold uppercase tracking-tight">Debug Logging</Label>
                <p className="text-[9px] text-muted-foreground font-medium">Capture full request/response payloads in Audit Center (High Storage).</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest">Discard Changes</Button>
          <Button onClick={handleSave} className="text-[10px] font-black uppercase tracking-widest bg-primary px-8">
            <ShieldCheck className="size-4 mr-2" /> Commit Config
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
