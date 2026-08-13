import * as React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  FileText, 
  Map, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  Table as TableIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ImportLeadsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ImportStep = 'upload' | 'map' | 'preview' | 'duplicate' | 'complete';

export function ImportLeadsDrawer({ open, onOpenChange }: ImportLeadsDrawerProps) {
  const [step, setStep] = React.useState<ImportStep>('upload');
  const [loading, setLoading] = React.useState(false);

  const nextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 'upload') setStep('map');
      else if (step === 'map') setStep('preview');
      else if (step === 'preview') setStep('duplicate');
      else if (step === 'duplicate') setStep('complete');
    }, 800);
  };

  const prevStep = () => {
    if (step === 'map') setStep('upload');
    else if (step === 'preview') setStep('map');
    else if (step === 'duplicate') setStep('preview');
  };

  const reset = () => {
    setStep('upload');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-6 border-b border-border/40">
          <SheetTitle className="text-2xl font-black uppercase tracking-tight">Import Leads</SheetTitle>
          <SheetDescription className="text-xs font-medium">
            Upload CSV or Excel files to batch import leads into the CRM system.
          </SheetDescription>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-4">
            {['upload', 'map', 'preview', 'duplicate', 'complete'].map((s, i) => (
              <React.Fragment key={s}>
                <div className={cn(
                  "size-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors",
                  step === s ? "bg-primary text-primary-foreground border-primary" : 
                  ['map', 'preview', 'duplicate', 'complete'].slice(0, ['map', 'preview', 'duplicate', 'complete'].indexOf(step as any) + 1).includes(s as any) ? "bg-success/10 text-success border-success/20" :
                  "bg-muted/5 text-muted-foreground border-border/40"
                )}>
                  {['map', 'preview', 'duplicate', 'complete'].slice(0, ['map', 'preview', 'duplicate', 'complete'].indexOf(step as any) + 1).includes(s as any) && step !== s ? <CheckCircle2 className="size-3" /> : i + 1}
                </div>
                {i < 4 && <div className="h-px w-4 bg-border/40" />}
              </React.Fragment>
            ))}
          </div>
        </SheetHeader>

        <div className="py-8">
          {step === 'upload' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="border-2 border-dashed border-border/40 rounded-2xl p-12 flex flex-col items-center text-center bg-muted/5 hover:bg-muted/10 hover:border-primary/40 transition-all cursor-pointer group">
                <div className="size-16 rounded-3xl bg-background border border-border/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Upload className="size-8 text-primary" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Drop your file here</h4>
                <p className="text-xs text-muted-foreground max-w-[240px]">Supports .csv, .xls, .xlsx files up to 10MB.</p>
                <Button variant="outline" className="mt-6 text-[10px] font-black uppercase tracking-widest h-9">Browse Files</Button>
              </div>
              <div className="p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 flex items-start gap-3">
                <FileText className="size-5 text-blue-600 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-blue-700 uppercase">Pro Tip: Use our template</p>
                  <p className="text-[10px] text-blue-600/80 leading-relaxed font-medium">Download the standard CRM import template to ensure all fields are mapped correctly automatically.</p>
                  <button className="text-[10px] font-black text-blue-700 underline uppercase tracking-widest mt-1">Download Template</button>
                </div>
              </div>
            </div>
          )}

          {step === 'map' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Field Mapping (12 Fields Detected)</h4>
              <div className="space-y-3">
                {[
                  { file: 'Full Name', crm: 'Lead Name', required: true },
                  { file: 'Email Address', crm: 'Email', required: true },
                  { file: 'Phone Number', crm: 'Phone', required: true },
                  { file: 'Inquiry Source', crm: 'Source', required: false },
                  { file: 'Organization', crm: 'Business', required: false },
                  { file: 'Lead Status', crm: 'Status', required: false },
                ].map((field) => (
                  <div key={field.file} className="flex items-center gap-4 p-3 rounded-xl border border-border/40 bg-muted/5">
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-muted-foreground uppercase mb-0.5">File Column</p>
                      <p className="text-xs font-bold">{field.file}</p>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground/30" />
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-primary uppercase mb-0.5">CRM Field {field.required && '*'}</p>
                      <div className="h-8 border border-border/40 rounded bg-background flex items-center px-2 text-xs font-bold">
                        {field.crm}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Import Preview (Top 5 of 124 records)</h4>
                <StatusBadge tone="success">124 Valid Records</StatusBadge>
              </div>
              <div className="border border-border/40 rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/10">
                      <TableHead className="text-[10px] font-black uppercase">Lead Name</TableHead>
                      <TableHead className="text-[10px] font-black uppercase">Email</TableHead>
                      <TableHead className="text-[10px] font-black uppercase">Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i} className="text-[10px] font-medium border-border/40">
                        <TableCell>Sample Lead {i}</TableCell>
                        <TableCell>lead{i}@example.com</TableCell>
                        <TableCell>Google Ads</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {step === 'duplicate' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
               <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3 mb-6">
                <AlertTriangle className="size-5 text-amber-600 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-amber-700 uppercase">Duplicates Detected</p>
                  <p className="text-[10px] text-amber-600/80 leading-relaxed font-medium">We found 8 records that already exist in the system. How would you like to handle them?</p>
                </div>
              </div>
              
              <div className="grid gap-3">
                {[
                  { id: 'allow', label: 'Allow Duplicates', desc: 'Import all records regardless of existing data.' },
                  { id: 'reject', label: 'Reject Duplicates', desc: 'Skip importing records that already exist.' },
                  { id: 'review', label: 'Manual Review', desc: 'Import as "Needs Review" for manual merging.' },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-muted/5 cursor-pointer hover:border-primary/40 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input type="radio" name="duplicate_handle" defaultChecked={opt.id === 'review'} className="mt-1" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-tight">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
              <div className="size-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-6 border border-success/20">
                <CheckCircle2 className="size-10" />
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight mb-2">Import Started</h4>
              <p className="text-sm text-muted-foreground max-w-sm mb-8">
                The import process is now running in the background. You will receive a notification once all <span className="font-bold text-foreground">124 leads</span> are processed.
              </p>
              <div className="w-full max-w-xs p-4 rounded-xl border border-border/40 bg-muted/5 flex items-center gap-4">
                <div className="flex-1 space-y-2 text-left">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Progress</span>
                    <span>42%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[42%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className={cn(
          "pt-6 border-t border-border/40 flex-row gap-3 sm:justify-between items-center",
          step === 'complete' && "justify-center"
        )}>
          {step !== 'complete' && (
            <>
              <Button variant="ghost" onClick={step === 'upload' ? reset : prevStep} className="font-bold uppercase tracking-widest text-[11px] h-10 px-6">
                {step === 'upload' ? 'Cancel' : <><ChevronLeft className="mr-2 size-4" /> Back</>}
              </Button>
              <Button onClick={nextStep} disabled={loading} className="font-black uppercase tracking-widest text-[11px] h-10 px-8 min-w-[140px] shadow-lg shadow-primary/20">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <>Next <ChevronRight className="ml-2 size-4" /></>}
              </Button>
            </>
          )}
          {step === 'complete' && (
            <Button onClick={reset} className="font-black uppercase tracking-widest text-[11px] h-10 px-12">
              Go to Lead Pool
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
