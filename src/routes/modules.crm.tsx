import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  Building2,
  CircleDollarSign,
  Contact,
  Database,
  Edit3,
  Eye,
  Loader2,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Target,
  Trash2,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

import { accountService, contactService, dealService, leadsService } from "@/lib/api/services";
import { Lead360Dialog } from "@/components/crm/Lead360Dialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/crm")({ component: SalesCRMModule });

type ModalState = "lead" | "account" | "contact" | "deal" | null;

function SalesCRMModule() {
  const [tab, setTab] = React.useState("dashboard");
  const [leads, setLeads] = React.useState<any[]>([]);
  const [accounts, setAccounts] = React.useState<any[]>([]);
  const [contacts, setContacts] = React.useState<any[]>([]);
  const [deals, setDeals] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [modal, setModal] = React.useState<ModalState>(null);
  const [editing, setEditing] = React.useState<any | null>(null);
  const [lead360Lead, setLead360Lead] = React.useState<any | null>(null);

  const load = React.useCallback(async (silent = false) => {
    try {
      silent ? setRefreshing(true) : setLoading(true);
      setError(null);
      const [leadData, accountData, contactData, dealData] = await Promise.all([
        leadsService.getAll({ page: 1, pageSize: 100 }),
        accountService.getAll(),
        contactService.getAll(),
        dealService.getAll(),
      ]);
      setLeads(leadData ?? []);
      setAccounts(accountData ?? []);
      setContacts(contactData ?? []);
      setDeals(dealData ?? []);
    } catch (err: any) {
      setError(err?.message || "Unable to load CRM data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  const filteredLeads = React.useMemo(() => filterRows(leads, search), [leads, search]);
  const filteredAccounts = React.useMemo(() => filterRows(accounts, search), [accounts, search]);
  const filteredContacts = React.useMemo(() => filterRows(contacts, search), [contacts, search]);
  const wonDeals = deals.filter((deal) => /won|closed_won/i.test(String(deal.stage ?? deal.status ?? "")));
  const pipelineValue = deals.reduce((sum, deal) => sum + Number(deal.amount ?? 0), 0);
  const wonValue = wonDeals.reduce((sum, deal) => sum + Number(deal.amount ?? 0), 0);

  const openModal = (kind: ModalState, item?: any) => { setEditing(item ?? null); setModal(kind); };
  const closeModal = () => { setModal(null); setEditing(null); };

  const handleDelete = async (kind: "lead" | "account" | "contact" | "deal", id: string) => {
    try {
      if (kind === "lead") await leadsService.remove(id);
      if (kind === "account") await accountService.remove(id);
      if (kind === "contact") await contactService.remove(id);
      if (kind === "deal") await dealService.remove(id);
      toast.success("Record deleted");
      await load(true);
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Adzdrio Sales"
        title="CRM Command Center"
        description="Live leads, accounts, contacts and deal pipeline powered by the ABOS backend."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => void load(true)} disabled={refreshing}>
              <RefreshCw className={cn("mr-2 size-3.5", refreshing && "animate-spin")} /> Refresh
            </Button>
            <Button size="sm" onClick={() => openModal("lead")}><UserPlus className="mr-2 size-3.5" /> Add Lead</Button>
          </div>
        }
      />

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive flex items-center justify-between gap-4">
          <div><b>CRM backend error:</b> {error}</div>
          <Button size="sm" variant="outline" onClick={() => void load(true)}>Retry</Button>
        </div>
      )}

      <Tabs value={tab} onValueChange={(value) => { setTab(value); setSearch(""); }} className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <TabsList className="h-auto justify-start gap-2 overflow-x-auto bg-transparent p-0">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="leads">Leads <Count value={leads.length} /></TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline <Count value={deals.length} /></TabsTrigger>
            <TabsTrigger value="accounts">Accounts <Count value={accounts.length} /></TabsTrigger>
            <TabsTrigger value="contacts">Contacts <Count value={contacts.length} /></TabsTrigger>
          </TabsList>
          {tab !== "dashboard" && (
            <div className="relative w-full lg:w-[300px]">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${tab}...`} className="h-9 pl-9" />
            </div>
          )}
        </div>

        <TabsContent value="dashboard" className="space-y-6 outline-none">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi icon={Target} label="Active Leads" value={String(leads.length)} />
            <Kpi icon={Building2} label="Accounts" value={String(accounts.length)} />
            <Kpi icon={Contact} label="Contacts" value={String(contacts.length)} />
            <Kpi icon={CircleDollarSign} label="Pipeline Value" value={formatMoney(pipelineValue)} />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Sales Pipeline" description="Live deal totals from the backend.">
              <div className="space-y-4">
                <MetricRow label="Total deals" value={String(deals.length)} />
                <MetricRow label="Won deals" value={`${wonDeals.length} · ${formatMoney(wonValue)}`} />
                <MetricRow label="Open pipeline" value={formatMoney(Math.max(0, pipelineValue - wonValue))} />
              </div>
            </SectionCard>
            <SectionCard title="Recent Leads" description="Newest records in the organisation.">
              <div className="space-y-2">
                {leads.slice(0, 5).map((lead) => (
                  <button key={lead.id} onClick={() => setLead360Lead(lead)} className="w-full rounded-lg border border-border/40 p-3 text-left hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <div><p className="text-xs font-bold">{lead.customerName}</p><p className="text-[10px] text-muted-foreground">{lead.customerEmail || "No email"}</p></div>
                      <Badge variant="outline" className="text-[9px]">{lead.status}</Badge>
                    </div>
                  </button>
                ))}
                {!leads.length && <EmptyInline label="No leads yet" />}
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="outline-none">
          <SectionCard title="Lead Directory" description="Create, search, update and delete live CRM leads." actions={<Button size="sm" onClick={() => openModal("lead")}><Plus className="mr-2 size-3.5" /> New Lead</Button>} contentClassName="p-0">
            <Table><TableHeader><TableRow><TableHead>Lead</TableHead><TableHead>Company</TableHead><TableHead>Status</TableHead><TableHead>Stage</TableHead><TableHead>Score</TableHead><TableHead>Created</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>{filteredLeads.map((lead) => <TableRow key={lead.id}>
                <TableCell><button className="text-left hover:text-primary" onClick={() => setLead360Lead(lead)}><p className="text-xs font-bold">{lead.customerName}</p><p className="text-[10px] text-muted-foreground">{lead.customerEmail || "—"}</p></button></TableCell>
                <TableCell className="text-xs">{lead.companyName || "—"}</TableCell>
                <TableCell><Badge variant="outline" className="text-[9px] uppercase">{lead.status}</Badge></TableCell>
                <TableCell className="text-xs">{lead.stage || "New"}</TableCell>
                <TableCell className="font-mono text-xs">{lead.score ?? 0}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{formatDate(lead.createdAt)}</TableCell>
                <TableCell className="text-right"><RowMenu onView={() => setLead360Lead(lead)} onEdit={() => openModal("lead", lead)} onDelete={() => void handleDelete("lead", lead.id)} /></TableCell>
              </TableRow>)}
              {!filteredLeads.length && <EmptyTable colSpan={7} label="No leads match this search" />}</TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="pipeline" className="outline-none">
          <SectionCard title="Deal Pipeline" description="Live deals from the ABOS backend." actions={<Button size="sm" onClick={() => openModal("deal")}><Plus className="mr-2 size-3.5" /> New Deal</Button>}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {groupDeals(deals).map(([stage, items]) => (
                <div key={stage} className="rounded-xl border border-border/40 bg-muted/10 p-3 min-h-[260px]">
                  <div className="mb-3 flex items-center justify-between"><h3 className="text-xs font-black uppercase tracking-widest">{stage}</h3><Badge variant="secondary">{items.length}</Badge></div>
                  <div className="space-y-2">{items.map((deal) => <button key={deal.id} onClick={() => openModal("deal", deal)} className="w-full rounded-lg border border-border/40 bg-background p-3 text-left hover:border-primary/40 transition-colors"><p className="text-xs font-bold truncate">{deal.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{formatMoney(Number(deal.amount ?? 0))}</p><p className="mt-2 text-[9px] uppercase tracking-widest text-muted-foreground">{deal.probability ?? 0}% probability</p></button>)}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="accounts" className="outline-none">
          <SectionCard title="Accounts" description="Organisation-level CRM accounts." actions={<Button size="sm" onClick={() => openModal("account")}><Plus className="mr-2 size-3.5" /> New Account</Button>} contentClassName="p-0">
            <Table><TableHeader><TableRow><TableHead>Account</TableHead><TableHead>Industry</TableHead><TableHead>Email</TableHead><TableHead>Location</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
              {filteredAccounts.map((account) => <TableRow key={account.id}><TableCell className="text-xs font-bold">{account.name}</TableCell><TableCell className="text-xs">{account.industry || "—"}</TableCell><TableCell className="text-xs">{account.email || "—"}</TableCell><TableCell className="text-xs">{[account.city, account.state].filter(Boolean).join(", ") || "—"}</TableCell><TableCell><Badge variant="outline" className="text-[9px]">{account.status || "ACTIVE"}</Badge></TableCell><TableCell className="text-right"><RowMenu onEdit={() => openModal("account", account)} onDelete={() => void handleDelete("account", account.id)} /></TableCell></TableRow>)}
              {!filteredAccounts.length && <EmptyTable colSpan={6} label="No accounts match this search" />}
            </TableBody></Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="contacts" className="outline-none">
          <SectionCard title="Contacts" description="People linked to accounts and leads." actions={<Button size="sm" onClick={() => openModal("contact")}><Plus className="mr-2 size-3.5" /> New Contact</Button>} contentClassName="p-0">
            <Table><TableHeader><TableRow><TableHead>Contact</TableHead><TableHead>Title</TableHead><TableHead>Account</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
              {filteredContacts.map((contact) => <TableRow key={contact.id}><TableCell><p className="text-xs font-bold">{[contact.firstName, contact.lastName].filter(Boolean).join(" ")}</p><p className="text-[10px] text-muted-foreground">{contact.department || ""}</p></TableCell><TableCell className="text-xs">{contact.title || "—"}</TableCell><TableCell className="text-xs">{contact.account?.name || contact.accountName || contact.accountId || "—"}</TableCell><TableCell className="text-xs">{contact.email || "—"}</TableCell><TableCell className="text-xs">{contact.phone || "—"}</TableCell><TableCell><Badge variant="outline" className="text-[9px]">{contact.status || "ACTIVE"}</Badge></TableCell><TableCell className="text-right"><RowMenu onEdit={() => openModal("contact", contact)} onDelete={() => void handleDelete("contact", contact.id)} /></TableCell></TableRow>)}
              {!filteredContacts.length && <EmptyTable colSpan={7} label="No contacts match this search" />}
            </TableBody></Table>
          </SectionCard>
        </TabsContent>
      </Tabs>

      <RecordDialog kind={modal} item={editing} accounts={accounts} onClose={closeModal} onSaved={() => { closeModal(); void load(true); }} />
      <Lead360Dialog lead={lead360Lead} open={Boolean(lead360Lead)} onOpenChange={(open) => { if (!open) setLead360Lead(null); }} />
    </div>
  );
}

function RecordDialog({ kind, item, accounts, onClose, onSaved }: { kind: ModalState; item: any; accounts: any[]; onClose: () => void; onSaved: () => void }) {
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    if (!kind) return;
    if (kind === "lead") setForm({ firstName: item?.firstName ?? "", lastName: item?.lastName ?? "", companyName: item?.companyName ?? "", email: item?.customerEmail ?? item?.email ?? "", primaryPhone: item?.customerPhone ?? item?.primaryPhone ?? "", stage: item?.stage ?? "New", source: item?.source ?? "Website", score: item?.score ?? 0, notes: item?.notes ?? "" });
    if (kind === "account") setForm({ name: item?.name ?? "", email: item?.email ?? "", phone: item?.phone ?? "", industry: item?.industry ?? "", website: item?.website ?? "", city: item?.city ?? "", state: item?.state ?? "", country: item?.country ?? "India", status: item?.status ?? "ACTIVE", notes: item?.notes ?? "" });
    if (kind === "contact") setForm({ firstName: item?.firstName ?? "", lastName: item?.lastName ?? "", accountId: item?.accountId ?? "", email: item?.email ?? "", phone: item?.phone ?? "", title: item?.title ?? "", department: item?.department ?? "", status: item?.status ?? "ACTIVE", source: item?.source ?? "CRM", notes: item?.notes ?? "" });
    if (kind === "deal") setForm({ name: item?.name ?? "", accountId: item?.accountId ?? "", contactId: item?.contactId ?? "", leadId: item?.leadId ?? "", amount: item?.amount ?? 0, currency: item?.currency ?? "INR", stage: item?.stage ?? "New", probability: item?.probability ?? 10, expectedCloseDate: item?.expectedCloseDate ? String(item.expectedCloseDate).slice(0, 10) : "", source: item?.source ?? "CRM", description: item?.description ?? "" });
  }, [kind, item]);

  const set = (key: string, value: any) => setForm((current) => ({ ...current, [key]: value }));
  const title = kind ? `${item ? "Edit" : "New"} ${kind.charAt(0).toUpperCase() + kind.slice(1)}` : "";

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!kind) return;
    setSaving(true);
    try {
      if (kind === "lead") item ? await leadsService.update(item.id, form) : await leadsService.create(form);
      if (kind === "account") item ? await accountService.update(item.id, form) : await accountService.create(form);
      if (kind === "contact") item ? await contactService.update(item.id, form) : await contactService.create(form);
      if (kind === "deal") item ? await dealService.update(item.id, form) : await dealService.create(form);
      toast.success(`${title} saved successfully`);
      onSaved();
    } catch (err: any) {
      toast.error(err?.message || `Unable to save ${kind}`);
    } finally { setSaving(false); }
  };

  return <Dialog open={Boolean(kind)} onOpenChange={(open) => !open && onClose()}><DialogContent className="max-w-2xl"><form onSubmit={save}><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>Changes are saved directly to the ABOS backend.</DialogDescription></DialogHeader><div className="grid gap-4 py-5 sm:grid-cols-2">
    {kind === "lead" && <><Field label="First name" value={form['firstName']} onChange={(v) => set("firstName", v)} required /><Field label="Last name" value={form['lastName']} onChange={(v) => set("lastName", v)} required /><Field label="Company" value={form['companyName']} onChange={(v) => set("companyName", v)} /><Field label="Email" type="email" value={form['email']} onChange={(v) => set("email", v)} /><Field label="Phone" value={form['primaryPhone']} onChange={(v) => set("primaryPhone", v)} /><Field label="Source" value={form['source']} onChange={(v) => set("source", v)} /><Field label="Stage" value={form['stage']} onChange={(v) => set("stage", v)} /><Field label="Score" type="number" value={form['score']} onChange={(v) => set("score", Number(v))} /><Field label="Notes" value={form['notes']} onChange={(v) => set("notes", v)} className="sm:col-span-2" /></>}
    {kind === "account" && <><Field label="Account name" value={form['name']} onChange={(v) => set("name", v)} required /><Field label="Industry" value={form['industry']} onChange={(v) => set("industry", v)} /><Field label="Email" type="email" value={form['email']} onChange={(v) => set("email", v)} /><Field label="Phone" value={form['phone']} onChange={(v) => set("phone", v)} /><Field label="Website" value={form['website']} onChange={(v) => set("website", v)} /><Field label="City" value={form['city']} onChange={(v) => set("city", v)} /><Field label="State" value={form['state']} onChange={(v) => set("state", v)} /><Field label="Country" value={form['country']} onChange={(v) => set("country", v)} /></>}
    {kind === "contact" && <><Field label="First name" value={form['firstName']} onChange={(v) => set("firstName", v)} required /><Field label="Last name" value={form['lastName']} onChange={(v) => set("lastName", v)} required /><Field label="Email" type="email" value={form['email']} onChange={(v) => set("email", v)} /><Field label="Phone" value={form['phone']} onChange={(v) => set("phone", v)} /><Field label="Title" value={form['title']} onChange={(v) => set("title", v)} /><Field label="Department" value={form['department']} onChange={(v) => set("department", v)} /><div className="space-y-2 sm:col-span-2"><Label>Account</Label><Select value={form['accountId'] || "none"} onValueChange={(v) => set("accountId", v === "none" ? undefined : v)}><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger><SelectContent><SelectItem value="none">No account</SelectItem>{accounts.map((account) => <SelectItem key={account.id} value={account.id}>{account['name']}</SelectItem>)}</SelectContent></Select></div></>}
    {kind === "deal" && <><Field label="Deal name" value={form['name']} onChange={(v) => set("name", v)} required /><Field label="Amount" type="number" value={form['amount']} onChange={(v) => set("amount", Number(v))} /><Field label="Stage" value={form['stage']} onChange={(v) => set("stage", v)} /><Field label="Probability %" type="number" value={form['probability']} onChange={(v) => set("probability", Number(v))} /><Field label="Expected close" type="date" value={form['expectedCloseDate']} onChange={(v) => set("expectedCloseDate", v)} /><Field label="Source" value={form['source']} onChange={(v) => set("source", v)} /><div className="space-y-2 sm:col-span-2"><Label>Account</Label><Select value={form['accountId'] || "none"} onValueChange={(v) => set("accountId", v === "none" ? undefined : v)}><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger><SelectContent><SelectItem value="none">No account</SelectItem>{accounts.map((account) => <SelectItem key={account.id} value={account.id}>{account['name']}</SelectItem>)}</SelectContent></Select></div><Field label="Description" value={form['description']} onChange={(v) => set("description", v)} className="sm:col-span-2" /></>}
  </div><DialogFooter><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={saving}>{saving && <Loader2 className="mr-2 size-4 animate-spin" />}{saving ? "Saving" : "Save record"}</Button></DialogFooter></form></DialogContent></Dialog>;
}

function Field({ label, value, onChange, type = "text", required, className }: { label: string; value: any; onChange: (value: string) => void; type?: string; required?: boolean; className?: string }) {
  return <div className={cn("space-y-2", className)}><Label>{label}</Label><Input type={type} required={required} value={value ?? ""} onChange={(e) => onChange(e.target.value)} /></div>;
}

function RowMenu({ onView, onEdit, onDelete }: { onView?: () => void; onEdit: () => void; onDelete: () => void }) {
  return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{onView && <DropdownMenuItem onClick={onView}><Eye className="mr-2 size-3.5" /> Open 360</DropdownMenuItem>}<DropdownMenuItem onClick={onEdit}><Edit3 className="mr-2 size-3.5" /> Edit</DropdownMenuItem><DropdownMenuItem className="text-destructive" onClick={onDelete}><Trash2 className="mr-2 size-3.5" /> Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
}

function Kpi({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return <Card className="border-border/40"><CardContent className="p-5"><div className="flex items-center justify-between"><div className="rounded-lg bg-primary/10 p-2.5 text-primary"><Icon className="size-5" /></div><TrendingUp className="size-4 text-muted-foreground/40" /></div><p className="mt-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-black tracking-tight">{value}</p></CardContent></Card>;
}

function MetricRow({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0"><span className="text-xs text-muted-foreground">{label}</span><span className="text-sm font-black">{value}</span></div>; }
function Count({ value }: { value: number }) { return <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[9px]">{value}</span>; }
function EmptyInline({ label }: { label: string }) { return <div className="rounded-lg border border-dashed border-border/40 p-8 text-center text-xs text-muted-foreground">{label}</div>; }
function EmptyTable({ colSpan, label }: { colSpan: number; label: string }) { return <TableRow><TableCell colSpan={colSpan} className="h-32 text-center text-xs text-muted-foreground"><Database className="mx-auto mb-2 size-5 opacity-30" />{label}</TableCell></TableRow>; }
function LoadingState() { return <div className="flex min-h-[70vh] items-center justify-center"><div className="flex flex-col items-center gap-3 text-muted-foreground"><Loader2 className="size-8 animate-spin text-primary" /><span className="text-xs font-black uppercase tracking-widest">Loading CRM</span></div></div>; }
function filterRows(rows: any[], query: string) { const q = query.trim().toLowerCase(); if (!q) return rows; return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q)); }
function groupDeals(deals: any[]) { const groups = new Map<string, any[]>(); for (const deal of deals) { const stage = String(deal.stage ?? "New"); const list = groups.get(stage) ?? []; list.push(deal); groups.set(stage, list); } return Array.from(groups.entries()).slice(0, 8); }
function formatMoney(value: number) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0); }
function formatDate(value: string | undefined) { return value ? new Date(value).toLocaleDateString("en-IN") : "—"; }
