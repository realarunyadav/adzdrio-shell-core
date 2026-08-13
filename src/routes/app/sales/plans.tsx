import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Settings, 
  CheckCircle2, 
  XCircle,
  Clock
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { demoPlans } from "@/lib/mock/workspace.demo";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/sales/plans")({
  component: SalesPlansPage,
});

function SalesPlansPage() {
  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Sales Configuration"
        title="Plans & Products"
        description="Manage your enterprise product offerings, pricing and plan availability."
        actions={
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Plan
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoPlans.map((plan) => (
          <SectionCard key={plan.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-[10px] font-bold tracking-wider uppercase">
                  {plan.business}
                </Badge>
                <Badge variant={plan.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">
                  {plan.status}
                </Badge>
              </div>
              <h3 className="text-lg font-black mb-1">{plan.name}</h3>
              <p className="text-2xl font-black text-primary mb-6">₹ {plan.price.toLocaleString()}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Active Sales</span>
                  <span className="font-bold">{plan.activeSales}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-bold">{new Date(plan.created).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-xs">
                <Eye className="mr-2 h-3.5 w-3.5" /> View
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-3.5 w-3.5" /> Edit Plan
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-3.5 w-3.5" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className={plan.status === 'Active' ? 'text-red-600' : 'text-green-600'}>
                    {plan.status === 'Active' ? <XCircle className="mr-2 h-3.5 w-3.5" /> : <CheckCircle2 className="mr-2 h-3.5 w-3.5" />}
                    {plan.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}