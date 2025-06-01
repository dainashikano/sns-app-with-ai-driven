import { Suspense } from 'react';
import { PostCard } from '../PostCard';
import { PostComposerWrapper } from './post-composer-wrapper';
import { getPosts } from '@/lib/posts';
import { PostCardSkeleton } from './post-card-skeleton';

export async function Timeline() {
  const posts = await getPosts();

  return (
    <div>
      <div className="hidden md:block border-b border-gray-200">
        <Suspense>
          <PostComposerWrapper />
        </Suspense>
      </div>
      <div className="divide-y divide-border">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div>
      <div className="hidden md:block border-b border-gray-200">
        <div className="h-32 bg-gray-100 animate-pulse" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
