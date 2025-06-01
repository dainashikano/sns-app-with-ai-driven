'use client';

import Link from 'next/link';
import { ChatBubbleLeftIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { LikeButton } from '../like-button';
import { CommentCard } from './comment-card';
import { PostHeader } from './post-header';
import { ReplyForm } from './reply-form';
import { formatDetailedTime } from '@/lib/utils/post-utils';
import { UI_TEXT } from '@/lib/constants/post-constants';
import type { PostDetailProps } from '@/types/post-detail';

export function PostDetail({ postWithComments }: PostDetailProps) {
  const { time, date } = formatDetailedTime(postWithComments.createdAt);

  return (
    <div className="max-w-2xl mx-auto">
      <PostHeader />

      {/* メインポスト */}
      <Card className="border-b border-gray-100 rounded-none">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Link href={`/profile/${postWithComments.user.id}`}>
              <Avatar className="h-12 w-12 cursor-pointer">
                <AvatarImage 
                  src={postWithComments.user.profileImage} 
                  alt={postWithComments.user.name} 
                />
                <AvatarFallback>
                  {postWithComments.user.name[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-1 text-sm">
                <Link 
                  href={`/profile/${postWithComments.user.id}`}
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {postWithComments.user.name}
                </Link>
                <span className="text-gray-500">
                  @{postWithComments.user.username}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-gray-900 text-lg whitespace-pre-wrap leading-relaxed">
              {postWithComments.content}
            </p>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-500 mb-3">
              {time} · {date}
            </div>
            
            <div className="flex items-center gap-4 py-2 border-t border-gray-100">
              <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 cursor-pointer group">
                <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                </div>
                <span className="text-sm">{postWithComments.commentsCount}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-500 hover:text-green-600 cursor-pointer group">
                <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                  <ArrowPathRoundedSquareIcon className="w-5 h-5" />
                </div>
                <span className="text-sm">0</span>
              </div>
              
              <LikeButton 
                postId={postWithComments.id}
                isLiked={postWithComments.isLiked}
                likesCount={postWithComments.likesCount}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* リプライ投稿フォーム */}
      <ReplyForm postId={postWithComments.id} />

      {/* リプライ一覧 */}
      <div className="divide-y divide-border">
        {postWithComments.comments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {UI_TEXT.NO_REPLIES}
          </div>
        ) : (
          postWithComments.comments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
} 