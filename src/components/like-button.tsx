'use client';

import { useState, useTransition } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { togglePostLike } from '@/lib/actions/post-actions';

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  likesCount: number;
  onLike?: (postId: string) => void;
}

export function LikeButton({ postId, isLiked: initialIsLiked, likesCount: initialLikesCount, onLike }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    if (onLike) {
      // クライアントサイドの状態管理を使用
      onLike(postId);
    } else {
      // Server Actionsを使用
      const newIsLiked = !isLiked;
      const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;
      
      // 楽観的更新
      setIsLiked(newIsLiked);
      setLikesCount(newLikesCount);
      
      startTransition(async () => {
        try {
          await togglePostLike(postId);
        } catch (error) {
          // エラーが発生した場合は元に戻す
          setIsLiked(!newIsLiked);
          setLikesCount(newIsLiked ? likesCount - 1 : likesCount + 1);
          console.error('いいねの更新に失敗しました:', error);
        }
      });
    }
  };

  return (
    <div 
      className={`flex items-center space-x-1 cursor-pointer group ${
        isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-600'
      }`}
      onClick={handleLike}
    >
      <div className={`p-2 rounded-full transition-colors ${
        isLiked ? 'group-hover:bg-red-50' : 'group-hover:bg-red-50'
      }`}>
        {isLiked ? (
          <HeartIconSolid className="w-5 h-5" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
      </div>
      <span className="text-sm">{likesCount}</span>
    </div>
  );
} 