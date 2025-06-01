import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { FollowButton } from './follow-button';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import { UserProfile } from '@/lib/users';

interface ProfileHeaderProps {
  user: UserProfile;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const joinedDate = formatDistanceToNow(new Date(user.createdAt), {
    addSuffix: false,
    locale: ja,
  });

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center gap-8">
          <Link href="/" className="hover:bg-gray-100 p-2 rounded-full">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{user.name || user.username}</h1>
            <p className="text-sm text-gray-500">{user.postsCount} 件のポスト</p>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="h-48 bg-gray-300">
          {user.coverImage && (
            <img
              src={user.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="px-4">
          <div className="relative">
            <div className="absolute -top-12">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage 
                  src={user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                />
                <AvatarFallback>{(user.name || user.username)[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex justify-end py-3">
              <FollowButton 
                userId={user.id}
                isFollowing={user.isFollowing || false}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-1">
              <h2 className="text-xl font-bold">{user.name || user.username}</h2>
            </div>
            <p className="text-gray-500">@{user.username}</p>
            
            {user.bio && (
              <p className="mt-3 whitespace-pre-wrap">{user.bio}</p>
            )}
            
            <div className="flex items-center gap-4 mt-3 text-gray-500">
              {user.location && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <a 
                  href={user.website.startsWith('http') ? user.website : `https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  <span>🔗</span>
                  <span>{user.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>{joinedDate}から利用しています</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-3">
              <Link href={`/${user.username}/following`} className="hover:underline">
                <span className="font-bold">{user.followingCount}</span>
                <span className="text-gray-500"> フォロー中</span>
              </Link>
              <Link href={`/${user.username}/followers`} className="hover:underline">
                <span className="font-bold">{user.followersCount}</span>
                <span className="text-gray-500"> フォロワー</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 