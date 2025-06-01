import { format, formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { BaseUser } from '@/types/post-detail';

/**
 * 日付を相対時間（○○前）として表示
 */
export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: ja,
  });
}

/**
 * 日付を詳細形式で表示（時刻と日付）
 */
export function formatDetailedTime(dateString: string): {
  time: string;
  date: string;
} {
  const date = new Date(dateString);
  return {
    time: format(date, 'HH:mm', { locale: ja }),
    date: format(date, 'yyyy年M月d日', { locale: ja }),
  };
}

/**
 * ユーザー情報のnullチェックとフォールバック値の設定
 */
export function sanitizeUser(user: any): BaseUser {
  return {
    id: user.id,
    name: user.name || user.username || '名無しユーザー',
    username: user.username,
    profileImage: user.profileImage || '',
  };
}

/**
 * イベントの伝播を防ぐ
 */
export function stopPropagation(e: React.MouseEvent) {
  e.stopPropagation();
}

/**
 * ボタンやリンクをクリックした場合のチェック
 */
export function isInteractiveElement(target: HTMLElement): boolean {
  return !!(target.closest('button') || target.closest('a'));
} 