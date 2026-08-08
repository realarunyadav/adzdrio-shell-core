import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  QrCode, 
  Package, 
  Warehouse,
  ShoppingCart,
  Users,
  BarChart3,
  ShieldCheck,
  Settings2
} from 'lucide-react';

import { InventoryDashboard } from '@/components/inventory/InventoryDashboard';
import { ProductMaster } from '@/components/inventory/ProductMaster';
import { ProcurementLifecycle } from '@/components/inventory/ProcurementLifecycle';
import { WarehouseNetwork } from '@/components/inventory/WarehouseNetwork';
import { VendorManagement } from '@/components/inventory/VendorManagement';
import { InventoryAnalytics } from '@/components/inventory/InventoryAnalytics';
import { InventoryAuditTrail } from '@/components/inventory/InventoryAuditTrail';

export const Route = createFileRoute('/modules/inventory')({
  component: InventoryWorkspace,
});

function InventoryWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <PageHeader 
        title="Inventory & Procurement" 
        description="Enterprise supply chain cockpit, multi-warehouse orchestration, and strategic procurement."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm border-slate-200 font-bold text-xs uppercase tracking-widest px-6 h-11">
              <QrCode className="w-4 h-4 mr-2 text-primary" />
              Scan Barcode
            </Button>
            <Button className="shadow-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest px-6 h-11">
              <Plus className="w-4 h-4 mr-2" />
              New PO
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="dashboard" className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1 overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-8">
            {[
              { value: "dashboard", label: "Dashboard", icon: Package },
              { value: "catalog", label: "SKU Master", icon: QrCode },
              { value: "warehouses", label: "Warehouses", icon: Warehouse },
              { value: "procurement", label: "Procurement", icon: ShoppingCart },
              { value: "vendors", label: "Vendors", icon: Users },
              { value: "analytics", label: "Intelligence", icon: BarChart3 },
              { value: "audit", label: "Audit Trail", icon: ShieldCheck },
            ].map(tab => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="px-0 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all text-xs font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-slate-900 flex items-center gap-2"
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
            <Settings2 className="w-3.5 h-3.5" />
            Inventory Config
          </Button>
        </div>

        <TabsContent value="dashboard" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <InventoryDashboard />
        </TabsContent>

        <TabsContent value="catalog" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <ProductMaster />
        </TabsContent>

        <TabsContent value="warehouses" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <WarehouseNetwork />
        </TabsContent>

        <TabsContent value="procurement" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <ProcurementLifecycle />
        </TabsContent>

        <TabsContent value="vendors" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <VendorManagement />
        </TabsContent>

        <TabsContent value="analytics" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <InventoryAnalytics />
        </TabsContent>

        <TabsContent value="audit" className="animate-in fade-in slide-in-from-bottom-2 duration-400 focus-visible:outline-none">
          <InventoryAuditTrail />
        </TabsContent>
      </Tabs>
    </div>
  );
}

