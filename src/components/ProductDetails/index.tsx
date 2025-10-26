"use client"

import "./style.css";
import Image, { StaticImageData } from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProductDetailsProps {
  nome: string
  preco: number | string
  descricao?: string
  imagem: string | StaticImageData
  onAddToCart?: () => void
}

export default function ProductDetails({
  nome,
  preco,
  descricao,
  imagem,
  onAddToCart,
}: ProductDetailsProps) {
  return (
    <Card className="max-w-5xl mx-auto p-6 shadow-md rounded-2xl bg-amber-50 mt-20 prodDetails" >
      <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-full md:w-1/2 flex justify-center prodDetailsImg">
          <Image
            src={imagem}
            alt={nome}
            width={400}
            height={400}
            className="rounded-xl object-cover shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between h-full prodDetailsDesc">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{nome}</h2>
            <p className="text-2xl font-bold text-green-700 mb-3">
              {typeof preco === "number" ? `R$ ${preco.toFixed(2)}` : preco}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {descricao ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."}
            </p>
          </div>
          <Button
            onClick={onAddToCart}
            className="w-full md:w-auto px-6 py-3 text-lg rounded-xl bg-green-600 hover:bg-green-700"
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
