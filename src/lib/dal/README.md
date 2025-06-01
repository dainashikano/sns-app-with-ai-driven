# Data Access Layer (DAL)

このディレクトリには、SNSアプリケーションのData Access Layer（DAL）が実装されています。

## 設計思想

DALは以下の原則に基づいて設計されています：

### 1. 関心の分離 (Separation of Concerns)
- データアクセスロジックをビジネスロジックから分離
- UIコンポーネントはDALのみを使用し、直接Prismaクライアントを呼ばない
- データベースクエリの複雑さをカプセル化

### 2. キャッシング戦略
- Next.js 14の`unstable_cache`を使用して効率的なキャッシング
- 適切なタグ付けによる細粒度キャッシュ制御
- キャッシュ無効化の戦略的実装

### 3. 型安全性
- TypeScriptの型システムを活用
- PrismaからのRAW型をドメインオブジェクトに変換
- マッパー関数による一貫したデータ変換

## ディレクトリ構造

```
src/lib/dal/
├── auth.ts       # 認証関連のDAL（ユーザーセッション管理）
├── users.ts      # ユーザー関連のDAL（プロフィール、フォロー関係）
├── posts.ts      # 投稿関連のDAL（投稿CRUD、タイムライン）
├── mappers.ts    # データ変換用マッパー関数
├── index.ts      # 統一エクスポート
└── README.md     # このファイル
```

## 使用例

### 基本的な使用方法

```typescript
// ❌ 直接Prismaを呼ぶ（推奨しない）
const user = await prisma.user.findUnique({ where: { id: userId } });

// ✅ DALを使用（推奨）
import { getUserById } from '@/lib/dal';
const user = await getUserById(userId);
```

### キャッシュの恩恵

```typescript
// 同じユーザーIDで複数回呼び出しても、キャッシュが効くため1回のDBクエリのみ
const user1 = await getUserById('user123'); // DBクエリ実行
const user2 = await getUserById('user123'); // キャッシュから返却
```

## パフォーマンス最適化

### 1. キャッシュ戦略
- **短時間キャッシュ (60秒)**: 投稿一覧、ユーザー投稿
- **中時間キャッシュ (300秒)**: ユーザープロフィール、単一投稿
- **長時間キャッシュ (600秒)**: 全ユーザー一覧

### 2. データフェッチ最適化
- 必要なリレーションのみをinclude
- 一貫したクエリパターンによる予測可能性
- ページネーション対応（将来実装予定）

### 3. 認証の効率化
- 現在ユーザーの取得をキャッシュ
- 重複する認証チェックを排除

## 移行前後の比較

### Before: 分散したデータフェッチ
```typescript
// 各コンポーネントで個別にデータフェッチ
const PostsList = async () => {
  const currentUser = await prisma.user.findFirst(); // 毎回実行
  const posts = await prisma.post.findMany({...}); // キャッシュなし
  // マッピング処理...
}

const UserProfile = async () => {
  const currentUser = await prisma.user.findFirst(); // 重複実行
  const user = await prisma.user.findUnique({...}); // キャッシュなし
  // マッピング処理...
}
```

### After: DALによる一元管理
```typescript
// キャッシュされた効率的なデータフェッチ
const PostsList = async () => {
  const posts = await getPosts(); // キャッシュ効果、マッピング済み
}

const UserProfile = async () => {
  const user = await getUserById(userId); // キャッシュ効果、マッピング済み
}
```

## メリット

### 1. パフォーマンス向上
- 重複したデータベースクエリの排除
- 効率的なキャッシングによる応答速度向上
- メモリ使用量の最適化

### 2. 保守性向上
- データアクセスロジックの一元化
- 一貫したエラーハンドリング
- テスタビリティの向上

### 3. スケーラビリティ
- キャッシュ戦略の柔軟性
- データベース負荷の分散
- 将来的な拡張への対応力

## 注意点

- キャッシュの適切な無効化が重要
- 実時間性が求められるデータには注意
- メモリ使用量の監視が必要

## 今後の拡張

- リアルタイム機能との統合
- より細かいキャッシュ制御
- パフォーマンスメトリクスの追加 