import 'server-only'
import postgres from 'postgres'

const globalForDb = globalThis as unknown as {
  sql: ReturnType<typeof postgres> | undefined
}

export const sql = globalForDb.sql ?? postgres(process.env.DATABASE_URL!, {
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

if (process.env.NODE_ENV !== 'production') globalForDb.sql = sql