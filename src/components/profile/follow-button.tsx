'use client';

import { useState, useTransition } from 'react';
import { Button } from '../ui/button';
import { toggleFollow } from '@/lib/actions/follow-actions';
import { useRouter } from 'next/navigation';

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
}

export function FollowButton({ userId, isFollowing: initialIsFollowing }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleFollow = () => {
    const newIsFollowing = !isFollowing;
    
    // 楽観的更新
    setIsFollowing(newIsFollowing);
    
    startTransition(async () => {
      try {
        await toggleFollow(userId);
        router.refresh();
      } catch (error) {
        // エラーが発生した場合は元に戻す
        setIsFollowing(!newIsFollowing);
        console.error('フォロー状態の更新に失敗しました:', error);
      }
    });
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      onClick={handleToggleFollow}
      disabled={isPending}
      className="rounded-full px-6"
    >
      {isPending ? (
        isFollowing ? 'フォロー解除中...' : 'フォロー中...'
      ) : (
        isFollowing ? 'フォロー中' : 'フォロー'
      )}
    </Button>
  );
} 