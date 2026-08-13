import * as React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { demoBusinesses, demoPlans } from "@/lib/mock/workspace.demo";
import { Check, ChevronRight, ChevronLeft, CreditCard, ShoppingBag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CreateSaleWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateSaleWizard({ open, onOpenChange }: CreateSaleWizardProps) {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    customerName: "",
    phone: "",
    email: "",
    business: "",
    isExisting: "new",
    planId: "",
    amount: "",
    discount: "0",
    salesEmployee: "Ankit Singh",
    paymentMethod: "upi",
  });

  const selectedPlan = demoPlans.find(p => p.id === formData.planId);
  const finalAmount = Math.max(0, (Number(formData.amount) || 0) - (Number(formData.discount) || 0));

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleComplete = () => {
    onOpenChange(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-orange-600' : 'bg-muted'}`} 
              />
            ))}
          </div>
          <DialogTitle className="text-xl font-black">
            {step === 1 && "Customer Information"}
            {step === 2 && "Sale Details"}
            {step === 3 && "Payment Method"}
            {step === 4 && "Review & Confirm"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 min-h-[300px]">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-wider">Customer Name</Label>
                  <Input 
                    placeholder="Enter full name" 
                    value={formData.customerName}
                    onChange={e => setFormData({...formData, customerName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-wider">Business / Brand</Label>
                  <Select 
                    value={formData.business} 
                    onValueChange={v => setFormData({...formData, business: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoBusinesses.map(b => (
                        <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-wider">Phone Number</Label>
                  <Input 
                    placeholder="+91" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-wider">Email Address</Label>
                  <Input 
                    placeholder="email@example.com" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-wider">Select Plan / Product</Label>
                <Select 
                  value={formData.planId} 
                  onValueChange={v => {
                    const plan = demoPlans.find(p => p.id === v);
                    setFormData({...formData, planId: v, amount: plan?.price.toString() || ""});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoPlans.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name} - ₹{p.price}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-wider">Sale Amount</Label>
                  <Input 
                    type="number"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-wider">Discount</Label>
                  <Input 
                    type="number"
                    value={formData.discount}
                    onChange={e => setFormData({...formData, discount: e.target.value})}
                  />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 flex justify-between items-center">
                <span className="text-sm font-bold">Final Sale Amount</span>
                <span className="text-xl font-black text-orange-600">₹ {finalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: CreditCard },
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', icon: ShoppingBag },
                  { id: 'cash', label: 'Cash / Manual', icon: User },
                ].map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setFormData({...formData, paymentMethod: method.id})}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${
                      formData.paymentMethod === method.id 
                        ? 'border-orange-600 bg-orange-600/5' 
                        : 'border-border hover:border-orange-300'
                    }`}
                  >
                    <method.icon className={`h-6 w-6 ${formData.paymentMethod === method.id ? 'text-orange-600' : 'text-muted-foreground'}`} />
                    <span className="text-xs font-black">{method.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-muted-foreground uppercase">Customer</p>
                  <div className="space-y-1">
                    <p className="text-sm font-black">{formData.customerName}</p>
                    <p className="text-xs text-muted-foreground">{formData.phone}</p>
                    <p className="text-xs text-muted-foreground">{formData.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-muted-foreground uppercase">Sale Details</p>
                  <div className="space-y-1">
                    <p className="text-sm font-black">{selectedPlan?.name || "Manual Sale"}</p>
                    <p className="text-xs text-muted-foreground">Business: {formData.business}</p>
                    <p className="text-xs text-muted-foreground">Method: {formData.paymentMethod.toUpperCase()}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Gross Amount</span>
                  <span className="text-xs font-bold">₹ {Number(formData.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-red-600">
                  <span className="text-xs font-medium">Discount</span>
                  <span className="text-xs font-bold">- ₹ {Number(formData.discount).toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-sm font-black">Total to Collect</span>
                  <span className="text-xl font-black text-orange-600">₹ {finalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-border pt-4 gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep} className="font-bold">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}
          {step < 4 ? (
            <Button 
              onClick={nextStep} 
              disabled={step === 1 && (!formData.customerName || !formData.business)}
              className="bg-orange-600 hover:bg-orange-700 font-bold"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700 font-bold">
              <Check className="mr-2 h-4 w-4" /> Confirm & Create Sale
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
