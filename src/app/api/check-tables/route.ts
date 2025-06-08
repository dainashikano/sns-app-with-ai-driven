import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Supabaseテーブル確認開始...')
    
    // テーブルの存在確認
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'users')
    
    if (tablesError) {
      console.error('テーブル確認エラー:', tablesError)
      return NextResponse.json({
        success: false,
        error: 'テーブル確認失敗',
        details: tablesError
      }, { status: 500 })
    }
    
    const usersTableExists = tables && tables.length > 0
    
    // もしテーブルが存在する場合、カラム情報も取得
    let columns = null
    if (usersTableExists) {
      const { data: columnsData, error: columnsError } = await supabaseAdmin
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable')
        .eq('table_schema', 'public')
        .eq('table_name', 'users')
        .order('ordinal_position')
      
      if (!columnsError) {
        columns = columnsData
      }
    }
    
    return NextResponse.json({
      success: true,
      usersTableExists,
      tables: tables || [],
      columns: columns || null,
      message: usersTableExists 
        ? 'usersテーブルが存在します' 
        : 'usersテーブルが存在しません',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('テーブル確認エラー:', error)
    return NextResponse.json({
      success: false,
      error: 'テーブル確認失敗',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 