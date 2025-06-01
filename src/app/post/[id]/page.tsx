import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Shell } from '@/components/layout/shell';
import { PostDetail } from '@/components/post/post-detail';
import { PostDetailSkeleton } from '@/components/post/post-detail-skeleton';
import { getPostWithComments } from '@/lib/posts';
import { ErrorBoundary } from '@/components/error-boundary';

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const postWithComments = await getPostWithComments(params.id);
    
    if (!postWithComments) {
      notFound();
    }

    return (
      <Shell>
        <ErrorBoundary>
          <Suspense fallback={<PostDetailSkeleton />}>
            <PostDetail postWithComments={postWithComments} />
          </Suspense>
        </ErrorBoundary>
      </Shell>
    );
  } catch (error) {
    console.error('ポストの取得に失敗しました:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const post = await getPostWithComments(params.id);
    
    if (!post) {
      return {
        title: 'ポストが見つかりません',
      };
    }

    return {
      title: `${post.user.name}さんのポスト`,
      description: post.content.slice(0, 160),
    };
  } catch {
    return {
      title: 'ポストが見つかりません',
    };
  }
} 