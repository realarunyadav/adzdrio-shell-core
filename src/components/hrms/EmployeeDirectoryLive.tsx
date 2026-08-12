import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Building2, Check, RefreshCw, Search, UserPlus, Users, X } from "lucide-react";

import { hrService, type EmployeeRecord, type CreateEmployeePayload } from "@/lib/api/hr.service";
import { ApiError } from "@/lib/api/client";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/SectionCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function statusTone(status: string) {
  const value = status.toLowerCase();
  if (["active", "onboarded", "completed"].includes(value)) return "success" as const;
  if (["inactive", "terminated", "suspended"].includes(value)) return "danger" as const;
  return "warning" as const;
}

const initialForm = {
  userId: "",
  employeeCode: "",
  designation: "",
  department: "",
  team: "",
  managerUserId: "",
  employmentStatus: "inactive",
  joiningDate: "",
  trainingStatus: "pending",
};

export function EmployeeDirectoryLive() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(initialForm);

  const loadEmployees = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await hrService.listEmployees(search);
      setEmployees(data);
      setPage(1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Unable to load employees");
      setEmployees([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void loadEmployees(), search ? 250 : 0);
    return () => window.clearTimeout(timer);
    // Search is intentionally the only server-side query dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const departments = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.department).filter(Boolean) as string[])).sort(),
    [employees],
  );

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const statusMatch = statusFilter === "all" || employee.employmentStatus.toLowerCase() === statusFilter;
      const departmentMatch = departmentFilter === "all" || employee.department === departmentFilter;
      return statusMatch && departmentMatch;
    });
  }, [employees, statusFilter, departmentFilter]);

  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));
  const visibleEmployees = filteredEmployees.slice((page - 1) * pageSize, page * pageSize);
  const activeCount = employees.filter((employee) => employee.employmentStatus.toLowerCase() === "active").length;
  const onboardingCount = employees.filter((employee) => ["pending", "in progress", "onboarding"].includes(employee.trainingStatus.toLowerCase())).length;

  const updateForm = (key: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleCreate = async () => {
    setCreateError(null);
    if (!form.userId.trim() || !form.employeeCode.trim()) {
      setCreateError("User ID and employee code are required.");
      return;
    }

    setCreating(true);
    try {
      const payload: CreateEmployeePayload = {
        userId: form.userId.trim(),
        employeeCode: form.employeeCode.trim(),
        designation: form.designation.trim() || undefined,
        department: form.department.trim() || undefined,
        team: form.team.trim() || undefined,
        managerUserId: form.managerUserId.trim() || undefined,
        employmentStatus: form.employmentStatus || undefined,
        joiningDate: form.joiningDate || undefined,
        trainingStatus: form.trainingStatus || undefined,
      };
      await hrService.createEmployee(payload);
      setCreateOpen(false);
      setForm(initialForm);
      await loadEmployees(true);
    } catch (cause) {
      setCreateError(cause instanceof ApiError ? cause.message : "Unable to create employee");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total employees" value={employees.length} icon={<Users className="size-4" />} />
        <Metric label="Active" value={activeCount} tone="success" icon={<Check className="size-4" />} />
        <Metric label="Onboarding / training" value={onboardingCount} tone="warning" icon={<UserPlus className="size-4" />} />
        <Metric label="Departments" value={departments.length} icon={<Building2 className="size-4" />} />
      </div>

      <SectionCard title="Employees" description="Live employee records from the production HR service." contentClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row">
            <div className="relative min-w-0 flex-1 md:max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email, employee code or department..." className="pl-9" aria-label="Search employees" />
            </div>
            <select value={departmentFilter} onChange={(event) => { setDepartmentFilter(event.target.value); setPage(1); }} className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" aria-label="Filter by department">
              <option value="all">All departments</option>
              {departments.map((department) => <option key={department} value={department}>{department}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" aria-label="Filter by status">
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="probation">Probation</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => void loadEmployees(true)} disabled={loading || refreshing}>
              <RefreshCw className={`mr-2 size-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button size="sm" onClick={() => { setCreateError(null); setCreateOpen(true); }}>
              <UserPlus className="mr-2 size-3.5" /> Add Employee
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-2 p-5" aria-live="polite">
            {Array.from({ length: 7 }).map((_, index) => <div key={index} className="h-12 animate-pulse rounded-lg bg-muted/40" />)}
          </div>
        ) : error ? (
          <div className="p-6">
            <EmptyState title="Employee data unavailable" description={error} />
            <div className="mt-4 flex justify-center"><Button variant="outline" onClick={() => void loadEmployees(true)}>Retry</Button></div>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="p-6"><EmptyState title="No employees found" description="Try a different search or filter." /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/20">
                  <TableRow>
                    <TableHead className="pl-5 text-[10px] font-bold uppercase tracking-widest">Employee</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">Designation</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">Department</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">Team</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest">Training</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleEmployees.map((employee) => (
                    <TableRow key={employee.id} className="text-xs transition-colors hover:bg-muted/20">
                      <TableCell className="pl-5"><p className="font-semibold text-foreground">{employee.userName}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{employee.userEmail}</p><p className="mt-0.5 font-mono text-[10px] text-muted-foreground/70">{employee.employeeCode}</p></TableCell>
                      <TableCell>{employee.designation ?? "—"}</TableCell>
                      <TableCell>{employee.department ?? "—"}</TableCell>
                      <TableCell>{employee.team ?? "—"}</TableCell>
                      <TableCell><div className="flex flex-col items-start gap-1"><StatusBadge tone={statusTone(employee.employmentStatus)}>{employee.employmentStatus}</StatusBadge><span className="text-[10px] text-muted-foreground">{employee.userStatus}</span></div></TableCell>
                      <TableCell><StatusBadge tone={statusTone(employee.trainingStatus)}>{employee.trainingStatus}</StatusBadge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-3 border-t border-border/60 px-5 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>Showing {((page - 1) * pageSize) + 1}–{Math.min(page * pageSize, filteredEmployees.length)} of {filteredEmployees.length}</span>
              <div className="flex items-center gap-1"><Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button><span className="px-2 font-medium">{page} / {pageCount}</span><Button size="sm" variant="outline" disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>Next</Button></div>
            </div>
          </>
        )}
      </SectionCard>

      {createOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="create-employee-title">
          <div className="glass-surface w-full max-w-2xl rounded-2xl border border-border/60 bg-card p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4"><div><h2 id="create-employee-title" className="text-xl font-bold">Add employee</h2><p className="mt-1 text-sm text-muted-foreground">Creates the employee record through the existing HR API.</p></div><Button variant="ghost" size="icon" onClick={() => setCreateOpen(false)} aria-label="Close"><X className="size-4" /></Button></div>
            {createError ? <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{createError}</div> : null}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="User ID *"><Input value={form.userId} onChange={(event) => updateForm("userId", event.target.value)} placeholder="Existing user ID" /></Field>
              <Field label="Employee code *"><Input value={form.employeeCode} onChange={(event) => updateForm("employeeCode", event.target.value)} placeholder="EMP-001" /></Field>
              <Field label="Designation"><Input value={form.designation} onChange={(event) => updateForm("designation", event.target.value)} placeholder="Designation" /></Field>
              <Field label="Department"><Input value={form.department} onChange={(event) => updateForm("department", event.target.value)} placeholder="Department" /></Field>
              <Field label="Team"><Input value={form.team} onChange={(event) => updateForm("team", event.target.value)} placeholder="Team" /></Field>
              <Field label="Manager user ID"><Input value={form.managerUserId} onChange={(event) => updateForm("managerUserId", event.target.value)} placeholder="Optional" /></Field>
              <Field label="Employment status"><select value={form.employmentStatus} onChange={(event) => updateForm("employmentStatus", event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="inactive">Inactive</option><option value="active">Active</option><option value="probation">Probation</option></select></Field>
              <Field label="Training status"><select value={form.trainingStatus} onChange={(event) => updateForm("trainingStatus", event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="pending">Pending</option><option value="in progress">In progress</option><option value="completed">Completed</option></select></Field>
              <Field label="Joining date"><Input type="date" value={form.joiningDate} onChange={(event) => updateForm("joiningDate", event.target.value)} /></Field>
            </div>
            <div className="mt-6 flex justify-end gap-2 border-t border-border/60 pt-4"><Button variant="outline" onClick={() => setCreateOpen(false)} disabled={creating}>Cancel</Button><Button onClick={() => void handleCreate()} disabled={creating}>{creating ? "Creating…" : "Create employee"}</Button></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="space-y-1.5 text-xs font-medium text-muted-foreground"><span>{label}</span>{children}</label>;
}

function Metric({ label, value, icon, tone = "info" }: { label: string; value: number; icon: ReactNode; tone?: "info" | "success" | "warning" }) {
  const toneClass = tone === "success" ? "text-success bg-success/10" : tone === "warning" ? "text-warning bg-warning/10" : "text-info bg-info/10";
  return <div className="surface-card p-4"><div className="flex items-center justify-between gap-3"><span className="text-xs font-medium text-muted-foreground">{label}</span><span className={`flex size-8 items-center justify-center rounded-lg ${toneClass}`}>{icon}</span></div><p className="mt-3 text-2xl font-bold tracking-tight">{value}</p></div>;
}
