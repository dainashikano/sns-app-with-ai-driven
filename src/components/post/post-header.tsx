import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { UI_TEXT } from '@/lib/constants/post-constants';

interface PostHeaderProps {
  backUrl?: string;
}

export function PostHeader({ backUrl = '/' }: PostHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
      <div className="px-4 py-3 flex items-center gap-8">
        <Link 
          href={backUrl} 
          className="hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{UI_TEXT.POST_TITLE}</h1>
        </div>
      </div>
    </div>
  );
} 