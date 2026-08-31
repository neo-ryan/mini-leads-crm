import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Zap, Target } from "lucide-react";

export default function Navbar() {
    return (
        <header className="w-full border-b border-white/30 bg-transparent backdrop-blur-md">
            <nav className="font-jet flex flex-row p-8 justify-between items-center max-w-7xl mx-auto p-4">
            <div className="flex gap-6">
                    <Link href={"/"} className="flex gap-2 tracking-tight font-bold whitespace-nowrap"><Target /><span>Mini-CRM</span></Link>
                <div className="hidden sm:flex flex-row gap-6">
                    <Link href={"/dashboard"}>Dashboard</Link>
                    <Link href={"/leads"}>Leads</Link>
                </div>
            </div>
            <Button variant="outline" size="lg">
                <Zap />
                <Link href={"/login"}>Login/Cadastro</Link>
            </Button>
        </nav>
        </header>
    );
}