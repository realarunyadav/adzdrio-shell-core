import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Receipt } from "lucide-react";
import { DemoTaxRule } from "@/lib/mock/workspace.demo";

interface TaxRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  rule?: DemoTaxRule | null;
}

type FormData = {
  name: string;
  type: "GST" | "TDS" | "VAT";
  rate: number;
  effectiveFrom: string;
  status: "Active" | "Inactive";
};

export function TaxRuleModal({ isOpen, onClose, rule }: TaxRuleModalProps) {
  const initialData: FormData = {
    name: "",
    type: "GST",
    rate: 18,
    effectiveFrom: new Date().toISOString().split('T')[0] || "",
    status: "Active"
  };

  const [formData, setFormData] = useState<FormData>(initialData);

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        type: rule.type as any,
        rate: rule.rate,
        effectiveFrom: rule.effectiveFrom,
        status: rule.status as any
      });
    } else {
      setFormData(initialData);
    }
  }, [rule, isOpen]);

  const handleSave = () => {
    console.log("Saving tax rule:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass-surface border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            <Receipt className="size-5 text-primary" />
            {rule ? "Edit Tax Rule" : "Create Tax Rule"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
            Configure compliance rates and effective periods for business transactions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest">Rule Name</Label>
            <Input 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Standard GST 18%"
              className="bg-background/50 border-border/40 h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Tax Type</Label>
              <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v as any})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GST">GST (India)</SelectItem>
                  <SelectItem value="TDS">TDS</SelectItem>
                  <SelectItem value="VAT">VAT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Rate (%)</Label>
              <Input 
                type="number"
                value={formData.rate} 
                onChange={e => setFormData({...formData, rate: parseFloat(e.target.value) || 0})}
                className="bg-background/50 border-border/40 h-9 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Effective Date</Label>
              <Input 
                type="date"
                value={formData.effectiveFrom} 
                onChange={e => setFormData({...formData, effectiveFrom: e.target.value})}
                className="bg-background/50 border-border/40 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Status</Label>
              <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v as any})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest">Cancel</Button>
          <Button onClick={handleSave} className="text-[10px] font-black uppercase tracking-widest bg-primary px-8">
            <ShieldCheck className="size-4 mr-2" /> Save Rule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
