import { auth } from '@clerk/nextjs/server'
import { prisma } from '../prisma'

/**
 * 現在ログインしているユーザーIDを取得（サーバーサイド）
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { userId } = await auth()
    return userId
  } catch (error) {
    console.error('getCurrentUserId エラー:', error)
    return null
  }
}

/**
 * 認証が必要な場合にユーザーIDを取得（認証されていない場合はエラー）
 */
export async function requireAuth(): Promise<string> {
  const userId = await getCurrentUserId()
  if (!userId) {
    throw new Error('認証が必要です')
  }
  return userId
}

/**
 * Clerkユーザーを基にデータベースにユーザーを作成・同期
 */
export async function syncUserWithDatabase(clerkUser: {
  id: string
  emailAddresses: Array<{ emailAddress: string }>
  username?: string | null
  firstName?: string | null
  lastName?: string | null
  imageUrl?: string
}) {
  try {
    const email = clerkUser.emailAddresses[0]?.emailAddress
    if (!email) {
      throw new Error('メールアドレスが見つかりません')
    }

    // ユーザーがデータベースに存在するかチェック
    let user = await prisma.user.findUnique({
      where: { id: clerkUser.id }
    })

    if (!user) {
      // ユーザーが存在しない場合は新規作成
      const username = clerkUser.username || `user_${clerkUser.id.slice(0, 8)}`
      const name = clerkUser.firstName && clerkUser.lastName 
        ? `${clerkUser.firstName} ${clerkUser.lastName}`
        : clerkUser.firstName || clerkUser.lastName || '名無しユーザー'

      user = await prisma.user.create({
        data: {
          id: clerkUser.id,
          email,
          username,
          name,
          profileImage: clerkUser.imageUrl || null,
        },
      })
    } else {
      // 既存ユーザーの情報を更新
      const name = clerkUser.firstName && clerkUser.lastName 
        ? `${clerkUser.firstName} ${clerkUser.lastName}`
        : clerkUser.firstName || clerkUser.lastName || user.name

      user = await prisma.user.update({
        where: { id: clerkUser.id },
        data: {
          email,
          name,
          profileImage: clerkUser.imageUrl || user.profileImage,
        },
      })
    }

    return user
  } catch (error) {
    console.error('ユーザー同期エラー:', error)
    throw error
  }
} 