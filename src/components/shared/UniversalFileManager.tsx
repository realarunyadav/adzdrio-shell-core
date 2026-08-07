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

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  date: string;
  category: "all" | "invoices" | "contracts" | "designs";
}

const DEMO_FILES: FileItem[] = [
  { id: "1", name: "ABOS-Financial-Strategy-2026.pdf", size: "2.4 MB", type: "PDF", date: "Aug 07, 2026", category: "invoices" },
  { id: "2", name: "Enterprise-Service-Agreement.docx", size: "1.1 MB", type: "DOCX", date: "Aug 06, 2026", category: "contracts" },
  { id: "3", name: "Adzdrio-Identity-Assets.zip", size: "45.8 MB", type: "ZIP", date: "Aug 05, 2026", category: "designs" },
];

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
