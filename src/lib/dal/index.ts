// Data Access Layer (DAL) - 統一エクスポート

// 認証関連
export { getCurrentUser, requireAuth } from './auth';

// ユーザー関連
export { 
  getUserById, 
  getUserByUsername, 
  getAllUsers, 
  getFollowers, 
  getFollowing,
  invalidateUsersCaches,
  invalidateUserCache
} from './users';

// 投稿関連
export { 
  getPosts, 
  getPostsByUserId, 
  getPostById,
  getPostWithComments,
  invalidatePostsCaches,
  invalidateUserPostsCache
} from './posts';

// マッパー関数（必要に応じて）
export { 
  mapUserToProfile, 
  mapPostToPost, 
  mapPostsToPosts, 
  mapUsersToProfiles 
} from './mappers'; 