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
  // TODO: 実際の認証システムを実装したら、セッションからユーザーIDを取得
  const user = await prisma.user.findFirst();
  
  if (!user) {
    throw new Error('ユーザーが見つかりません');
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
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
        userId: user.id,
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