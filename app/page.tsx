import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex-1 gap-4 w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 py-10 text-center max-w-5xl mx-auto">
      <Badge variant="ghost" className="font-jet text-xs sm:text-sm whitespace-normal text-center max-w-full px-3 py-1.5 leading-normal">
        🚀 Gestão simples para pequenos negócios
      </Badge>
      <h1 className="font-jet font-bold text-3xl sm:text-4xl md:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight tracking-tight">
        Mini Leads CRM
      </h1>
      <p className="text-slate-400 text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed">
        Organize os seus potenciais clientes, envie propostas e feche negócios mais rápido numa única plataforma.
      </p>
      <div className="w-full sm:w-auto pt-2">
        <Link href="/login" className="w-full sm:w-auto inline-block">
          <Button variant="outline" className="w-full sm:w-auto !bg-emerald-600 hover:!bg-emerald-500 font-jet text-sm sm:text-base px-6 py-2.5 h-auto">
            Acessar Plataforma
          </Button>
        </Link>
      </div>
    </main>
  )
}