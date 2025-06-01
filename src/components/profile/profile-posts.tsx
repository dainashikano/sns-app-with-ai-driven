import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PostCard } from '../PostCard';
import { Post } from '@/types/post';

interface ProfilePostsProps {
  posts: Post[];
}

export function ProfilePosts({ posts }: ProfilePostsProps) {
  return (
    <div className="border-t border-gray-200">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-start border-b border-gray-100 bg-transparent p-0 sticky top-[73px] bg-white z-10">
          <TabsTrigger
            value="posts"
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            ポスト
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            返信
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            メディア
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            いいね
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="border-none p-0">
          <div className="divide-y divide-border">
            {posts.length > 0 ? (
              posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p className="text-xl font-bold mb-2">まだポストがありません</p>
                <p>初めてのポストをしてみましょう！</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="replies" className="border-none p-0">
          <div className="p-8 text-center text-gray-500">
            <p className="text-xl font-bold mb-2">返信はまだありません</p>
            <p>他のユーザーのポストに返信してみましょう！</p>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="border-none p-0">
          <div className="p-8 text-center text-gray-500">
            <p className="text-xl font-bold mb-2">メディアはまだありません</p>
            <p>写真や動画を投稿してみましょう！</p>
          </div>
        </TabsContent>
        
        <TabsContent value="likes" className="border-none p-0">
          <div className="p-8 text-center text-gray-500">
            <p className="text-xl font-bold mb-2">いいねした投稿はまだありません</p>
            <p>気に入った投稿にいいねしてみましょう！</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 