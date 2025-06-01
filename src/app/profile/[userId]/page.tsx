import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getUserById } from '@/lib/users';
import { getPostsByUserId } from '@/lib/posts';
import { Shell } from '@/components/layout/shell';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfilePosts } from '@/components/profile/profile-posts';
import { PostCardSkeleton } from '@/components/timeline/post-card-skeleton';
import { ErrorPage } from '@/components/profile/ErrorPage';

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  try {
    const user = await getUserById(params.userId);
    
    if (!user) {
      return {
        title: 'ユーザーが見つかりません | SNS',
        description: '指定されたユーザーは存在しません。',
      };
    }

    return {
      title: `${user.name || user.username} (@${user.username}) | SNS`,
      description: user.bio || `${user.name || user.username}のプロフィール`,
    };
  } catch (error) {
    console.error('メタデータ生成エラー:', error);
    return {
      title: 'プロフィール | SNS',
      description: 'ユーザープロフィール',
    };
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  try {
    const user = await getUserById(params.userId);
    
    if (!user) {
      console.log('ユーザーが見つかりません:', params.userId);
      notFound();
    }

    const posts = await getPostsByUserId(params.userId);

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
  } catch (error) {
    console.error('プロフィールページ読み込みエラー:', error);
    
    // データベース接続エラーの場合の処理
    if (error instanceof Error && error.message.includes('prepared statement')) {
      return (
        <Shell>
          <ErrorPage
            title="データベース接続エラー"
            message="データベースとの接続に問題があります。しばらく時間をおいて再試行してください。"
          />
        </Shell>
      );
    }
    
    // 一般的なエラーの場合
    return (
      <Shell>
        <ErrorPage
          title="エラーが発生しました"
          message="プロフィールの読み込み中にエラーが発生しました。"
        />
      </Shell>
    );
  }
} 