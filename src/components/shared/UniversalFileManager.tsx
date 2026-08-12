import * as React from "react";
import { File, FileText, Download, Trash2, Eye, Plus, FolderOpen, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SystemFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  owner?: string;
  securityLevel?: "public" | "internal" | "restricted" | "confidential";
}

export function UniversalFileManager({ files = [], className }: { files?: SystemFile[], className?: string }) {
  return (
    <div className={cn("space-y-6 animate-in fade-in duration-500", className)}>
      <div className="flex justify-between items-center border-b border-border/40 pb-4">
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-foreground">Document Repository</h3>
          <p className="text-[10px] font-medium text-muted-foreground/60 italic">Enterprise cloud storage for linked assets.</p>
        </div>
        <Button size="sm" className="h-8 font-black uppercase tracking-widest text-[10px] rounded-lg shadow-elevated">
          <Plus className="mr-1.5 size-3" /> Upload Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.length > 0 ? (
          files.map((file) => (
            <Card key={file.id} className="group relative overflow-hidden bg-muted/5 border-border/40 hover:border-primary/40 hover:bg-muted/10 premium-transition shadow-sm">
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-background border border-border/40 shadow-sm group-hover:scale-110 premium-transition">
                    <FileText className="size-5 text-primary/70 group-hover:text-primary" />
                  </div>
                  {file.securityLevel && (
                    <Badge variant="outline" className={cn(
                      "text-[8px] font-black uppercase px-1.5 h-4 border-border/40",
                      file.securityLevel === 'confidential' ? 'bg-danger/10 text-danger border-danger/20' : 
                      file.securityLevel === 'restricted' ? 'bg-warning/10 text-warning border-warning/20' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {file.securityLevel}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-black text-foreground truncate uppercase tracking-tight" title={file.name}>{file.name}</p>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase">
                    <span>{file.size}</span>
                    <span className="size-1 rounded-full bg-border" />
                    <span>{file.uploadedAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-primary/5 hover:text-primary">
                    <Eye className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-primary/5 hover:text-primary">
                    <Download className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-danger/5 hover:text-danger">
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-1 opacity-20">
                <ShieldCheck className="size-3 text-success" />
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-muted/5 border border-dashed border-border/40 rounded-2xl opacity-30 italic">
            <FolderOpen className="size-10 mb-4" />
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest">Vault is empty</p>
              <p className="text-[10px] font-medium">No files have been attached to this record.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}