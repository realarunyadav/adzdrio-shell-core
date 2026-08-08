import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Layout, 
  Mail, 
  Globe,
  Bell,
  Smartphone,
  MousePointer2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BrandingBuilder() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <SectionCard title="Asset Library" description="Manage enterprise branding files.">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <ImageIcon className="size-8 text-muted-foreground mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-tight">Primary Logo</p>
                <p className="text-[10px] text-muted-foreground mt-1">SVG, PNG (Max 5MB)</p>
              </div>
              <div className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Layout className="size-8 text-muted-foreground mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-tight">Favicon</p>
                <p className="text-[10px] text-muted-foreground mt-1">ICO, PNG (32x32)</p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="md:col-span-3">
          <SectionCard 
            title="Visual Identity System" 
            description="Configure brand colors, typography, and portal styles."
            actions={<Button size="sm">Save Branding Changes</Button>}
          >
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
                <TabsTrigger value="colors" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
                  <Palette className="mr-2 size-3.5" /> Color Palette
                </TabsTrigger>
                <TabsTrigger value="portals" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
                  <Globe className="mr-2 size-3.5" /> Customer Portals
                </TabsTrigger>
                <TabsTrigger value="emails" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent shadow-none px-4 py-2">
                  <Mail className="mr-2 size-3.5" /> Email Templates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-bold tracking-wider">Primary Brand Color</Label>
                    <div className="flex gap-2">
                      <div className="size-10 rounded-md bg-[#3B82F6] border border-border" />
                      <Input defaultValue="#3B82F6" className="flex-1 font-mono uppercase text-xs" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase font-bold tracking-wider">Secondary Accent</Label>
                    <div className="flex gap-2">
                      <div className="size-10 rounded-md bg-[#6366F1] border border-border" />
                      <Input defaultValue="#6366F1" className="flex-1 font-mono uppercase text-xs" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold">Brand Typography</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-3 rounded-lg border border-border bg-muted/20">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Headings</p>
                      <p className="text-lg font-bold tracking-tight">SF Pro Display / Inter</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-muted/20">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Body Text</p>
                      <p className="text-sm">Inter Regular / Medium</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="emails" className="space-y-6">
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="bg-muted p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-muted-foreground" />
                      <span className="text-sm font-bold uppercase tracking-tight">Invoice Template</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] uppercase font-bold">Edit HTML</Button>
                  </div>
                  <div className="p-12 bg-white flex flex-col items-center">
                    <div className="w-full max-w-[400px] border border-slate-100 shadow-sm p-6 bg-white space-y-4">
                      <div className="h-8 w-24 bg-slate-100 rounded" />
                      <div className="h-4 w-full bg-slate-50 rounded" />
                      <div className="h-4 w-2/3 bg-slate-50 rounded" />
                      <div className="h-10 w-full bg-blue-500 rounded mt-6" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="portals">
                <div className="flex items-center justify-center h-[200px] rounded-lg border border-dashed border-border bg-muted/20">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Portal Branding Configuration</p>
                </div>
              </TabsContent>
            </Tabs>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
