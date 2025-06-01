import { notFound } from 'next/navigation';
import { Shell } from '@/components/layout/shell';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfilePosts } from '@/components/profile/profile-posts';
import { getUserByUsername } from '@/lib/users';
import { getPostsByUserId } from '@/lib/posts';
import { Suspense } from 'react';
import { PostCardSkeleton } from '@/components/timeline/post-card-skeleton';

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  
  const user = await getUserByUsername(username);
  
  if (!user) {
    notFound();
  }
  
  const posts = await getPostsByUserId(user.id);

  return (
    <Shell>
      <main className="min-h-screen">
        <ProfileHeader user={user} />
        <Suspense fallback={
          <div className="divide-y divide-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        }>
          <ProfilePosts posts={posts} />
        </Suspense>
      </main>
    </Shell>
  );
}

// メタデータの生成
export async function generateMetadata({ params }: ProfilePageProps) {
  const user = await getUserByUsername(params.username);
  
  if (!user) {
    return {
      title: 'ユーザーが見つかりません',
    };
  }
  
  return {
    title: `${user.name || user.username} (@${user.username})`,
    description: user.bio || `${user.name || user.username}のプロフィール`,
  };
}