import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ShieldCheck, MapPin, Globe } from "lucide-react";
import { DemoBusiness } from "@/lib/mock/workspace.demo";

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  business?: DemoBusiness | null;
}

export function BusinessModal({ isOpen, onClose, business }: BusinessModalProps) {
  const initialData = {
    name: "",
    initials: "",
    plan: "Enterprise",
    status: "active" as const,
    domain: "",
    address: ""
  };

  const [formData, setFormData] = useState(business ? {
    name: business.name,
    plan: business.plan || "Growth",
    revenue: business.revenue || "₹ 0",
    teamSize: business.teamSize || 0,
    status: business.status || "active",
    initials: business.initials || business.name.substring(0, 2).toUpperCase(),
    domain: "",
    address: ""
  } : initialData);

  const handleSave = () => {
    console.log("Saving business:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass-surface border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            <Building2 className="size-5 text-primary" />
            {business ? "Edit Business Entity" : "Register New Business"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
            Configure legal identity, operational domain, and service tier for this entity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Legal Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Acme India Pvt Ltd"
                className="bg-background/50 border-border/40 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Initials / Prefix</Label>
              <Input 
                value={formData.initials} 
                onChange={e => setFormData({...formData, initials: e.target.value})}
                placeholder="e.g. AI"
                maxLength={3}
                className="bg-background/50 border-border/40 h-9 text-xs font-black uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Entity Plan</Label>
              <Select value={formData.plan} onValueChange={v => setFormData({...formData, plan: v})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                  <SelectItem value="Starter">Starter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Operational Status</Label>
              <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v as any})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <Globe className="size-3" /> Custom Domain
            </Label>
            <Input 
              value={formData.domain} 
              onChange={e => setFormData({...formData, domain: e.target.value})}
              placeholder="acme.abos.app"
              className="bg-background/50 border-border/40 h-9 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="size-3" /> Registered Address
            </Label>
            <Textarea 
              value={formData.address} 
              onChange={e => setFormData({...formData, address: e.target.value})}
              placeholder="Corporate headquarters address..."
              className="bg-background/50 border-border/40 min-h-[80px] text-xs"
            />
          </div>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest">Cancel</Button>
          <Button onClick={handleSave} className="text-[10px] font-black uppercase tracking-widest bg-primary px-8">
            <ShieldCheck className="size-4 mr-2" /> Register Entity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
