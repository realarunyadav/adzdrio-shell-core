import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, 
  MessageSquare, 
  Settings, 
  Activity, 
  ShieldAlert, 
  Database,
  History,
  Terminal,
  Search,
  ChevronRight,
  Send,
  Trash2
} from "lucide-react";
import { demoAiCapabilities, demoAiProviders, demoAiAuditLogs, demoAiConversation } from "@/lib/mock/workspace.demo";


export const Route = createFileRoute("/modules/admin/ai")({
  component: AIAcademyModule,
});

function AIAcademyModule() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <PageHeader
          title="AI Foundation"
          description="Manage platform AI capabilities, providers, and governance."
        />
        <Button variant="outline" className="gap-2">
          <Settings className="size-4" />
          Configure Global Policy
        </Button>
      </div>

      <Tabs defaultValue="capabilities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="assistant">Assistant Prototype</TabsTrigger>
          <TabsTrigger value="audit">Audit & Governance</TabsTrigger>
          <TabsTrigger value="providers">Provider Status</TabsTrigger>
        </TabsList>

        <TabsContent value="capabilities">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoAiCapabilities.map(cap => (
              <Card key={cap.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-black uppercase tracking-widest">{cap.name}</CardTitle>
                  <Sparkles className="size-4 text-indigo-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-muted-foreground">{cap.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={cap.status === 'active' ? 'default' : 'secondary'}>{cap.status}</Badge>
                    <Switch checked={cap.status === 'active'} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assistant" className="h-[600px] border rounded-xl bg-muted/20 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-card">
            <span className="font-bold text-sm">Prototype AI Assistant</span>
            <Button variant="ghost" size="sm" className="gap-2 text-xs">
              <Trash2 className="size-3" /> Clear
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {demoAiConversation.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
                  {msg.role === 'assistant' && <div className="text-[10px] font-bold text-indigo-500 mb-1 uppercase tracking-widest">Prototype AI Response</div>}
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t bg-card flex gap-2">
            <Input className="flex-1" placeholder="Enter a question..." />
            <Button size="icon"><Send className="size-4" /></Button>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader><CardTitle>AI Audit Log</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b uppercase font-black tracking-widest text-muted-foreground">
                    <th className="p-2 text-left">Time</th>
                    <th className="p-2 text-left">User</th>
                    <th className="p-2 text-left">Capability</th>
                    <th className="p-2 text-left">Result</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {demoAiAuditLogs.map(log => (
                    <tr key={log.id} className="border-b">
                      <td className="p-2">{log.timestamp}</td>
                      <td className="p-2">{log.userName}</td>
                      <td className="p-2">{log.capability}</td>
                      <td className="p-2">{log.result}</td>
                      <td className="p-2"><Badge variant="outline" className={log.status === 'success' ? 'text-emerald-500' : 'text-amber-500'}>{log.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers">
          <div className="grid gap-4">
            {demoAiProviders.map(p => (
              <Card key={p.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded bg-muted flex items-center justify-center">
                      <Terminal className="size-5" />
                    </div>
                    <div>
                      <div className="font-bold">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{p.model}</div>
                    </div>
                  </div>
                  <Badge className={p.status === 'connected' ? 'bg-emerald-500' : 'bg-red-500'}>{p.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

