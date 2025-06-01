import { prisma } from '../prisma';
import { unstable_cache } from 'next/cache';

// 現在のユーザーIDを取得する関数（実際の認証システム実装時に変更）
async function getCurrentUserId(): Promise<string | null> {
  try {
    // 接続状態をチェックしてからクエリ実行
    await prisma.$connect();
    
    // TODO: 実際の認証システムを実装したら、セッションからユーザーIDを取得
    const user = await prisma.user.findFirst();
    return user?.id || null;
  } catch (error) {
    console.error('getCurrentUserId エラー:', error);
    
    // Prepared statement エラーの場合は特別な処理
    if (error instanceof Error && error.message.includes('prepared statement')) {
      console.warn('Prepared statement エラーを検出。接続をリセットします...');
      
      try {
        // 接続をリセット
        await prisma.$disconnect();
        await prisma.$connect();
        
        // リトライ
        const user = await prisma.user.findFirst();
        return user?.id || null;
      } catch (retryError) {
        console.error('リトライ後もエラーが発生:', retryError);
        throw retryError;
      }
    }
    
    throw error;
  }
}

// キャッシュされた現在ユーザー取得関数
export const getCurrentUser = unstable_cache(
  getCurrentUserId,
  ['current-user'],
  { 
    revalidate: 300, // 5分間キャッシュ
    tags: ['auth', 'current-user']
  }
);

// 認証チェック（ユーザーが存在するかチェック）
export async function requireAuth(): Promise<string> {
  const userId = await getCurrentUser();
  if (!userId) {
    throw new Error('認証が必要です');
  }
  return userId;
} 