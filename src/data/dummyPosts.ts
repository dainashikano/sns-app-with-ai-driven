import { Post } from '../types/post';

export const dummyPosts: Post[] = [
  {
    id: '1',
    content: '今日は新しいプロジェクトを始めました！Next.jsとTypeScriptで開発しています。#programming #nextjs',
    author: {
      id: 'user1',
      name: '山田太郎',
      username: 'yamada_taro',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'
    },
    createdAt: '2024-03-20T10:00:00Z',
    likes: 42,
    comments: 5,
    reposts: 2,
    isLiked: false
  },
  {
    id: '2',
    content: '東京の桜が満開です🌸 今年は例年より早い開花となりました。#桜 #春',
    author: {
      id: 'user2',
      name: '佐藤花子',
      username: 'hanako_sato',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2'
    },
    createdAt: '2024-03-20T09:30:00Z',
    likes: 156,
    comments: 12,
    reposts: 8,
    isLiked: true
  },
  {
    id: '3',
    content: '新しいAI技術について記事を書きました。興味のある方はぜひ読んでみてください！ #AI #Tech',
    author: {
      id: 'user3',
      name: '鈴木一郎',
      username: 'ichiro_tech',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3'
    },
    createdAt: '2024-03-20T08:15:00Z',
    likes: 89,
    comments: 15,
    reposts: 23,
    isLiked: false
  },
  {
    id: '4',
    content: '今日のランチは新しくオープンしたラーメン屋さんへ🍜 スープが絶品でした！ #ランチ #グルメ',
    author: {
      id: 'user4',
      name: '田中美咲',
      username: 'misaki_food',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4'
    },
    createdAt: '2024-03-20T07:45:00Z',
    likes: 67,
    comments: 8,
    reposts: 3,
    isLiked: false
  },
  {
    id: '5',
    content: 'React 19のリリースが楽しみですね！新機能について調べてみました。Thread 🧵\n\n1/5 並列レンダリングの改善により、パフォーマンスが大幅に向上...',
    author: {
      id: 'user5',
      name: '高橋エンジニア',
      username: 'takahashi_dev',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user5'
    },
    createdAt: '2024-03-20T07:30:00Z',
    likes: 234,
    comments: 28,
    reposts: 45,
    isLiked: true
  },
  {
    id: '6',
    content: '今日の天気予報：東京都は晴れ時々曇り☀️ 最高気温は20度です。花粉の飛散量は多めなので、対策をお忘れなく！ #天気 #花粉',
    author: {
      id: 'user6',
      name: 'お天気bot',
      username: 'tokyo_weather',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user6'
    },
    createdAt: '2024-03-20T06:00:00Z',
    likes: 45,
    comments: 3,
    reposts: 12,
    isLiked: false
  },
  {
    id: '7',
    content: '新作ゲームのトレーラーが公開されました！グラフィックが前作から大幅に進化していて驚きです😮 #gaming #新作',
    author: {
      id: 'user7',
      name: '中村ゲーマー',
      username: 'nakamura_gamer',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user7'
    },
    createdAt: '2024-03-20T05:30:00Z',
    likes: 189,
    comments: 25,
    reposts: 34,
    isLiked: false
  },
  {
    id: '8',
    content: 'おはようございます！今日も一日頑張りましょう💪 朝活でコードを書いています。#朝活 #programming',
    author: {
      id: 'user8',
      name: '早起きエンジニア',
      username: 'morning_coder',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user8'
    },
    createdAt: '2024-03-20T04:00:00Z',
    likes: 78,
    comments: 7,
    reposts: 5,
    isLiked: true
  }
]; 