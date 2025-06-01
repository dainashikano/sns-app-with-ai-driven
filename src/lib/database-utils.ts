import { prisma } from './prisma'
import { NotificationType } from '../types/database'
import type { 
  PostWithAuthor, 
  UserWithCounts, 
  CommentWithAuthor, 
  NotificationWithRelations
} from '../types/database'

// Post related functions
export async function getPosts(page = 1, limit = 10): Promise<PostWithAuthor[]> {
  const posts = await prisma.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      likes: true,
      comments: {
        include: {
          user: true,
          commentLikes: true,
          _count: {
            select: {
              commentLikes: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      images: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  })

  return posts as PostWithAuthor[]
}

export async function getPostById(id: string): Promise<PostWithAuthor | null> {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: true,
      likes: true,
      comments: {
        include: {
          user: true,
          commentLikes: true,
          _count: {
            select: {
              commentLikes: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      images: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  })

  return post as PostWithAuthor | null
}

export async function createPost(userId: string, content: string, imageUrls?: string[]) {
  const post = await prisma.post.create({
    data: {
      content,
      userId,
      images: imageUrls ? {
        create: imageUrls.map(url => ({ imageUrl: url }))
      } : undefined,
    },
    include: {
      user: true,
      images: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  })

  return post
}

export async function updatePostCounts(postId: string) {
  const [likesCount, commentsCount] = await Promise.all([
    prisma.like.count({ where: { postId } }),
    prisma.comment.count({ where: { postId } }),
  ])

  await prisma.post.update({
    where: { id: postId },
    data: { likesCount, commentsCount },
  })
}

// User related functions
export async function getUserById(id: string): Promise<UserWithCounts | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  })

  return user as UserWithCounts | null
}

export async function getUserByUsername(username: string): Promise<UserWithCounts | null> {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  })

  return user as UserWithCounts | null
}

// Like related functions
export async function toggleLike(userId: string, postId: string) {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  })

  if (existingLike) {
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })
    
    // Update post likes count
    await updatePostCounts(postId)
    
    return { liked: false }
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    })
    
    // Update post likes count and create notification
    await Promise.all([
      updatePostCounts(postId),
      createNotification(userId, postId, NotificationType.LIKE)
    ])
    
    return { liked: true }
  }
}

// Comment related functions
export async function createComment(userId: string, postId: string, content: string) {
  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
    include: {
      user: true,
      commentLikes: true,
      _count: {
        select: {
          commentLikes: true,
        },
      },
    },
  })

  // Update post comments count and create notification
  await Promise.all([
    updatePostCounts(postId),
    createNotification(userId, postId, NotificationType.COMMENT, comment.id)
  ])

  return comment as CommentWithAuthor
}

export async function getCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      user: true,
      commentLikes: true,
      _count: {
        select: {
          commentLikes: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return comments as CommentWithAuthor[]
}

// Comment Like related functions
export async function toggleCommentLike(userId: string, commentId: string) {
  const existingLike = await prisma.commentLike.findUnique({
    where: {
      commentId_userId: {
        commentId,
        userId,
      },
    },
  })

  if (existingLike) {
    await prisma.commentLike.delete({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    })
    
    // Update comment likes count
    await updateCommentLikesCount(commentId)
    
    return { liked: false }
  } else {
    await prisma.commentLike.create({
      data: {
        userId,
        commentId,
      },
    })
    
    // Update comment likes count and create notification
    await Promise.all([
      updateCommentLikesCount(commentId),
      createCommentLikeNotification(userId, commentId)
    ])
    
    return { liked: true }
  }
}

export async function updateCommentLikesCount(commentId: string) {
  const likesCount = await prisma.commentLike.count({ where: { commentId } })
  
  await prisma.comment.update({
    where: { id: commentId },
    data: { likesCount },
  })
}

// Follow related functions
export async function toggleFollow(followerId: string, followingId: string) {
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  })

  if (existingFollow) {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    })
    return { following: false }
  } else {
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    })
    
    // Create follow notification
    await createFollowNotification(followerId, followingId)
    
    return { following: true }
  }
}

export async function isFollowing(followerId: string, followingId: string): Promise<boolean> {
  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  })

  return !!follow
}

// Notification related functions
export async function createNotification(
  senderId: string, 
  postId: string, 
  type: NotificationType, 
  commentId?: string
) {
  // Get the post to find the receiver
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { userId: true },
  })

  if (!post || post.userId === senderId) {
    // Don't create notification if post doesn't exist or user is liking their own post
    return
  }

  await prisma.notification.create({
    data: {
      senderId,
      receiverId: post.userId,
      type,
      postId,
      commentId,
    },
  })
}

export async function createCommentLikeNotification(senderId: string, commentId: string) {
  // Get the comment to find the receiver
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true, postId: true },
  })

  if (!comment || comment.userId === senderId) {
    // Don't create notification if comment doesn't exist or user is liking their own comment
    return
  }

  await prisma.notification.create({
    data: {
      senderId,
      receiverId: comment.userId,
      type: NotificationType.COMMENT_LIKE,
      postId: comment.postId,
      commentId,
    },
  })
}

export async function createFollowNotification(followerId: string, followingId: string) {
  await prisma.notification.create({
    data: {
      senderId: followerId,
      receiverId: followingId,
      type: NotificationType.FOLLOW,
    },
  })
}

export async function getNotifications(userId: string, page = 1, limit = 20): Promise<NotificationWithRelations[]> {
  const notifications = await prisma.notification.findMany({
    where: { receiverId: userId },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      sender: true,
      receiver: true,
      post: true,
      comment: {
        include: {
          user: true,
        },
      },
    },
  })

  return notifications as NotificationWithRelations[]
}

export async function markNotificationAsRead(notificationId: string) {
  await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  })
}

export async function markAllNotificationsAsRead(userId: string) {
  await prisma.notification.updateMany({
    where: { 
      receiverId: userId,
      read: false,
    },
    data: { read: true },
  })
}

export async function getUnreadNotificationsCount(userId: string): Promise<number> {
  return await prisma.notification.count({
    where: {
      receiverId: userId,
      read: false,
    },
  })
} 