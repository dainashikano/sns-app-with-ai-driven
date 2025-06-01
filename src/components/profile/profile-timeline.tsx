'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PostCard } from '../PostCard';
import { dummyProfilePosts } from '../../data/dummyProfilePosts';
import { useState } from 'react';
import Link from 'next/link';
import { Post } from '../../types/post';

export function ProfileTimeline() {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<Post[]>(dummyProfilePosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const user = {
    name: 'Shin@プログラミングチュートリアル',
    username: 'Shin_Engineer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shin',
    bannerUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2048&auto=format&fit=crop',
    bio: '5.1万人プログラミング解説系Youtuber | 3万人受講生のUdemy講師 | Next.js書籍を講談社にて執筆中 | NotePressの開発者 | お仕事はDMにて | Udemy割引クーポン配布中です→',
    website: 'shincode.info/2021/12/31/ude...',
    joinedDate: '2020年11月',
    following: 26,
    followers: '7,540',
    verified: true,
    postsCount: dummyProfilePosts.length
  };

  return (
    <main className="min-h-screen">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
          <div className="px-4 py-3 flex items-center gap-8">
            <Link href="/" className="hover:bg-gray-100 p-2 rounded-full">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.postsCount} 件のポスト</p>
            </div>
          </div>
        </header>

        <div className="relative">
          <div className="h-48 bg-blue-900">
            {user.bannerUrl && (
              <img
                src={user.bannerUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="px-4">
            <div className="relative">
              <div className="absolute -top-12">
                <Avatar className="w-24 h-24 border-4 border-white">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-end py-3">
                <Button variant="outline" className="rounded-full">
                  プロフィールを編集
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                {user.verified && (
                  <svg viewBox="0 0 24 24" aria-label="認証済みアカウント" className="w-5 h-5 text-blue-500 fill-current">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                  </svg>
                )}
              </div>
              <p className="text-gray-500">@{user.username}</p>
              <p className="mt-3 whitespace-pre-wrap">{user.bio}</p>
              <div className="flex gap-4 mt-3 text-gray-500">
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  🔗 {user.website}
                </a>
                <p>
                  <span>📅</span> {user.joinedDate}から利用しています
                </p>
              </div>
              <div className="flex gap-4 mt-3">
                <Link href="/following" className="hover:underline">
                  <span className="font-bold">{user.following}</span>
                  <span className="text-gray-500"> フォロー中</span>
                </Link>
                <Link href="/followers" className="hover:underline">
                  <span className="font-bold">{user.followers}</span>
                  <span className="text-gray-500"> フォロワー</span>
                </Link>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
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

            <div>
              <TabsContent value="posts" className="border-none p-0">
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                  />
                ))}
              </TabsContent>
              <TabsContent value="replies" className="border-none p-0">
                <div className="p-4 text-center text-gray-500">返信はまだありません</div>
              </TabsContent>
              <TabsContent value="media" className="border-none p-0">
                <div className="p-4 text-center text-gray-500">メディアはまだありません</div>
              </TabsContent>
              <TabsContent value="likes" className="border-none p-0">
                <div className="p-4 text-center text-gray-500">いいねした投稿はまだありません</div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  );
} 