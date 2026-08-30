import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="font-jet flex flex-row p-8 justify-between bg-[#F1FAEE] text-[#000000]">
            <div className="flex flex-row gap-6">
                <Link href={"/"}>Início</Link>
                <Link href={"/dashboard"}>Dashboard</Link>
                <Link href={"/leads"}>Leads</Link>
            </div>
            <Link href={"/login"}>Login</Link>
        </nav>
    );
}