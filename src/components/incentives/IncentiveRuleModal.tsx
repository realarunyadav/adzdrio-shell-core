import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DemoIncentiveRule } from "@/lib/mock/workspace.demo";

interface IncentiveRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  rule?: DemoIncentiveRule | null;
}

type TierData = {
  min: number;
  reward: number;
  type: "Fixed" | "Percentage";
  label?: string | undefined;
};

type FormData = {
  name: string;
  businessId: string;
  type: "Sales" | "Referral";
  status: "Draft" | "Active" | "Inactive";
  version: number;
  description: string;
  effectiveFrom: string;
  tiers: TierData[];
};

export function IncentiveRuleModal({ isOpen, onClose, rule }: IncentiveRuleModalProps) {
  const initialData: FormData = {
    name: "",
    businessId: "biz-a",
    type: "Sales",
    status: "Draft",
    version: 1,
    description: "",
    effectiveFrom: new Date().toISOString().split('T')[0] || "",
    tiers: [{ min: 0, reward: 0, type: "Fixed", label: "Tier 1" }]
  };

  const [formData, setFormData] = useState<FormData>(initialData);

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        businessId: rule.businessId,
        type: rule.type,
        status: rule.status,
        version: rule.version,
        description: rule.description,
        effectiveFrom: rule.effectiveFrom,
        tiers: rule.tiers.map(t => ({
          min: t.min,
          reward: t.reward,
          type: t.type,
          label: t.label
        }))
      });
    } else {
      setFormData(initialData);
    }
  }, [rule, isOpen]);

  const addTier = () => {
    const lastTier = formData.tiers[formData.tiers.length - 1];
    const newTier: TierData = { 
      min: (lastTier?.min || 0) + 10, 
      reward: (lastTier?.reward || 0) + 1000, 
      type: "Fixed", 
      label: `Tier ${formData.tiers.length + 1}` 
    };
    setFormData({ ...formData, tiers: [...formData.tiers, newTier] });
  };

  const removeTier = (index: number) => {
    setFormData({ ...formData, tiers: formData.tiers.filter((_, i) => i !== index) });
  };

  const updateTier = (index: number, field: keyof TierData, value: any) => {
    const newTiers = [...formData.tiers];
    newTiers[index] = { ...newTiers[index], [field]: value } as TierData;
    setFormData({ ...formData, tiers: newTiers });
  };

  const handleSave = () => {
    console.log("Saving rule:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-surface border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            {rule ? <Zap className="size-5 text-primary" /> : <Plus className="size-5 text-primary" />}
            {rule ? "Edit Incentive Rule" : "Create Incentive Rule"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
            Configure tiered slabs and performance rewards for {formData.type}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Rule Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Q4 Sales Accelerator"
                className="bg-background/50 border-border/40 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Description</Label>
              <Textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Brief explanation of the incentive goal..."
                className="bg-background/50 border-border/40 min-h-[80px] text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest">Effective From</Label>
                <Input 
                  type="date"
                  value={formData.effectiveFrom} 
                  onChange={e => setFormData({...formData, effectiveFrom: e.target.value})}
                  className="bg-background/50 border-border/40 h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest">Rule Type</Label>
                <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v as any})}>
                  <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-l border-border/40 pl-6">
            <div className="flex justify-between items-center">
              <Label className="text-[10px] font-black uppercase tracking-widest">Reward Slabs</Label>
              <Button variant="ghost" size="sm" onClick={addTier} className="h-7 text-[9px] font-black uppercase tracking-tighter gap-1">
                <Plus className="size-3" /> Add Tier
              </Button>
            </div>
            
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {formData.tiers.map((tier, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-border/40 bg-accent/5 space-y-3 relative group">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[8px] font-black border-primary/20 text-primary h-4 px-1.5">
                      T{idx + 1}
                    </Badge>
                    <Input 
                      value={tier.label || ""} 
                      onChange={e => updateTier(idx, 'label', e.target.value || undefined)}
                      placeholder="Label (optional)"
                      className="bg-transparent border-none h-6 p-0 text-[10px] font-black uppercase tracking-widest focus-visible:ring-0"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeTier(idx)}
                      className="size-6 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[8px] font-black uppercase text-muted-foreground tracking-tighter">Min Sales</span>
                      <Input 
                        type="number"
                        value={tier.min} 
                        onChange={e => updateTier(idx, 'min', parseInt(e.target.value) || 0)}
                        className="bg-background/50 border-border/40 h-7 text-[10px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] font-black uppercase text-muted-foreground tracking-tighter">Reward Amount</span>
                      <Input 
                        type="number"
                        value={tier.reward} 
                        onChange={e => updateTier(idx, 'reward', parseInt(e.target.value) || 0)}
                        className="bg-background/50 border-border/40 h-7 text-[10px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4 mt-2">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest">Cancel</Button>
          <Button onClick={handleSave} className="text-[10px] font-black uppercase tracking-widest bg-primary px-8">
            <ShieldCheck className="size-4 mr-2" /> Save Rule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
