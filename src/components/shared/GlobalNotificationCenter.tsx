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
  Search
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

export type NotificationPriority = "low" | "medium" | "high" | "urgent";
export type NotificationCategory = "system" | "finance" | "hrms" | "crm" | "projects" | "inventory";

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: NotificationPriority;
  category: NotificationCategory;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Invoice Overdue",
    description: "Invoice #INV-2024-001 for Client A is 3 days overdue.",
    timestamp: "2 hours ago",
    read: false,
    priority: "high",
    category: "finance",
  },
  {
    id: "2",
    title: "Inventory Alert",
    description: "Stock for SKU-8849 is below the safety threshold (12 units remaining).",
    timestamp: "5 hours ago",
    read: false,
    priority: "urgent",
    category: "inventory",
  },
  {
    id: "3",
    title: "Project Milestone",
    description: "Milestone M3 for ABOS Framework has been marked as completed.",
    timestamp: "Yesterday",
    read: true,
    priority: "medium",
    category: "projects",
  },
];

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalNotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = React.useState("all");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md p-0 flex flex-col glass-effect border-l border-border/50">
        <SheetHeader className="p-6 pb-2">
          <div className="flex justify-between items-center mb-2">
            <SheetTitle className="text-xl font-bold tracking-tight">Notification Center</SheetTitle>
            <Button variant="ghost" size="sm" className="text-xs h-8 text-primary font-bold">Mark all as read</Button>
          </div>
          <SheetDescription className="text-sm">
            Stay updated with system activities and module-specific alerts.
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-2">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-muted/50 p-1 w-full justify-start">
              <TabsTrigger value="all" className="flex-1 text-xs">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1 text-xs">Unread</TabsTrigger>
              <TabsTrigger value="priority" className="flex-1 text-xs">Priority</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="flex flex-col gap-4 py-4">
            {DEMO_NOTIFICATIONS.map((n) => (
              <div 
                key={n.id} 
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer relative group",
                  n.read ? "bg-background/50 border-border/40" : "bg-primary/5 border-primary/20 shadow-sm ring-1 ring-primary/5"
                )}
              >
                {!n.read && <div className="absolute top-4 right-4 size-2 rounded-full bg-primary" />}
                
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg shrink-0",
                    n.category === 'finance' ? "bg-emerald-50 text-emerald-600" :
                    n.category === 'inventory' ? "bg-amber-50 text-amber-600" :
                    "bg-blue-50 text-blue-600"
                  )}>
                    {n.category === 'finance' ? <FileText className="size-4" /> :
                     n.category === 'inventory' ? <AlertCircle className="size-4" /> :
                     <Bell className="size-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-foreground leading-tight truncate pr-4">{n.title}</p>
                      <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed mb-2 line-clamp-2">
                      {n.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider py-0 px-1.5 h-4 border-muted-foreground/20">
                        {n.category}
                      </Badge>
                      {n.priority === 'urgent' && (
                        <Badge className="text-[9px] font-bold uppercase tracking-wider py-0 px-1.5 h-4 bg-destructive/10 text-destructive border-destructive/20 shadow-none">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="size-7">
                    <Archive className="size-3 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-7">
                    <Trash2 className="size-3 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-border/50 glass-effect flex justify-center">
          <Button variant="outline" className="w-full font-bold text-xs h-10 border-border/60">
            View All Notifications
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
