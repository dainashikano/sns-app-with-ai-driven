import { useState, useCallback } from 'react';
import { dummyPosts } from '@/data/dummyPosts';
import { Post } from '@/types/post';

interface UsePostsReturn {
  posts: Post[];
  addPost: (content: string) => void;
  toggleLike: (postId: string) => void;
}

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  const addPost = useCallback((content: string) => {
    const newPostObj: Post = {
      id: `post-${Date.now()}`,
      content,
      author: {
        id: 'current-user',
        name: 'Current User',
        username: 'currentuser',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser'
      },
      likes: 0,
      comments: 0,
      reposts: 0,
      isLiked: false,
      createdAt: new Date().toISOString()
    };

    setPosts(prev => [newPostObj, ...prev]);
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  }, []);

  return {
    posts,
    addPost,
    toggleLike
  };
} 