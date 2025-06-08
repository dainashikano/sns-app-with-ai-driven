"use client";

import Link from 'next/link';
import { HomeIcon, MagnifyingGlassIcon, ArrowPathIcon, BellIcon, EnvelopeIcon, UserIcon, BookmarkIcon, ListBulletIcon, Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, MagnifyingGlassIcon as MagnifyingGlassIconSolid, BellIcon as BellIconSolid, EnvelopeIcon as EnvelopeIconSolid, UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import { useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ProfileLink } from '../profile/profile-link';
import { UserInfo } from './user-info';
import { UserButton } from '../auth/user-button';

export function LeftSidebar() {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();

  const mobileMenuItems = [
    { href: '/', icon: HomeIcon, activeIcon: HomeIconSolid, label: 'ホーム' },
    { href: '/search', icon: MagnifyingGlassIcon, activeIcon: MagnifyingGlassIconSolid, label: '検索' },
    { href: '/refresh', icon: ArrowPathIcon, activeIcon: ArrowPathIcon, label: '更新' },
    { href: '/notifications', icon: BellIcon, activeIcon: BellIconSolid, label: '通知' },
    { href: '/messages', icon: EnvelopeIcon, activeIcon: EnvelopeIconSolid, label: 'メッセージ' },
  ];

  const desktopMenuItems = [
    { href: '/', icon: HomeIcon, label: 'ホーム' },
    { href: '/notifications', icon: BellIcon, label: '通知' },
    { href: '/messages', icon: EnvelopeIcon, label: 'メッセージ' },
    { href: '/bookmarks', icon: BookmarkIcon, label: 'ブックマーク' },
    { href: '/lists', icon: ListBulletIcon, label: 'リスト' },
    { href: '/settings', icon: Cog6ToothIcon, label: '設定' },
  ];

  return (
    <>
      {/* デスクトップサイドバー */}
      <aside className="hidden md:block w-[275px]">
        <div className="fixed left-0 w-[275px] flex flex-col h-screen py-4 overflow-hidden xl:left-[calc(50%-600px)]">
          <div className="px-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">𝕏</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-1 mt-2 overflow-hidden">
            {desktopMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 rounded-full text-xl transition-colors"
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
            <ProfileLink
              icon={UserIcon}
              activeIcon={UserIconSolid}
              label="プロフィール"
              isActive={pathname.startsWith('/profile/')}
            />
          </nav>
          <div className="px-4 mt-4">
            <Button
              size="lg"
              className="w-full rounded-full font-bold bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              ポストする
            </Button>
          </div>
          <div className="mt-auto px-4">
            {isSignedIn ? (
              <div className="flex items-center justify-between p-4 rounded-full hover:bg-gray-100 transition-colors">
                <UserInfo />
                <UserButton />
              </div>
            ) : (
              <div className="p-4">
                <UserButton />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* モバイルナビゲーション */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 px-2 z-50">
        {mobileMenuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = isActive ? item.activeIcon : item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full",
                isActive ? "text-primary" : "text-gray-700"
              )}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </nav>

      {/* モバイル投稿ボタン */}
      <Link href="/compose">
        <Button
          size="icon"
          className="md:hidden fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg z-50"
        >
          <PlusIcon className="w-6 h-6" />
        </Button>
      </Link>
    </>
  );
} 