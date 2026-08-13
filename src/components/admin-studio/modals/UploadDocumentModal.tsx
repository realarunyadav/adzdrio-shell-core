import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  File, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Shield,
  Clock,
  Building2,
  Tag as TagIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { cn } from "@/lib/utils";
import { DocCategory, DocAccessLevel, demoBusinesses } from "@/lib/mock/workspace.demo";

interface UploadDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (doc: any) => void;
}

type Step = 'upload' | 'metadata' | 'access' | 'confirm';

export function UploadDocumentModal({ open, onOpenChange, onSuccess }: UploadDocumentModalProps) {
  const [step, setStep] = React.useState<Step>('upload');
  const [file, setFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    name: '',
    category: '' as DocCategory | '',
    businessId: '',
    type: 'PDF',
    description: '',
    expiryDate: '',
    accessLevel: 'Internal' as DocAccessLevel,
    tags: ''
  });

  const reset = () => {
    setStep('upload');
    setFile(null);
    setFormData({
      name: '',
      category: '',
      businessId: '',
      type: 'PDF',
      description: '',
      expiryDate: '',
      accessLevel: 'Internal',
      tags: ''
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFormData(prev => ({ ...prev, name: selectedFile.name.split('.')[0] || '' }));
      setStep('metadata');
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newDoc = {
      id: `DOC-${Math.floor(Math.random() * 1000)}`,
      ...formData,
      status: 'Active',
      version: 1,
      ownerName: 'SuperAdmin',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      versions: [{
        id: 'VER-1',
        version: 1,
        uploadedByName: 'SuperAdmin',
        timestamp: new Date().toISOString(),
        note: 'Initial upload',
        size: file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '0 MB'
      }]
    };
    
    setIsUploading(false);
    setStep('confirm');
    if (onSuccess) onSuccess(newDoc);
  };

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return (
          <div className="space-y-6 py-8">
            <div 
              className="border-2 border-dashed border-border/60 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer relative"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="size-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black uppercase tracking-widest">Drop files here</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX, or Images up to 50MB</p>
              </div>
              <Button variant="outline" className="mt-2 font-black uppercase tracking-widest text-[10px]">
                Browse Files
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border/40 bg-accent/5 space-y-2">
                <Shield className="size-4 text-blue-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">Secure Storage</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">All documents are encrypted at rest and during transit.</p>
              </div>
              <div className="p-4 rounded-xl border border-border/40 bg-accent/5 space-y-2">
                <Clock className="size-4 text-amber-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">Version Control</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">Automatic versioning and full audit trail for every change.</p>
              </div>
            </div>
          </div>
        );

      case 'metadata':
        return (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Document Name</Label>
                <Input 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="h-11 rounded-xl bg-accent/20 border-border/40 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={v => setFormData({...formData, category: v as DocCategory})}
                >
                  <SelectTrigger className="h-11 rounded-xl bg-accent/20 border-border/40 font-bold">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Company">Company</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Business Scope</Label>
                <Select 
                  value={formData.businessId} 
                  onValueChange={v => setFormData({...formData, businessId: v})}
                >
                  <SelectTrigger className="h-11 rounded-xl bg-accent/20 border-border/40 font-bold">
                    <SelectValue placeholder="Select business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global / Company-wide</SelectItem>
                    {demoBusinesses.map(biz => (
                      <SelectItem key={biz.id} value={biz.id}>{biz.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Expiry Date (Optional)</Label>
                <Input 
                  type="date"
                  value={formData.expiryDate} 
                  onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                  className="h-11 rounded-xl bg-accent/20 border-border/40 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Description</Label>
              <Textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Brief summary of the document content..."
                className="rounded-xl bg-accent/20 border-border/40 min-h-[80px] font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Tags (Comma separated)</Label>
              <div className="relative">
                <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input 
                  value={formData.tags} 
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                  placeholder="e.g. contract, 2026, private"
                  className="h-11 pl-10 rounded-xl bg-accent/20 border-border/40 font-bold"
                />
              </div>
            </div>
          </div>
        );

      case 'access':
        return (
          <div className="space-y-6 py-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-4">
              <Shield className="size-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest">Access Control Policy</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Permissions are inherited from the selected category and business scope. 
                  You can override specific user access after upload.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Security Classification</Label>
              <div className="grid grid-cols-2 gap-3">
                {(['Public', 'Internal', 'Restricted', 'Confidential'] as DocAccessLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({...formData, accessLevel: level})}
                    className={cn(
                      "flex flex-col items-start gap-1 p-3 rounded-xl border transition-all text-left",
                      formData.accessLevel === level 
                        ? "bg-primary/10 border-primary shadow-sm" 
                        : "bg-accent/5 border-border/40 hover:bg-accent/10"
                    )}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">{level}</span>
                    <span className="text-[9px] text-muted-foreground leading-tight">
                      {level === 'Public' ? 'Visible to anyone with the link.' :
                       level === 'Internal' ? 'All employees within business scope.' :
                       level === 'Restricted' ? 'Specific roles and designated managers.' :
                       'Management and explicit users only.'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 flex items-center gap-2">
                <CheckCircle2 className="size-3 text-emerald-500" />
                Inherited Permissions Summary
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-accent/20 border border-border/40">
                  <span className="text-[10px] font-bold">Admin Group</span>
                  <Badge variant="outline" className="text-[8px] h-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Full Access</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-accent/20 border border-border/40">
                  <span className="text-[10px] font-bold">Compliance Team</span>
                  <Badge variant="outline" className="text-[8px] h-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Read / Download</Badge>
                </div>
              </div>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
              <CheckCircle2 className="size-10 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black uppercase tracking-widest">Upload Successful</h3>
              <p className="text-xs text-muted-foreground">"{formData.name}" has been indexed and secured.</p>
            </div>
            <div className="w-full max-w-sm mt-6 p-4 rounded-2xl bg-accent/5 border border-border/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Doc ID</span>
                <span className="text-[10px] font-bold">DOC-842</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</span>
                <span className="text-[10px] font-bold">{formData.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access</span>
                <StatusBadge tone={formData.accessLevel === 'Public' ? 'neutral' : formData.accessLevel === 'Confidential' ? 'danger' : 'info'}>{formData.accessLevel}</StatusBadge>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) reset();
      onOpenChange(val);
    }}>
      <DialogContent className="max-w-xl bg-card border-border/60 shadow-2xl rounded-3xl glass-surface p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border/40">
          <DialogTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <Upload className="size-4 text-primary" />
            {step === 'upload' ? 'Upload Document' : 
             step === 'metadata' ? 'Document Metadata' : 
             step === 'access' ? 'Access Control' : 'Complete'}
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            Step {step === 'upload' ? 1 : step === 'metadata' ? 2 : step === 'access' ? 3 : 4} of 4
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {renderStep()}
        </div>

        <DialogFooter className="p-4 bg-accent/5 border-t border-border/40 flex items-center justify-between">
          {step === 'upload' ? (
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="font-black uppercase tracking-widest text-[10px]">
              Cancel
            </Button>
          ) : step === 'confirm' ? (
            <div />
          ) : (
            <Button 
              variant="outline" 
              onClick={() => {
                if (step === 'metadata') setStep('upload');
                if (step === 'access') setStep('metadata');
              }}
              className="font-black uppercase tracking-widest text-[10px] h-9"
            >
              Back
            </Button>
          )}

          {step === 'upload' ? null : step === 'confirm' ? (
            <Button 
              onClick={() => onOpenChange(false)}
              className="font-black uppercase tracking-widest text-[10px] h-9 px-6 shadow-lg shadow-primary/20"
            >
              Done
            </Button>
          ) : (
            <Button 
              onClick={() => {
                if (step === 'metadata') setStep('access');
                else if (step === 'access') handleSubmit();
              }}
              disabled={isUploading || (step === 'metadata' && (!formData.name || !formData.category || !formData.businessId))}
              className="font-black uppercase tracking-widest text-[10px] h-9 px-6 shadow-lg shadow-primary/20"
            >
              {isUploading ? (
                <>
                  <Upload className="size-3 mr-2 animate-bounce" />
                  Uploading...
                </>
              ) : (
                step === 'access' ? 'Finish Upload' : 'Next Step'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
