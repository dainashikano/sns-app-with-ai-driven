'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createComment } from '@/lib/actions/comment-actions';
import { UI_TEXT } from '@/lib/constants/post-constants';

interface ReplyFormProps {
  postId: string;
  currentUserAvatar?: string;
  onSuccess?: () => void;
}

export function ReplyForm({ 
  postId, 
  currentUserAvatar = '/default-avatar.png',
  onSuccess
}: ReplyFormProps) {
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    startTransition(async () => {
      try {
        await createComment(postId, content);
        setContent('');
        onSuccess?.();
        router.refresh();
      } catch (error) {
        console.error('リプライの投稿に失敗しました:', error);
      }
    });
  };

  return (
    <div className="border-b border-gray-100 p-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentUserAvatar} alt="あなた" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder={UI_TEXT.REPLY_PLACEHOLDER}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] resize-none border-none focus-visible:ring-0 text-lg p-0 placeholder:text-gray-500"
            disabled={isPending}
          />
          <div className="flex items-center justify-end mt-3">
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isPending}
              className="rounded-full px-4 bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              {isPending ? UI_TEXT.POSTING : UI_TEXT.REPLY_BUTTON}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 