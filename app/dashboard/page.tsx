import { sql } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, DollarSign, CheckCircle2, TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Dashboard() {
  const session = await getSessionUser()
  if (!session) redirect('/login')

  const leads = await sql`
    SELECT value, status FROM leads WHERE user_id = ${session.userId}
  `

  const totalLeads = leads.length
  const totalPipelineValue = leads.reduce((acc, lead) => acc + Number(lead.value), 0)
  const wonLeads = leads.filter((lead) => lead.status === 'GANHO')
  const totalWonValue = wonLeads.reduce((acc, lead) => acc + Number(lead.value), 0)
  const conversionRate = totalLeads > 0 ? ((wonLeads.length / totalLeads) * 100).toFixed(1) : '0'

  const statusCounts = {
    NOVO: leads.filter((l) => l.status === 'NOVO').length,
    CONTATADO: leads.filter((l) => l.status === 'CONTATADO').length,
    PROPOSTA: leads.filter((l) => l.status === 'PROPOSTA').length,
    GANHO: leads.filter((l) => l.status === 'GANHO').length,
    PERDIDO: leads.filter((l) => l.status === 'PERDIDO').length,
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-jet">Visão Geral das Vendas</h1>
          <p className="text-zinc-400 text-xs">Acompanhe o desempenho do seu funil e converta mais clientes.</p>
        </div>
        <Link href="/leads">
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
            <Plus className="w-4 h-4" /> Gerenciar Leads
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Total de Leads</CardTitle>
            <Users className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white font-jet">{totalLeads}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Pipeline Total</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white font-jet">
              R$ {totalPipelineValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Vendas Fechadas</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400 font-jet">
              R$ {totalWonValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-zinc-400">Taxa de Conversão</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white font-jet">{conversionRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900/60 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-zinc-200">Distribuição por Etapa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="bg-zinc-800/40 p-3 rounded border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">{status}</span>
                <span className="text-xl font-bold text-white font-jet mt-1 block">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}