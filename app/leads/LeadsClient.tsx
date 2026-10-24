'use client'

import { useState } from 'react'
import { createLeadAction, updateLeadStatusAction, deleteLeadAction } from '@/app/actions/leads'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Mail, Phone, Building } from 'lucide-react'

type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  value: number
  status: 'NOVO' | 'CONTATADO' | 'PROPOSTA' | 'GANHO' | 'PERDIDO'
  notes: string | null
}

export default function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-jet">Gestão de Leads</h1>
          <p className="text-zinc-400 text-xs">Adicione, mova de etapa e acompanhe suas oportunidades de negócio.</p>
        </div>
        <Button onClick={() => setIsOpen(!isOpen)} className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
          <Plus className="w-4 h-4" /> Novo Lead
        </Button>
      </div>

      {isOpen && (
        <Card className="bg-zinc-900/90 border-zinc-800 p-4">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-sm font-semibold text-zinc-200">Cadastrar Nova Oportunidade</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form action={async (formData) => {
              await createLeadAction(formData)
              setIsOpen(false)
            }} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input name="name" placeholder="Nome do cliente *" required />
              <Input name="email" type="email" placeholder="E-mail *" required />
              <Input name="phone" placeholder="Telefone / WhatsApp" />
              <Input name="company" placeholder="Empresa / Negócio" />
              <Input name="value" type="number" step="0.01" placeholder="Valor Estimado (R$)" />
              <select name="status" className="h-8 border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 px-2 rounded outline-none">
                <option value="NOVO">NOVO</option>
                <option value="CONTATADO">CONTATADO</option>
                <option value="PROPOSTA">PROPOSTA</option>
                <option value="GANHO">GANHO</option>
                <option value="PERDIDO">PERDIDO</option>
              </select>
              <div className="md:col-span-3 flex justify-end gap-2 mt-2">
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white">Salvar Lead</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialLeads.map((lead) => (
          <Card key={lead.id} className="bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-white">{lead.name}</CardTitle>
                {lead.company && (
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3" /> {lead.company}
                  </span>
                )}
              </div>
              <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400 bg-emerald-950/20">
                {lead.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs space-y-1 text-zinc-300">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Mail className="w-3 h-3" /> {lead.email}
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Phone className="w-3 h-3" /> {lead.phone}
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="text-sm font-bold text-emerald-400 font-jet">
                  R$ {Number(lead.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    defaultValue={lead.status}
                    onChange={(e) => updateLeadStatusAction(lead.id, e.target.value)}
                    className="h-7 text-[11px] bg-zinc-950 border border-zinc-800 text-zinc-300 rounded px-1 outline-none"
                  >
                    <option value="NOVO">NOVO</option>
                    <option value="CONTATADO">CONTATADO</option>
                    <option value="PROPOSTA">PROPOSTA</option>
                    <option value="GANHO">GANHO</option>
                    <option value="PERDIDO">PERDIDO</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-zinc-500 hover:text-red-400 hover:bg-red-950/30"
                    onClick={() => deleteLeadAction(lead.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}