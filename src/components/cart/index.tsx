"use client"

import "./style.css"
import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

import { ContextItemsData } from "../../app/context/ItemsDataContext"
import { useRouter } from "next/navigation"

export default function CarrinhoPage() {
  const context = useContext(ContextItemsData)
  if (!context) return null

  const { cartItems, updateQuantity, removeFromCart, cartData, setCartData } = context

  // Atualizar quantidade por delta (incremento/decremento)
  const atualizarQuantidade = (id: string, delta: number) => {
    // encontra quantidade atual no cartData
    const entry = cartData.find((c) => c.id === id)
    const current = entry ? entry.quantidade : 1
    updateQuantity(id, Math.max(1, current + delta))
  }

  const removerItem = (id: string) => {
    removeFromCart(id)
  }

  const limparCarrinho = () => setCartData([])

  const total = cartItems.reduce((acc, item) => acc + item.preco * (item.quantidade || 1), 0)

  const router = useRouter()
  const handleClick = () => {
    router.push("/checkoutPage")
  }

  return (
    <div className="container mx-auto py-10 carrinhoPage">
      <Card className="p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">🛒 Carrinho</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Seu carrinho está vazio.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 carrinhoPageBox"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.cardImg}
                      alt={item.nome}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover pb-3"
                    />
                    <div>
                      <h3 className="font-semibold">{item.nome}</h3>
                      <p className="text-sm text-gray-500">R$ {item.preco.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Quantidade {item.quantidade}</p>
                      <p className="text-sm text-gray-500">Total {(item.quantidade*item.preco).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" onClick={() => atualizarQuantidade(item.id, -1)}>
                      -
                    </Button>
                    <span>{item.quantidade}</span>
                    <Button variant="outline" size="icon" onClick={() => atualizarQuantidade(item.id, 1)}>
                      +
                    </Button>
                    <Button variant="destructive" onClick={() => removerItem(item.id)}>
                      Remover
                    </Button>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between items-center pt-4 carrinhoPageBox2">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={limparCarrinho}>
                    Remover tudo
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Total: R$ {total.toFixed(2)}</p>
                  <Button className="mt-2 bg-green-600 hover:bg-green-700 text-white" onClick={handleClick}>
                    Finalizar compra
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
