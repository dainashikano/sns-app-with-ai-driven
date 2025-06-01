import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 データベースのシードを開始します...')

  // サンプルユーザーを作成
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      username: 'alice',
      name: 'Alice Johnson',
      bio: 'フロントエンド開発者です。React と TypeScript が大好きです！',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop',
      location: '東京, 日本',
      website: 'https://alice-dev.com',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      username: 'bob',
      name: 'Bob Smith',
      bio: 'バックエンド開発者。Node.js と PostgreSQL を使っています。',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop',
      location: 'サンフランシスコ, アメリカ',
      website: 'https://bobsmith.dev',
    },
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'charlie@example.com' },
    update: {},
    create: {
      email: 'charlie@example.com',
      username: 'charlie',
      name: 'Charlie Brown',
      bio: 'デザイナー兼開発者。UI/UXデザインとフロントエンド開発をしています。',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=400&fit=crop',
      location: 'ロンドン, イギリス',
    },
  })

  // サンプル投稿を作成
  const post1 = await prisma.post.create({
    data: {
      content: '新しいプロジェクトを始めました！Next.js 15 と Prisma を使って SNS アプリを作っています。🚀',
      userId: user1.id,
      likesCount: 0,
      commentsCount: 0,
      images: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
          },
        ],
      },
    },
  })

  const post2 = await prisma.post.create({
    data: {
      content: 'TypeScript の型安全性は本当に素晴らしいですね。開発効率が格段に上がります。💻✨',
      userId: user2.id,
      likesCount: 0,
      commentsCount: 0,
    },
  })

  const post3 = await prisma.post.create({
    data: {
      content: '新しいデザインシステムを作成中です。Figma と Storybook を使って統一感のあるUIを目指しています。🎨',
      userId: user3.id,
      likesCount: 0,
      commentsCount: 0,
      images: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
          },
        ],
      },
    },
  })

  // サンプルコメントを作成
  const comment1 = await prisma.comment.create({
    data: {
      content: '素晴らしいプロジェクトですね！応援しています。頑張ってください！ 🎉',
      userId: user2.id,
      postId: post1.id,
      likesCount: 0,
    },
  })

  const comment2 = await prisma.comment.create({
    data: {
      content: '同感です！TypeScriptなしでは開発できません。',
      userId: user1.id,
      postId: post2.id,
      likesCount: 0,
    },
  })

  const comment3 = await prisma.comment.create({
    data: {
      content: 'デザインシステム、とても興味深いです！完成したら見せてください。',
      userId: user1.id,
      postId: post3.id,
      likesCount: 0,
    },
  })

  // サンプルいいねを作成
  await prisma.like.create({
    data: {
      userId: user1.id,
      postId: post2.id,
    },
  })

  await prisma.like.create({
    data: {
      userId: user3.id,
      postId: post1.id,
    },
  })

  await prisma.like.create({
    data: {
      userId: user2.id,
      postId: post3.id,
    },
  })

  // コメントいいねを作成
  await prisma.commentLike.create({
    data: {
      userId: user3.id,
      commentId: comment1.id,
    },
  })

  await prisma.commentLike.create({
    data: {
      userId: user2.id,
      commentId: comment2.id,
    },
  })

  // フォロー関係を作成
  await prisma.follow.create({
    data: {
      followerId: user1.id,
      followingId: user2.id,
    },
  })

  await prisma.follow.create({
    data: {
      followerId: user1.id,
      followingId: user3.id,
    },
  })

  await prisma.follow.create({
    data: {
      followerId: user2.id,
      followingId: user3.id,
    },
  })

  // サンプル通知を作成
  await prisma.notification.create({
    data: {
      senderId: user1.id,
      receiverId: user2.id,
      type: 'like',
      postId: post2.id,
      read: false,
    },
  })

  await prisma.notification.create({
    data: {
      senderId: user2.id,
      receiverId: user1.id,
      type: 'comment',
      postId: post1.id,
      commentId: comment1.id,
      read: false,
    },
  })

  await prisma.notification.create({
    data: {
      senderId: user1.id,
      receiverId: user2.id,
      type: 'follow',
      read: true,
    },
  })

  // 投稿のカウンターを更新
  await prisma.post.update({
    where: { id: post1.id },
    data: { likesCount: 1, commentsCount: 1 },
  })

  await prisma.post.update({
    where: { id: post2.id },
    data: { likesCount: 1, commentsCount: 1 },
  })

  await prisma.post.update({
    where: { id: post3.id },
    data: { likesCount: 1, commentsCount: 1 },
  })

  // コメントのカウンターを更新
  await prisma.comment.update({
    where: { id: comment1.id },
    data: { likesCount: 1 },
  })

  await prisma.comment.update({
    where: { id: comment2.id },
    data: { likesCount: 1 },
  })

  console.log('✅ シードデータの投入が完了しました！')
  console.log(`👤 作成されたユーザー: ${user1.username}, ${user2.username}, ${user3.username}`)
  console.log(`📝 作成された投稿: 3件`)
  console.log(`🖼️ 作成された投稿画像: 3件`)
  console.log(`💬 作成されたコメント: 3件`)
  console.log(`❤️ 作成された投稿いいね: 3件`)
  console.log(`👍 作成されたコメントいいね: 2件`)
  console.log(`👥 作成されたフォロー: 3件`)
  console.log(`🔔 作成された通知: 3件`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ シードデータの投入中にエラーが発生しました:', e)
    await prisma.$disconnect()
    process.exit(1)
  }) 