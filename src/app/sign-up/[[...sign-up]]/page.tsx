import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            新しいアカウントを作成
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            または{' '}
            <Link href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
              既存のアカウントでログイン
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-6 shadow-lg rounded-lg">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-green-600 hover:bg-green-700 text-sm normal-case',
                footerActionLink: 'text-green-600 hover:text-green-700',
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
          <Link href="/" className="text-sm text-green-600 hover:text-green-500">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
} 