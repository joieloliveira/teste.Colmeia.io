"use client"

import React, { useContext } from 'react';
import ProductDetails from "../../../components/ProductDetails"

import Header from "../../../components/header"
import Footer from "../../../components/footer"

import { useParams } from 'next/navigation';

import { ContextItemsData } from "../../../app/context/ItemsDataContext"

export default function ProductPage() {

  const params = useParams();

  const { id } = params;

  const {
    itemsData, addToCart
  } = useContext(ContextItemsData)!;

  const handleAddCart = (id: string, nome: string) => {
    addToCart(id, 1) // adiciona quantidade = 1
    alert(`${nome} adicionado ao carrinho!`)
  }

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-[#fff]">
        {itemsData && itemsData.map((p, idx) => (
          p.id == id &&
          <ProductDetails key={idx}
            nome={p.nome}
            preco={p.preco}
            descricao={p.descricao}
            imagem={p.cardImg}
            onAddToCart={() => handleAddCart(p.id, p.nome)!}
          />
        ))}
      </main>
      <Footer />
    </>
  )
}
