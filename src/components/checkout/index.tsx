"use client"

import { useState, useEffect, useContext } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { ContextItemsData } from "../../app/context/ItemsDataContext"
import { ContextAuth, UserType } from "../../app/context/AuthContext"

type CheckoutStatus = "form" | "pagamento" | "revisao" | "processando" | "resultado"
type Pagamento = "pix" | "cartao" | "boleto"

export default function Checkout() {
  const [etapa, setEtapa] = useState<CheckoutStatus>("form")
  const [metodo, setMetodo] = useState<Pagamento>("pix")
  const [parcelas, setParcelas] = useState(1)
  const [statusPagamento, setStatusPagamento] = useState<"pago" | "falhou" | "expirado" | null>(null)
  const [endereco, setEndereco] = useState("")

  // Contextos
  const context = useContext(ContextItemsData)
  const auth = useContext(ContextAuth)

  if (!context) return null
  if (!auth) return null

  const { cartItems, setCartData } = context
  const usuario = auth.currentUser as UserType

  const total = cartItems.reduce(
    (acc, item) => acc + item.preco * (item.quantidade || 1),
    0
  )

  // Inicializa o endereço no input
  useEffect(() => {
    if (usuario?.endereco) setEndereco(usuario.endereco)
  }, [usuario])

  // Simula processamento do pagamento
  useEffect(() => {
    if (etapa === "processando") {
      const timer = setTimeout(() => {
        const resultado = Math.random() > 0.3 ? "pago" : "falhou"
        setStatusPagamento(resultado as any)
        setEtapa("resultado")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [etapa])

  // Limpa o carrinho quando o pagamento for aprovado
  useEffect(() => {
    if (statusPagamento === "pago") {
      setCartData([]) // ✅ aqui limpamos o carrinho
    }
  }, [statusPagamento, setCartData])

  const valorParcela = total / parcelas

  // Atualiza o endereço do usuário no contexto
  const atualizarEndereco = () => {
    auth.setCurrentUser!({ ...usuario, endereco })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">🧾 Checkout</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ========================= DADOS DO COMPRADOR ========================= */}
          {etapa === "form" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Dados do comprador</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Nome</Label>
                  <Input value={usuario.nome} disabled />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={usuario.email} disabled />
                </div>
                <div className="md:col-span-2">
                  <Label>Endereço</Label>
                  <Input
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Digite seu endereço"
                  />
                </div>
              </div>

              <div className="pt-4 text-right">
                <Button
                  onClick={() => {
                    if (!auth.authenticated) {
                      alert("⚠️ Você precisa estar logado para continuar o checkout.")
                      return
                    }
                    if (!endereco.trim()) {
                      alert("⚠️ Você precisa adicionar um endereço antes de prosseguir.")
                      return
                    }
                    atualizarEndereco()
                    setEtapa("pagamento")
                  }}
                >
                  Continuar para pagamento
                </Button>
              </div>
            </div>
          )}

          {/* ========================= MÉTODO DE PAGAMENTO ========================= */}
          {etapa === "pagamento" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Método de pagamento</h2>
              <RadioGroup
                value={metodo}
                onValueChange={(v) => {
                  setMetodo(v as Pagamento)
                  if (v !== "cartao") setParcelas(1)
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix">Pix (5% de desconto)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cartao" id="cartao" />
                  <Label htmlFor="cartao">Cartão de Crédito (até 12x sem juros)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="boleto" id="boleto" />
                  <Label htmlFor="boleto">Boleto Bancário</Label>
                </div>
              </RadioGroup>

              {metodo === "cartao" && (
                <div className="mt-4">
                  <Label htmlFor="parcelas">Parcelamento</Label>
                  <select
                    id="parcelas"
                    value={parcelas}
                    onChange={(e) => setParcelas(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}x de R$ {(total / n).toFixed(2)} sem juros
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-4 text-right">
                <Button onClick={() => setEtapa("revisao")}>
                  Revisar pedido
                </Button>
              </div>
            </div>
          )}

          {/* ========================= REVISÃO ========================= */}
          {etapa === "revisao" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Revisão do pedido</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>🧍 {usuario.nome}</p>
                <p>📧 {usuario.email}</p>
                <p>🏠 {usuario.endereco}</p>
                <p>💳 Pagamento via: <strong>{metodo.toUpperCase()}</strong></p>
                {metodo === "cartao" && (
                  <p>💰 Parcelado em <strong>{parcelas}x</strong> de R$ {valorParcela.toFixed(2)}</p>
                )}
                <Separator className="my-2" />
                <p className="text-lg font-semibold">Total a pagar: R$ {total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setEtapa("pagamento")}>
                  Voltar
                </Button>
                <Button className="bg-green-600 text-white" onClick={() => setEtapa("processando")}>
                  Confirmar pagamento
                </Button>
              </div>
            </div>
          )}

          {/* ========================= PROCESSANDO ========================= */}
          {etapa === "processando" && (
            <div className="text-center py-10">
              <Clock className="mx-auto h-10 w-10 text-yellow-500 animate-spin" />
              <p className="mt-4 text-lg font-medium">Processando pagamento...</p>
              <p className="text-gray-500">Aguarde alguns segundos</p>
            </div>
          )}

          {/* ========================= RESULTADO ========================= */}
          {etapa === "resultado" && (
            <div className="text-center py-10 space-y-4">
              {statusPagamento === "pago" && (
                <>
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <h2 className="text-2xl font-bold text-green-600">Pagamento aprovado!</h2>
                  <p>Seu pedido foi confirmado e será processado em breve.</p>
                </>
              )}
              {statusPagamento === "falhou" && (
                <>
                  <XCircle className="mx-auto h-12 w-12 text-red-500" />
                  <h2 className="text-2xl font-bold text-red-600">Falha no pagamento</h2>
                  <p>Tente novamente ou escolha outro método.</p>
                  <Button onClick={() => setEtapa("pagamento")}>Tentar novamente</Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
