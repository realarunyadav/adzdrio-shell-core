import React, { useState } from "react";
import { 
  FileUp, 
  FileDown, 
  Database, 
  History, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  Search,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  Download,
  Clock,
  Trash2,
  RefreshCw,
  Plus
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { DataEntity, ImportStatus, ImportHistory, ValidationError } from "./types";

const mockImportHistory: ImportHistory[] = [
  {
    id: "imp_1",
    fileName: "q3_leads_export.csv",
    entity: "prospects",
    uploadedBy: "Rahul S.",
    timestamp: "2026-08-05 14:30",
    totalRows: 1250,
    successRows: 1242,
    failedRows: 8,
    updatedRows: 0,
    status: "partial"
  },
  {
    id: "imp_2",
    fileName: "annual_inventory_master.xlsx",
    entity: "products",
    uploadedBy: "Admin",
    timestamp: "2026-08-01 09:15",
    totalRows: 450,
    successRows: 450,
    failedRows: 0,
    updatedRows: 12,
    status: "success"
  }
];

export function DataCenter() {
  const [importStatus, setImportStatus] = useState<ImportStatus>('uploading');
  const [selectedEntity, setSelectedEntity] = useState<DataEntity>('prospects');

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">
      <PageHeader
        title="Data Import & Export Center"
        description="Safely manage, validate, and move enterprise data across ABOS."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface h-9">
              <Settings className="mr-2 size-4" />
              Mapping Rules
            </Button>
            <Button size="sm" className="shadow-elevated h-9">
              <Plus className="mr-2 size-4" />
              New Export
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="import" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="import">Import Center</TabsTrigger>
          <TabsTrigger value="export">Export Center</TabsTrigger>
          <TabsTrigger value="history">History & Audit</TabsTrigger>
          <TabsTrigger value="settings">Admin Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Import Workflow */}
            <div className="lg:col-span-8">
              <SectionCard 
                title={importStatus === 'uploading' ? "Step 1: Upload Source Data" : `Import Workflow: ${importStatus.charAt(0).toUpperCase() + importStatus.slice(1)}`}
                description="Select entity type and upload CSV or XLSX files for processing."
              >
                {importStatus === 'uploading' && (
                  <div className="space-y-8 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Entity Type</label>
                        <Select value={selectedEntity} onValueChange={(v: any) => setSelectedEntity(v)}>
                          <SelectTrigger className="glass-surface h-11">
                            <SelectValue placeholder="Select entity..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prospects">Prospects (CRM)</SelectItem>
                            <SelectItem value="customers">Customers</SelectItem>
                            <SelectItem value="sales">Sales Records</SelectItem>
                            <SelectItem value="employees">Employees (HRMS)</SelectItem>
                            <SelectItem value="products">Products / SKUs</SelectItem>
                            <SelectItem value="vendors">Vendors</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Import Mode</label>
                        <Select defaultValue="detect">
                          <SelectTrigger className="glass-surface h-11">
                            <SelectValue placeholder="Duplicate handling..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="detect">Detect & Notify (Recommended)</SelectItem>
                            <SelectItem value="skip">Skip Duplicates</SelectItem>
                            <SelectItem value="update">Update Existing (Authorized only)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div 
                      className="border-2 border-dashed border-border/60 rounded-2xl p-12 flex flex-col items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer group"
                      onClick={() => setImportStatus('mapping')}
                    >
                      <div className="size-16 rounded-full bg-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FileUp className="size-8 text-primary/60" />
                      </div>
                      <h4 className="text-sm font-bold">Click or drag to upload file</h4>
                      <p className="text-xs text-muted-foreground mt-2">CSV or XLSX supported. Max file size: 50MB.</p>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <ShieldCheck className="size-5 text-primary shrink-0" />
                      <p className="text-[11px] leading-relaxed">
                        ABOS ensures data integrity by enforcing mandatory fields and format validation during the next steps. Existing records are never silently overwritten.
                      </p>
                    </div>
                  </div>
                )}

                {importStatus === 'mapping' && (
                  <div className="space-y-6 py-4">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Source Column</span>
                      <ArrowRight className="size-4" />
                      <span>ABOS Field</span>
                    </div>
                    <div className="space-y-3">
                      <MappingRow source="Full Name" target="customer_name" required />
                      <MappingRow source="Company Email" target="email" required />
                      <MappingRow source="Mobile No" target="phone" />
                      <MappingRow source="Territory" target="region" />
                      <MappingRow source="Assigned To" target="owner_id" />
                    </div>
                    <div className="flex justify-end gap-3 pt-6">
                      <Button variant="ghost" size="sm" onClick={() => setImportStatus('uploading')}>Back</Button>
                      <Button size="sm" onClick={() => setImportStatus('preview')}>Process & Preview</Button>
                    </div>
                  </div>
                )}

                {importStatus === 'preview' && (
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatMini label="Total Rows" value="1,250" />
                      <StatMini label="Valid" value="1,242" tone="success" />
                      <StatMini label="Errors" value="8" tone="danger" />
                      <StatMini label="Duplicates" value="12" tone="warning" />
                    </div>

                    <div className="rounded-xl border border-border/40 overflow-hidden glass-surface">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="text-[10px] font-bold uppercase">Row</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase">Status</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase">Name</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase">Email</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-xs font-mono">1</TableCell>
                            <TableCell><Badge className="bg-success/10 text-success border-none text-[9px] px-1 py-0 uppercase">Valid</Badge></TableCell>
                            <TableCell className="text-xs font-medium">Acme Solutions</TableCell>
                            <TableCell className="text-xs text-muted-foreground">billing@acme.com</TableCell>
                            <TableCell className="text-right text-xs">Create New</TableCell>
                          </TableRow>
                          <TableRow className="bg-destructive/5">
                            <TableCell className="text-xs font-mono">2</TableCell>
                            <TableCell><Badge className="bg-destructive/10 text-destructive border-none text-[9px] px-1 py-0 uppercase">Error</Badge></TableCell>
                            <TableCell className="text-xs font-medium">Invalid Corp</TableCell>
                            <TableCell className="text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="size-3" />
                              Missing @
                            </TableCell>
                            <TableCell className="text-right text-xs font-bold text-destructive">Rejected</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <Button variant="outline" size="sm" className="h-8">
                        <Download className="mr-2 size-3" />
                        Download Error Report
                      </Button>
                      <div className="flex gap-3">
                        <Button variant="ghost" size="sm" onClick={() => setImportStatus('mapping')}>Re-map</Button>
                        <Button size="sm" className="bg-success hover:bg-success/90">Confirm Import</Button>
                      </div>
                    </div>
                  </div>
                )}
              </SectionCard>
            </div>

            {/* Sidebar: Entity Rules */}
            <div className="lg:col-span-4 space-y-6">
              <SectionCard title="Validation Rules" description={selectedEntity.charAt(0).toUpperCase() + selectedEntity.slice(1)}>
                <div className="space-y-4">
                  <RuleItem label="Email Format" status="active" />
                  <RuleItem label="Phone Normalization" status="active" />
                  <RuleItem label="Duplicate Match (Email)" status="active" />
                  <RuleItem label="Required: Name" status="active" />
                  <RuleItem label="Reference Check: Regions" status="warning" />
                  <Button variant="ghost" size="sm" className="w-full text-xs mt-2 font-bold uppercase">Configure Rules</Button>
                </div>
              </SectionCard>

              <SectionCard title="Import Statistics">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Total Records Imported</p>
                      <h4 className="text-2xl font-black">24,850</h4>
                    </div>
                    <Badge className="bg-success/10 text-success border-none text-[10px] font-bold">+12% this month</Badge>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>98.2% Validation Success Rate</span>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExportCard 
              title="CRM & Pipeline" 
              entity="prospects" 
              format="XLSX" 
              lastRun="Today, 10:45 AM"
            />
            <ExportCard 
              title="Financial Ledger" 
              entity="sales" 
              format="CSV" 
              lastRun="Yesterday"
            />
            <ExportCard 
              title="Employee Directory" 
              entity="employees" 
              format="PDF" 
              lastRun="2 days ago"
            />
          </div>

          <SectionCard title="Scheduled Exports" description="Automated business intelligence delivery.">
            <div className="space-y-4">
              <ScheduledExportItem 
                name="Weekly Sales Performance" 
                frequency="Every Monday, 8:00 AM" 
                format="XLSX" 
                recipient="Management Team"
              />
              <ScheduledExportItem 
                name="Monthly Tax Compliance" 
                frequency="1st of every month" 
                format="PDF" 
                recipient="Finance Dept"
              />
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <SectionCard title="Import & Export Audit History">
            <div className="rounded-xl border border-border/40 overflow-hidden glass-surface">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase">File / Process</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase">Entity</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-center">Rows</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-center">Status</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase">User</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockImportHistory.map((h) => (
                    <TableRow key={h.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="size-4 text-primary/60" />
                          <span className="text-xs font-bold">{h.fileName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs uppercase font-medium">{h.entity}</TableCell>
                      <TableCell className="text-center">
                        <div className="text-xs font-bold">{h.totalRows}</div>
                        <div className="text-[9px] text-muted-foreground">{h.successRows} ok / {h.failedRows} err</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn(
                          "border-none text-[9px] px-1 py-0 font-bold uppercase",
                          h.status === 'success' ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        )}>
                          {h.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{h.uploadedBy}</TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">{h.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Duplicate Detection Rules">
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg glass-surface border border-border/40">
                    <div>
                      <p className="text-xs font-bold">Match by Email</p>
                      <p className="text-[10px] text-muted-foreground">Prevents duplicate CRM profiles.</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-none text-[9px] px-1 py-0 uppercase">Primary</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg glass-surface border border-border/40">
                    <div>
                      <p className="text-xs font-bold">Match by Phone</p>
                      <p className="text-[10px] text-muted-foreground">Secondary identifier for customers.</p>
                    </div>
                    <Badge className="bg-muted text-muted-foreground border-none text-[9px] px-1 py-0 uppercase">Active</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs h-8">Add Logic Rule</Button>
               </div>
            </SectionCard>
            <SectionCard title="Security Controls">
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Record every data export in audit log</span>
                    <Badge className="bg-success text-white border-none text-[9px] px-1 py-0 uppercase">Enforced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Require approval for Sensitive exports</span>
                    <Badge className="bg-warning text-white border-none text-[9px] px-1 py-0 uppercase">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Max single import rows</span>
                    <span className="text-xs font-bold">50,000</span>
                  </div>
               </div>
            </SectionCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MappingRow({ source, target, required }: { source: string; target: string; required?: boolean }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-5 p-2 rounded bg-muted/20 border border-border/40 text-[11px] font-medium">
        {source}
      </div>
      <div className="col-span-2 flex justify-center">
        <ArrowRight className="size-3 text-muted-foreground" />
      </div>
      <div className="col-span-5 p-2 rounded border border-primary/20 bg-primary/5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-primary">{target}</span>
        {required && <Badge className="bg-destructive text-white border-none text-[8px] px-1 py-0 uppercase scale-75">Required</Badge>}
      </div>
    </div>
  );
}

function StatMini({ label, value, tone = "neutral" }: any) {
  const tones: any = {
    neutral: "bg-muted/10 text-muted-foreground border-border/40",
    success: "bg-success/5 text-success border-success/20",
    danger: "bg-destructive/5 text-destructive border-destructive/20",
    warning: "bg-warning/5 text-warning border-warning/20",
  };
  return (
    <div className={cn("p-3 rounded-xl border", tones[tone])}>
      <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">{label}</p>
      <p className="text-lg font-black leading-tight">{value}</p>
    </div>
  );
}

function RuleItem({ label, status }: { label: string; status: "active" | "warning" | "disabled" }) {
  const icons: any = {
    active: <CheckCircle2 className="size-3 text-success" />,
    warning: <AlertTriangle className="size-3 text-warning" />,
    disabled: <Clock className="size-3 text-muted-foreground" />,
  };
  return (
    <div className="flex items-center justify-between text-xs p-2 rounded hover:bg-muted/5 transition-colors">
      <span>{label}</span>
      {icons[status]}
    </div>
  );
}

function ExportCard({ title, entity, format, lastRun }: any) {
  return (
    <Card className="surface-card shadow-card border-border/40 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Database className="size-5 text-primary/70" />
          </div>
          <Badge className="bg-muted text-muted-foreground border-none text-[10px] font-bold">{format}</Badge>
        </div>
        <h4 className="text-sm font-bold mb-1">{title}</h4>
        <p className="text-[10px] text-muted-foreground uppercase font-medium">{entity}</p>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
          <span className="text-[10px] text-muted-foreground italic">Last: {lastRun}</span>
          <Button size="icon" variant="ghost" className="size-8">
            <FileDown className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduledExportItem({ name, frequency, format, recipient }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 glass-surface group hover:border-primary/20 transition-all">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
          <Clock className="size-5 text-muted-foreground" />
        </div>
        <div>
          <h5 className="text-sm font-bold">{name}</h5>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-medium uppercase text-muted-foreground">{frequency}</span>
            <span className="text-[10px] text-muted-foreground">•</span>
            <span className="text-[10px] text-muted-foreground">To: {recipient}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-[9px]">{format}</Badge>
        <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100 transition-opacity">
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  );
}
