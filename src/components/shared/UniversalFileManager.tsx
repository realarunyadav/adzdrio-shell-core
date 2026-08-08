import * as React from "react";
import { 
  FileText, 
  MoreVertical, 
  Trash2, 
  Download, 
  Share2, 
  Folder 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { storageService } from "@/lib/api/services";

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  date: string;
  category: "all" | "payment_proof" | "call_recording" | "customer_doc" | "employee_doc" | "invoice" | "support" | "project" | "grn";
}

const DEMO_FILES: FileItem[] = []; // Empty now, refactored to use storageService

export function UniversalFileManager() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Recent Attachments</h3>
        <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">Upload New</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEMO_FILES.map(file => (
          <Card key={file.id} className="p-4 flex items-center justify-between border-none shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                <FileText className="size-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                <p className="text-[10px] text-slate-500 font-medium">{file.type} • {file.size}</p>
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="size-7"><Download className="size-3.5" /></Button>
              <Button variant="ghost" size="icon" className="size-7"><MoreVertical className="size-3.5" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
