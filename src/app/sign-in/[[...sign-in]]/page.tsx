import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 21l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            アカウントにログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            または{' '}
            <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
              新しいアカウントを作成
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-6 shadow-lg rounded-lg">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                footerActionLink: 'text-blue-600 hover:text-blue-700',
                formFieldInput: 'text-sm',
                formFieldLabel: 'text-sm',
                dividerLine: 'bg-gray-300',
                dividerText: 'text-gray-500',
                socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50',
                socialButtonsBlockButtonText: 'text-gray-700',
                formHeaderTitle: 'text-2xl',
                formHeaderSubtitle: 'text-gray-600',
                card: 'shadow-none',
                rootBox: 'mx-auto',
                footer: 'hidden'
              },
              layout: {
                socialButtonsPlacement: 'top',
                showOptionalFields: true
              }
            }}
            redirectUrl="/"
          />
        </div>
        
        <div className="text-center">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
} 