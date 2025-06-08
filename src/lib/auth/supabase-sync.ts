import { supabaseAdmin } from '../supabase'

export interface ClerkUserData {
  id: string
  email_addresses: Array<{ email_address: string }>
  username?: string | null
  first_name?: string | null
  last_name?: string | null
  image_url?: string
}

/**
 * ClerkユーザーをSupabaseのユーザーテーブルに同期
 */
export async function syncClerkUserToSupabase(clerkUser: ClerkUserData) {
  try {
    const email = clerkUser.email_addresses[0]?.email_address
    if (!email) {
      throw new Error('メールアドレスが見つかりません')
    }

    // ユーザー名の生成
    const username = clerkUser.username || `user_${clerkUser.id.slice(0, 8)}`
    
    // 名前の生成
    const name = clerkUser.first_name && clerkUser.last_name 
      ? `${clerkUser.first_name} ${clerkUser.last_name}`
      : clerkUser.first_name || clerkUser.last_name || '名無しユーザー'

    // Supabaseでユーザーが既に存在するかチェック
    const { data: existingUser, error: selectError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', clerkUser.id)
      .single()

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 = 行が見つからない場合のエラーコード
      throw selectError
    }

    const userData = {
      id: clerkUser.id,
      email,
      username,
      name,
      profileImage: clerkUser.image_url || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (existingUser) {
      // 既存ユーザーの更新
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({
          email: userData.email,
          name: userData.name,
          profileImage: userData.profileImage,
          updatedAt: userData.updatedAt,
        })
        .eq('id', clerkUser.id)
        .select()
        .single()

      if (error) throw error
      
      console.log('ユーザー更新成功:', clerkUser.id)
      return data
    } else {
      // 新規ユーザーの作成
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert(userData)
        .select()
        .single()

      if (error) throw error
      
      console.log('ユーザー作成成功:', clerkUser.id)
      return data
    }
  } catch (error) {
    console.error('Supabaseユーザー同期エラー:', error)
    throw error
  }
}

/**
 * SupabaseからClerkユーザーを削除
 */
export async function deleteClerkUserFromSupabase(userId: string) {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId)

    if (error) throw error
    
    console.log('ユーザー削除成功:', userId)
  } catch (error) {
    console.error('Supabaseユーザー削除エラー:', error)
    throw error
  }
} 