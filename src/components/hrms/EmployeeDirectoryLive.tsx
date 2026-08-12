import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";

import { hrService, type EmployeeRecord } from "@/lib/api/hr.service";
import { ApiError } from "@/lib/api/client";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function EmployeeDirectoryLive() {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await hrService.listEmployees(search);
        if (!cancelled) setEmployees(data);
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof ApiError ? cause.message : "Unable to load employees");
          setEmployees([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, search ? 250 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [search]);

  return (
    <SectionCard
      title="Employee Directory"
      description="Live employee records from the production HR service."
      contentClassName="p-0"
    >
      <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search employee, code, department..."
          className="max-w-md"
          aria-label="Search employees"
        />
        <Button size="sm" variant="outline" disabled title="Employee creation UI will be connected to the existing user-management flow">
          <UserPlus className="mr-2 size-3.5" /> Add Employee
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3 p-5" aria-live="polite">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-12 animate-pulse rounded-md bg-muted/40" />
          ))}
        </div>
      ) : error ? (
        <EmptyState
          title="Employee data unavailable"
          description={error}
        />
      ) : employees.length === 0 ? (
        <EmptyState
          title="No employees found"
          description={search ? "Try a different search term." : "No employee profiles are available for this organization yet."}
        />
      ) : (
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest">Employee</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest">Code</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest">Department</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest">Team</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest">Training</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} className="text-xs hover:bg-muted/30">
                <TableCell>
                  <p className="font-bold">{employee.userName}</p>
                  <p className="text-[10px] text-muted-foreground">{employee.userEmail}</p>
                  <p className="text-[10px] text-muted-foreground">{employee.designation ?? "Designation pending"}</p>
                </TableCell>
                <TableCell className="font-mono text-[11px]">{employee.employeeCode}</TableCell>
                <TableCell>{employee.department ?? "—"}</TableCell>
                <TableCell>{employee.team ?? "—"}</TableCell>
                <TableCell>
                  <StatusBadge tone={statusTone(employee.employmentStatus)}>{employee.employmentStatus}</StatusBadge>
                </TableCell>
                <TableCell>
                  <StatusBadge tone={statusTone(employee.trainingStatus)}>{employee.trainingStatus}</StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </SectionCard>
  );
}
