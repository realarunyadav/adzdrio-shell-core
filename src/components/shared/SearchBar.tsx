import { Search, X } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
}

export function SearchBar({ className, onSearch, onClear, onChange, value, ...props }: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(String(value || ""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  const handleClear = () => {
    setInternalValue("");
    onClear?.();
    onSearch?.("");
  };

  return (
    <div className={cn("relative group w-full", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <Input
        type="search"
        value={internalValue}
        className="pl-10 pr-10 h-10 bg-background/50 border-border/50 backdrop-blur-sm shadow-sm ring-offset-background transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 premium-focus"
        onChange={handleChange}
        {...props}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {internalValue && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-6 hover:bg-muted"
            onClick={handleClear}
          >
            <X className="size-3 text-muted-foreground" />
          </Button>
        )}
        <div className="pointer-events-none hidden sm:flex items-center gap-1 opacity-60 group-focus-within:opacity-0 transition-opacity">
          <kbd className="text-[10px] font-bold">⌘</kbd>
          <kbd className="text-[10px] font-bold">K</kbd>
        </div>
      </div>
    </div>
  );
}
