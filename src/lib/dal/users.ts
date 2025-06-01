import { prisma } from '../prisma';
import { unstable_cache } from 'next/cache';
import { getCurrentUser } from './auth';
import { mapUserToProfile, mapUsersToProfiles } from './mappers';
import type { UserProfile } from '../users';

// ユーザーの標準includeオプション
const USER_INCLUDE = {
  followers: true,
  following: true,
  posts: true,
} as const;

// IDによるユーザー取得の内部関数
async function getUserByIdInternal(userId: string): Promise<UserProfile | null> {
  const currentUserId = await getCurrentUser();
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: USER_INCLUDE,
  });

  if (!user) return null;

  return mapUserToProfile(user, currentUserId);
}

// キャッシュされたユーザー取得（ID）
export const getUserById = unstable_cache(
  getUserByIdInternal,
  ['user-by-id'],
  { 
    revalidate: 300, // 5分間キャッシュ
    tags: ['users', 'user']
  }
);

// ユーザー名によるユーザー取得の内部関数
async function getUserByUsernameInternal(username: string): Promise<UserProfile | null> {
  const currentUserId = await getCurrentUser();
  
  const user = await prisma.user.findUnique({
    where: { username },
    include: USER_INCLUDE,
  });

  if (!user) return null;

  return mapUserToProfile(user, currentUserId);
}

// キャッシュされたユーザー取得（ユーザー名）
export const getUserByUsername = unstable_cache(
  getUserByUsernameInternal,
  ['user-by-username'],
  { 
    revalidate: 300, // 5分間キャッシュ
    tags: ['users', 'user']
  }
);

// 全ユーザー取得の内部関数
async function getAllUsersInternal(): Promise<UserProfile[]> {
  const currentUserId = await getCurrentUser();
  
  const users = await prisma.user.findMany({
    include: USER_INCLUDE,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return mapUsersToProfiles(users, currentUserId);
}

// キャッシュされた全ユーザー取得
export const getAllUsers = unstable_cache(
  getAllUsersInternal,
  ['all-users'],
  { 
    revalidate: 600, // 10分間キャッシュ
    tags: ['users']
  }
);

// フォロワー一覧取得の内部関数
async function getFollowersInternal(userId: string): Promise<UserProfile[]> {
  const currentUserId = await getCurrentUser();
  
  const followers = await prisma.user.findMany({
    where: {
      following: {
        some: {
          followingId: userId,
        },
      },
    },
    include: USER_INCLUDE,
  });

  return mapUsersToProfiles(followers, currentUserId);
}

// キャッシュされたフォロワー取得
export const getFollowers = unstable_cache(
  getFollowersInternal,
  ['followers'],
  { 
    revalidate: 300, // 5分間キャッシュ
    tags: ['users', 'followers']
  }
);

// フォロー中一覧取得の内部関数
async function getFollowingInternal(userId: string): Promise<UserProfile[]> {
  const currentUserId = await getCurrentUser();
  
  const following = await prisma.user.findMany({
    where: {
      followers: {
        some: {
          followerId: userId,
        },
      },
    },
    include: USER_INCLUDE,
  });

  return mapUsersToProfiles(following, currentUserId);
}

// キャッシュされたフォロー中取得
export const getFollowing = unstable_cache(
  getFollowingInternal,
  ['following'],
  { 
    revalidate: 300, // 5分間キャッシュ
    tags: ['users', 'following']
  }
);

// キャッシュの無効化ヘルパー関数
export function invalidateUsersCaches() {
  // TODO: Next.js revalidateTag API使用時に実装
  // revalidateTag('users');
}

export function invalidateUserCache(userId: string) {
  // TODO: Next.js revalidateTag API使用時に実装
  // revalidateTag(`user-${userId}`);
} 