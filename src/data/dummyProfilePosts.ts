import { Post } from '../types/post';

const author = {
  id: 'shin',
  name: 'Shin@プログラミングチュートリアル',
  username: 'Shin_Engineer',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shin'
};

export const dummyProfilePosts: Post[] = [
  {
    id: 'p1',
    content: '【ShinCode_Camp】運営中です🚀\n👨‍💻僕がリリースしたUdemy講座見放題\n📘オリジナルWebプログラムコース見放題\n👋Shinと個別相談可能\n🎮無料版Discordコミュニティで情報共有\n🎁1週間の無料トライアル付き\nYoutubeにはない深い学びを提供中。気になる方は今すぐチェック！',
    author,
    likes: 42,
    comments: 7,
    reposts: 12,
    isLiked: false,
    createdAt: '2024-03-17T10:00:00Z'
  },
  {
    id: 'p2',
    content: '新しいNext.js講座を公開しました！\n最新のNext.js 14の機能を詳しく解説しています。\nApp RouterやServer Componentsなど、モダンなWeb開発の基礎から応用まで学べます。\n#nextjs #programming #webdev',
    author,
    likes: 156,
    comments: 23,
    reposts: 45,
    isLiked: true,
    createdAt: '2024-03-16T15:30:00Z'
  },
  {
    id: 'p3',
    content: 'TypeScriptの基礎講座、好評配信中！\n型システムの基礎から実践的な使い方まで、分かりやすく解説しています。\nプログラミング初心者の方でも安心して学べる内容になっています。\n#typescript #programming',
    author,
    likes: 89,
    comments: 12,
    reposts: 18,
    isLiked: false,
    createdAt: '2024-03-15T09:15:00Z'
  },
  {
    id: 'p4',
    content: 'NotePressの新機能をリリースしました！\n- マークダウンエディタの改善\n- 画像アップロード機能の強化\n- パフォーマンスの最適化\n\nぜひチェックしてください！\n#notepress #webdev',
    author,
    likes: 234,
    comments: 45,
    reposts: 67,
    isLiked: true,
    createdAt: '2024-03-14T14:20:00Z'
  },
  {
    id: 'p5',
    content: 'プログラミング学習のロードマップを作成しました！\n初心者の方向けに、何から始めればいいのかを分かりやすくまとめています。\nYouTubeチャンネルで公開中です！\n#programming #learning',
    author,
    likes: 312,
    comments: 56,
    reposts: 89,
    isLiked: false,
    createdAt: '2024-03-13T11:45:00Z'
  },
  {
    id: 'p6',
    content: 'React Hooksの実践的な使い方について新しい動画を公開しました！\nuseEffect, useCallback, useMemoの使い方を実例を交えて解説しています。\n#react #javascript #programming',
    author,
    likes: 178,
    comments: 34,
    reposts: 56,
    isLiked: false,
    createdAt: '2024-03-12T16:30:00Z'
  },
  {
    id: 'p7',
    content: 'TailwindCSSマスターコースの制作を開始しました！\nユーティリティファーストなCSSフレームワークの使い方を徹底解説します。\n来月リリース予定です！\n#tailwindcss #css #webdev',
    author,
    likes: 145,
    comments: 28,
    reposts: 42,
    isLiked: true,
    createdAt: '2024-03-11T13:20:00Z'
  },
  {
    id: 'p8',
    content: 'プログラミング学習で挫折しない方法について、ブログを書きました。\n継続的な学習のコツや、モチベーション維持の方法をまとめています。\nリンクはプロフィールから！\n#programming #study',
    author,
    likes: 267,
    comments: 48,
    reposts: 73,
    isLiked: false,
    createdAt: '2024-03-10T10:10:00Z'
  },
  {
    id: 'p9',
    content: 'Discord コミュニティでのQ&Aセッションを開催します！\n日時：来週土曜日 20:00〜\nテーマ：Web開発のキャリアについて\n参加をお待ちしています！\n#discord #community',
    author,
    likes: 198,
    comments: 67,
    reposts: 34,
    isLiked: true,
    createdAt: '2024-03-09T17:45:00Z'
  },
  {
    id: 'p10',
    content: 'GitHub Copilotの活用方法について新しい動画を公開しました！\nAIを使った効率的なコーディング手法を解説しています。\nチャンネル登録もお願いします！\n#github #ai #programming',
    author,
    likes: 289,
    comments: 51,
    reposts: 82,
    isLiked: false,
    createdAt: '2024-03-08T12:30:00Z'
  }
]; 