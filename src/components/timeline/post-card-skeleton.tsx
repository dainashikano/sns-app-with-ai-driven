import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function PostCardSkeleton() {
  return (
    <Card className="border-b border-gray-100 rounded-none">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-6">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 