import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  CreditCard, 
  LifeBuoy, 
  Smartphone,
  ChevronRight,
  Settings2,
  Bell,
  LogOut,
  User,
  History,
  FileText
} from 'lucide-react';

import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Customer Portal Components
import { CustomerPortalDashboard } from '@/components/customer-portal/CustomerPortalDashboard';
import { SubscriptionWorkspace } from '@/components/customer-portal/SubscriptionWorkspace';
import { CustomerInvoices } from '@/components/customer-portal/CustomerInvoices';
import { CustomerSupport } from '@/components/customer-portal/CustomerSupport';

export const Route = createFileRoute('/customer/portal')({
  head: () => ({
    meta: [
      { title: "Customer Experience Portal — ABOS" },
      {
        name: "description",
        content: "Enterprise customer service and subscription management portal.",
      },
    ],
  }),
  component: CustomerPortal,
});

function CustomerPortal() {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Premium Portal Header */}
      <header className="h-16 border-b border-border/40 bg-card/30 backdrop-blur-xl sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
             <ShieldCheck className="text-primary-foreground size-5" />
          </div>
          <div className="h-4 w-px bg-border/40" />
          <p className="text-xs font-black uppercase tracking-widest text-primary">Customer Experience Portal</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="size-9 rounded-full relative">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-background" />
          </Button>
          <div className="h-8 w-px bg-border/40 mx-2" />
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none">Amit Kumar</p>
              <p className="text-[10px] text-muted-foreground uppercase font-black mt-1">Enterprise Gold</p>
            </div>
            <Button variant="ghost" size="icon" className="size-9 rounded-full bg-muted/50">
              <User className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full animate-in fade-in duration-700">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tighter">Account Cockpit</h1>
              <p className="text-sm text-muted-foreground font-medium">Manage your enterprise services, billing and support requests.</p>
            </div>
            
            <TabsList className="bg-muted/50 p-1 rounded-xl border border-border/50 h-auto self-start md:self-auto">
              <PortalTabTrigger value="dashboard" label="Overview" icon={LayoutDashboard} />
              <PortalTabTrigger value="subscription" label="Subscription" icon={ShieldCheck} />
              <PortalTabTrigger value="billing" label="Billing" icon={CreditCard} />
              <PortalTabTrigger value="support" label="Support" icon={LifeBuoy} />
            </TabsList>
          </div>

          <div className="mt-8">
            <TabsContent value="dashboard" className="outline-none space-y-8">
              <CustomerPortalDashboard />
            </TabsContent>
            
            <TabsContent value="subscription" className="outline-none">
              <SubscriptionWorkspace />
            </TabsContent>

            <TabsContent value="billing" className="outline-none">
              <CustomerInvoices />
            </TabsContent>

            <TabsContent value="support" className="outline-none">
              <CustomerSupport />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <footer className="p-8 border-t border-border/40 text-center">
         <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/40">Powered by ABOS Enterprise Operating System · 2026</p>
      </footer>
    </div>
  );
}

function PortalTabTrigger({ value, label, icon: Icon }: { value: string, label: string, icon: any }) {
  return (
    <TabsTrigger 
      value={value} 
      className="px-6 py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
    >
      <Icon className="size-3.5" />
      {label}
    </TabsTrigger>
  );
}
