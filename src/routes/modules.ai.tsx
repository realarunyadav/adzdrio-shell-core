import { createFileRoute } from "@tanstack/react-router";
import { 
  Bot, 
  Sparkles, 
  Settings, 
  Database, 
  MessageSquare, 
  Mic, 
  GraduationCap, 
  ShieldAlert,
  BarChart3,
  History,
  LayoutDashboard,
  Cpu,
  Terminal,
  BrainCircuit
} from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AICopilot } from "@/components/ai/AICopilot";
import { AIStudioDashboard } from "@/components/ai/AIStudioDashboard";
import { CallAnalysis } from "@/components/ai/CallAnalysis";
import { SalesCoach } from "@/components/ai/SalesCoach";
import { KnowledgeBase } from "@/components/ai/KnowledgeBase";
import { PromptLibrary } from "@/components/ai/PromptLibrary";
import { AIModelConfig } from "@/components/ai/AIModelConfig";
import { AIAuditLog } from "@/components/ai/AIAuditLog";
import { CEOAssistant } from "@/components/ai/CEOAssistant";

export const Route = createFileRoute("/modules/ai")({
  head: () => ({
    meta: [
      { title: "AI Studio — ABOS Intelligence" },
      {
        name: "description",
        content: "Enterprise AI orchestration, Copilot, and cognitive services for ABOS.",
      },
    ],
  }),
  component: AIStudioWorkspace,
});

function AIStudioWorkspace() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col gap-6 pb-12 animate-in fade-in duration-500">
      <PageHeader
        eyebrow="Intelligence & Cognitive Services"
        title="AI Studio"
        description="Configure, monitor, and interact with the ABOS Enterprise AI layer."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass-surface">
              <History className="mr-2 size-4" />
              Audit Log
            </Button>
            <Button size="sm" className="shadow-elevated">
              <Bot className="mr-2 size-4" />
              Open Copilot
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
          <TabsList className="glass-surface p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="size-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="copilot" className="flex items-center gap-2">
              <MessageSquare className="size-4" />
              AI Copilot
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Mic className="size-4" />
              Call Analysis
            </TabsTrigger>
            <TabsTrigger value="coach" className="flex items-center gap-2">
              <GraduationCap className="size-4" />
              Sales Coach
            </TabsTrigger>
            <TabsTrigger value="ceo" className="flex items-center gap-2">
              <ShieldAlert className="size-4" />
              CEO Assistant
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <Database className="size-4" />
              Knowledge
            </TabsTrigger>
            <TabsTrigger value="prompts" className="flex items-center gap-2">
              <Terminal className="size-4" />
              Prompts
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="size-4" />
              Config
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <AIStudioDashboard />
        </TabsContent>
        <TabsContent value="copilot">
          <AICopilot />
        </TabsContent>
        <TabsContent value="analysis">
          <CallAnalysis />
        </TabsContent>
        <TabsContent value="coach">
          <SalesCoach />
        </TabsContent>
        <TabsContent value="ceo">
          <CEOAssistant />
        </TabsContent>
        <TabsContent value="knowledge">
          <KnowledgeBase />
        </TabsContent>
        <TabsContent value="prompts">
          <PromptLibrary />
        </TabsContent>
        <TabsContent value="config">
          <AIModelConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
}
