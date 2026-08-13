import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { 
  GitMerge, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  History,
  Download,
  MoreHorizontal,
  Database,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  DuplicateCase, 
  demoDuplicateCases, 
  demoDuplicateAudit,
  DuplicateAudit 
} from "@/lib/mock/workspace.demo";
import { ConflictResolutionModal } from "@/components/admin-studio/modals/ConflictResolutionModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/modules/admin/duplicates")({
  component: DuplicateReviewDashboard,
});

function DuplicateReviewDashboard() {
  const [cases, setCases] = React.useState<DuplicateCase[]>(demoDuplicateCases);
  const [audits, setAudits] = React.useState<DuplicateAudit[]>(demoDuplicateAudit);
  const [selectedCase, setSelectedCase] = React.useState<DuplicateCase | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [activeView, setActiveView] = React.useState<'active' | 'resolved' | 'audit'>('active');

  const filteredCases = cases.filter(c => {
    const matchesSearch = 
      c.recordA.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.recordB.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter.toLowerCase();
    
    const isResolvedView = activeView === 'resolved';
    const isResolvedStatus = ['Merged', 'Rejected', 'Confirmed Duplicate', 'Not Duplicate'].includes(c.status);
    
    if (isResolvedView) return matchesSearch && isResolvedStatus;
    return matchesSearch && matchesStatus && !isResolvedStatus;
  });

  const handleResolve = (id: string, action: string, result: any) => {
    // Update local state for prototype persistence
    setCases(prev => prev.map(c => 
      c.id === id ? { ...c, status: action as any, resolvedAt: new Date().toISOString() } : c
    ));

    // Add audit entry
    const newAudit: DuplicateAudit = {
      id: `aud-${Math.random().toString(36).substr(2, 9)}`,
      adminId: "ADMIN-001",
      adminName: "System Admin",
      business: "Global",
      entityType: cases.find(c => c.id === id)?.entityType || "Unknown",
      recordIds: [cases.find(c => c.id === id)?.recordA.id || "", cases.find(c => c.id === id)?.recordB.id || ""],
      action: (action === 'Record A Retained' || action === 'Record B Retained') 
        ? action 
        : action === 'Merged' ? 'Merged' : 'Reviewed',
      timestamp: new Date().toISOString(),
      result: result ? `Resolution applied with merged data.` : `Action: ${action}`
    };
    setAudits(prev => [newAudit, ...prev]);
  };


  const getStatusTone = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'warning';
      case 'Merged': return 'success';
      case 'Rejected': return 'danger';
      case 'Not Duplicate': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          eyebrow="DATA QUALITY"
          title="Duplicate Review"
          description="Resolve record conflicts and maintain a single source of truth across the enterprise."
          className="p-0"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 gap-2 text-[10px] font-black uppercase tracking-widest border-border/40">
            <Download className="size-3.5" /> Export Report
          </Button>
          <Button className="h-9 gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
            <Zap className="size-3.5" /> Run Detection
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          label="Awaiting Review" 
          value={cases.filter(c => c.status === 'Pending Review').length} 
          icon={AlertCircle} 
          tone="warning" 
        />
        <StatsCard 
          label="High Confidence" 
          value={cases.filter(c => c.confidence > 0.9 && c.status === 'Pending Review').length} 
          icon={ShieldCheck} 
          tone="premium" 
        />
        <StatsCard 
          label="Resolved Today" 
          value={cases.filter(c => c.resolvedAt && c.resolvedAt.startsWith(new Date().toISOString().split('T')[0] || '')).length} 
          icon={CheckCircle2} 
          tone="success" 
        />
        <StatsCard 
          label="Total Entities" 
          value={audits.length} 
          icon={Database} 
          tone="info" 
        />
      </div>

      <div className="glass-surface border border-border/40 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-border/40 bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-background/50 p-1 rounded-xl border border-border/40">
             <ViewButton active={activeView === 'active'} onClick={() => setActiveView('active')} label="Active Cases" />
             <ViewButton active={activeView === 'resolved'} onClick={() => setActiveView('resolved')} label="Resolved" />
             <ViewButton active={activeView === 'audit'} onClick={() => setActiveView('audit')} label="Audit Log" />
          </div>
          
          <div className="flex items-center gap-2 flex-1 md:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ID, or source..." 
                className="pl-9 h-9 text-[11px] font-medium border-border/40 bg-background/50 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border/40 bg-background/50">
              <Filter className="size-4" />
            </Button>
          </div>
        </div>

        {activeView === 'audit' ? (
          <ScrollArea className="h-[600px]">
             <div className="p-6">
                <Table>
                   <TableHeader>
                      <TableRow className="border-border/40 hover:bg-transparent">
                         <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Timestamp</TableHead>
                         <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Admin</TableHead>
                         <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Action</TableHead>
                         <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Case ID</TableHead>
                         <TableHead className="text-[10px] font-black uppercase tracking-widest h-10">Details</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {audits.map((audit) => (
                         <TableRow key={audit.id} className="border-border/40 group hover:bg-accent/5 transition-colors">
                            <TableCell className="text-[11px] font-bold text-muted-foreground whitespace-nowrap">
                               {new Date(audit.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>
                               <div className="flex items-center gap-2">
                                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                                     {audit.adminName.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <span className="text-[11px] font-bold">{audit.adminName}</span>
                               </div>
                            </TableCell>
                            <TableCell>
                               <StatusBadge tone={getStatusTone(audit.action)} className="h-5">
                                  {audit.action}
                               </StatusBadge>
                            </TableCell>
                            <TableCell className="text-[10px] font-mono text-muted-foreground">{audit.caseId}</TableCell>
                            <TableCell className="text-[11px] font-medium max-w-xs truncate">{audit.details}</TableCell>
                         </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </div>
          </ScrollArea>
        ) : filteredCases.length === 0 ? (
          <EmptyState 
            icon={GitMerge}
            title={activeView === 'resolved' ? "No Resolved Cases" : "No Pending Duplicates"}
            description={activeView === 'resolved' ? "No records have been merged or resolved yet." : "All systems nominal. No duplicate records found matching your criteria."}
            className="py-32"
          />
        ) : (
          <div className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 hover:bg-transparent bg-muted/10">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 px-6">Entity</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Comparison (A vs B)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Match Reason</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Confidence</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 text-right px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((c) => (
                  <TableRow key={c.id} className="border-border/40 group hover:bg-accent/5 transition-colors">
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="w-fit text-[8px] font-black uppercase bg-accent text-accent-foreground border-border/40">
                          {c.entityType}
                        </Badge>
                        <span className="text-[9px] font-mono text-muted-foreground">{c.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold truncate max-w-[120px]">{c.recordA.name}</span>
                          <span className="text-[9px] text-muted-foreground font-medium">{c.recordA.source}</span>
                        </div>
                        <ArrowRight className="size-3 text-muted-foreground opacity-30" />
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold truncate max-w-[120px]">{c.recordB.name}</span>
                          <span className="text-[9px] text-muted-foreground font-medium">{c.recordB.source}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-medium">{c.matchingReason}</span>
                        {c.importId && <span className="text-[9px] text-primary font-bold">Import: {c.importId}</span>}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all",
                              c.confidence > 0.8 ? "bg-success" : c.confidence > 0.5 ? "bg-amber-500" : "bg-muted-foreground"
                            )}
                            style={{ width: `${c.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black">{(c.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <StatusBadge tone={getStatusTone(c.status)}>
                        {c.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      {activeView === 'active' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-[9px] font-black uppercase tracking-widest border-border/40 hover:bg-background"
                            onClick={() => {
                              setSelectedCase(c);
                              setModalOpen(true);
                            }}
                          >
                            Review
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 glass-surface border-border/40">
                              <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-wider" onClick={() => handleResolve(c.id, 'Confirmed Duplicate', null)}>
                                Mark Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-wider" onClick={() => handleResolve(c.id, 'Not Duplicate', null)}>
                                Not Duplicate
                              </DropdownMenuItem>
                              <Separator className="my-1 opacity-40" />
                              <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-wider text-destructive" onClick={() => handleResolve(c.id, 'Rejected', null)}>
                                Reject Incoming
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest opacity-50 hover:opacity-100">
                          View Result
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <ConflictResolutionModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
        duplicateCase={selectedCase}
        onResolve={handleResolve}
      />
    </div>
  );
}

function StatsCard({ label, value, icon: Icon, tone }: { label: string, value: number, icon: any, tone: any }) {
  return (
    <div className="glass-surface border border-border/40 p-4 rounded-2xl flex items-center justify-between group transition-all hover:border-primary/30">
      <div className="space-y-1">
        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-2xl font-black tracking-tight">{value}</div>
      </div>
      <div className={cn(
        "size-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
        tone === 'warning' ? "bg-amber-500/10 text-amber-600" :
        tone === 'success' ? "bg-success/10 text-success" :
        tone === 'premium' ? "bg-primary/10 text-primary" :
        "bg-info/10 text-info"
      )}>
        <Icon className="size-5" />
      </div>
    </div>
  );
}

function ViewButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
        active ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      {label}
    </button>
  );
}
