'use server';

import { prisma } from '../prisma';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '../dal';

export async function toggleFollow(targetUserId: string) {
  // DALの認証機能を使用
  const currentUserId = await requireAuth();

  if (currentUserId === targetUserId) {
    throw new Error('自分自身をフォローすることはできません');
  }

  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    },
  });

  if (existingFollow) {
    // フォローを解除
    await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });
  } else {
    // フォローを追加
    await prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });
  }

  revalidatePath('/');
}

export async function followUser(targetUserId: string) {
  const currentUser = await prisma.user.findFirst();
  
  if (!currentUser) {
    throw new Error('ユーザーが見つかりません');
  }

  if (currentUser.id === targetUserId) {
    throw new Error('自分自身をフォローすることはできません');
  }

  await prisma.follow.create({
    data: {
      followerId: currentUser.id,
      followingId: targetUserId,
    },
  });

  revalidatePath('/');
}

export async function unfollowUser(targetUserId: string) {
  const currentUser = await prisma.user.findFirst();
  
  if (!currentUser) {
    throw new Error('ユーザーが見つかりません');
  }

  await prisma.follow.deleteMany({
    where: {
      followerId: currentUser.id,
      followingId: targetUserId,
    },
  });

  revalidatePath('/');
} 