import type { 
  User, 
  Post, 
  Like, 
  Comment, 
  Follow, 
  PostImage, 
  CommentLike, 
  Notification 
} from '../generated/prisma'

// Database types
export type { 
  User, 
  Post, 
  Like, 
  Comment, 
  Follow, 
  PostImage, 
  CommentLike, 
  Notification 
}

// Extended types for UI components
export interface PostWithAuthor extends Post {
  user: User
  likes: Like[]
  comments: CommentWithAuthor[]
  images: PostImage[]
  _count: {
    likes: number
    comments: number
  }
}

export interface CommentWithAuthor extends Comment {
  user: User
  commentLikes: CommentLike[]
  _count: {
    commentLikes: number
  }
}

export interface UserWithCounts extends User {
  _count: {
    posts: number
    followers: number
    following: number
  }
}

export interface NotificationWithRelations extends Notification {
  sender: User
  receiver: User
  post?: Post
  comment?: Comment
}

// Notification types enum
export enum NotificationType {
  LIKE = 'like',
  COMMENT = 'comment',
  FOLLOW = 'follow',
  COMMENT_LIKE = 'comment_like'
}

// API response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
} 