import 'server-only'
import postgres from 'postgres'

const globalForDb = globalThis as unknown as {
  sql: ReturnType<typeof postgres> | undefined
}

function createClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) return null as unknown as ReturnType<typeof postgres>

  try {
    return postgres(connectionString, {
      ssl: 'require',
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    })
  } catch (err) {
    console.error('DATABASE_URL inválida:', err)
    return null as unknown as ReturnType<typeof postgres>
  }
}

export const sql = globalForDb.sql ?? createClient()

if (process.env.NODE_ENV !== 'production' && sql) {
  globalForDb.sql = sql
}