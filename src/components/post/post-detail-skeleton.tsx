import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function PostDetailSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
        <div className="px-4 py-3 flex items-center gap-8">
          <div className="hover:bg-gray-100 p-2 rounded-full">
            <ArrowLeftIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">ポスト</h1>
          </div>
        </div>
      </div>

      {/* メインポスト */}
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
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* リプライ投稿フォーム */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-20 w-full" />
            <div className="flex justify-end">
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* リプライリスト */}
      <div className="divide-y divide-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex items-center gap-6 mt-3">
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-5 w-8" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 