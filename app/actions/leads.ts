'use server'

import { sql } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createLeadAction(formData: FormData) {
  const session = await getSessionUser()
  if (!session) throw new Error('Não autorizado')

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = (formData.get('phone') as string) || null
  const company = (formData.get('company') as string) || null
  const value = parseFloat((formData.get('value') as string) || '0')
  const status = (formData.get('status') as string) || 'NOVO'
  const notes = (formData.get('notes') as string) || null

  await sql`
    INSERT INTO leads (name, email, phone, company, value, status, notes, user_id)
    VALUES (${name}, ${email}, ${phone}, ${company}, ${value}, ${status}, ${notes}, ${session.userId})
  `

  revalidatePath('/leads')
  revalidatePath('/dashboard')
}

export async function updateLeadStatusAction(id: string, status: string) {
  const session = await getSessionUser()
  if (!session) throw new Error('Não autorizado')

  await sql`
    UPDATE leads
    SET status = ${status}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id} AND user_id = ${session.userId}
  `

  revalidatePath('/leads')
  revalidatePath('/dashboard')
}

export async function deleteLeadAction(id: string) {
  const session = await getSessionUser()
  if (!session) throw new Error('Não autorizado')

  await sql`
    DELETE FROM leads
    WHERE id = ${id} AND user_id = ${session.userId}
  `

  revalidatePath('/leads')
  revalidatePath('/dashboard')
}