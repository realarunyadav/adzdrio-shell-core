import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { 
  FileText, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Download, 
  Eye, 
  Archive, 
  History, 
  Shield, 
  Clock, 
  User,
  Building2,
  Folder,
  ChevronRight,
  File as FileIcon,
  LayoutGrid,
  List,
  AlertCircle,
  Activity,
  Calendar,
  Briefcase
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  DocCategory, 
  demoDocuments, 
  Document 
} from "@/lib/mock/workspace.demo";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import { UploadDocumentModal } from "@/components/admin-studio/modals/UploadDocumentModal";
import { DocumentDetailsDrawer } from "@/components/admin-studio/drawers/DocumentDetailsDrawer";

export const Route = createFileRoute('/modules/admin/data')({
  component: DocumentManagementWorkspace,
});

function DocumentManagementWorkspace() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<DocCategory | 'All'>('All');
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState<Document | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  
  const [documents, setDocuments] = React.useState(demoDocuments);

  const categories: { label: DocCategory; icon: any; count: number }[] = [
    { label: 'Company', icon: Building2, count: documents.filter(d => d.category === 'Company').length },
    { label: 'Legal', icon: Shield, count: documents.filter(d => d.category === 'Legal').length },
    { label: 'Finance', icon: Activity, count: documents.filter(d => d.category === 'Finance').length },
    { label: 'Employee', icon: User, count: documents.filter(d => d.category === 'Employee').length },
    { label: 'Customer', icon: Briefcase, count: documents.filter(d => d.category === 'Customer').length },
  ];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getExpiryState = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const daysLeft = differenceInDays(new Date(expiryDate), new Date());
    if (daysLeft < 0) return { label: 'Expired', tone: 'danger' as const };
    if (daysLeft < 30) return { label: 'Expiring Soon', tone: 'warning' as const };
    return null;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background/50">
      {/* Header */}
      <div className="p-6 border-b border-border/40 bg-card/50 backdrop-blur-md shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
              <Folder className="size-5 text-primary" />
              Document Management
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Enterprise document vault, compliance tracking, and access control.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-accent/20 border border-border/40 rounded-xl p-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("size-8 rounded-lg", viewMode === 'list' && "bg-background shadow-sm")}
                onClick={() => setViewMode('list')}
              >
                <List className="size-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("size-8 rounded-lg", viewMode === 'grid' && "bg-background shadow-sm")}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="size-4" />
              </Button>
            </div>
            <Button 
              className="bg-primary shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-[10px] h-10 px-6 rounded-xl"
              onClick={() => setUploadModalOpen(true)}
            >
              <Plus className="size-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Sidebar Nav */}
        <div className="w-64 border-r border-border/40 bg-accent/5 p-4 space-y-6 hidden lg:block overflow-y-auto scrollbar-thin">
          <div className="space-y-2">
            <p className="px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Vault Categories</p>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory('All')}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  activeCategory === 'All' ? "bg-primary/10 text-primary shadow-sm" : "hover:bg-accent/50 text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <LayoutGrid className="size-4" />
                  All Documents
                </div>
                <span className="text-[10px] opacity-70">{documents.length}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    activeCategory === cat.label ? "bg-primary/10 text-primary shadow-sm" : "hover:bg-accent/50 text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <cat.icon className="size-4" />
                    {cat.label}
                  </div>
                  <span className="text-[10px] opacity-70">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Analytics Overview</p>
            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 rounded-xl bg-background border border-border/40 space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Expiring Soon</p>
                <p className="text-lg font-black">{documents.filter(d => getExpiryState(d.expiryDate)?.label === 'Expiring Soon').length}</p>
              </div>
              <div className="p-3 rounded-xl bg-background border border-border/40 space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Confidential</p>
                <p className="text-lg font-black text-rose-500">{documents.filter(d => d.accessLevel === 'Confidential').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Filters Bar */}
          <div className="p-4 border-b border-border/40 bg-card/30 flex flex-wrap items-center gap-3 shrink-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ID, or business..." 
                className="pl-10 h-10 rounded-xl bg-accent/20 border-border/40 text-xs font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-10 rounded-xl border-border/40 font-black uppercase tracking-widest text-[10px]">
              <Filter className="size-4 mr-2" />
              Filters
            </Button>
            <div className="flex items-center gap-1.5 ml-auto text-[10px] text-muted-foreground font-black uppercase tracking-widest">
              <span>Showing {filteredDocs.length} of {documents.length}</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto scrollbar-thin p-4">
            {filteredDocs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="size-20 rounded-full bg-accent/20 flex items-center justify-center">
                  <FileText className="size-10 text-muted-foreground/30" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-widest">No documents found</p>
                  <p className="text-xs text-muted-foreground max-w-xs">Adjust your search or filters, or upload a new document to this category.</p>
                </div>
                <Button variant="outline" onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>Reset Filters</Button>
              </div>
            ) : viewMode === 'list' ? (
              <div className="rounded-2xl border border-border/40 bg-card/50 overflow-hidden glass-surface">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-accent/10 border-b border-border/40 hover:bg-accent/10">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Document Name</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Category</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Business</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Access</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Updated</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocs.map((doc) => {
                      const expiry = getExpiryState(doc.expiryDate);
                      return (
                        <TableRow key={doc.id} className="group hover:bg-accent/20 transition-all border-b border-border/20">
                          <TableCell className="py-4">
                            <div 
                              className="flex items-center gap-3 cursor-pointer"
                              onClick={() => {setSelectedDoc(doc); setDrawerOpen(true);}}
                            >
                              <div className="size-9 rounded-xl bg-background border border-border/40 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-all shadow-sm">
                                <FileIcon className="size-4 text-primary/70" />
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <p className="text-xs font-black truncate group-hover:text-primary transition-colors">{doc.name}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{doc.id}</span>
                                  <span className="text-muted-foreground opacity-30">•</span>
                                  <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{doc.type} v{doc.version}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-[8px] font-black uppercase tracking-tighter h-4 bg-accent/20">
                              {doc.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p className="text-[10px] font-bold">{doc.businessName}</p>
                          </TableCell>
                          <TableCell>
                            <StatusBadge tone={doc.accessLevel === 'Confidential' ? 'danger' : doc.accessLevel === 'Public' ? 'neutral' : 'info'}>
                              {doc.accessLevel}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <StatusBadge tone={doc.status === 'Active' ? 'success' : doc.status === 'Expired' ? 'danger' : 'neutral'}>
                                {doc.status}
                              </StatusBadge>
                              {expiry && (
                                <p className={cn("text-[9px] font-bold uppercase tracking-widest", expiry.tone === 'danger' ? 'text-danger' : 'text-warning')}>
                                  {expiry.label}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-[10px] font-bold">{format(new Date(doc.updated), 'PP')}</p>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-8 rounded-lg">
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 bg-card border-border/40 rounded-xl glass-surface p-1">
                                <DropdownMenuItem className="text-[10px] font-black uppercase tracking-widest p-2 rounded-lg cursor-pointer" onClick={() => {setSelectedDoc(doc); setDrawerOpen(true);}}>
                                  <Eye className="size-3.5 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-[10px] font-black uppercase tracking-widest p-2 rounded-lg cursor-pointer">
                                  <Download className="size-3.5 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-[10px] font-black uppercase tracking-widest p-2 rounded-lg cursor-pointer">
                                  <History className="size-3.5 mr-2" />
                                  View History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border/40" />
                                <DropdownMenuItem className="text-[10px] font-black uppercase tracking-widest p-2 rounded-lg cursor-pointer text-danger hover:text-danger hover:bg-danger/10">
                                  <Archive className="size-3.5 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredDocs.map((doc) => (
                  <div 
                    key={doc.id}
                    className="group relative p-4 rounded-2xl border border-border/40 bg-card/50 hover:bg-accent/10 transition-all cursor-pointer overflow-hidden glass-surface"
                    onClick={() => {setSelectedDoc(doc); setDrawerOpen(true);}}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="size-12 rounded-2xl bg-background border border-border/40 flex items-center justify-center group-hover:border-primary/40 transition-all shadow-sm">
                        <FileIcon className="size-6 text-primary/70" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="size-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-card border-border/40 rounded-xl glass-surface p-1">
                          <DropdownMenuItem className="text-[10px] font-black uppercase tracking-widest p-2 rounded-lg">
                            <Eye className="size-3.5 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-[10px] font-black uppercase tracking-widest p-2 rounded-lg">
                            <Download className="size-3.5 mr-2" /> Download
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <p className="text-xs font-black truncate group-hover:text-primary transition-colors">{doc.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[8px] font-black uppercase tracking-tighter h-4">
                          {doc.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{doc.type}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/20 grid grid-cols-2 gap-2">
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Business</p>
                        <p className="text-[10px] font-bold truncate">{doc.businessName}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Status</p>
                        <StatusBadge tone={doc.status === 'Active' ? 'success' : 'neutral'} className="h-4 px-1 text-[8px]">
                          {doc.status}
                        </StatusBadge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <UploadDocumentModal 
        open={uploadModalOpen} 
        onOpenChange={setUploadModalOpen} 
        onSuccess={(newDoc) => {
          setDocuments([newDoc, ...documents]);
          setSelectedDoc(newDoc);
          setDrawerOpen(true);
        }}
      />
      
      <DocumentDetailsDrawer 
        document={selectedDoc}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
