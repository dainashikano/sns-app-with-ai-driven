import { NextResponse } from 'next/server';
import { getCurrentUser, getUserById } from '@/lib/dal';

export async function GET() {
  try {
    console.log('=== API開始 ===');
    const currentUserId = await getCurrentUser();
    console.log('getCurrentUser結果:', currentUserId);
    
    if (!currentUserId) {
      console.log('現在のユーザーが見つかりません');
      return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });
    }

    console.log('現在のユーザーID:', currentUserId);

    // UserProfileインターフェースに従った形式でユーザー情報を返す
    const userProfile = await getUserById(currentUserId);
    
    if (!userProfile) {
      console.log('ユーザープロフィールが見つかりません');
      return NextResponse.json({ error: 'ユーザープロフィールが見つかりません' }, { status: 404 });
    }

    console.log('ユーザープロフィール取得成功:', userProfile.username);
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('=== エラー詳細 ===');
    console.error('エラーオブジェクト:', error);
    console.error('エラー名:', error instanceof Error ? error.name : 'Unknown');
    console.error('エラーメッセージ:', error instanceof Error ? error.message : 'Unknown message');
    console.error('エラースタック:', error instanceof Error ? error.stack : 'No stack trace');
    
    // データベース接続エラーの場合は特別な処理
    if (error instanceof Error && error.message.includes('prepared statement')) {
      console.error('PostgreSQL接続エラーが発生しました。データベースを確認してください。');
      console.error('prepared statementエラーの詳細:', {
        message: error.message,
        name: error.name,
        cause: error.cause
      });
      return NextResponse.json(
        { 
          error: 'データベース接続エラー', 
          details: 'データベースとの接続に問題があります。しばらく時間をおいて再試行してください。',
          debugInfo: process.env.NODE_ENV === 'development' ? {
            errorMessage: error.message,
            errorName: error.name
          } : undefined
        }, 
        { status: 503 }
      );
    }
    
    return NextResponse.json({ 
      error: 'サーバーエラー',
      debugInfo: process.env.NODE_ENV === 'development' ? {
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown'
      } : undefined
    }, { status: 500 });
  }
} 