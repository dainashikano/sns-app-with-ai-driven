import { supabase } from './supabase'
import { prisma } from './prisma'
import type { User } from '../types/database'

export async function signUp(email: string, password: string, username: string, name?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  if (data.user) {
    // Create user profile in database
    const user = await prisma.user.create({
      data: {
        id: data.user.id,
        email,
        username,
        name,
      },
    })
    return { user: data.user, profile: user }
  }

  return { user: null, profile: null }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await prisma.user.findFirst();
    return user;
  } catch (error) {
    console.error('getCurrentUser エラー:', error);
    return null;
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const user = await getCurrentUser();
    return user?.id || null;
  } catch (error) {
    console.error('getCurrentUserId エラー:', error);
    return null;
  }
}

export async function updateUserProfile(userId: string, data: Partial<User>) {
  return await prisma.user.update({
    where: { id: userId },
    data,
  })
} 