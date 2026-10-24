import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Target, LogOut, LayoutDashboard, Users } from 'lucide-react'
import { getSessionUser } from '@/lib/auth'
import { logoutAction } from '@/app/actions/auth'

export default async function Navbar() {
  const session = await getSessionUser()

  return (
    <header className="w-full border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md">
      <nav className="font-jet flex flex-row justify-between items-center max-w-7xl mx-auto px-4 py-3 sm:p-4 gap-2">
        <div className="flex gap-4 sm:gap-8 items-center">
          <Link href="/" className="flex gap-2 tracking-tight font-bold text-white items-center text-sm sm:text-base">
            <Target className="text-emerald-500 w-5 h-5 shrink-0" />
            <span>Mini-CRM</span>
          </Link>
          {session && (
            <div className="hidden sm:flex flex-row gap-6 text-xs text-zinc-400">
              <Link href="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
              </Link>
              <Link href="/leads" className="flex items-center gap-1 hover:text-white transition-colors">
                <Users className="w-3.5 h-3.5" /> Leads
              </Link>
            </div>
          )}
        </div>

        <div>
          {session ? (
            <form action={logoutAction}>
              <Button variant="outline" size="sm" className="gap-2 border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs px-2.5">
                <LogOut className="w-3.5 h-3.5" /> Sair
              </Button>
            </form>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs px-3">
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}