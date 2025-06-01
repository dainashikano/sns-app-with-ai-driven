// ポスト関連の定数定義

export const POST_VALIDATION = {
  MAX_CONTENT_LENGTH: 280,
  MIN_CONTENT_LENGTH: 1,
} as const;

export const CACHE_SETTINGS = {
  POST_REVALIDATE_TIME: 60, // 1分間
  POST_DETAIL_REVALIDATE_TIME: 60, // 1分間
} as const;

export const ERROR_MESSAGES = {
  POST_ID_REQUIRED: 'ポストIDが必要です',
  CONTENT_REQUIRED: 'コメント内容が必要です',
  CONTENT_TOO_LONG: 'コメントは280文字以内で入力してください',
  AUTH_REQUIRED: '認証が必要です',
  POST_NOT_FOUND: 'ポストが見つかりません',
  COMMENT_CREATE_FAILED: 'コメントの投稿に失敗しました',
  VALIDATION_ERROR: 'バリデーションエラーが発生しました',
  POST_FETCH_FAILED: 'ポストの取得に失敗しました',
} as const;

export const UI_TEXT = {
  POST_TITLE: 'ポスト',
  REPLY_PLACEHOLDER: '返信をポストする',
  REPLY_BUTTON: '返信',
  POSTING: '投稿中...',
  NO_REPLIES: 'まだリプライがありません',
  ANONYMOUS_USER: '名無しユーザー',
} as const; 