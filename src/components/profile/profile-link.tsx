'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProfileLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  activeIcon?: React.ComponentType<{ className?: string }>;
  label: string;
  className?: string;
  isActive?: boolean;
}

export function ProfileLink({ icon: Icon, activeIcon: ActiveIcon, label, className, isActive }: ProfileLinkProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // 現在のユーザーIDを取得
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

  // ユーザーIDが取得できない場合は無効化
  if (!currentUserId) {
    return (
      <div className={cn("flex items-center gap-4 px-3 py-3 rounded-full text-gray-400 cursor-not-allowed", className)}>
        <Icon className="w-6 h-6" />
        <span className="text-xl">{label}</span>
      </div>
    );
  }

  const DisplayIcon = isActive && ActiveIcon ? ActiveIcon : Icon;

  return (
    <Link
      href={`/profile/${currentUserId}`}
      className={cn(
        "flex items-center gap-4 px-3 py-3 rounded-full hover:bg-gray-100 transition-colors",
        isActive ? "font-bold" : "font-normal",
        className
      )}
    >
      <DisplayIcon className="w-6 h-6" />
      <span className="text-xl">{label}</span>
    </Link>
  );
} 