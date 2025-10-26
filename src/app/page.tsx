"use client"

import React, { useContext, useEffect } from 'react';
import "./style.css";
import Header from "../components/header"
import { CarouselSpacing } from "../components/carousel"
import Footer from "../components/footer"

import Card from "../components/itemCard"

import { ContextItemsData } from "../app/context/ItemsDataContext"

export default function Home() {

  const {
    itemsData, cartData, setCartData, cartItems, addToCart
  } = useContext(ContextItemsData)!;

  // Sempre que o cart mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData))
  }, [cartData])

  const handleAddCart = (id: string, nome: string) => {
    addToCart(id, 1) // adiciona quantidade = 1
    alert(`${nome} adicionado ao carrinho!`)
  }

  console.log(cartItems);

  return (
    <>
      <Header />
      <CarouselSpacing />
      <div className="flex flex-col min-h-screen bg-[#fcf9eb]">
        <main className="flex-1 container mx-auto p-4 homeBody">
          {itemsData.map((p, idx) => (
            <Card
              key={idx}
              nome={p.nome}
              id={p.id}
              preco={p.preco}
              cardImg={p.cardImg}
              onAddToCart={() => handleAddCart(p.id, p.nome)!}
            />
          ))}
        </main>
      </div>
      <Footer />
    </>
  )
}
