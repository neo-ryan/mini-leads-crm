import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 gap-3 w-full flex flex-col justify-center items-center px-10">
      <Badge variant="ghost" className="font-jet text-md">🚀 Gestão simples para pequenos negócios</Badge>
      <h1 className="font-jet font-bold text-4xl md:text-5xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Mini Leads CRM</h1>
      <p className="text-slate-400 text-base md:text-xl max-w-2xl leading-relaxed text-center">Organize seus potenciais clientes, envie propostas e feche negócios mais rápido em uma única plataforma.</p>
      <Button variant="outline" className="!bg-emerald-600 hover:!bg-emerald-500">
        <Link href={"/login"} className="font-jet">
        Acessar Plataforma
        </Link>
      </Button>
    </main>
  );
}
