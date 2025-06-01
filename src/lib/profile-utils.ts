import { prisma } from './prisma'
import type { User } from '../types/database'

// プロフィール画像の更新
export async function updateProfileImage(userId: string, imageUrl: string) {
  return await prisma.user.update({
    where: { id: userId },
    data: { profileImage: imageUrl },
  })
}

// カバー画像の更新
export async function updateCoverImage(userId: string, imageUrl: string) {
  return await prisma.user.update({
    where: { id: userId },
    data: { coverImage: imageUrl },
  })
}

// プロフィール情報の一括更新
export async function updateUserProfile(
  userId: string, 
  data: {
    name?: string
    bio?: string
    location?: string
    website?: string
    profileImage?: string
    coverImage?: string
  }
) {
  return await prisma.user.update({
    where: { id: userId },
    data,
  })
}

// デフォルト画像のURL生成
export function getDefaultProfileImage(username: string): string {
  // Gravatar風のデフォルト画像を生成
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&size=150&background=random`
}

export function getDefaultCoverImage(): string {
  // デフォルトのカバー画像（グラデーション）
  return 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop'
}

// 画像URLの検証
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

// プロフィール画像のサイズ最適化URL生成
export function getOptimizedImageUrl(
  originalUrl: string, 
  width: number, 
  height: number
): string {
  if (!originalUrl) return ''
  
  // Unsplashの場合は最適化パラメータを追加
  if (originalUrl.includes('unsplash.com')) {
    return `${originalUrl}?w=${width}&h=${height}&fit=crop&crop=face`
  }
  
  // その他の場合はそのまま返す
  return originalUrl
}

// プロフィール表示用のユーザー情報取得
export async function getUserProfileData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  })

  if (!user) return null

  return {
    ...user,
    profileImage: user.profileImage || getDefaultProfileImage(user.username),
    coverImage: user.coverImage || getDefaultCoverImage(),
  }
} 