"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LeftSidebar } from "./left-sidebar";
import { RightSidebar } from "./right-sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { UserInfo } from "./user-info";
import { 
  Users2Icon, 
  ListIcon, 
  BookmarkIcon, 
  BellIcon, 
  MessagesSquareIcon, 
  UserIcon,
  Settings2Icon, 
  LogOutIcon,
  BadgeIcon,
  UsersIcon,
  LineChartIcon,
  BriefcaseIcon,
  BuildingIcon,
  XIcon
} from "lucide-react";

export function Shell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const pathname = usePathname();
  
  // プロフィールページの判定は削除（動的ルーティングのため）
  const isProfilePage = pathname.startsWith('/profile/');

  // 現在のユーザーIDを取得
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const response = await fetch('/api/auth/current-user');
        if (response.ok) {
          const data = await response.json();
          setCurrentUserId(data.userId);
        }
      } catch (error) {
        console.error('ユーザーIDの取得に失敗しました:', error);
      }
    };

    fetchCurrentUserId();
  }, []);

  const menuItems = [
    { 
      icon: UserIcon, 
      label: 'プロフィール', 
      href: currentUserId ? `/profile/${currentUserId}` : '/profile',
      disabled: !currentUserId
    },
    { icon: BadgeIcon, label: 'プレミアム', href: '/premium' },
    { icon: Users2Icon, label: 'コミュニティ', href: '/communities' },
    { icon: ListIcon, label: 'リスト', href: '/lists' },
    { icon: BookmarkIcon, label: 'ブックマーク', href: '/bookmarks' },
    { icon: BellIcon, label: '認証済み組織', href: '/verified-orgs' },
    { icon: UsersIcon, label: 'フォローリクエスト', href: '/follow-requests', badge: '2' },
    { icon: LineChartIcon, label: '収益化', href: '/monetization' },
    { icon: BuildingIcon, label: '広告', href: '/ads' },
    { icon: BriefcaseIcon, label: '求人', href: '/jobs' },
    { icon: Settings2Icon, label: '設定とプライバシー', href: '/settings' },
    { icon: LogOutIcon, label: 'ログアウト', href: '/logout' },
  ];

  return (
    <div className="relative flex min-h-screen max-w-[1200px] mx-auto xl:max-w-none">
      <LeftSidebar />
      <main className="flex-1 border-x border-gray-200 md:ml-[275px] xl:ml-0 xl:max-w-[600px] xl:mx-auto">
        {/* ヘッダー */}
        {!isProfilePage && (
          <header>
            {/* モバイルヘッダー */}
            <div className="md:hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <button 
                  className="flex items-center" 
                  onClick={() => setIsMenuOpen(true)}
                >
                  <UserInfo />
                </button>
                <Button variant="outline" size="sm" className="rounded-full font-bold">
                  プレミアム
                </Button>
              </div>
              {/* スライドアウトメニュー */}
              {isMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="fixed top-0 left-0 w-80 h-full bg-white z-50 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">アカウント情報</h2>
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <XIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <UserInfo showStats={true} />
                    </div>

                    <nav className="py-2">
                      {menuItems.map((item) => (
                        <a
                          key={item.label}
                          href={item.disabled ? undefined : item.href}
                          className={cn(
                            "flex items-center gap-4 px-4 py-3 hover:bg-gray-50",
                            item.disabled ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
                          )}
                        >
                          <item.icon className="w-6 h-6" />
                          <span className="text-xl">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto bg-primary text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      ))}
                    </nav>
                  </div>
                </>
              )}
              <div className="border-b border-gray-200">
                <Tabs defaultValue="recommended" className="w-full">
                  <TabsList className="w-full justify-between h-12 p-0 bg-transparent">
                    <TabsTrigger
                      value="recommended"
                      className={cn(
                        "flex-1 h-12 rounded-none data-[state=active]:bg-transparent",
                        "data-[state=active]:border-b-2 data-[state=active]:border-primary"
                      )}
                    >
                      おすすめ
                    </TabsTrigger>
                    <TabsTrigger
                      value="following"
                      className={cn(
                        "flex-1 h-12 rounded-none data-[state=active]:bg-transparent",
                        "data-[state=active]:border-b-2 data-[state=active]:border-primary"
                      )}
                    >
                      フォロー中
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="px-4 py-3 text-sm text-primary border-b border-gray-200">
                70件のポストを表示
              </div>
            </div>
            {/* デスクトップヘッダー */}
            <div className="hidden md:block sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-gray-200">
              <div className="px-4 py-3">
                <h1 className="text-xl font-bold">ホーム</h1>
              </div>
            </div>
          </header>
        )}
        {children}
      </main>
      <RightSidebar />
    </div>
  );
} 