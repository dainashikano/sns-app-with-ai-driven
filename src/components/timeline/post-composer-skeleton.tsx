import { Skeleton } from "@/components/ui/skeleton";

export function PostComposerSkeleton() {
  return (
    <div className="p-4 border-b border-border">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Skeleton className="h-9 w-20 rounded-full" />
      </div>
    </div>
  );
} 