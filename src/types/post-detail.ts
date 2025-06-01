// ポスト詳細ページ用の型定義

export interface BaseUser {
  id: string;
  name: string;
  username: string;
  profileImage: string;
}

export interface PostComment {
  id: string;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  user: BaseUser;
}

export interface PostWithComments {
  id: string;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  user: BaseUser;
  comments: PostComment[];
}

export interface PostDetailProps {
  postWithComments: PostWithComments;
}

export interface CommentCardProps {
  comment: PostComment;
} 