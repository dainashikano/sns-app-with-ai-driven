# Clerk Webhook と Supabase 同期セットアップガイド

このガイドでは、Clerkの認証イベントでSupabaseのユーザーテーブルに自動的にユーザー情報を同期する設定方法を説明します。

## 1. 環境変数の設定

`.env`ファイルに以下の環境変数が設定されていることを確認してください：

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-publishable-key"
CLERK_SECRET_KEY="sk_test_your-secret-key"
CLERK_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

## 2. Supabase テーブル設定

### 2.1 ユーザーテーブルの作成

SupabaseのSQL Editorで以下のSQLを実行してください：

```sql
-- ユーザーテーブルの作成
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT,
    name TEXT,
    bio TEXT,
    "profileImage" TEXT,
    "coverImage" TEXT,
    location TEXT,
    website TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- 更新時間の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE
    ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2.2 RLS（Row Level Security）の設定

```sql
-- RLSを有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- サービスロールでの完全アクセスを許可
CREATE POLICY "Service role can do everything" ON users
    FOR ALL USING (auth.role() = 'service_role');

-- 認証済みユーザーは自分の情報のみ更新可能
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid()::text = id);

-- 認証済みユーザーは全てのユーザー情報を読み取り可能
CREATE POLICY "Users can read all profiles" ON users
    FOR SELECT USING (true);
```

## 3. Clerk Dashboard での Webhook 設定

### 3.1 Webhookエンドポイントの追加

1. [Clerk Dashboard](https://dashboard.clerk.dev/) にログイン
2. プロジェクトを選択
3. 左サイドバーから **"Webhooks"** をクリック
4. **"Add Endpoint"** をクリック
5. **Endpoint URL** に以下を入力：
   ```
   https://your-domain.com/api/webhooks/clerk
   ```
   （ローカル開発の場合はngrokなどを使用）

### 3.2 イベントタイプの選択

以下のイベントタイプを選択してください：

- `user.created` - ユーザーアカウント作成時
- `user.updated` - ユーザー情報更新時
- `user.deleted` - ユーザーアカウント削除時

### 3.3 Webhook Secret の取得

1. 作成したWebhookエンドポイントをクリック
2. **"Signing Secret"** をコピー
3. `.env`ファイルの `CLERK_WEBHOOK_SECRET` に設定

## 4. デプロイメント

### 4.1 本番環境でのWebhook URL

本番環境では、実際のドメインを使用してWebhook URLを設定してください：

```
https://your-app.vercel.app/api/webhooks/clerk
```

### 4.2 ローカル開発での Webhook テスト

ローカル開発でWebhookをテストする場合は、ngrokを使用してください：

```bash
# ngrokのインストール（必要な場合）
npm install -g ngrok

# Next.jsアプリケーションを起動
npm run dev

# 別ターミナルでngrokを起動
ngrok http 3000
```

ngrokから提供されたHTTPS URLを使用してWebhookエンドポイントを設定：
```
https://abc123.ngrok.io/api/webhooks/clerk
```

## 5. テスト手順

### 5.1 Webhookの動作確認

1. アプリケーションで新しいユーザーアカウントを作成
2. Supabaseのテーブルエディタで `users` テーブルを確認
3. 新しいユーザー情報が自動的に追加されていることを確認

### 5.2 ログの確認

サーバーログで以下のメッセージが表示されることを確認：

```
ユーザー user.created 成功 (Prisma & Supabase): user_xxxxxxxxx
```

### 5.3 トラブルシューティング

#### Webhook検証エラー

```
Webhook検証エラー: Error: Invalid signature
```

- `CLERK_WEBHOOK_SECRET` が正しく設定されているか確認
- ClerkダッシュボードのSigning Secretが最新であることを確認

#### Supabase接続エラー

```
Supabaseユーザー同期エラー
```

- `SUPABASE_SERVICE_ROLE_KEY` が正しく設定されているか確認
- Supabaseプロジェクトが有効であることを確認
- RLSポリシーが正しく設定されているか確認

#### データベーススキーマエラー

```
column "profileImage" does not exist
```

- Supabaseのテーブル構造がPrismaスキーマと一致しているか確認
- カラム名の大文字小文字が正確であることを確認

## 6. セキュリティ考慮事項

1. **Webhook Secret**: Webhook Secretは安全に管理し、定期的に更新してください
2. **Service Role Key**: Supabase Service Role Keyは最高権限を持つため、安全に管理してください
3. **HTTPS**: 本番環境では必ずHTTPSを使用してください
4. **RLS**: Row Level Securityを適切に設定して、データアクセスを制御してください

## 7. モニタリング

- Clerk Dashboardでwebhookの成功/失敗状況を監視
- アプリケーションログでエラーを監視
- Supabaseのログでデータベース操作を監視

これで、ClerkとSupabaseの完全な同期が設定されました！ 