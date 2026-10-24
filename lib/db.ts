import 'server-only'
import postgres from 'postgres'

const globalForDb = globalThis as unknown as {
  sql: ReturnType<typeof postgres> | undefined
}

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mini_leads_crm'

export const sql = globalForDb.sql ?? postgres(connectionString, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
})

if (process.env.NODE_ENV !== 'production') globalForDb.sql = sql