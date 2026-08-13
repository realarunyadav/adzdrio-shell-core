import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Download, Upload, History, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/modules/admin/data")({
  component: () => (
    <div className="space-y-6">
      <PageHeader
        title="Data Center"
        description="Master controls for data imports, exports, storage management, and disaster recovery."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-surface border-border/40 col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest">Storage Consumption</h3>
              <HardDrive className="size-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold">
                <span>Enterprise Pool A</span>
                <span>1.2 TB / 5 TB</span>
              </div>
              <Progress value={24} className="h-2" />
              <div className="grid grid-cols-3 gap-4 pt-4">
                <StorageStat label="Database" value="120 GB" />
                <StorageStat label="Media / S3" value="980 GB" />
                <StorageStat label="Log Retention" value="100 GB" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-surface border-border/40">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest mb-4">Quick Actions</h3>
            <Button className="w-full h-10 text-[10px] font-black uppercase tracking-widest gap-2" variant="outline">
              <Upload className="size-4" /> Import Data
            </Button>
            <Button className="w-full h-10 text-[10px] font-black uppercase tracking-widest gap-2" variant="outline">
              <Download className="size-4" /> Export Master
            </Button>
            <Button className="w-full h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-primary">
              <Database className="size-4" /> Run Backup Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-border/40 bg-accent/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest">Backup & Sync History</h3>
          <Button variant="ghost" size="sm" className="text-[10px] font-bold gap-2">
            <History className="size-3.5" /> View Full History
          </Button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="flex items-center gap-4">
                <div className="size-8 rounded bg-emerald-500/10 flex items-center justify-center">
                  <Database className="size-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold">Manual Snapshot_{20260810 + i}</div>
                  <div className="text-[9px] text-muted-foreground uppercase">Success • 1.2 GB • 08:00 AM</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary">Restore</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});

function StorageStat({ label, value }: any) {
  return (
    <div>
      <p className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter mb-1">{label}</p>
      <p className="text-sm font-black">{value}</p>
    </div>
  );
}
