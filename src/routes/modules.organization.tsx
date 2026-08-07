import { createFileRoute } from "@tanstack/react-router";
import { 
  Building2, 
  Calendar, 
  Globe, 
  GitGraph, 
  Image as ImageIcon, 
  LayoutGrid, 
  Grid,
  Layers,
  MapPin, 
  Paintbrush, 
  Plus, 
  Settings, 
  Users,
  Map,
  BadgeCheck,
  Building,
  ChevronRight
} from "lucide-react";

import * as React from "react";
import { appConfig } from "@/config/app.config";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/modules/organization")({
  component: OrganizationModule,
});

function OrganizationModule() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        eyebrow="Core Platform"
        title="Organization"
        description="Configure your business foundation, hierarchy and branding for the entire ABOS ecosystem."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              View Audit Trail
            </Button>
            <Button size="sm">Save Changes</Button>
          </div>
        }
      />

      {/* Organization Health Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <HealthCard title="Branches" value="1" icon={MapPin} />
        <HealthCard title="Departments" value="5" icon={Building2} />
        <HealthCard title="Teams" value="12" icon={Grid} />
        <HealthCard title="Employees" value="124" icon={Users} />
        <HealthCard title="Active Modules" value="8" icon={Layers} />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="h-auto w-full justify-start gap-4 overflow-x-auto bg-transparent p-0">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent px-1 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="hierarchy" 
            className="rounded-none border-b-2 border-transparent px-1 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Hierarchy
          </TabsTrigger>
          <TabsTrigger 
            value="locations" 
            className="rounded-none border-b-2 border-transparent px-1 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Locations
          </TabsTrigger>
          <TabsTrigger 
            value="branding" 
            className="rounded-none border-b-2 border-transparent px-1 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Branding
          </TabsTrigger>
          <TabsTrigger 
            value="calendar" 
            className="rounded-none border-b-2 border-transparent px-1 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Calendar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <SectionCard title="General Information" description="Basic details of the organization.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" placeholder="e.g. Adzdrio India" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legal-name">Legal Name</Label>
                    <Input id="legal-name" placeholder="e.g. Adzdrio India Services Pvt. Ltd." />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter a brief description of the organization..." 
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="services">Professional Services</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select>
                      <SelectTrigger id="business-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pvt">Private Limited</SelectItem>
                        <SelectItem value="public">Public Limited</SelectItem>
                        <SelectItem value="llp">LLP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://www.example.com" type="url" />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Localization & Finance" description="Operational settings for regions and accounting.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">UTC+05:30 (India Standard Time)</SelectItem>
                        <SelectItem value="utc">UTC+00:00 (Greenwich Mean Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Base Currency</Label>
                    <Select>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inr">INR - Indian Rupee (₹)</SelectItem>
                        <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (US)</SelectItem>
                        <SelectItem value="en-gb">English (UK)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select>
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                    <Select>
                      <SelectTrigger id="fiscal-year">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="january">January</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SectionCard>
            </div>

            <div className="space-y-6">
              <SectionCard title="Logo" description="Organization identity.">
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="flex size-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
                    <ImageIcon className="size-8 text-muted-foreground/50" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Upload Logo
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center px-4">
                    Recommended size: 512x512px. PNG or SVG preferred. Max 2MB.
                  </p>
                </div>
              </SectionCard>

              <SectionCard title="Subscription" description="Plan and usage controls.">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Enterprise Suite</span>
                    <StatusBadge tone="success">Active</StatusBadge>
                  </div>
                  <Separator />
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">User Licenses</span>
                      <span>124 / 500</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '25%' }} />
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hierarchy" className="mt-0 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard 
              title="Departments" 
              description="Manage functional areas of the business."
              actions={<AddDepartmentDialog />}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Head</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Engineering", head: "Amit Jain", staff: 42 },
                    { name: "Operations", head: "Sarah Williams", staff: 28 },
                    { name: "Sales & Marketing", head: "Rajesh Kumar", staff: 35 },
                    { name: "Finance", head: "David Chen", staff: 12 },
                    { name: "Human Resources", head: "Priya Sharma", staff: 7 },
                  ].map((dept) => (
                    <TableRow key={dept.name} className="hover:bg-muted/5 group cursor-pointer">
                      <TableCell className="font-bold text-xs">{dept.name}</TableCell>
                      <TableCell className="text-[10px] font-medium text-muted-foreground">{dept.head}</TableCell>
                      <TableCell className="text-[10px] font-bold">{dept.staff}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="size-7"><ChevronRight className="size-3" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>

            <SectionCard 
              title="Teams" 
              description="Group employees within departments."
              actions={<Button size="sm" variant="outline"><Plus className="size-3.5 mr-1" /> Team</Button>}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Platform Engineering", dept: "Engineering", members: 12 },
                    { name: "Cloud Infra", dept: "Engineering", members: 8 },
                    { name: "Enterprise CRM", dept: "Engineering", members: 15 },
                    { name: "Logistics Ops", dept: "Operations", members: 20 },
                  ].map((team) => (
                    <TableRow key={team.name} className="hover:bg-muted/5 group cursor-pointer">
                      <TableCell className="font-bold text-xs">{team.name}</TableCell>
                      <TableCell className="text-[10px] font-medium text-muted-foreground">{team.dept}</TableCell>
                      <TableCell className="text-[10px] font-bold">{team.members}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="size-7"><ChevronRight className="size-3" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>

            <SectionCard 
              title="Designations" 
              description="Define job titles and role levels."
              className="lg:col-span-2"
              actions={<Button size="sm" variant="outline"><Plus className="size-3.5 mr-1" /> Designation</Button>}
            >
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Designation</TableHead>
                      <TableHead>Department Mapping</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        No job titles registered yet.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="mt-0 space-y-6">
          <SectionCard 
            title="Branches" 
            description="Manage physical or regional business units."
            actions={<AddBranchDialog />}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Headquarters", location: "Bengaluru, KA", type: "Corporate", status: "Primary" },
                { name: "Mumbai Hub", location: "Mumbai, MH", type: "Regional", status: "Active" },
                { name: "Delhi Node", location: "New Delhi, DL", type: "Satellite", status: "Active" },
              ].map((branch) => (
                <Card key={branch.name} className="p-4 border border-border/40 hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building className="size-4 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">{branch.status}</Badge>
                  </div>
                  <h4 className="font-bold text-sm">{branch.name}</h4>
                  <p className="text-[10px] text-muted-foreground font-medium mb-3">{branch.location}</p>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{branch.type}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[9px] font-bold">Manage</Button>
                  </div>
                </Card>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Office Locations" description="Detailed address and contact information.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <EmptyState
                icon={MapPin}
                title="Office list is empty"
                description="Addresses and contact info will appear here once branches are added."
                className="col-span-full py-12 surface-none border-none shadow-none"
              />
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="branding" className="mt-0 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Visual Identity" description="Configure colors and icons.">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Brand Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-md border border-border bg-primary shadow-sm" />
                    <Input disabled value="#F5A300" className="w-32" />
                    <span className="text-xs text-muted-foreground italic">Standard Gold</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Assets</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-md border border-border p-4 text-center space-y-2">
                      <div className="flex size-10 mx-auto items-center justify-center rounded-md bg-muted">
                        <ImageIcon className="size-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs font-medium">Favicon</p>
                      <Button variant="outline" size="sm">Upload</Button>

                    </div>
                    <div className="rounded-md border border-border p-4 text-center space-y-2">
                      <div className="flex size-10 mx-auto items-center justify-center rounded-md bg-muted">
                        <ImageIcon className="size-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs font-medium">Secondary Logo</p>
                      <Button variant="outline" size="sm">Upload</Button>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Email Communications" description="Global templates and signatures.">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Global Email Signature</Label>
                  <div className="rounded-md border border-border bg-muted/20 p-4 space-y-2">
                    <p className="text-[11px] font-bold">Preview:</p>
                    <div className="text-[11px] text-muted-foreground space-y-1">
                      <p className="font-bold text-foreground">[Employee Name]</p>
                      <p>[Designation] | [Department]</p>
                      <p className="font-bold text-primary">Adzdrio India</p>
                      <p>www.adzdrio.com</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Configure Signature Template
                </Button>
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Standard Working Hours" description="Define weekly shifts and weekends.">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Shift Start</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Shift End</Label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Working Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button
                        key={day}
                        variant={day === "Sun" || day === "Sat" ? "outline" : "default"}
                        size="sm"
                        className="w-12"
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Highlighted days represent the standard work week.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard 
              title="Holidays & Observances" 
              description="Manage the company-wide holiday calendar."
              actions={<Button size="sm" variant="outline"><Plus className="size-3.5 mr-1" /> Holiday</Button>}
            >
              <EmptyState
                icon={Calendar}
                title="No holidays listed"
                description="The 2026 holiday calendar has not been configured yet."
                className="py-10 surface-none border-none shadow-none"
              />
            </SectionCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HealthCard({ title, value, icon: Icon }: { title: string; value: string; icon: any }) {
  return (
    <Card className="bg-card shadow-sm border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground/50" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function AddBranchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="size-3.5 mr-1" /> Branch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
          <DialogDescription>
            Register a new physical branch or regional business unit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="branch-name">Branch Name</Label>
            <Input id="branch-name" placeholder="e.g. Headquarters, Bangalore South" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="branch-type">Type</Label>
              <Select defaultValue="physical">
                <SelectTrigger id="branch-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Office</SelectItem>
                  <SelectItem value="remote">Remote Hub</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="ist">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                  <SelectItem value="utc">UTC (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea id="address" placeholder="Enter complete office address..." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Branch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddDepartmentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="size-3.5 mr-1" /> Department
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Department</DialogTitle>
          <DialogDescription>
            Add a functional unit to the organizational structure.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="dept-name">Department Name</Label>
            <Input id="dept-name" placeholder="e.g. Engineering, Human Resources" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="parent-dept">Parent Department (Optional)</Label>
            <Select>
              <SelectTrigger id="parent-dept">
                <SelectValue placeholder="Select parent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (Top Level)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dept-head">Department Head</Label>
            <Select disabled>
              <SelectTrigger id="dept-head">
                <SelectValue placeholder="No employees available" />
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Department</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
