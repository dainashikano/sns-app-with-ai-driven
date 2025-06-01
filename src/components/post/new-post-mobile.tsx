'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeftIcon, 
  PhotoIcon, 
  GifIcon, 
  ListBulletIcon, 
  FaceSmileIcon, 
  MapPinIcon,
  CalendarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export function NewPostMobile() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const currentUser = {
    name: 'Shin@プログラミングチュートリアル',
    username: 'Shin_Engineer',
    avatarSeed: 'shin'
  };

  const handleBack = () => {
    router.back();
  };

  const handlePost = () => {
    if (content.trim()) {
      // ここでポスト処理を実装
      console.log('新規ポスト:', content);
      router.back();
    }
  };

  const toolbarItems = [
    { icon: PhotoIcon, label: '写真' },
    { icon: GifIcon, label: 'GIF' },
    { icon: ListBulletIcon, label: '投票' },
    { icon: FaceSmileIcon, label: '絵文字' },
    { icon: CalendarIcon, label: '予約投稿' },
    { icon: MapPinIcon, label: '位置情報' },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">下書き</span>
        </div>
        <Button 
          onClick={handlePost}
          disabled={!content.trim()}
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-sm font-bold disabled:opacity-50"
        >
          ポストする
        </Button>
      </header>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        {/* ユーザー情報とテキストエリア */}
        <div className="flex gap-3 p-4">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.avatarSeed}`} />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-sm font-medium">{currentUser.username}</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="いまどうしてる？"
              className="w-full text-xl placeholder-gray-500 border-none outline-none resize-none bg-transparent"
              rows={8}
              autoFocus
            />
          </div>
        </div>

        {/* 公開設定 */}
        <div className="px-4 py-3 border-t border-gray-100">
          <button 
            onClick={() => setIsPublic(!isPublic)}
            className="flex items-center gap-2 text-blue-500 text-sm font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {isPublic ? '全員が返信できます' : 'フォロワーのみ返信可能'}
          </button>
        </div>

        {/* ツールバー */}
        <div className="mt-auto border-t border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              {toolbarItems.map((item, index) => (
                <button
                  key={index}
                  className="p-2 rounded-full hover:bg-gray-100 text-blue-500"
                  title={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <PlusIcon className="w-5 h-5 text-blue-500" />
              </button>
              <div className="w-px h-6 bg-gray-300" />
              <span className="text-sm text-gray-500 min-w-[2rem] text-right">
                {280 - content.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 