export interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  reposts: number;
  isLiked: boolean;
} 