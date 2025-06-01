import { prisma } from '../prisma';
import { unstable_cache } from 'next/cache';
import { getCurrentUser } from './auth';
import { mapPostsToPosts } from './mappers';
import { sanitizeUser } from '../utils/post-utils';
import { CACHE_SETTINGS } from '../constants/post-constants';
import type { Post } from '../../types/post';
import type { PostWithComments } from '../../types/post-detail';

// 投稿の標準includeオプション
const POST_INCLUDE = {
  user: true,
  likes: true,
  comments: true,
  images: true,
} as const;

// コメント付き投稿のincludeオプション
const POST_WITH_COMMENTS_INCLUDE = {
  user: true,
  likes: true,
  images: true,
  comments: {
    include: {
      user: true,
      commentLikes: true,
    },
    orderBy: {
      createdAt: 'asc'
    }
  },
} as const;

// 全投稿を取得する内部関数
async function getPostsInternal(): Promise<Post[]> {
  const currentUserId = await getCurrentUser();
  
  const posts = await prisma.post.findMany({
    include: POST_INCLUDE,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return mapPostsToPosts(posts, currentUserId);
}

// キャッシュされた全投稿取得
export const getPosts = unstable_cache(
  getPostsInternal,
  ['posts'],
  { 
    revalidate: CACHE_SETTINGS.POST_REVALIDATE_TIME,
    tags: ['posts']
  }
);

// ユーザーIDによる投稿取得の内部関数
async function getPostsByUserIdInternal(userId: string): Promise<Post[]> {
  const currentUserId = await getCurrentUser();
  
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
    include: POST_INCLUDE,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return mapPostsToPosts(posts, currentUserId);
}

// キャッシュされたユーザー投稿取得
export const getPostsByUserId = unstable_cache(
  getPostsByUserIdInternal,
  ['posts-by-user'],
  { 
    revalidate: CACHE_SETTINGS.POST_REVALIDATE_TIME,
    tags: ['posts', 'user-posts']
  }
);

// 単一投稿を取得する内部関数
async function getPostByIdInternal(postId: string): Promise<Post | null> {
  const currentUserId = await getCurrentUser();
  
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: POST_INCLUDE,
  });

  if (!post) return null;

  return mapPostsToPosts([post], currentUserId)[0];
}

// キャッシュされた単一投稿取得
export const getPostById = unstable_cache(
  getPostByIdInternal,
  ['post-by-id'],
  { 
    revalidate: 300, // 5分間キャッシュ
    tags: ['posts', 'post']
  }
);

// コメント付き単一投稿を取得する内部関数
async function getPostWithCommentsInternal(postId: string): Promise<PostWithComments | null> {
  const currentUserId = await getCurrentUser();
  
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: POST_WITH_COMMENTS_INCLUDE,
  });

  if (!post) return null;

  return {
    ...post,
    createdAt: post.createdAt.toISOString(),
    user: sanitizeUser(post.user),
    isLiked: post.likes.some(like => like.userId === currentUserId),
    comments: post.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      user: sanitizeUser(comment.user),
      isLiked: comment.commentLikes.some(like => like.userId === currentUserId),
    })),
  };
}

// キャッシュされたコメント付き投稿取得
export const getPostWithComments = unstable_cache(
  getPostWithCommentsInternal,
  ['post-with-comments'],
  { 
    revalidate: CACHE_SETTINGS.POST_DETAIL_REVALIDATE_TIME,
    tags: ['posts', 'comments']
  }
);

// キャッシュの無効化ヘルパー関数
export function invalidatePostsCaches() {
  // TODO: Next.js revalidateTag API使用時に実装
  // revalidateTag('posts');
}

export function invalidateUserPostsCache(userId: string) {
  // TODO: Next.js revalidateTag API使用時に実装
  // revalidateTag(`user-posts-${userId}`);
} 