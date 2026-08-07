import { cn } from "@/lib/utils";

export function SkeletonLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="surface-card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonLoader className="size-10 rounded-full" />
        <div className="space-y-2">
          <SkeletonLoader className="h-4 w-24" />
          <SkeletonLoader className="h-3 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-[90%]" />
        <SkeletonLoader className="h-4 w-[80%]" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      <SkeletonLoader className="h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonLoader key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
