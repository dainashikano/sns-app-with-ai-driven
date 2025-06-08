'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { SignIn } from '@clerk/nextjs';
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
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  const handleSubmit = () => {
    // ログイン状態の確認
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      setShowSignInModal(true);
      return;
    }
    
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

  const handleTextareaClick = () => {
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      setShowSignInModal(true);
    }
  };

  return (
    <>
      <div className="border-b border-gray-100 p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={isSignedIn ? (user?.imageUrl || currentUserAvatar) : currentUserAvatar} 
              alt={isSignedIn ? (user?.firstName || 'あなた') : 'ログインが必要'}
            />
            <AvatarFallback>
              {isSignedIn ? (user?.firstName?.[0] || 'You') : '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder={isSignedIn ? UI_TEXT.REPLY_PLACEHOLDER : "ログインして返信しよう"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onClick={handleTextareaClick}
              className="min-h-[80px] resize-none border-none focus-visible:ring-0 text-lg p-0 placeholder:text-gray-500"
              disabled={isPending || !isSignedIn}
              readOnly={!isSignedIn}
            />
            <div className="flex items-center justify-end mt-3">
              <Button
                onClick={handleSubmit}
                disabled={(!content.trim() && isSignedIn) || isPending || !isLoaded}
                className="rounded-full px-4 bg-neutral-900 hover:bg-neutral-800 text-white disabled:opacity-50"
              >
                {isPending ? UI_TEXT.POSTING : !isSignedIn ? 'ログインして返信' : UI_TEXT.REPLY_BUTTON}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* サインインモーダル */}
      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              ログインして返信しよう
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case w-full',
                  footerActionLink: 'text-blue-600 hover:text-blue-700',
                  formFieldInput: 'text-sm',
                  formFieldLabel: 'text-sm',
                  dividerLine: 'bg-gray-300',
                  dividerText: 'text-gray-500',
                  socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50 w-full',
                  socialButtonsBlockButtonText: 'text-gray-700',
                  formHeaderTitle: 'hidden',
                  formHeaderSubtitle: 'hidden',
                  card: 'shadow-none',
                  rootBox: 'w-full',
                  footer: 'hidden',
                  form: 'space-y-4'
                },
                layout: {
                  socialButtonsPlacement: 'top',
                  showOptionalFields: false
                }
              }}
              redirectUrl="/"
              afterSignInUrl="/"
            />
          </div>
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowSignInModal(false)}
              className="w-full"
            >
              キャンセル
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 