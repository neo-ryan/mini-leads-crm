'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { hashPassword, verifyPassword, createSessionToken } from '@/lib/auth'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Preencha todos os campos.' }
  }

  try {
    const users = await sql`SELECT id, password FROM users WHERE email = ${email}`
    const user = users[0]

    if (!user || !verifyPassword(password, user.password)) {
      return { error: 'E-mail ou senha incorretos.' }
    }

    const token = createSessionToken(user.id)
    const cookieStore = await cookies()
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  } catch (err: any) {
    if (err?.digest?.startsWith('NEXT_REDIRECT')) throw err
    return { error: err?.message || 'Erro de conexão com o banco de dados.' }
  }

  redirect('/dashboard')
}

export async function registerAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!email || !password || !confirmPassword) {
    return { error: 'Preencha todos os campos.' }
  }

  if (password !== confirmPassword) {
    return { error: 'As senhas não coincidem.' }
  }

  try {
    const existingUsers = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existingUsers.length > 0) {
      return { error: 'E-mail já cadastrado.' }
    }

    const hashedPassword = hashPassword(password)
    const newUsers = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
      RETURNING id
    `
    const user = newUsers[0]

    const token = createSessionToken(user.id)
    const cookieStore = await cookies()
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  } catch (err: any) {
    if (err?.digest?.startsWith('NEXT_REDIRECT')) throw err
    return { error: err?.message || 'Erro de conexão com o banco de dados.' }
  }

  redirect('/dashboard')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('session_token')
  redirect('/login')
}