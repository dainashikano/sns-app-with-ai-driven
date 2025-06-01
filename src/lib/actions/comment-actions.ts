'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../prisma';
import { getCurrentUser } from '../dal/auth';
import { z } from 'zod';
import { POST_VALIDATION, ERROR_MESSAGES } from '../constants/post-constants';

const createCommentSchema = z.object({
  postId: z.string().min(POST_VALIDATION.MIN_CONTENT_LENGTH, ERROR_MESSAGES.POST_ID_REQUIRED),
  content: z.string()
    .min(POST_VALIDATION.MIN_CONTENT_LENGTH, ERROR_MESSAGES.CONTENT_REQUIRED)
    .max(POST_VALIDATION.MAX_CONTENT_LENGTH, ERROR_MESSAGES.CONTENT_TOO_LONG),
});

export async function createComment(postId: string, content: string) {
  try {
    // バリデーション
    const validatedData = createCommentSchema.parse({ postId, content });
    
    // 現在のユーザーを取得
    const currentUserId = await getCurrentUser();
    
    if (!currentUserId) {
      throw new Error(ERROR_MESSAGES.AUTH_REQUIRED);
    }

    // ポストが存在するかチェック
    const post = await prisma.post.findUnique({
      where: { id: validatedData.postId },
    });

    if (!post) {
      throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
    }

    // コメントを作成
    const comment = await prisma.comment.create({
      data: {
        content: validatedData.content,
        userId: currentUserId,
        postId: validatedData.postId,
      },
      include: {
        user: true,
      },
    });

    // ポストのコメント数を更新
    await prisma.post.update({
      where: { id: validatedData.postId },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    });

    // キャッシュを再検証
    revalidatePath('/');
    revalidatePath(`/post/${validatedData.postId}`);
    
    return { success: true, comment };
  } catch (error) {
    console.error('コメント作成エラー:', error);
    
    if (error instanceof z.ZodError) {
      throw new Error(
        error.errors[0]?.message || ERROR_MESSAGES.VALIDATION_ERROR
      );
    }
    
    throw new Error(ERROR_MESSAGES.COMMENT_CREATE_FAILED);
  }
} 