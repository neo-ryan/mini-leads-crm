import { sql } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LeadsClient from './LeadsClient'

export default async function LeadsPage() {
  const session = await getSessionUser()
  if (!session) redirect('/login')

  const leads = await sql`
    SELECT id, name, email, phone, company, value, status, notes
    FROM leads
    WHERE user_id = ${session.userId}
    ORDER BY created_at DESC
  `

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-6">
      <LeadsClient initialLeads={leads as any} />
    </main>
  )
}