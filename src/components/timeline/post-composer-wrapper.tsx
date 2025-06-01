'use client';

import { useState, useTransition } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createPost } from '@/lib/actions/post-actions';
import { useRouter } from 'next/navigation';

export function PostComposerWrapper() {
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handlePost = () => {
    if (!content.trim()) return;
    
    startTransition(async () => {
      try {
        await createPost(content);
        setContent('');
        router.refresh();
      } catch (error) {
        console.error('投稿の作成に失敗しました:', error);
      }
    });
  };

  return (
    <div className="px-4 py-3">
      <Textarea
        placeholder="いまどうしてる？"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[56px] resize-none border-none focus-visible:ring-0 text-xl p-0 placeholder:text-gray-500"
        disabled={isPending}
      />
      <div className="flex items-center justify-end mt-3">
        <Button
          onClick={handlePost}
          disabled={!content.trim() || isPending}
          className="rounded-full px-4 bg-neutral-900 hover:bg-neutral-800 text-white"
        >
          {isPending ? '投稿中...' : 'ポストする'}
        </Button>
      </div>
    </div>
  );
} 