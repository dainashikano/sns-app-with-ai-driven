import { PrismaClient } from '../generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prismaクライアントの設定を改善
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  // 接続プールの設定を追加
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// 開発環境でのクリーンアップ処理
if (process.env.NODE_ENV === 'development') {
  // プロセス終了時の適切なクリーンアップ
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
  
  process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  
  process.on('SIGTERM', async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
} 