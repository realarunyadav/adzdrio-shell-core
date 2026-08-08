import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus,
  Download,
  Settings2
} from 'lucide-react';

// Specialized Finance Components
import { FinanceDashboard } from '@/components/finance/FinanceDashboard';
import { InvoiceManagement } from '@/components/finance/InvoiceManagement';
import { PaymentManagement } from '@/components/finance/PaymentManagement';
import { ExpenseManagement } from '@/components/finance/ExpenseManagement';
import { TreasuryHub } from '@/components/finance/TreasuryHub';
import { TaxationCompliance } from '@/components/finance/TaxationCompliance';
import { FinanceAuditTrail } from '@/components/finance/FinanceAuditTrail';

export const Route = createFileRoute('/modules/finance')({
  component: FinanceWorkspace,
});

function FinanceWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <PageHeader 
        title="Finance & Revenue Operations" 
        description="Unified enterprise financial controller workspace for ABOS ADZDRIO."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm border-border/50 bg-card/50">
              <Settings2 className="w-4 h-4 mr-2" />
              Config
            </Button>
            <Button variant="outline" className="shadow-sm border-border/50 bg-card/50">
              <Download className="w-4 h-4 mr-2" />
              Statements
            </Button>
            <Button className="shadow-md font-bold bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Record Transaction
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl border border-border/50 w-fit overflow-x-auto max-w-full">
          <TabsTrigger value="dashboard" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">Dashboard</TabsTrigger>
          <TabsTrigger value="invoices" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">Invoices</TabsTrigger>
          <TabsTrigger value="payments" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">Payments</TabsTrigger>
          <TabsTrigger value="expenses" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">Expenses</TabsTrigger>
          <TabsTrigger value="treasury" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">Treasury Hub</TabsTrigger>
          <TabsTrigger value="tax" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">Tax & Compliance</TabsTrigger>
          <TabsTrigger value="audit" className="px-6 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-tight transition-all">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <FinanceDashboard />
        </TabsContent>

        <TabsContent value="invoices" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <InvoiceManagement />
        </TabsContent>

        <TabsContent value="payments" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <PaymentManagement />
        </TabsContent>

        <TabsContent value="expenses" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <ExpenseManagement />
        </TabsContent>

        <TabsContent value="treasury" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <TreasuryHub />
        </TabsContent>

        <TabsContent value="tax" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <TaxationCompliance />
        </TabsContent>

        <TabsContent value="audit" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <FinanceAuditTrail />
        </TabsContent>
      </Tabs>
    </div>
  );
}
