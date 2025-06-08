import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { syncUserWithDatabase } from '@/lib/auth/clerk-utils'
import { syncClerkUserToSupabase, deleteClerkUserFromSupabase } from '@/lib/auth/supabase-sync'

// WebhookのEventタイプを定義
type WebhookEvent = {
  type: string
  data: {
    id: string
    email_addresses: Array<{ email_address: string }>
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    image_url?: string
  }
}

export async function POST(req: NextRequest) {
  console.log('=== Clerk Webhook 開始 ===')
  
  // Webhookの署名を確認
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    const errorMessage = 'CLERK_WEBHOOK_SECRET が設定されていません'
    console.error(errorMessage)
    return new NextResponse(`Error: ${errorMessage}`, {
      status: 500,
    })
  }

  // ヘッダーを取得
  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  console.log('Webhook ヘッダー確認:', {
    svixId: svixId ? 'あり' : 'なし',
    svixTimestamp: svixTimestamp ? 'あり' : 'なし', 
    svixSignature: svixSignature ? 'あり' : 'なし'
  })

  // 必要なヘッダーが存在するかチェック
  if (!svixId || !svixTimestamp || !svixSignature) {
    const errorMessage = 'Missing svix headers'
    console.error(errorMessage, { svixId, svixTimestamp, svixSignature })
    return new NextResponse(`Error: ${errorMessage}`, {
      status: 400,
    })
  }

  // リクエストボディを取得
  const payload = await req.text()
  console.log('Webhook payload 受信:', payload.substring(0, 200) + '...')

  // Webhookを作成して検証
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
    console.log('Webhook 検証成功')
  } catch (err) {
    console.error('Webhook検証エラー:', err)
    return new NextResponse('Error: Webhook verification failed', {
      status: 400,
    })
  }

  // イベントタイプに応じて処理
  const { type, data } = evt
  console.log(`Webhook イベントタイプ: ${type}, ユーザーID: ${data.id}`)
  console.log('ユーザーデータ詳細:', {
    id: data.id,
    email: data.email_addresses[0]?.email_address,
    username: data.username,
    firstName: data.first_name,
    lastName: data.last_name,
    imageUrl: data.image_url
  })

  // 処理結果を記録
  const results = {
    prisma: { success: false, error: null as any },
    supabase: { success: false, error: null as any }
  }

  try {
    switch (type) {
      case 'user.created':
        console.log('🆕 新規ユーザー作成処理開始')
        
        // Prismaデータベースに同期（オプション）
        console.log('=== Prisma同期開始 ===')
        try {
          await syncUserWithDatabase({
            id: data.id,
            emailAddresses: data.email_addresses.map(email => ({ 
              emailAddress: email.email_address 
            })),
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
            imageUrl: data.image_url,
          })
          results.prisma.success = true
          console.log('✅ Prisma同期成功')
        } catch (prismaError) {
          results.prisma.error = prismaError
          console.error('❌ Prisma同期エラー:', prismaError)
          console.log('⚠️ Prismaエラーでも処理を続行します')
        }
        
        // Supabaseデータベースに同期（メイン処理）
        console.log('=== Supabase新規ユーザー作成開始 ===')
        try {
          const supabaseUser = await syncClerkUserToSupabase(data)
          results.supabase.success = true
          console.log('✅ Supabaseユーザー作成成功:', supabaseUser)
        } catch (supabaseError) {
          results.supabase.error = supabaseError
          console.error('❌ Supabaseユーザー作成エラー:', supabaseError)
          throw new Error(`Supabaseユーザー作成失敗: ${supabaseError instanceof Error ? supabaseError.message : 'Unknown error'}`)
        }
        break

      case 'user.updated':
        console.log('🔄 ユーザー情報更新処理開始')
        
        // Prismaデータベースに同期（オプション）
        console.log('=== Prisma更新同期開始 ===')
        try {
          await syncUserWithDatabase({
            id: data.id,
            emailAddresses: data.email_addresses.map(email => ({ 
              emailAddress: email.email_address 
            })),
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
            imageUrl: data.image_url,
          })
          results.prisma.success = true
          console.log('✅ Prisma更新同期成功')
        } catch (prismaError) {
          results.prisma.error = prismaError
          console.error('❌ Prisma更新同期エラー:', prismaError)
          console.log('⚠️ Prismaエラーでも処理を続行します')
        }
        
        // Supabaseデータベースに同期（メイン処理）
        console.log('=== Supabaseユーザー情報更新開始 ===')
        try {
          const supabaseUser = await syncClerkUserToSupabase(data)
          results.supabase.success = true
          console.log('✅ Supabaseユーザー更新成功:', supabaseUser)
        } catch (supabaseError) {
          results.supabase.error = supabaseError
          console.error('❌ Supabaseユーザー更新エラー:', supabaseError)
          throw new Error(`Supabaseユーザー更新失敗: ${supabaseError instanceof Error ? supabaseError.message : 'Unknown error'}`)
        }
        break

      case 'user.deleted':
        console.log('🗑️ ユーザー削除処理開始')
        
        // Supabaseからユーザーを削除（メイン処理）
        console.log('=== Supabaseユーザー削除開始 ===')
        try {
          await deleteClerkUserFromSupabase(data.id)
          results.supabase.success = true
          console.log('✅ Supabaseユーザー削除成功:', data.id)
        } catch (deleteError) {
          results.supabase.error = deleteError
          console.error('❌ Supabaseユーザー削除エラー:', deleteError)
          throw new Error(`Supabaseユーザー削除失敗: ${deleteError instanceof Error ? deleteError.message : 'Unknown error'}`)
        }
        
        // 注意: Prismaからの削除は既存のclerk-utilsに含まれていないため、
        // 必要に応じて実装してください
        console.log('ℹ️ Prismaからのユーザー削除は未実装')
        break

      default:
        console.log(`❓ 未対応のイベントタイプ: ${type}`)
        return new NextResponse(`Warning: 未対応のイベントタイプ: ${type}`, { status: 200 })
    }

    // 処理結果をログ出力
    console.log('=== 処理結果サマリー ===')
    console.log('Prisma:', results.prisma.success ? '✅ 成功' : `❌ 失敗: ${results.prisma.error?.message}`)
    console.log('Supabase:', results.supabase.success ? '✅ 成功' : `❌ 失敗: ${results.supabase.error?.message}`)
    
    if (results.supabase.success) {
      console.log('🎉 Webhook処理完了 - Supabaseユーザー同期成功')
      return new NextResponse('Webhook処理完了 - Supabaseユーザー同期成功', { status: 200 })
    } else {
      throw new Error('Supabase同期が失敗したため、Webhook処理を失敗とします')
    }

  } catch (error) {
    console.error('=== Webhook処理エラー詳細 ===')
    console.error('🚨 エラー:', error)
    console.error('💬 エラーメッセージ:', error instanceof Error ? error.message : 'Unknown error')
    console.error('📍 エラースタック:', error instanceof Error ? error.stack : 'No stack trace')
    console.error('📋 イベントタイプ:', type)
    console.error('👤 ユーザーデータ:', JSON.stringify(data, null, 2))
    console.error('📊 処理結果:', results)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new NextResponse(`Error: Webhook処理に失敗しました - ${errorMessage}`, {
      status: 500,
    })
  }
} 