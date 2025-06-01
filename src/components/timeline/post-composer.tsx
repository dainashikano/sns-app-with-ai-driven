import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface PostComposerProps {
  onPost: (content: string) => void;
}

export function PostComposer({ onPost }: PostComposerProps) {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (!content.trim()) return;
    onPost(content);
    setContent('');
  };

  return (
    <div className="px-4 py-3">
      <Textarea
        placeholder="いまどうしてる？"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[56px] resize-none border-none focus-visible:ring-0 text-xl p-0 placeholder:text-gray-500"
      />
      <div className="flex items-center justify-end mt-3">
        <Button
          onClick={handlePost}
          disabled={!content.trim()}
          className="rounded-full px-4 bg-neutral-900 hover:bg-neutral-800 text-white"
        >
          ポストする
        </Button>
      </div>
    </div>
  );
} 