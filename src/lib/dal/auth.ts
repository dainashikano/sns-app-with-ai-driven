import { getCurrentUserId as getClerkUserId, requireAuth as clerkRequireAuth } from '../auth/clerk-utils';

// Clerkベースの現在のユーザーID取得
export const getCurrentUser = getClerkUserId;

// Clerkベースの認証必須チェック
export const requireAuth = clerkRequireAuth; 