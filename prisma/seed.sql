-- SNS with AI-Driven - Seed Data
-- SupabaseのSQLエディタで実行してください

-- 既存データをクリア（必要に応じて）
-- TRUNCATE TABLE notifications, comment_likes, follows, likes, comments, post_images, posts, users RESTART IDENTITY CASCADE;

-- ユーザーデータの挿入
INSERT INTO users (id, email, username, password, name, bio, "profileImage", "coverImage", location, website, "createdAt", "updatedAt") VALUES
('user_alice_001', 'alice@example.com', 'alice', null, 'Alice Johnson', 'フロントエンド開発者です。React と TypeScript が大好きです！', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop', '東京, 日本', 'https://alice-dev.com', NOW(), NOW()),
('user_bob_002', 'bob@example.com', 'bob', null, 'Bob Smith', 'バックエンド開発者。Node.js と PostgreSQL を使っています。', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop', 'サンフランシスコ, アメリカ', 'https://bobsmith.dev', NOW(), NOW()),
('user_charlie_003', 'charlie@example.com', 'charlie', null, 'Charlie Brown', 'デザイナー兼開発者。UI/UXデザインとフロントエンド開発をしています。', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=400&fit=crop', 'ロンドン, イギリス', null, NOW(), NOW());

-- 投稿データの挿入
INSERT INTO posts (id, content, "userId", "likesCount", "commentsCount", "createdAt", "updatedAt") VALUES
('post_001', '新しいプロジェクトを始めました！Next.js 15 と Prisma を使って SNS アプリを作っています。🚀', 'user_alice_001', 2, 1, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours'),
('post_002', 'TypeScript の型安全性は本当に素晴らしいですね。開発効率が格段に上がります。💻✨', 'user_bob_002', 1, 1, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour'),
('post_003', '新しいデザインシステムを作成中です。Figma と Storybook を使って統一感のあるUIを目指しています。🎨', 'user_charlie_003', 1, 1, NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 minutes'),
('post_004', '今日は素晴らしい天気ですね！コーディングが捗ります。☀️', 'user_alice_001', 0, 0, NOW() - INTERVAL '15 minutes', NOW() - INTERVAL '15 minutes'),
('post_005', 'PostgreSQLの新機能について調べています。データベース設計って奥が深いですね。🗄️', 'user_bob_002', 0, 0, NOW() - INTERVAL '10 minutes', NOW() - INTERVAL '10 minutes');

-- 投稿画像データの挿入
INSERT INTO post_images (id, "postId", "imageUrl", "createdAt") VALUES
('img_001', 'post_001', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', NOW() - INTERVAL '2 hours'),
('img_002', 'post_003', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop', NOW() - INTERVAL '30 minutes'),
('img_003', 'post_003', 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop', NOW() - INTERVAL '30 minutes');

-- いいねデータの挿入
INSERT INTO likes (id, "userId", "postId", "createdAt") VALUES
('like_001', 'user_bob_002', 'post_001', NOW() - INTERVAL '1 hour 30 minutes'),
('like_002', 'user_charlie_003', 'post_001', NOW() - INTERVAL '1 hour'),
('like_003', 'user_alice_001', 'post_002', NOW() - INTERVAL '45 minutes'),
('like_004', 'user_bob_002', 'post_003', NOW() - INTERVAL '20 minutes');

-- コメントデータの挿入
INSERT INTO comments (id, content, "userId", "postId", "likesCount", "createdAt", "updatedAt") VALUES
('comment_001', '素晴らしいプロジェクトですね！応援しています。頑張ってください！ 🎉', 'user_bob_002', 'post_001', 1, NOW() - INTERVAL '1 hour 15 minutes', NOW() - INTERVAL '1 hour 15 minutes'),
('comment_002', '同感です！TypeScriptなしでは開発できません。', 'user_alice_001', 'post_002', 1, NOW() - INTERVAL '50 minutes', NOW() - INTERVAL '50 minutes'),
('comment_003', 'デザインシステム、とても興味深いです！完成したら見せてください。', 'user_alice_001', 'post_003', 0, NOW() - INTERVAL '25 minutes', NOW() - INTERVAL '25 minutes'),
('comment_004', 'Next.js 15の新機能も気になります！', 'user_charlie_003', 'post_001', 0, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour');

-- コメントいいねデータの挿入
INSERT INTO comment_likes (id, "commentId", "userId", "createdAt") VALUES
('comment_like_001', 'comment_001', 'user_charlie_003', NOW() - INTERVAL '1 hour'),
('comment_like_002', 'comment_002', 'user_bob_002', NOW() - INTERVAL '40 minutes');

-- フォローデータの挿入
INSERT INTO follows (id, "followerId", "followingId", "createdAt") VALUES
('follow_001', 'user_alice_001', 'user_bob_002', NOW() - INTERVAL '3 days'),
('follow_002', 'user_alice_001', 'user_charlie_003', NOW() - INTERVAL '2 days'),
('follow_003', 'user_bob_002', 'user_charlie_003', NOW() - INTERVAL '1 day'),
('follow_004', 'user_charlie_003', 'user_alice_001', NOW() - INTERVAL '1 day'),
('follow_005', 'user_bob_002', 'user_alice_001', NOW() - INTERVAL '12 hours');

-- 通知データの挿入
INSERT INTO notifications (id, "receiverId", "senderId", type, "postId", "commentId", read, "createdAt") VALUES
('notif_001', 'user_alice_001', 'user_bob_002', 'like', 'post_001', null, false, NOW() - INTERVAL '1 hour 30 minutes'),
('notif_002', 'user_alice_001', 'user_charlie_003', 'like', 'post_001', null, false, NOW() - INTERVAL '1 hour'),
('notif_003', 'user_alice_001', 'user_bob_002', 'comment', 'post_001', 'comment_001', true, NOW() - INTERVAL '1 hour 15 minutes'),
('notif_004', 'user_bob_002', 'user_alice_001', 'like', 'post_002', null, false, NOW() - INTERVAL '45 minutes'),
('notif_005', 'user_bob_002', 'user_alice_001', 'follow', null, null, true, NOW() - INTERVAL '3 days'),
('notif_006', 'user_charlie_003', 'user_alice_001', 'follow', null, null, false, NOW() - INTERVAL '2 days'),
('notif_007', 'user_charlie_003', 'user_bob_002', 'follow', null, null, false, NOW() - INTERVAL '1 day'),
('notif_008', 'user_bob_002', 'user_charlie_003', 'comment_like', 'post_001', 'comment_001', false, NOW() - INTERVAL '1 hour'),
('notif_009', 'user_charlie_003', 'user_bob_002', 'like', 'post_003', null, false, NOW() - INTERVAL '20 minutes');

-- 投稿のカウンター更新（最終的な数値に合わせる）
UPDATE posts SET "likesCount" = 2, "commentsCount" = 2 WHERE id = 'post_001';
UPDATE posts SET "likesCount" = 1, "commentsCount" = 1 WHERE id = 'post_002';
UPDATE posts SET "likesCount" = 1, "commentsCount" = 1 WHERE id = 'post_003';

-- コメントのカウンター更新
UPDATE comments SET "likesCount" = 1 WHERE id = 'comment_001';
UPDATE comments SET "likesCount" = 1 WHERE id = 'comment_002';

-- 実行結果の確認
SELECT 
  'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'posts', COUNT(*) FROM posts
UNION ALL
SELECT 'post_images', COUNT(*) FROM post_images
UNION ALL
SELECT 'likes', COUNT(*) FROM likes
UNION ALL
SELECT 'comments', COUNT(*) FROM comments
UNION ALL
SELECT 'comment_likes', COUNT(*) FROM comment_likes
UNION ALL
SELECT 'follows', COUNT(*) FROM follows
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
ORDER BY table_name; 