import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 保護されたルートを定義
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)', 
  '/compose',
  '/post(.*)',
  '/api/posts(.*)',
  '/api/comments(.*)',
])

// 認証が必要でないパブリックルートを定義
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/api/webhooks(.*)', // Webhookエンドポイントを公開
  '/api/test-webhook', // テスト用エンドポイントを公開
  '/api/debug-env', // デバッグ用エンドポイントを公開
  '/api/test-supabase', // Supabaseテスト用エンドポイントを公開
  '/api/check-tables', // テーブル確認用エンドポイントを公開
])

export default clerkMiddleware(async (auth, req) => {
  // 保護されたルートにアクセスする場合は認証を要求
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}