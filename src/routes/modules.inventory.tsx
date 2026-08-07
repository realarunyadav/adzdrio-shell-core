import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionCard } from '@/components/shared/SectionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  ShoppingCart, 
  Warehouse, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Search, 
  Filter, 
  BarChart3, 
  Truck, 
  History, 
  Users, 
  BarChart, 
  QrCode,
  Tag,
  ArrowRightLeft,
  MoveDown,
  MoveUp,
  FileText,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/modules/inventory')({
  component: InventoryWorkspace,
});

function InventoryWorkspace() {
  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <PageHeader 
        title="Inventory & Procurement" 
        description="Enterprise supply chain cockpit, warehouse management, and strategic procurement."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm">
              <QrCode className="w-4 h-4 mr-2" />
              Scan Barcode
            </Button>
            <Button className="shadow-md bg-primary hover:bg-primary/90 text-white font-medium">
              <Plus className="w-4 h-4 mr-2" />
              New Purchase Order
            </Button>
          </div>
        }
      />

      {/* Executive KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Stock Value", value: "₹1,24,50,000", change: "+4.2%", trend: "up", icon: Tag },
          { label: "Low Stock Items", value: "12 Items", change: "-2", trend: "down", icon: AlertTriangle, color: "text-amber-500" },
          { label: "Pending POs", value: "18 Orders", change: "+3", trend: "up", icon: ShoppingCart },
          { label: "Warehouse Health", value: "92%", change: "+1.5%", trend: "up", icon: Warehouse },
        ].map((stat, i) => (
          <Card key={i} className="p-5 border-none shadow-card hover:shadow-elevated transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-primary/5 transition-colors">
                <stat.icon className={`w-5 h-5 ${stat.color || 'text-slate-500'} group-hover:text-primary transition-colors`} />
              </div>
              <Badge 
                variant={stat.trend === "up" ? "outline" : "destructive"} 
                className={`flex gap-1 items-center px-2 py-0.5 text-[11px] font-bold ${stat.trend === 'up' && stat.label !== 'Low Stock Items' ? 'border-emerald-100 text-emerald-600 bg-emerald-50/50' : ''}`}
              >
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium text-slate-500 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList className="bg-slate-100/80 backdrop-blur-md p-1 rounded-xl border border-white/50 w-fit">
          <TabsTrigger value="catalog" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Product Catalog</TabsTrigger>
          <TabsTrigger value="stock" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Stock Movements</TabsTrigger>
          <TabsTrigger value="warehouses" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Warehouses</TabsTrigger>
          <TabsTrigger value="procurement" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Procurement</TabsTrigger>
          <TabsTrigger value="vendors" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Vendors</TabsTrigger>
          <TabsTrigger value="analytics" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Analytics</TabsTrigger>
          <TabsTrigger value="audit" className="px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium transition-all">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Product Master Catalog" description="Unified directory for SKUs, variants, pricing and categorical classifications.">
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 max-w-sm">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input placeholder="Search SKUs, Categories, Brands..." className="pl-10 h-10 border-slate-200 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm" className="h-10">Categories</Button>
                </div>
              </div>
              <div className="h-[500px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                  <Package className="w-12 h-12 opacity-10" />
                  <p className="text-sm font-medium">Enterprise Product Grid with Bulk Actions</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="stock" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SectionCard title="Inventory Movement" description="Real-time tracking of Stock In, Stock Out, and Inter-Warehouse Transfers.">
                <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl mt-4">
                  Movement Activity Log
                </div>
              </SectionCard>
            </div>
            <div className="space-y-6">
              <Card className="border-none shadow-card p-6">
                <h4 className="text-sm font-bold text-slate-800 mb-4">Quick Adjustments</h4>
                <div className="space-y-3">
                  <Button className="w-full justify-start h-12 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none shadow-none">
                    <MoveDown className="w-4 h-4 mr-3" />
                    Stock In / Receipt
                  </Button>
                  <Button className="w-full justify-start h-12 bg-amber-50 text-amber-700 hover:bg-amber-100 border-none shadow-none">
                    <MoveUp className="w-4 h-4 mr-3" />
                    Stock Out / Issue
                  </Button>
                  <Button className="w-full justify-start h-12 bg-blue-50 text-blue-700 hover:bg-blue-100 border-none shadow-none">
                    <ArrowRightLeft className="w-4 h-4 mr-3" />
                    Inter-Warehouse Transfer
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="warehouses" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Warehouse Network" description="Manage multi-location storage capacity, performance and distribution.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {[
                { name: "Central Hub - Bengaluru", type: "Primary", capacity: "85%", health: "Optimal" },
                { name: "West Node - Mumbai", type: "Distribution", capacity: "42%", health: "Optimal" },
                { name: "East Node - Kolkata", type: "Satellite", capacity: "94%", health: "Capacity Warning" }
              ].map((wh, i) => (
                <Card key={i} className="p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-slate-50">
                      <Warehouse className="w-5 h-5 text-slate-500" />
                    </div>
                    <Badge variant={wh.health === "Optimal" ? "outline" : "destructive"}>{wh.health}</Badge>
                  </div>
                  <h4 className="font-bold text-slate-800">{wh.name}</h4>
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-4">{wh.type} Warehouse</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-400">Utilization</span>
                      <span className="text-slate-700">{wh.capacity}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${wh.capacity === '94%' ? 'bg-amber-500' : 'bg-primary'}`} 
                        style={{ width: wh.capacity }} 
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="procurement" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Purchase Orders" description="Manage supplier orders, multi-level approval workflows and GRN tracking.">
            <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl mt-4">
              Procurement Lifecycle Dashboard
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="vendors" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Vendor Directory" description="Maintain supplier relationships, performance ratings and historical lead times.">
            <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-50/30 border-2 border-dashed border-slate-100 rounded-2xl mt-4">
              Supplier Management Interface
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="analytics" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Strategic Analysis" description="ABC Analysis, Fast/Slow Moving Items and Dead Stock Identification.">
              <div className="h-[300px] flex items-center justify-center text-slate-400">
                <BarChart3 className="w-12 h-12 opacity-10" />
              </div>
            </SectionCard>
            <SectionCard title="Demand Forecasting" description="AI-driven inventory projections based on historical movement.">
              <div className="h-[300px] flex items-center justify-center text-slate-400">
                <BarChart className="w-12 h-12 opacity-10" />
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <SectionCard title="Stock Audit Trail" description="Immutable historical log of every stock movement and user attribution.">
            <div className="space-y-4 pt-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex gap-4 p-4 border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    {i < 5 && <div className="w-px h-full bg-slate-100" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="text-sm font-bold text-slate-800">Inter-Warehouse Transfer: SKU-8849</div>
                      <div className="text-[10px] font-bold text-slate-400">AUG 07, 2026 • 15:05 UTC</div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Moved 500 units from <span className="font-bold">Bengaluru Hub</span> to <span className="font-bold">Mumbai Node</span></div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-5 h-5 rounded-full bg-slate-200" />
                      <span className="text-[11px] font-medium text-slate-600">Inventory Manager • Logged manually via scanner</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
