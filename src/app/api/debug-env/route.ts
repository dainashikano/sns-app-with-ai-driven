import { NextResponse } from 'next/server'

export async function GET() {
  // 環境変数の存在をチェック（値は表示しない）
  const envCheck = {
    CLERK_WEBHOOK_SECRET: !!process.env.CLERK_WEBHOOK_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: !!process.env.DATABASE_URL,
    DIRECT_URL: !!process.env.DIRECT_URL,
    NODE_ENV: process.env.NODE_ENV,
  }

  // Supabase URLの一部を表示（デバッグ用）
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const maskedSupabaseUrl = supabaseUrl 
    ? `${supabaseUrl.substring(0, 20)}...${supabaseUrl.substring(supabaseUrl.length - 10)}`
    : null

  return NextResponse.json({
    environmentVariables: envCheck,
    supabaseUrlPreview: maskedSupabaseUrl,
    timestamp: new Date().toISOString(),
    message: '環境変数の設定状況（セキュリティのため値は非表示）'
  })
} 