import { createFileRoute } from "@tanstack/react-router";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Briefcase,
  History,
  ShieldAlert,
  CreditCard,
  FileText,
  Clock,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Wrench,
  Stethoscope,
  Landmark,
  Package,
  FileCheck
} from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataToolbar } from "@/components/shared/DataToolbar";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/modules/employees")({
  component: EmployeeManagementPage,
});

function EmployeeManagementPage() {
  const [activeTab, setActiveTab] = useState("directory");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-700">
      <PageHeader
        title="Employee Management"
        description="Core workforce directory and comprehensive employee lifecycle management."
        eyebrow="People & Culture"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface">
              <Download className="mr-2 size-4" />
              Export
            </Button>
            <Button size="sm" className="shadow-elevated">
              <Plus className="mr-2 size-4" />
              Add Employee
            </Button>
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-8 mb-6">
          <TabsTrigger
            value="directory"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-3 pt-0"
          >
            Employee Directory
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 pb-3 pt-0"
          >
            Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6 m-0 outline-none">
          {selectedEmployee ? (
            <EmployeeProfileView onBack={() => setSelectedEmployee(null)} />
          ) : (
            <EmployeeDirectoryView onSelect={setSelectedEmployee} />
          )}
        </TabsContent>

        <TabsContent value="analytics" className="m-0 outline-none">
          <EmployeeDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmployeeDirectoryView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Employees" value="124" subValue="Active headcount" />
        <MetricCard title="Onboarding" value="8" subValue="Probation status" />
        <MetricCard title="Departments" value="12" subValue="Active units" />
        <MetricCard title="Attrition" value="1.2%" subValue="Last 30 days" />
      </div>

      <SectionCard className="border-none bg-transparent shadow-none" contentClassName="p-0">
        <DataToolbar
          search={
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search employees by name, ID or email..."
                className="pl-9 glass-surface"
              />
            </div>
          }
          filters={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="glass-surface h-9">
                <Filter className="mr-2 size-4" />
                Filters
              </Button>
            </div>
          }
          actions={
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Bulk Actions
              </Button>
            </div>
          }
        />

        <div className="rounded-xl border border-border/40 bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px]">Employee</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-muted/5 cursor-pointer group" onClick={() => onSelect("emp-1")}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 border border-border/40">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">AJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-bold group-hover:text-primary transition-colors">Amit Jain</p>
                      <p className="text-[10px] text-muted-foreground">EMP-2025-001</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs">Senior Software Engineer</TableCell>
                <TableCell className="text-xs">Engineering</TableCell>
                <TableCell className="text-xs">Bengaluru, KA</TableCell>
                <TableCell className="text-xs">Full-time</TableCell>
                <TableCell><StatusBadge tone="success">Active</StatusBadge></TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" className="size-8"><MoreHorizontal className="size-4" /></Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}

function EmployeeProfileView({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 px-2">
          <ChevronRight className="size-4 rotate-180 mr-1" />
          Back to Directory
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <SectionCard>
            <div className="flex flex-col items-center text-center py-4">
              <Avatar className="size-24 mb-4 ring-4 ring-primary/10">
                <AvatarFallback className="text-2xl font-bold bg-primary/5 text-primary">
                  EMP
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold tracking-tight">Employee Name</h2>
              <p className="text-sm text-muted-foreground">Senior Technical Consultant</p>
              <div className="mt-4 flex items-center gap-2">
                <StatusBadge tone="success">Active</StatusBadge>
                <Badge variant="outline" className="font-normal">Full-Time</Badge>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                <span>employee@adzdrio.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="size-4 text-muted-foreground" />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="size-4 text-muted-foreground" />
                <span>Corporate HQ, Bangalore</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Reporting Hierarchy" contentClassName="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">RM</div>
                <div>
                  <p className="text-xs text-muted-foreground">Reporting Manager</p>
                  <p className="text-sm font-medium">Project Director</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">DH</div>
                <div>
                  <p className="text-xs text-muted-foreground">Department Head</p>
                  <p className="text-sm font-medium">Head of Engineering</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Main Profile Tabs */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start glass-surface mb-6 p-1">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="employment" className="text-xs">Employment</TabsTrigger>
              <TabsTrigger value="compensation" className="text-xs">Compensation</TabsTrigger>
              <TabsTrigger value="attendance" className="text-xs">Attendance</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
              <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
              <TabsTrigger value="audit" className="text-xs">Audit</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionCard title="Personal Information" contentClassName="space-y-4">
                  <InfoRow label="Employee ID" value="AIS-001" />
                  <InfoRow label="Gender" value="Not Set" />
                  <InfoRow label="Date of Birth" value="Not Set" />
                  <InfoRow label="Marital Status" value="Not Set" />
                  <InfoRow label="Blood Group" value="Not Set" />
                </SectionCard>
                <SectionCard title="Emergency Contact" contentClassName="space-y-4">
                  <div className="py-4 text-center">
                    <ShieldAlert className="size-8 mx-auto text-muted-foreground/30 mb-2" />
                    <p className="text-xs text-muted-foreground">No emergency contacts registered</p>
                  </div>
                </SectionCard>
              </div>

              <SectionCard title="Education & Skills">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <GraduationCap className="size-3" /> Education
                    </h4>
                    <p className="text-xs text-muted-foreground italic">No education history recorded</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Wrench className="size-3" /> Skills
                    </h4>
                    <p className="text-xs text-muted-foreground italic">No skills listed</p>
                  </div>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="employment" className="space-y-6">
              <SectionCard title="Employment Details" contentClassName="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <InfoRow label="Date of Joining" value="Not Set" />
                  <InfoRow label="Probation End" value="Not Set" />
                  <InfoRow label="Confirmation Date" value="Not Set" />
                  <InfoRow label="Service Period" value="0 years, 0 months" />
                  <InfoRow label="Designation" value="Senior Technical Consultant" />
                  <InfoRow label="Department" value="Technology" />
                  <InfoRow label="Team" value="Platform Engineering" />
                  <InfoRow label="Branch" value="Bangalore HQ" />
                </div>
              </SectionCard>

              <SectionCard title="Employment Timeline">
                <div className="py-8 text-center">
                  <History className="size-8 mx-auto text-muted-foreground/30 mb-2" />
                  <p className="text-xs text-muted-foreground">No career progression events recorded</p>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="compensation" className="space-y-6">
              <SectionCard title="Current Compensation" contentClassName="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div>
                    <p className="text-xs text-muted-foreground">Annual CTC</p>
                    <p className="text-lg font-bold">₹ 0.00</p>
                  </div>
                  <Badge variant="outline" className="bg-background">Effective from: --/--/----</Badge>
                </div>
                <div className="py-4">
                  <h4 className="text-xs font-bold mb-4 uppercase text-muted-foreground">Pay Structure</h4>
                  <p className="text-xs text-muted-foreground italic">Salary components not configured</p>
                </div>
              </SectionCard>
              
              <SectionCard title="Bank Details" contentClassName="space-y-4">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Landmark className="size-8 opacity-20" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Account Holder Name</p>
                    <p className="text-xs italic">No banking information available</p>
                  </div>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <SectionCard title="Government Identifiers">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-dashed border-border/60 flex items-center justify-between">
                    <span className="text-xs font-medium">PAN Card</span>
                    <span className="text-xs text-muted-foreground">Not Provided</span>
                  </div>
                  <div className="p-3 rounded-lg border border-dashed border-border/60 flex items-center justify-between">
                    <span className="text-xs font-medium">Aadhar Card</span>
                    <span className="text-xs text-muted-foreground">Not Provided</span>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Documents Vault" actions={<Button variant="outline" size="sm" className="h-8">Upload</Button>}>
                <div className="py-8 text-center">
                  <FileText className="size-8 mx-auto text-muted-foreground/30 mb-2" />
                  <p className="text-xs text-muted-foreground">No documents uploaded to this profile</p>
                </div>
              </SectionCard>
            </TabsContent>

            <TabsContent value="audit" className="space-y-6">
              <SectionCard title="System Audit Log">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Profile Created</p>
                      <p className="text-xs text-muted-foreground">System Admin · Just now</p>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SectionCard title="Headcount by Department">
          <div className="h-48 flex items-center justify-center border border-dashed rounded-lg bg-muted/5">
            <p className="text-xs text-muted-foreground">Distribution chart placeholder</p>
          </div>
        </SectionCard>
        <SectionCard title="Employment Type">
          <div className="h-48 flex items-center justify-center border border-dashed rounded-lg bg-muted/5">
            <p className="text-xs text-muted-foreground">Employment breakdown placeholder</p>
          </div>
        </SectionCard>
        <SectionCard title="Gender Diversity">
          <div className="h-48 flex items-center justify-center border border-dashed rounded-lg bg-muted/5">
            <p className="text-xs text-muted-foreground">Diversity metrics placeholder</p>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Upcoming Work Anniversaries">
          <div className="py-8 text-center text-muted-foreground">
            <Calendar className="size-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs italic">No anniversaries in the next 30 days</p>
          </div>
        </SectionCard>
        <SectionCard title="Recent Joiners">
          <div className="py-8 text-center text-muted-foreground">
            <Plus className="size-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs italic">No new joins in the last 15 days</p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subValue }: { title: string; value: string; subValue: string }) {
  return (
    <Card className="surface-card shadow-card border-border/40 overflow-hidden">
      <CardContent className="p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-black tracking-tight">{value}</h4>
          <span className="text-[10px] font-medium text-muted-foreground uppercase">{subValue}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/20 pb-2 last:border-0 last:pb-0">
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
