import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, ShieldCheck, Mail, Phone, Briefcase } from "lucide-react";
import { DemoEmployee } from "@/lib/mock/workspace.demo";

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: DemoEmployee | null;
}

export function EmployeeModal({ isOpen, onClose, employee }: EmployeeModalProps) {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    role: "Associate",
    business: "Acme India",
    status: "Active" as const
  };

  const [formData, setFormData] = useState(employee ? {
    name: employee.name,
    email: employee.email,
    phone: employee.phone || "",
    role: employee.role,
    business: employee.department || "Acme India",
    status: (employee.status as any) || "Active"
  } : initialData);

  const handleSave = () => {
    console.log("Saving employee:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass-surface border-border/40">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
            <UserPlus className="size-5 text-primary" />
            {employee ? "Edit Employee Profile" : "Onboard New Employee"}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
            Configure system access, organizational alignment, and contact details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Full Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Ankit Singh"
                className="bg-background/50 border-border/40 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest">Employee Status</Label>
              <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v as any})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Mail className="size-3" /> Email Address
              </Label>
              <Input 
                type="email"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="ankit.s@abos.in"
                className="bg-background/50 border-border/40 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Phone className="size-3" /> Phone Number
              </Label>
              <Input 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98XXX XXXXX"
                className="bg-background/50 border-border/40 h-9 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Briefcase className="size-3" /> Primary Business
              </Label>
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
              <Label className="text-[10px] font-black uppercase tracking-widest">Assigned Role</Label>
              <Select value={formData.role} onValueChange={v => setFormData({...formData, role: v})}>
                <SelectTrigger className="bg-background/50 border-border/40 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sales Lead">Sales Lead</SelectItem>
                  <SelectItem value="Sr. Associate">Sr. Associate</SelectItem>
                  <SelectItem value="Associate">Associate</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border/40 pt-4">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-black uppercase tracking-widest">Cancel</Button>
          <Button onClick={handleSave} className="text-[10px] font-black uppercase tracking-widest bg-primary px-8">
            <ShieldCheck className="size-4 mr-2" /> Commit Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
