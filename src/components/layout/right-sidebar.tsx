import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function RightSidebar() {
  const suggestedUsers = [
    { 
      id: 1, 
      name: '株式会社ゆめみ | YU...', 
      username: 'yumemiinc',
      avatarSeed: 'yumemi',
      verified: false
    },
    { 
      id: 2, 
      name: '池田 美佳', 
      username: 'clockmaker',
      avatarSeed: 'ikeda',
      verified: true
    },
    { 
      id: 3, 
      name: 'Shota Nukumizu', 
      username: 'Nameless_SN',
      avatarSeed: 'shota',
      verified: false
    },
  ];

  const trends = [
    { id: 1, category: 'Promoted by ドラゴンボール レジェンズ公式', text: '#レジェンズ超ガチ開催', emoji: '🔥' },
    { id: 2, category: 'トレンド', text: '#前山さん', posts: null },
    { id: 3, category: 'トレンド', text: '#Bリーグチャンピオンシップファイナル', posts: null },
    { id: 4, category: 'スポーツ・トレンド', text: '#BREX', posts: '1,061件のポスト' },
  ];

  return (
    <aside className="hidden lg:block w-80">
      <div className="fixed left-1/2 transform translate-x-[280px] w-80 flex flex-col py-4 px-4 overflow-hidden h-screen">
        {/* 検索バー */}
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="検索"
            className="w-full pl-10 bg-gray-100 focus:bg-white rounded-full border-0 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* おすすめセクション */}
        <Card className="bg-gray-50 mb-4 border-0">
          <CardHeader className="pb-3">
            <h2 className="font-bold text-xl">おすすめ</h2>
          </CardHeader>
          <CardContent className="p-0">
            {suggestedUsers.map((user) => (
              <div
                key={user.id}
                className="px-4 py-3 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 max-w-[140px]">
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-sm truncate">{user.name}</p>
                      {user.verified && (
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-2.5-1.668c-.328-.219-.419-.66-.2-.988.219-.329.659-.419.988-.2L9.676 14.9l3.957-5.935c.198-.297.603-.375.928-.128.397.198.49.653.323.928z"/>
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full bg-black text-white hover:bg-gray-800 border-0 px-4 flex-shrink-0">
                  フォロー
                </Button>
              </div>
            ))}
            <button className="p-4 text-blue-500 hover:bg-gray-100 w-full text-left text-sm">
              さらに表示
            </button>
          </CardContent>
        </Card>

        {/* いまを見つけよう セクション */}
        <Card className="bg-gray-50 border-0">
          <CardHeader className="pb-3">
            <h2 className="font-bold text-xl">「いま」を見つけよう</h2>
          </CardHeader>
          <CardContent className="p-0">
            {trends.map((trend) => (
              <div
                key={trend.id}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <p className="text-sm text-gray-500 mb-1">{trend.category}</p>
                <div className="flex items-center gap-1">
                  <p className="font-bold text-sm">{trend.text}</p>
                  {trend.emoji && <span>{trend.emoji}</span>}
                </div>
                {trend.posts && (
                  <p className="text-sm text-gray-500 mt-1">{trend.posts}</p>
                )}
              </div>
            ))}
            <button className="p-4 text-blue-500 hover:bg-gray-100 w-full text-left text-sm">
              さらに表示
            </button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
} 