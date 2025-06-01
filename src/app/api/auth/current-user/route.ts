import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth';

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json({ error: 'ユーザーが見つかりません' }, { status: 404 });
    }

    return NextResponse.json({ userId });
  } catch (error) {
    console.error('ユーザーID取得エラー:', error);
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
} 