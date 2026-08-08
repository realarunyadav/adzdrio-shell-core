import * as React from "react";
import { leadsService, RapidLead } from "@/lib/api/services";
import { SectionCard } from "@/components/shared/SectionCard";
import { 
  Zap, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ArrowUpRight, 
  Copy, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function RapidConfirmationManager() {
  const [leads, setLeads] = React.useState<RapidLead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);
        const data = await leadsService.getAll();
        setLeads(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Confirmation link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight">Rapid Confirmation Hub</h2>
          <p className="text-xs text-muted-foreground font-medium">Manage and monitor sales confirmation links.</p>
        </div>
        <Button size="sm" className="h-9 shadow-elevated">
          <Zap className="mr-2 size-3.5" />
          Generate New Offer
        </Button>
      </div>

      <SectionCard 
        title="Active Offers & Confirmations"
        actions={
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input placeholder="Search records..." className="w-[240px] h-9 pl-9 text-xs glass-surface" />
            </div>
            <Button variant="outline" size="sm" className="h-9 glass-surface">
              <Filter className="mr-2 size-3.5" />
              Filter
            </Button>
          </div>
        }
        contentClassName="p-0"
      >
        <div className="min-h-[400px]">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Customer / Entity</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Plan Details</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Expires In</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center text-muted-foreground animate-pulse">
                    <Loader2 className="size-6 mx-auto mb-2 animate-spin opacity-20" />
                    Accessing Secure Hub...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center">
                    <Database className="size-6 mx-auto mb-2 text-destructive opacity-40" />
                    <p className="text-xs font-bold text-destructive">Backend Connection Required</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{error}</p>
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center text-muted-foreground italic">
                    No confirmation links generated yet.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/5 group">
                    <TableCell>
                      <p className="text-xs font-bold text-foreground">{lead.customerName}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{lead.customerEmail}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs font-bold uppercase tracking-tight">{lead.selectedPlanId.replace(/_/g, ' ')}</p>
                      <p className="text-[10px] text-muted-foreground">₹{lead.price.toLocaleString()} • {lead.duration}m</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-[9px] font-black uppercase tracking-tighter px-2 h-5",
                        lead.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        lead.status === 'not_confirmed' ? "bg-destructive/10 text-destructive border-destructive/20" :
                        lead.status === 'sent' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                        "bg-muted text-muted-foreground border-border/40"
                      )} variant="outline">
                        {lead.status === 'confirmed' && <CheckCircle2 className="size-2.5 mr-1" />}
                        {lead.status === 'not_confirmed' && <XCircle className="size-2.5 mr-1" />}
                        {lead.status.replace(/_/g, ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="size-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-slate-600">
                          {Math.max(0, Math.ceil((new Date(lead.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 glass-surface">
                          <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest opacity-50">Quick Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="text-xs font-bold" onClick={() => copyLink(lead.confirmationUrl)}>
                            <Copy className="mr-2 h-3.5 w-3.5" /> Copy Secure Link
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold">
                            <ArrowUpRight className="mr-2 h-3.5 w-3.5" /> Open Preview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-xs font-bold text-destructive">
                            <XCircle className="mr-2 h-3.5 w-3.5" /> Deactivate Link
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}
