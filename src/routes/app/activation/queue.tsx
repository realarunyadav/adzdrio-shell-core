import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Rocket,
  User,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  ArrowUpDown
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  demoActivations, 
  DemoActivation 
} from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";
import { ActivationDetailsDrawer } from "@/components/activation/ActivationDetailsDrawer";

export const Route = createFileRoute("/app/activation/queue")({
  component: ActivationQueuePage,
});

function ActivationQueuePage() {
  const [selectedActivation, setSelectedActivation] = React.useState<DemoActivation | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredActivations = demoActivations.filter(act => {
    const matchesSearch = 
      act.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && (act.status === 'Pending Payment Verification' || act.status === 'Ready for Assignment');
    if (activeTab === "in-progress") return matchesSearch && act.status === 'In Progress';
    if (activeTab === "waiting") return matchesSearch && act.status === 'Waiting for Customer';
    if (activeTab === "completed") return matchesSearch && act.status === 'Completed';
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return "bg-green-50 text-green-700 border-green-200";
      case 'In Progress': return "bg-blue-50 text-blue-700 border-blue-200";
      case 'Pending Payment Verification': return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case 'Ready for Assignment': return "bg-purple-50 text-purple-700 border-purple-200";
      case 'Waiting for Customer': return "bg-orange-50 text-orange-700 border-orange-200";
      case 'Failed': return "bg-red-50 text-red-700 border-red-200";
      default: return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Critical': return "text-red-600";
      case 'High': return "text-orange-600";
      case 'Medium': return "text-blue-600";
      case 'Low': return "text-muted-foreground";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Operations Management"
        title="Activation Queue"
        description="Unified workspace for monitoring and managing the end-to-end subscription provisioning lifecycle."
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button size="sm" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Queue
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="bg-muted/50 p-1 h-11">
              <TabsTrigger value="all" className="text-[10px] font-black uppercase px-6">All Workload ({demoActivations.length})</TabsTrigger>
              <TabsTrigger value="pending" className="text-[10px] font-black uppercase px-6">New / Unassigned</TabsTrigger>
              <TabsTrigger value="in-progress" className="text-[10px] font-black uppercase px-6">In Progress</TabsTrigger>
              <TabsTrigger value="waiting" className="text-[10px] font-black uppercase px-6">Waiting</TabsTrigger>
              <TabsTrigger value="completed" className="text-[10px] font-black uppercase px-6">Archive</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input 
                  placeholder="Search activations..." 
                  className="pl-10 h-10 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="size-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <div className="flex items-center gap-2">
                        Activation ID
                        <ArrowUpDown className="size-3" />
                      </div>
                    </th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer & Business</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Plan</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Status</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Priority</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">SLA Deadline</th>
                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assignee</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredActivations.map((act) => (
                    <tr 
                      key={act.id} 
                      className="hover:bg-muted/30 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedActivation(act);
                        setIsDrawerOpen(true);
                      }}
                    >
                      <td className="py-4 px-6">
                        <span className="text-xs font-black uppercase text-primary">{act.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-[10px] uppercase">
                            {act.customerName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold leading-none mb-1">{act.customerName}</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{act.businessName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase">{act.planName}</span>
                          <span className="text-[9px] text-muted-foreground font-black uppercase">{act.saleId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge 
                          variant="outline" 
                          className={cn("text-[9px] font-black uppercase border-none px-2 py-0.5", getStatusColor(act.status))}
                        >
                          {act.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <div className={cn("size-1.5 rounded-full bg-current", getPriorityColor(act.priority))} />
                          <span className={cn("text-[10px] font-black uppercase", getPriorityColor(act.priority))}>
                            {act.priority}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={cn(
                          "flex items-center gap-2",
                          new Date(act.slaDueAt) < new Date() ? "text-red-600" : "text-muted-foreground"
                        )}>
                          <Clock className="size-3.5" />
                          <span className="text-xs font-black">
                            {new Date(act.slaDueAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: '2-digit' })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {act.assignedToName ? (
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-muted flex items-center justify-center">
                              <User className="size-3 text-muted-foreground" />
                            </div>
                            <span className="text-xs font-bold uppercase">{act.assignedToName}</span>
                          </div>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase border border-dashed border-border/60 text-muted-foreground hover:text-primary">
                            Assign User
                          </Button>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right" onClick={e => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest">Activation Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs font-bold uppercase" onClick={() => {
                              setSelectedActivation(act);
                              setIsDrawerOpen(true);
                            }}>
                              <Eye className="mr-2 size-3.5" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold uppercase">
                              <CheckCircle2 className="mr-2 size-3.5" />
                              Approve Step
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold uppercase">
                              <UserPlus className="mr-2 size-3.5" />
                              Re-assign
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs font-bold uppercase text-red-600">
                              <AlertTriangle className="mr-2 size-3.5" />
                              Flag Issue
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-muted/20 border-t border-border flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-muted-foreground">Showing {filteredActivations.length} of {demoActivations.length} entries</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled className="h-8 text-[10px] font-black uppercase px-4">Previous</Button>
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase px-4 bg-primary text-white border-primary">1</Button>
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase px-4">Next</Button>
              </div>
            </div>
          </div>
        </Tabs>
      </div>

      <ActivationDetailsDrawer 
        activation={selectedActivation} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </div>
  );
}