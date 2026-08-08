import * as React from "react";
import { 
  Send, 
  Paperclip, 
  FileText, 
  Clock, 
  Trash2, 
  Save, 
  X,
  Maximize2,
  Minimize2,
  MoreVertical,
  Type
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface EmailComposerProps {
  onClose: () => void;
  initialData?: any;
}

export function EmailComposer({ onClose, initialData }: EmailComposerProps) {
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [showBcc, setShowBcc] = React.useState(false);
  const [showCc, setShowCc] = React.useState(false);

  return (
    <div className={`flex flex-col bg-card border border-border shadow-2xl rounded-t-xl overflow-hidden transition-all duration-300 ${isMaximized ? 'fixed inset-4 z-50' : 'fixed bottom-0 right-4 w-[600px] h-[600px] z-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-navy text-navy-foreground">
        <span className="text-sm font-semibold">New Message</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="size-8 text-navy-foreground/70 hover:text-navy-foreground" onClick={() => setIsMaximized(!isMaximized)}>
            {isMaximized ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="size-8 text-navy-foreground/70 hover:text-navy-foreground" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Recipients */}
      <div className="p-4 space-y-2 border-b">
        <div className="flex items-center gap-2">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground w-12">To</Label>
          <Input className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-8 text-sm" placeholder="Recipients" />
          <div className="flex gap-2 text-[10px] font-bold text-muted-foreground">
            <button onClick={() => setShowCc(!showCc)} className="hover:text-foreground">CC</button>
            <button onClick={() => setShowBcc(!showBcc)} className="hover:text-foreground">BCC</button>
          </div>
        </div>
        
        {showCc && (
          <div className="flex items-center gap-2 animate-in slide-in-from-top-1">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground w-12">Cc</Label>
            <Input className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-8 text-sm" placeholder="Cc" />
          </div>
        )}
        
        {showBcc && (
          <div className="flex items-center gap-2 animate-in slide-in-from-top-1">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground w-12">Bcc</Label>
            <Input className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-8 text-sm" placeholder="Bcc" />
          </div>
        )}

        <div className="flex items-center gap-2 border-t pt-2 mt-2">
          <Label className="text-[10px] font-bold uppercase text-muted-foreground w-12">Subject</Label>
          <Input className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-8 text-sm font-medium" placeholder="Subject line" />
        </div>
      </div>

      {/* Editor Toolbar (Simulated) */}
      <div className="flex items-center gap-1 px-3 py-1 bg-muted/30 border-b">
        <Button variant="ghost" size="icon" className="size-7"><Type className="size-3.5" /></Button>
        <div className="w-px h-4 bg-border mx-1" />
        <Button variant="ghost" size="icon" className="size-7"><Paperclip className="size-3.5" /></Button>
        <Button variant="ghost" size="icon" className="size-7"><FileText className="size-3.5" /></Button>
        <div className="w-px h-4 bg-border mx-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-7 px-2 text-[10px] font-bold uppercase">Templates</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>Welcome Email</DropdownMenuItem>
            <DropdownMenuItem>Follow-up Proposal</DropdownMenuItem>
            <DropdownMenuItem>Invoice Overdue</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4">
        <Textarea 
          className="min-h-full border-none bg-transparent shadow-none focus-visible:ring-0 p-0 resize-none text-sm leading-relaxed" 
          placeholder="Write your message here..."
        />
      </div>

      {/* Footer / Actions */}
      <div className="p-3 border-t bg-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full pl-4 pr-3 py-2 h-9">
            <span className="mr-2 text-xs font-bold uppercase tracking-wide">Send</span>
            <Send className="size-3.5" />
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9 rounded-full">
                  <Clock className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Schedule send</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" size="icon" className="size-9 rounded-full">
            <Save className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 rounded-full">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Discard changes</DropdownMenuItem>
              <DropdownMenuItem>Check spelling</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="size-8 rounded-full text-danger hover:bg-danger/10" onClick={onClose}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
