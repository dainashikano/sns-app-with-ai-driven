'use client';

import { useState, useTransition } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { SignIn } from '@clerk/nextjs';
import { createPost } from '@/lib/actions/post-actions';
import { useRouter } from 'next/navigation';

export function PostComposerWrapper() {
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handlePost = () => {
    // ログイン状態の確認
    if (!isLoaded) return; // まだロード中の場合は何もしない
    
    if (!isSignedIn) {
      // 未ログインの場合はサインインモーダルを表示
      setShowSignInModal(true);
      return;
    }
    
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

  const handleTextareaClick = () => {
    // テキストエリアをクリックした時もログイン状態をチェック
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      setShowSignInModal(true);
    }
  };

  return (
    <>
      <div className="px-4 py-3">
        <Textarea
          placeholder={isSignedIn ? "いまどうしてる？" : "ログインして投稿しよう"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={handleTextareaClick}
          className="min-h-[56px] resize-none border-none focus-visible:ring-0 text-xl p-0 placeholder:text-gray-500"
          disabled={isPending || !isSignedIn}
          readOnly={!isSignedIn}
        />
        <div className="flex items-center justify-end mt-3">
          <Button
            onClick={handlePost}
            disabled={(!content.trim() && isSignedIn) || isPending || !isLoaded}
            className="rounded-full px-4 bg-neutral-900 hover:bg-neutral-800 text-white disabled:opacity-50"
          >
            {isPending ? '投稿中...' : !isSignedIn ? 'ログインして投稿' : 'ポストする'}
          </Button>
        </div>
      </div>

      {/* サインインモーダル */}
      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              ログインして投稿しよう
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