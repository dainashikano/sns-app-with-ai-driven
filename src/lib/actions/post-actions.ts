'use server';

import { prisma } from '../prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '../dal';

export async function createPost(content: string) {
  // DALの認証機能を使用
  const userId = await requireAuth();

  const post = await prisma.post.create({
    data: {
      content,
      userId,
      likesCount: 0,
      commentsCount: 0,
    },
  });

  revalidatePath('/');
  return post;
}

export async function togglePostLike(postId: string) {
  // Clerk認証でユーザーIDを取得
  const userId = await requireAuth();

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingLike) {
    // いいねを取り消し
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    
    await prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    });
  } else {
    // いいねを追加
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
    
    await prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });
  }

  revalidatePath('/');
} 