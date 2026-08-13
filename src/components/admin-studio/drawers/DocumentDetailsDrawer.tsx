import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { 
  FileText, 
  Clock, 
  History, 
  Shield, 
  Share2, 
  Download, 
  Eye, 
  Upload, 
  Archive, 
  MoreVertical,
  Calendar,
  User,
  Building2,
  Trash2,
  AlertTriangle,
  FileEdit,
  Activity,
  ArrowUpRight,
  Briefcase
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Document, 
  demoDocAudit,
  DocAccessLevel
} from "@/lib/mock/workspace.demo";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DocumentDetailsDrawerProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentDetailsDrawer({ document, open, onOpenChange }: DocumentDetailsDrawerProps) {
  if (!document) return null;

  const docAudit = demoDocAudit.filter(a => a.docId === document.id);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl bg-card border-l-border/60 glass-surface p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border/40 shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                <FileText className="size-6 text-primary" />
              </div>
              <div className="space-y-1">
                <SheetTitle className="text-lg font-black uppercase tracking-widest">{document.name}</SheetTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] h-5 bg-background font-black uppercase tracking-tighter">
                    {document.type}
                  </Badge>
                  <StatusBadge tone={document.status === 'Active' ? 'success' : document.status === 'Expired' ? 'danger' : 'neutral'}>
                    {document.status}
                  </StatusBadge>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    v{document.version}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="size-8">
                <Share2 className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreVertical className="size-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 border-b border-border/40 bg-accent/5 shrink-0">
            <TabsList className="h-12 w-full justify-start bg-transparent gap-6 rounded-none p-0">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 text-[10px] font-black uppercase tracking-widest p-0"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="versions" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 text-[10px] font-black uppercase tracking-widest p-0"
              >
                Versions ({document.versions.length})
              </TabsTrigger>
              <TabsTrigger 
                value="access" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 text-[10px] font-black uppercase tracking-widest p-0"
              >
                Access
              </TabsTrigger>
              <TabsTrigger 
                value="audit" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 text-[10px] font-black uppercase tracking-widest p-0"
              >
                Activity
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <TabsContent value="overview" className="p-6 space-y-6 m-0">
              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2">
                <Button className="h-16 flex flex-col gap-1 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                  <Eye className="size-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Preview</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1 rounded-2xl border-border/60 hover:bg-accent/50">
                  <Download className="size-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Download</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-1 rounded-2xl border-border/60 hover:bg-accent/50">
                  <Upload className="size-4" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Upload Ver</span>
                </Button>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-accent/10 border border-border/40 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="size-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Business</span>
                  </div>
                  <p className="text-xs font-bold">{document.businessName}</p>
                </div>
                <div className="p-4 rounded-2xl bg-accent/10 border border-border/40 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="size-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Owner</span>
                  </div>
                  <p className="text-xs font-bold">{document.ownerName}</p>
                </div>
                <div className="p-4 rounded-2xl bg-accent/10 border border-border/40 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Created</span>
                  </div>
                  <p className="text-xs font-bold">{format(new Date(document.created), 'PPp')}</p>
                </div>
                <div className="p-4 rounded-2xl bg-accent/10 border border-border/40 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Expiry</span>
                  </div>
                  <p className="text-xs font-bold">
                    {document.expiryDate ? format(new Date(document.expiryDate), 'PP') : 'No Expiry'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Description</h4>
                <div className="p-4 rounded-2xl bg-accent/5 border border-border/40">
                  <p className="text-xs leading-relaxed font-medium">
                    {document.description || "No description provided."}
                  </p>
                </div>
              </div>

              {document.relatedEntityName && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Related Entity</h4>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-background flex items-center justify-center">
                        <Briefcase className="size-4 text-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold">{document.relatedEntityName}</p>
                        <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">ID: {document.relatedEntityId}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ArrowUpRight className="size-4 text-primary" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="versions" className="p-6 space-y-4 m-0">
              {document.versions.sort((a,b) => b.version - a.version).map((v, i) => (
                <div key={v.id} className="relative pl-6 pb-6 last:pb-0">
                  {i !== document.versions.length - 1 && (
                    <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-border/40" />
                  )}
                  <div className="absolute left-0 top-1.5 size-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <div className="size-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-widest">Version {v.version}</span>
                        {v.version === document.version && (
                          <Badge className="text-[8px] font-black uppercase tracking-tighter h-4 px-1.5 bg-emerald-500 hover:bg-emerald-600">Current</Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-bold">{format(new Date(v.timestamp), 'PP')}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/5 border border-border/40 space-y-2">
                      <p className="text-[11px] font-medium leading-relaxed italic">"{v.note}"</p>
                      <div className="flex items-center justify-between pt-2 border-t border-border/20">
                        <div className="flex items-center gap-2">
                          <User className="size-3 text-muted-foreground" />
                          <span className="text-[10px] font-bold">{v.uploadedByName}</span>
                          <span className="text-muted-foreground mx-1">•</span>
                          <span className="text-[10px] text-muted-foreground uppercase">{v.size}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="size-7 h-7">
                            <Eye className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="size-7 h-7">
                            <Download className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="access" className="p-6 space-y-6 m-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Global Classification</h4>
                  <StatusBadge tone={document.accessLevel === 'Confidential' ? 'danger' : document.accessLevel === 'Public' ? 'neutral' : 'info'}>
                    {document.accessLevel}
                  </StatusBadge>
                </div>
                
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3">
                  <Shield className="size-5 text-primary shrink-0" />
                  <p className="text-[10px] font-medium leading-relaxed">
                    This document is marked as <span className="font-black">{document.accessLevel}</span>. 
                    Access is strictly governed by the business role hierarchy and scope of {document.businessName}.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Authorized Roles</h4>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[9px] font-black uppercase tracking-widest">Add Role</Button>
                </div>
                <div className="space-y-2">
                  {[
                    { role: 'Super Admin', access: 'Full Access', color: 'emerald' },
                    { role: 'Business Owner', access: 'Read / Write', color: 'blue' },
                    { role: 'Compliance Officer', access: 'Read Only', color: 'amber' },
                    { role: 'Department Manager', access: 'Read Only', color: 'slate' }
                  ].map((r) => (
                    <div key={r.role} className="flex items-center justify-between p-3 rounded-xl bg-accent/10 border border-border/40">
                      <div className="flex items-center gap-3">
                        <div className={cn("size-2 rounded-full", `bg-${r.color}-500`)} />
                        <span className="text-xs font-bold">{r.role}</span>
                      </div>
                      <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter">
                        {r.access}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audit" className="p-6 space-y-4 m-0">
              {docAudit.length > 0 ? docAudit.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((audit) => (
                <div key={audit.id} className="p-3 rounded-xl border border-border/40 bg-accent/5 space-y-2 transition-all hover:bg-accent/10">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-[8px] font-black uppercase tracking-tighter h-4">
                      {audit.action}
                    </Badge>
                    <span className="text-[9px] text-muted-foreground font-medium">{format(new Date(audit.timestamp), 'PPp')}</span>
                  </div>
                  <p className="text-[10px] font-medium leading-relaxed">{audit.result}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-border/20">
                    <div className="size-5 rounded-full bg-background flex items-center justify-center border border-border/40">
                      <User className="size-3 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-bold">{audit.actorName}</span>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest ml-auto">{audit.employeeCode}</span>
                  </div>
                </div>
              )) : (
                <div className="py-12 text-center space-y-3">
                  <Activity className="size-8 text-muted-foreground/30 mx-auto" />
                  <p className="text-xs text-muted-foreground font-medium">No activity recorded for this document.</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>

        <div className="p-4 bg-accent/10 border-t border-border/40 flex items-center justify-between shrink-0">
          <Button variant="ghost" className="text-danger hover:text-danger hover:bg-danger/10 font-black uppercase tracking-widest text-[10px]">
            <Archive className="size-3 mr-2" />
            Archive Document
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="font-black uppercase tracking-widest text-[10px] h-8">
              Edit Meta
            </Button>
            <Button size="sm" className="font-black uppercase tracking-widest text-[10px] h-8 px-4">
              Open Full View
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
