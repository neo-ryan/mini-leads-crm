'use client'

import { useActionState } from 'react'
import { loginAction, registerAction } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Login() {
  const [loginState, handleLogin, isLoginPending] = useActionState(loginAction, null)
  const [registerState, handleRegister, isRegisterPending] = useActionState(registerAction, null)

  return (
    <main className="flex flex-col flex-1 justify-center items-center p-4">
      <Card className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border-zinc-800">
        <Tabs defaultValue="login" className="w-full p-4">
          <CardHeader className="flex flex-col items-center gap-2 mb-6">
            <CardTitle className="text-xl font-bold">Mini Leads CRM</CardTitle>
            <CardDescription className="text-zinc-400 text-xs">
              Gerencie seus clientes e feche negócios mais rápido
            </CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registro</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="pb-6">
            <TabsContent value="login">
              <form action={handleLogin} className="space-y-4 flex flex-col">
                {loginState?.error && (
                  <div className="p-2.5 text-xs text-red-400 bg-red-950/50 border border-red-800/50 rounded">
                    {loginState.error}
                  </div>
                )}
                <div>
                  <Input type="email" placeholder="seu@email.com" name="email" required />
                </div>
                <div>
                  <Input type="password" placeholder="Sua senha" name="password" required />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white" disabled={isLoginPending}>
                  {isLoginPending ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form action={handleRegister} className="space-y-4 flex flex-col">
                {registerState?.error && (
                  <div className="p-2.5 text-xs text-red-400 bg-red-950/50 border border-red-800/50 rounded">
                    {registerState.error}
                  </div>
                )}
                <div>
                  <Input type="email" placeholder="seu@email.com" name="email" required />
                </div>
                <div>
                  <Input type="password" placeholder="Sua senha" name="password" required />
                </div>
                <div>
                  <Input type="password" placeholder="Confirme sua senha" name="confirmPassword" required />
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white" disabled={isRegisterPending}>
                  {isRegisterPending ? 'Criando conta...' : 'Cadastrar-se'}
                </Button>
              </form>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </main>
  )
}