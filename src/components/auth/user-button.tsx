'use client'

import { UserButton as ClerkUserButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function UserButton() {
  const { isSignedIn, isLoaded } = useUser()

  // ローディング中
  if (!isLoaded) {
    return (
      <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
    )
  }

  // 認証済みの場合
  if (isSignedIn) {
    return (
      <ClerkUserButton 
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
            userButtonPopoverCard: "shadow-lg border",
            userButtonPopoverActions: "space-y-1",
            userButtonPopoverActionButton: "text-sm hover:bg-gray-50",
            userButtonPopoverFooter: "hidden"
          }
        }}
        afterSignOutUrl="/sign-in"
      />
    )
  }

  // 未認証の場合
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href="/sign-in">ログイン</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/sign-up">新規登録</Link>
      </Button>
    </div>
  )
} 