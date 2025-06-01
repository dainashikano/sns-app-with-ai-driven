import type { User } from './database'

// プロフィール編集用の型
export interface ProfileUpdateData {
  name?: string
  bio?: string
  location?: string
  website?: string
  profileImage?: string
  coverImage?: string
}

// プロフィール表示用の拡張ユーザー型
export interface UserProfile extends User {
  profileImage: string // デフォルト画像を含む（必須）
  coverImage: string   // デフォルト画像を含む（必須）
  _count: {
    posts: number
    followers: number
    following: number
  }
}

// 画像アップロード用の型
export interface ImageUploadResult {
  success: boolean
  url?: string
  error?: string
}

// プロフィール画像の種類
export enum ProfileImageType {
  PROFILE = 'profile',
  COVER = 'cover'
}

// 画像サイズの設定
export const IMAGE_SIZES = {
  profile: {
    small: { width: 40, height: 40 },
    medium: { width: 80, height: 80 },
    large: { width: 150, height: 150 },
  },
  cover: {
    mobile: { width: 600, height: 200 },
    desktop: { width: 1200, height: 400 },
  },
} as const

// プロフィール設定の検証ルール
export const PROFILE_VALIDATION = {
  name: {
    minLength: 1,
    maxLength: 50,
  },
  bio: {
    maxLength: 160,
  },
  website: {
    pattern: /^https?:\/\/.+/,
  },
  location: {
    maxLength: 30,
  },
} as const 