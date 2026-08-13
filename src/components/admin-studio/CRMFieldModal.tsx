import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Hash, ShieldCheck, Database } from "lucide-react";

interface CRMFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  field?: any;
}

export function CRMFieldModal({ isOpen, onClose, field }: CRMFieldModalProps) {
  const initialData = {
    label: "",
    type: "Text",
    required: false,
    unique: false,
    placeholder: "",
    businessEntity: "Global"
  };

  const [formData, setFormData] = useState(field ? {
    label: field.label,
    type: field.type,
    required: field.required || false,
    unique: field.unique || false,
    placeholder: field.placeholder || "",
    businessEntity: field.businessEntity || "Global"
  } : initialData);

  const handleSave = () => {
    console.log("Saving CRM Field:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass-surface border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            <Database className="size-5 text-primary" />
            {field ? "Edit Schema Field" : "Define New Field"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
            Extend the CRM data model with custom attributes and validation rules.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-widest">Field Label</Label>
            <Input 
              value={formData.label} 
              onChange={e => setFormData({...formData, label: e.target.value})}
              placeholder="e.g. GST Number"
              className="bg-background/50 border-border/40 h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Data Type</Label>
              <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Number">Number</SelectItem>
                  <SelectItem value="Date">Date</SelectItem>
                  <SelectItem value="Select">Dropdown</SelectItem>
                  <SelectItem value="Phone">Phone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Scope</Label>
              <Select value={formData.businessEntity} onValueChange={v => setFormData({...formData, businessEntity: v})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Global">Global (All Brands)</SelectItem>
                  <SelectItem value="Acme India">Acme India Only</SelectItem>
                  <SelectItem value="Vertex Tech">Vertex Tech Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-bold uppercase tracking-tight">Required Field</Label>
                <p className="text-[9px] text-muted-foreground font-medium uppercase">Block lead creation if empty</p>
              </div>
              <Switch 
                checked={formData.required} 
                onCheckedChange={v => setFormData({...formData, required: v})} 
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-xs font-bold uppercase tracking-tight">Unique Constraint</Label>
                <p className="text-[9px] text-muted-foreground font-medium uppercase">Prevent duplicate values in database</p>
              </div>
              <Switch 
                checked={formData.unique} 
                onCheckedChange={v => setFormData({...formData, unique: v})} 
              />
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest">Cancel</Button>
          <Button onClick={handleSave} className="text-[10px] font-black uppercase tracking-widest bg-primary px-8">
            <ShieldCheck className="size-4 mr-2" /> Commit Field
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
