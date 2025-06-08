import { NextRequest, NextResponse } from 'next/server'
import { syncClerkUserToSupabase } from '@/lib/auth/supabase-sync'

// テスト用のダミーユーザーデータ
const testClerkUser = {
  id: 'test_user_12345',
  email_addresses: [{ email_address: 'test@example.com' }],
  username: 'testuser',
  first_name: 'Test',
  last_name: 'User',
  image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
}

export async function POST(req: NextRequest) {
  try {
    console.log('テストWebhookを実行中...')
    
    // Supabaseにテストユーザーを同期
    const result = await syncClerkUserToSupabase(testClerkUser)
    
    console.log('テストWebhook成功:', result)
    
    return NextResponse.json({
      success: true,
      message: 'テストWebhook成功',
      user: result
    }, { status: 200 })
    
  } catch (error) {
    console.error('テストWebhookエラー:', error)
    
    return NextResponse.json({
      success: false,
      message: 'テストWebhook失敗',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Webhook テストエンドポイント',
    instructions: 'POST リクエストを送信してテストしてください',
    testUrl: '/api/test-webhook'
  })
} 