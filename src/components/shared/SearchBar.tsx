import { Search } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export function SearchBar({ className, onSearch, onChange, ...props }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn("relative group w-full", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <Input
        type="search"
        className="pl-10 h-10 bg-background/50 border-border/50 backdrop-blur-sm shadow-sm ring-offset-background transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
        onChange={handleChange}
        {...props}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-1 opacity-40 group-focus-within:opacity-0 transition-opacity">
        <kbd className="h-5 min-w-[20px] items-center justify-center rounded border bg-muted px-1.5 font-sans text-[10px] font-medium text-muted-foreground flex">
          ⌘
        </kbd>
        <kbd className="h-5 min-w-[20px] items-center justify-center rounded border bg-muted px-1.5 font-sans text-[10px] font-medium text-muted-foreground flex">
          K
        </kbd>
      </div>
    </div>
  );
}
