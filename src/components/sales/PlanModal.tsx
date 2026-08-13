import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ShieldCheck, Tag, DollarSign, ListFilter, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DemoPlan } from "@/lib/mock/workspace.demo";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: DemoPlan | null;
}

type FormData = {
  name: string;
  business: string;
  price: number;
  status: "Active" | "Inactive" | "Draft";
  features: string[];
};

export function PlanModal({ isOpen, onClose, plan }: PlanModalProps) {
  const initialData: FormData = {
    name: "",
    business: "Acme India",
    price: 0,
    status: "Draft",
    features: ["Core CRM"]
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        business: plan.business,
        price: plan.price,
        status: plan.status,
        features: [...(plan.features || [])]
      });
    } else {
      setFormData(initialData);
    }
  }, [plan, isOpen]);

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const handleSave = () => {
    console.log("Saving plan:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass-surface border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            <Tag className="size-5 text-primary" />
            {plan ? "Edit Pricing Plan" : "Create Pricing Plan"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
            Define features, pricing tiers, and global availability for this service plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Plan Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Pro Annual"
                className="bg-background/50 border-border/40 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Base Price (₹)</Label>
              <Input 
                type="number"
                value={formData.price} 
                onChange={e => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                className="bg-background/50 border-border/40 h-9 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Business Entity</Label>
              <Select value={formData.business} onValueChange={v => setFormData({...formData, business: v})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Acme India">Acme India</SelectItem>
                  <SelectItem value="Vertex Tech">Vertex Tech</SelectItem>
                  <SelectItem value="Blue Harbour">Blue Harbour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Launch Status</Label>
              <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v as any})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest">Feature Set</Label>
            <div className="flex gap-2">
              <Input 
                value={newFeature}
                onChange={e => setNewFeature(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addFeature()}
                placeholder="Add a plan feature..."
                className="bg-background/50 border-border/40 h-8 text-[10px]"
              />
              <Button size="sm" onClick={addFeature} className="h-8 text-[9px] font-black uppercase">Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {formData.features.map((feature, idx) => (
                <Badge key={idx} variant="secondary" className="gap-1.5 px-2 py-1 bg-accent/30 hover:bg-accent/50 transition-colors border-none text-[9px] font-bold uppercase tracking-tight">
                  {feature}
                  <button onClick={() => removeFeature(idx)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-2.5" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest">Cancel</Button>
          <Button onClick={handleSave} className="text-[10px] font-black uppercase tracking-widest bg-primary px-8">
            <ShieldCheck className="size-4 mr-2" /> Publish Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
