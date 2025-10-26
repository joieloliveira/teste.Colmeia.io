"use client"

import "./style.css";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { StaticImageData } from 'next/image'

import Link from "next/link";

interface CardProps {
  nome: string
  id: string
  cardImg: string | StaticImageData
  preco: string | number
  onAddToCart?: () => void
  imagem?: string
}

export default function ItemCard({
  nome,
  id,
  preco,
  cardImg,
  onAddToCart,
  //imagem = "https://cdn-icons-png.flaticon.com/512/1581/1581167.png", // imagem genérica
}: CardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white flex flex-col itemCard">
      <Link href={`/productPage/${id}`} prefetch>
        <div className="relative w-full h-48 imgCard">
          <Image
            src={cardImg}
            alt={nome}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{nome}</h3>
        <p className="text-yellow-600 font-bold text-lg mt-2">R$ {preco}</p>

        <Button
          onClick={onAddToCart}
          className="mt-auto bg-green-600 hover:bg-green-700 text-white"
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  )
}
