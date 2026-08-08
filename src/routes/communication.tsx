import { createFileRoute } from "@tanstack/react-router";
import { CommunicationCenter } from "@/components/communication/CommunicationCenter";
import { MailboxManagement } from "@/components/communication/MailboxManagement";
import { TemplateManagement } from "@/components/communication/TemplateManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Settings, Layout } from "lucide-react";

export const Route = createFileRoute("/communication")({
  component: CommunicationPage,
});

function CommunicationPage() {
  return (
    <div className="p-6">
      <Tabs defaultValue="inbox" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 border border-border/50">
          <TabsTrigger value="inbox" className="gap-2">
            <Mail className="size-3.5" />
            Inbox & Messages
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Layout className="size-3.5" />
            Templates & Signatures
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="size-3.5" />
            Mailbox Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-0">
          <CommunicationCenter />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-0">
          <TemplateManagement />
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <MailboxManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}

