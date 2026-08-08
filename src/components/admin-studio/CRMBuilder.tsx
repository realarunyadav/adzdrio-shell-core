import { 
  Plus, 
  Search, 
  Trash2, 
  Settings2,
  ListFilter,
  Users,
  Briefcase,
  HelpCircle,
  MessageSquare,
  Globe,
  Tag,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/SectionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function CRMBuilder() {
  const crmConfigs = [
    { title: "Lead Statuses", count: 8, icon: ListFilter, items: ["New", "In Progress", "Qualified", "Unqualified", "Follow-up", "Converted", "Lost", "Archived"] },
    { title: "Sales Stages", count: 5, icon: Briefcase, items: ["Discovery", "Proposal", "Negotiation", "Closing", "Closed Won"] },
    { title: "Qualification Questions", count: 12, icon: HelpCircle, items: ["Budget Confirmed?", "Authority Verified?", "Need Established?", "Timeline Set?"] },
    { title: "Follow-up Types", count: 6, icon: MessageSquare, items: ["Discovery Call", "Email Follow-up", "Product Demo", "Site Visit"] },
    { title: "Callback Reasons", count: 4, icon: MessageSquare, items: ["Information Request", "Demo Request", "Pricing Inquiry", "Support Needed"] },
    { title: "Lead Sources", count: 10, icon: Globe, items: ["Website Form", "LinkedIn", "Referral", "Cold Outreach", "Events"] },
    { title: "Customer Tags", count: 25, icon: Tag, items: ["VIP", "Enterprise", "Retail", "Legacy", "Strategic"] },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {crmConfigs.map((config, i) => (
          <SectionCard
            key={i}
            title={config.title}
            description={`Configure ${config.title.toLowerCase()} for the CRM pipeline.`}
            actions={
              <Button variant="ghost" size="icon" className="size-8">
                <Settings2 className="size-4" />
              </Button>
            }
          >
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {config.items.slice(0, 5).map((item, j) => (
                  <Badge key={j} variant="secondary" className="text-[10px] font-medium">
                    {item}
                  </Badge>
                ))}
                {config.count > 5 && (
                  <Badge variant="outline" className="text-[10px] font-medium">
                    +{config.count - 5} more
                  </Badge>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">{config.count} Total Values</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-[10px] uppercase font-bold">
                  Edit Config <ChevronRight className="ml-1 size-3" />
                </Button>
              </div>
            </div>
          </SectionCard>
        ))}

        <Card className="border-dashed flex flex-col items-center justify-center p-6 bg-muted/20">
          <div className="size-10 rounded-full bg-muted flex items-center justify-center mb-3">
            <Plus className="size-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-bold">Custom CRM Field</p>
          <p className="text-[10px] text-muted-foreground text-center mt-1">
            Add a new data point to the lead or customer profile.
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            Create Custom Field
          </Button>
        </Card>
      </div>

      <SectionCard
        title="CRM Field Configuration Matrix"
        description="Global management of lead, opportunity, and account field behaviors."
      >
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="bg-muted/50 p-3 grid grid-cols-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <div>Field Label</div>
            <div>Data Type</div>
            <div>Required</div>
            <div className="text-right">Validation</div>
          </div>
          <div className="divide-y divide-border">
            {[
              { label: "Company Name", type: "Text", required: true, validation: "None" },
              { label: "Annual Revenue", type: "Number", required: false, validation: "Min: 0" },
              { label: "Lead Score", type: "Number", required: false, validation: "Range: 0-100" },
              { label: "Next Follow-up", type: "Date", required: true, validation: "Future Only" },
            ].map((field, i) => (
              <div key={i} className="p-3 grid grid-cols-4 text-sm items-center">
                <div className="font-bold">{field.label}</div>
                <div className="text-muted-foreground text-xs">{field.type}</div>
                <div>
                  {field.required ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : (
                    <div className="size-4 rounded-full border border-border" />
                  )}
                </div>
                <div className="text-right text-xs text-muted-foreground">{field.validation}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
