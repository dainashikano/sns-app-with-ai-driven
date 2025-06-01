'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UserProfile } from '@/lib/users';

interface UserInfoProps {
  className?: string;
  showStats?: boolean;
}

export function UserInfo({ className, showStats = false }: UserInfoProps) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/auth/current-user-profile');
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
        {showStats && (
          <div className="flex gap-4 mt-3">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        )}
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className={className}>
        <div className="flex items-center gap-3 text-gray-500">
          <Avatar className="h-10 w-10">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold">ユーザー情報を取得中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage 
            src={currentUser.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`} 
          />
          <AvatarFallback>{(currentUser.name || currentUser.username)[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-bold truncate">{currentUser.name || currentUser.username}</p>
          <p className="text-gray-500 truncate">@{currentUser.username}</p>
        </div>
      </div>
      {showStats && (
        <div className="flex gap-4 mt-3 text-sm">
          <span><strong>{currentUser.followingCount}</strong> フォロー中</span>
          <span><strong>{currentUser.followersCount}</strong> フォロワー</span>
        </div>
      )}
    </div>
  );
} 