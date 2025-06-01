'use client';

import { Post } from '../types/post';
import { ChatBubbleLeftIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { LikeButton } from './like-button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { formatRelativeTime, stopPropagation, isInteractiveElement } from '@/lib/utils/post-utils';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const router = useRouter();
  const formattedDate = formatRelativeTime(post.createdAt);

  const handlePostClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (isInteractiveElement(target)) {
      return;
    }
    router.push(`/post/${post.id}`);
  };

  return (
    <Card className="border-b border-gray-100 rounded-none hover:bg-gray-50/50 transition-colors cursor-pointer">
      <CardContent className="p-4" onClick={handlePostClick}>
        <div className="flex space-x-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link href={`/profile/${post.author.id}`} onClick={stopPropagation}>
                <Avatar className="h-12 w-12 cursor-pointer">
                  <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatarUrl} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{post.author.name}</h4>
                  <p className="text-sm text-gray-500">@{post.author.username}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Link 
                href={`/profile/${post.author.id}`}
                className="font-semibold text-gray-900 hover:underline"
                onClick={stopPropagation}
              >
                {post.author.name}
              </Link>
              <span>@{post.author.username}</span>
              <span>·</span>
              <span>{formattedDate}</span>
            </div>
            
            <div className="mt-1">
              <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
            </div>
            
            <div className="flex items-center justify-between mt-3 max-w-md" onClick={stopPropagation}>
              <Link 
                href={`/post/${post.id}`}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 cursor-pointer group"
              >
                <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                </div>
                <span className="text-sm">{post.comments}</span>
              </Link>
              
              <div className="flex items-center space-x-1 text-gray-500 hover:text-green-600 cursor-pointer group">
                <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                  <ArrowPathRoundedSquareIcon className="w-5 h-5" />
                </div>
                <span className="text-sm">{post.reposts}</span>
              </div>
              
              <LikeButton 
                postId={post.id}
                isLiked={post.isLiked}
                likesCount={post.likes}
                onLike={onLike}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 