import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { 
  FileText, 
  Upload, 
  Save, 
  Eye, 
  History, 
  Settings, 
  ChevronRight,
  Plus,
  ArrowRight
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/sales/reports")({
  component: SalesDocumentsPage,
});

function SalesDocumentsPage() {
  const [activeTab, setActiveTab] = React.useState("analytics");

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Sales Module"
        title="Sales Reports & Documents"
        description="Monitor sales performance and manage customer-facing document templates."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-muted/30 p-1 mb-6">
          <TabsTrigger value="analytics" className="text-xs font-bold px-6 py-2">Analytics Reports</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs font-bold px-6 py-2">Document Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="m-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Revenue Trends" description="Monthly revenue performance comparison.">
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5 gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Revenue Analytics Pipeline</span>
              </div>
            </SectionCard>
            <SectionCard title="Conversion Performance" description="Sales conversion rates by team.">
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/5 gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Conversion Metrics Dashboard</span>
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="m-0 space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <SectionCard title="Templates" description="Select a document template to edit.">
                <div className="space-y-2">
                  {[
                    { name: 'Standard Sales Document', version: 'v1.2.0', date: '20/07/2024' },
                    { name: 'Service Agreement', version: 'v2.1.0', date: '15/06/2024' },
                    { name: 'Pro-forma Invoice', version: 'v1.0.5', date: '01/08/2024' },
                  ].map((tpl) => (
                    <div key={tpl.name} className="p-3 rounded-lg border border-border/60 hover:border-orange-600/50 hover:bg-orange-600/[0.02] cursor-pointer transition-all group">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold group-hover:text-orange-600 transition-colors">{tpl.name}</span>
                        <Badge variant="outline" className="text-[9px] py-0">{tpl.version}</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium">Last Updated: {tpl.date}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full h-10 border-dashed text-xs font-bold mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Create New Template
                  </Button>
                </div>
              </SectionCard>
            </div>

            <div className="col-span-12 lg:col-span-8 space-y-6">
              <SectionCard 
                title="Template Editor: Standard Sales Document" 
                description="Customize the layout, text and dynamic variables for this document."
                actions={
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 font-bold text-xs">
                      <Eye className="mr-2 h-3.5 w-3.5" /> Preview
                    </Button>
                    <Button className="h-8 font-bold text-xs bg-orange-600 hover:bg-orange-700">
                      <Save className="mr-2 h-3.5 w-3.5" /> Publish Version
                    </Button>
                  </div>
                }
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-wider">Template Name</Label>
                      <Input defaultValue="Standard Sales Document" className="h-9 text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-wider">Version Tag</Label>
                      <Input defaultValue="1.2.0" className="h-9 text-xs" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-wider">Document Content (supports {"{{"}variables{"}}"})</Label>
                    <Textarea 
                      className="min-h-[200px] text-xs leading-relaxed" 
                      defaultValue={`This document outlines the terms of your purchase from {{business_name}}.

Customer: {{customer_name}}
Sale ID: {{sale_id}}
Plan: {{plan_name}}
Amount: {{amount}}

Thank you for choosing {{business_name}}. We are committed to providing you with the best service possible.`} 
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h5 className="text-[10px] font-black uppercase tracking-wider mb-3">Available Variables</h5>
                    <div className="flex flex-wrap gap-2">
                      {['business_name', 'customer_name', 'customer_phone', 'customer_email', 'sale_id', 'plan_name', 'amount', 'date', 'reference'].map(v => (
                        <Badge key={v} variant="secondary" className="text-[10px] font-mono lowercase bg-background border-border">
                          {"{{"}{v}{"}}"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}