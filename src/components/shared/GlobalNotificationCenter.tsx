import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  Bell, 
  Check, 
  Circle, 
  Clock, 
  FileText, 
  Info, 
  MoreHorizontal, 
  AlertCircle, 
  Trash2, 
  Archive,
  Search,
  CheckCircle2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type NotificationPriority = "low" | "medium" | "high" | "critical";
export type NotificationCategory = "system" | "finance" | "hrms" | "crm" | "projects" | "inventory" | "security";

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: NotificationPriority;
  category: NotificationCategory;
  actionLabel?: string;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Invoice Overdue",
    description: "Invoice #INV-2024-001 for Acme Corp is 3 days overdue.",
    timestamp: "2 hours ago",
    read: false,
    priority: "high",
    category: "finance",
    actionLabel: "View Invoice"
  },
  {
    id: "2",
    title: "Critical Security Alert",
    description: "Suspicious login attempt detected from IP 192.168.1.100.",
    timestamp: "5 hours ago",
    read: false,
    priority: "critical",
    category: "security",
    actionLabel: "Verify IP"
  },
  {
    id: "3",
    title: "Stock Alert: Low Inventory",
    description: "Hub-01: SKU-8849 is below reorder level (8 units remaining).",
    timestamp: "Yesterday",
    read: true,
    priority: "medium",
    category: "inventory",
    actionLabel: "Restock"
  },
  {
    id: "4",
    title: "Approval Requested",
    description: "Manager approval required for Travel Reimbursement #EXP-992.",
    timestamp: "Yesterday",
    read: false,
    priority: "medium",
    category: "hrms",
    actionLabel: "Review"
  }
];

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalNotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredNotifications = DEMO_NOTIFICATIONS.filter(n => {
    if (activeTab === "unread") return !n.read;
    if (activeTab === "priority") return n.priority === "high" || n.priority === "critical";
    return true;
  });

  const priorityColors = {
    low: "bg-slate-100 text-slate-600 border-slate-200",
    medium: "bg-blue-50 text-blue-600 border-blue-100",
    high: "bg-amber-50 text-amber-600 border-amber-100",
    critical: "bg-red-50 text-red-600 border-red-100 shadow-sm ring-1 ring-red-500/10",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md p-0 flex flex-col glass-effect border-l border-border/50">
        <SheetHeader className="p-6 pb-2">
          <div className="flex justify-between items-center mb-2">
            <SheetTitle className="text-xl font-bold tracking-tight">Notification Center</SheetTitle>
            <Button variant="ghost" size="sm" className="text-xs h-8 text-primary font-bold hover:bg-primary/5 opacity-50 cursor-not-allowed" disabled>Mark all as read (Phase 2)</Button>
          </div>
          <SheetDescription className="text-sm">
            Unified platform alerts and operational business events.
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-2">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-muted/50 p-1 w-full justify-start rounded-xl">
              <TabsTrigger value="all" className="flex-1 text-[10px] font-black uppercase tracking-widest px-4">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1 text-[10px] font-black uppercase tracking-widest px-4">Unread</TabsTrigger>
              <TabsTrigger value="priority" className="flex-1 text-[10px] font-black uppercase tracking-widest px-4">Priority</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="flex flex-col gap-4 py-4">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                <Bell className="size-12 mb-4" />
                <p className="text-sm font-medium">No notifications in this view</p>
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div 
                  key={n.id} 
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer relative group",
                    n.read ? "bg-background/50 border-border/40" : "bg-primary/5 border-primary/20 shadow-sm ring-1 ring-primary/5"
                  )}
                >
                  {!n.read && <div className="absolute top-4 right-4 size-2 rounded-full bg-primary animate-pulse" />}
                  
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      n.category === 'finance' ? "bg-emerald-50 text-emerald-600" :
                      n.category === 'inventory' ? "bg-amber-50 text-amber-600" :
                      n.category === 'security' ? "bg-red-50 text-red-600" :
                      "bg-blue-50 text-blue-600"
                    )}>
                      {n.category === 'finance' ? <FileText className="size-4" /> :
                       n.category === 'inventory' ? <AlertCircle className="size-4" /> :
                       n.category === 'security' ? <AlertCircle className="size-4" /> :
                       <Bell className="size-4" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-black text-foreground leading-tight truncate pr-4">{n.title}</p>
                        <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                        {n.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[9px] font-black uppercase tracking-wider py-0 px-1.5 h-4 border-muted-foreground/20">
                            {n.category}
                          </Badge>
                          <Badge className={cn("text-[9px] font-black uppercase tracking-wider py-0 px-1.5 h-4 shadow-none border", priorityColors[n.priority])}>
                            {n.priority}
                          </Badge>
                        </div>
                        
                        {n.actionLabel && (
                          <Button size="sm" variant="outline" className="h-6 text-[10px] font-bold py-0 glass-surface">
                            {n.actionLabel}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="size-7 hover:text-primary">
                      <Archive className="size-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-border/50 glass-effect flex gap-2">
          <Button variant="outline" className="flex-1 font-black text-[10px] uppercase tracking-widest h-10 border-border/60 opacity-50 cursor-not-allowed" disabled>
            Rules Engine (Phase 2)
          </Button>
          <Button variant="outline" className="flex-1 font-black text-[10px] uppercase tracking-widest h-10 border-border/60 opacity-50 cursor-not-allowed" disabled>
            View All (Phase 2)
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
