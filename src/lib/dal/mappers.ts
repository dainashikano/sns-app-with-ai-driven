import type { User, Post as PrismaPost, Like, Comment, PostImage, Follow } from '../../generated/prisma';
import type { Post } from '../../types/post';
import type { UserProfile } from '../users';

// Prismaで取得したUserエンティティからUserProfileドメインオブジェクトへ変換
export function mapUserToProfile(
  user: User & {
    followers: Follow[];
    following: Follow[];
    posts: PrismaPost[];
  },
  currentUserId?: string | null
): UserProfile {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    bio: user.bio,
    profileImage: user.profileImage,
    coverImage: user.coverImage,
    location: user.location,
    website: user.website,
    createdAt: user.createdAt.toISOString(),
    followersCount: user.followers.length,
    followingCount: user.following.length,
    postsCount: user.posts.length,
    isFollowing: currentUserId 
      ? user.followers.some((follow: Follow) => follow.followerId === currentUserId) 
      : false,
  };
}

// デフォルトのアバターURL生成
function getDefaultAvatarUrl(username: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
}

// Prismaで取得したPostエンティティからPostドメインオブジェクトへ変換
export function mapPostToPost(
  post: PrismaPost & {
    user: User;
    likes: Like[];
    comments: Comment[];
    images: PostImage[];
  },
  currentUserId?: string | null
): Post {
  return {
    id: post.id,
    content: post.content,
    author: {
      id: post.user.id,
      name: post.user.name || post.user.username,
      username: post.user.username,
      avatarUrl: post.user.profileImage || getDefaultAvatarUrl(post.user.username),
    },
    createdAt: post.createdAt.toISOString(),
    likes: post.likesCount,
    comments: post.commentsCount,
    reposts: 0, // repostsはまだスキーマにないので0に設定
    isLiked: currentUserId 
      ? post.likes.some((like: Like) => like.userId === currentUserId) 
      : false,
  };
}

// 複数のPostを変換
export function mapPostsToPosts(
  posts: (PrismaPost & {
    user: User;
    likes: Like[];
    comments: Comment[];
    images: PostImage[];
  })[],
  currentUserId?: string | null
): Post[] {
  return posts.map(post => mapPostToPost(post, currentUserId));
}

// 複数のUserを変換
export function mapUsersToProfiles(
  users: (User & {
    followers: Follow[];
    following: Follow[];
    posts: PrismaPost[];
  })[],
  currentUserId?: string | null
): UserProfile[] {
  return users.map(user => mapUserToProfile(user, currentUserId));
} 