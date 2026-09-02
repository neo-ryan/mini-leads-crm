import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
} from "@/components/ui/card";

import {
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger
} from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export default function Login() {
    return (
        <main className="flex flex-col flex-1 justify-center items-center p-4">
            <Card className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border-zinc-800">
                <Tabs defaultValue="login" className="w-full p-4">
                    <CardHeader className="flex flex-col items-center gap-2 mb-6">
                        <CardTitle>Mini Leads CRM</CardTitle>
                        <CardDescription>Gerencie seus clientes em um só lugar</CardDescription>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Registro</TabsTrigger>
                    </TabsList>
                    </CardHeader>

                    <CardContent className="pb-6">
                        <TabsContent value="login" className="space-y-4 m-0 flex flex-col">
                        <div>
                            <Input type="email" placeholder="seu@email.com"></Input>
                        </div>
                        <div>
                            <Input type="password" placeholder="Sua senha"></Input>
                        </div>
                        <Button className="w-full">Entrar</Button>
                    </TabsContent>
                    </CardContent>
                </Tabs>
            </Card>
        </main>      
    );
}