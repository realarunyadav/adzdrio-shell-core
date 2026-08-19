import * as React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RapidLead } from "@/lib/api/services.types";
import { format } from "date-fns";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Phone, Mail, Globe, Clock, Calendar, CheckCircle2, UserCheck, MessageSquare } from "lucide-react";

interface LeadDetailsDrawerProps {
  lead: RapidLead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaim?: (lead: RapidLead) => void;
}

export function LeadDetailsDrawer({ lead, open, onOpenChange, onClaim }: LeadDetailsDrawerProps) {
  if (!lead) return null;

  const createdAtDate = lead.createdAt ? new Date(lead.createdAt) : new Date();
  const lastActivityDate = lead.updatedAt ? new Date(lead.updatedAt) : createdAtDate;


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-6 border-b border-border/40">
          <div className="flex items-center gap-3 mb-2">
            <StatusBadge tone={lead.status === 'New' ? 'info' : 'premium'}>{lead.status}</StatusBadge>
            <StatusBadge tone={lead.priority === 'High' ? 'danger' : 'neutral'}>{lead.priority}</StatusBadge>
          </div>
          <SheetTitle className="text-2xl font-black">{lead.name}</SheetTitle>
          <SheetDescription className="text-xs">
            Lead source: <span className="font-bold text-foreground">{lead.source}</span> · Added {format(new Date(lead.addedDate), "MMM dd, yyyy")}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Contact Information</h4>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-muted/5">
                <Phone className="size-4 text-primary" />
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Phone</p>
                  <p className="text-sm font-bold">{lead.phone}</p>
                </div>
                <Button variant="ghost" size="icon" className="size-8"><MessageSquare className="size-3.5" /></Button>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-muted/5">
                <Mail className="size-4 text-primary" />
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Email</p>
                  <p className="text-sm font-bold">{lead.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Meta */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lead Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Business</p>
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Globe className="size-3.5 text-muted-foreground" />
                  {lead.business}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Last Activity</p>
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Clock className="size-3.5 text-muted-foreground" />
                  {format(new Date(lead.lastActivity), "MMM dd, HH:mm")}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Internal Notes</h4>
            <div className="p-4 rounded-xl bg-accent/20 border border-border/40 italic text-xs leading-relaxed">
              "{lead.notes || "No notes available for this lead."}"
            </div>
          </div>

          {/* Assignment */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assignment</h4>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-primary/5">
              <UserCheck className="size-4 text-primary" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Current Assignee</p>
                <p className="text-sm font-bold">{lead.assignedToName || "Unassigned"}</p>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8 flex-col gap-2 sm:flex-col pt-6 border-t border-border/40">
          {!lead.assignedTo && onClaim && (
            <Button className="w-full font-black uppercase tracking-widest text-[11px] h-11" onClick={() => onClaim(lead)}>
              Claim Lead
            </Button>
          )}
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" className="text-[11px] font-bold uppercase tracking-widest gap-2">
              <Calendar className="size-3.5" /> Follow-up
            </Button>
            <Button variant="outline" className="text-[11px] font-bold uppercase tracking-widest gap-2">
              <Phone className="size-3.5" /> Callback
            </Button>
          </div>
          <Button variant="ghost" className="w-full text-[11px] font-bold uppercase tracking-widest">
            View Customer Profile
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
