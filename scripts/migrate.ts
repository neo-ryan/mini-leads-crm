import postgres from 'postgres'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

async function runMigration() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    process.exit(1)
  }

  const sql = postgres(connectionString)
  const schemaPath = path.join(process.cwd(), 'schema.sql')
  const schemaSql = fs.readFileSync(schemaPath, 'utf8')

  try {
    await sql.unsafe(schemaSql)
  } catch (error) {
    process.exit(1)
  } finally {
    await sql.end()
  }
}

runMigration()