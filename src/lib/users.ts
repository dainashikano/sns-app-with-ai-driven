// このファイルはDALに移行されました
// 後方互換性のため、DALからの再エクスポートを提供

export interface UserProfile {
  id: string;
  name: string | null;
  username: string;
  bio: string | null;
  profileImage: string | null;
  coverImage: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
}

// DALからの関数を再エクスポート
export { getUserById, getUserByUsername, getAllUsers } from './dal';