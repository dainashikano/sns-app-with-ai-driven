import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Supabase接続テスト開始...')
    
    // 環境変数の確認
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('Supabase URL:', supabaseUrl ? 'あり' : 'なし')
    console.log('Service Role Key:', serviceRoleKey ? 'あり' : 'なし')
    
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        success: false,
        error: '環境変数が未設定',
        details: {
          supabaseUrl: !!supabaseUrl,
          serviceRoleKey: !!serviceRoleKey
        }
      }, { status: 500 })
    }
    
    // 簡単なクエリでテスト
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabaseクエリエラー:', error)
      return NextResponse.json({
        success: false,
        error: 'Supabaseクエリ失敗',
        details: error
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase接続成功',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Supabase接続テストエラー:', error)
    return NextResponse.json({
      success: false,
      error: 'Supabase接続失敗',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 