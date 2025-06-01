"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatBubbleOvalLeftIcon, ArrowPathRoundedSquareIcon, HeartIcon, ChartBarIcon, BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { VerifiedIcon } from "lucide-react";
import Image from "next/image";

interface PostProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: string;
  media?: {
    type: "image" | "video";
    url: string;
  };
  stats: {
    replies: number;
    reposts: number;
    likes: number;
    views: number;
  };
}

export function Post({ user, content, timestamp, media, stats }: PostProps) {
  return (
    <article className="border-b border-gray-200">
      <div className="flex p-4">
        <div className="mr-3 flex-shrink-0">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold truncate">{user.name}</span>
            {user.isVerified && (
              <VerifiedIcon className="w-4 h-4 text-primary" />
            )}
            <span className="text-gray-500 truncate">@{user.username}</span>
            <span className="text-gray-500">・</span>
            <span className="text-gray-500">{timestamp}</span>
          </div>
          <p className="mt-1 text-gray-900">{content}</p>
          {media && (
            <div className="mt-3 rounded-xl overflow-hidden">
              {media.type === "image" ? (
                <Image
                  src={media.url}
                  alt=""
                  width={500}
                  height={300}
                  className="w-full object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  controls
                  className="w-full"
                  poster="/video-thumbnail.jpg"
                />
              )}
            </div>
          )}
          <div className="flex justify-between mt-3 max-w-md text-gray-500">
            <button className="flex items-center group">
              <ChatBubbleOvalLeftIcon className="w-5 h-5 group-hover:text-primary" />
              <span className="ml-1 text-sm group-hover:text-primary">{stats.replies}</span>
            </button>
            <button className="flex items-center group">
              <ArrowPathRoundedSquareIcon className="w-5 h-5 group-hover:text-green-500" />
              <span className="ml-1 text-sm group-hover:text-green-500">{stats.reposts}</span>
            </button>
            <button className="flex items-center group">
              <HeartIcon className="w-5 h-5 group-hover:text-pink-500" />
              <span className="ml-1 text-sm group-hover:text-pink-500">{stats.likes}</span>
            </button>
            <button className="flex items-center group">
              <ChartBarIcon className="w-5 h-5 group-hover:text-primary" />
              <span className="ml-1 text-sm group-hover:text-primary">{stats.views}</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="group">
                <BookmarkIcon className="w-5 h-5 group-hover:text-primary" />
              </button>
              <button className="group">
                <ShareIcon className="w-5 h-5 group-hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 