import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { formatRelativeTime } from '@/lib/utils/post-utils';
import type { CommentCardProps } from '@/types/post-detail';

export function CommentCard({ comment }: CommentCardProps) {
  const formattedDate = formatRelativeTime(comment.createdAt);

  const handleLike = () => {
    // TODO: いいね機能を実装
    console.log('Comment like clicked:', comment.id);
  };

  return (
    <div className="p-4 hover:bg-gray-50/50 transition-colors">
      <div className="flex space-x-3">
        <Link href={`/profile/${comment.user.id}`}>
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage 
              src={comment.user.profileImage} 
              alt={comment.user.name} 
            />
            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
          </Avatar>
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Link 
              href={`/profile/${comment.user.id}`}
              className="font-semibold text-gray-900 hover:underline"
            >
              {comment.user.name}
            </Link>
            <span>@{comment.user.username}</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
          
          <div className="mt-1">
            <p className="text-gray-900 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
          
          <div className="flex items-center mt-3">
            <button 
              className="flex items-center space-x-1 text-gray-500 hover:text-pink-600 cursor-pointer group"
              onClick={handleLike}
            >
              <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                {comment.isLiked ? (
                  <HeartSolidIcon className="w-5 h-5 text-pink-600" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm">{comment.likesCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 