"use client"

import { useState, useContext } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { ContextAuth } from "@/app/context/AuthContext"

import { useRouter } from "next/navigation"

export default function LoginSignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginSenha, setLoginSenha] = useState("")
  const [cadNome, setCadNome] = useState("")
  const [cadSobrenome, setCadSobrenome] = useState("")
  const [cadEmail, setCadEmail] = useState("")
  const [cadSenha, setCadSenha] = useState("")

  const router = useRouter()

  const context = useContext(ContextAuth)
  if (!context) return null

  // usa addUser que existe no contexto atual
  const { login, addUser } = context

  const handleLogin = () => {
    const ok = login(loginEmail, loginSenha)
    if (ok) {
      alert("✅ Login realizado com sucesso!")
      // limpa campos de login (opcional)
      setLoginEmail("")
      setLoginSenha("")
      router.push("/")
    } else {
      alert("❌ Email ou senha incorretos.")
    }
  }

  const handleCreateAccount = () => {
    const nomeCompleto = `${cadNome} ${cadSobrenome}`.trim() || cadNome || cadSobrenome
    if (!nomeCompleto || !cadEmail || !cadSenha) {
      alert("⚠️ Preencha nome, email e senha para criar a conta.")
      return
    }

    // addUser espera um objeto sem "endereco" obrigatório; endereco pode ser omitido ou null
    const ok = addUser({ nome: nomeCompleto, email: cadEmail, senha: cadSenha, endereco: null })
    if (ok) {
      alert("🎉 Conta criada com sucesso!")
      // limpa campos do formulário de cadastro
      setCadNome("")
      setCadSobrenome("")
      setCadEmail("")
      setCadSenha("")
      login(cadEmail, cadSenha)
      router.push("/")
    } else {
      alert("⚠️ Este email já está cadastrado.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl p-6">
        {/* ===================== CARD LOGIN ===================== */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div className="relative">
              <Label>Senha</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={loginSenha}
                onChange={e => setLoginSenha(e.target.value)}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleLogin}>
              Entrar
            </Button>
          </CardContent>
        </Card>

        {/* ===================== CARD CRIAR CONTA ===================== */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Criar conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Nome</Label>
                <Input value={cadNome} onChange={e => setCadNome(e.target.value)} placeholder="Seu nome" />
              </div>
              <div>
                <Label>Sobrenome</Label>
                <Input value={cadSobrenome} onChange={e => setCadSobrenome(e.target.value)} placeholder="Seu sobrenome" />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input value={cadEmail} onChange={e => setCadEmail(e.target.value)} type="email" placeholder="seu@email.com" />
            </div>
            <div className="relative">
              <Label>Senha</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={cadSenha}
                onChange={e => setCadSenha(e.target.value)}
                placeholder="Crie uma senha"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleCreateAccount}>
              Criar conta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
