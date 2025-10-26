"use client"

import "./style.css"
import React, { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Home,
  LogIn,
  LogOut,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { ContextItemsData } from "../../app/context/ItemsDataContext"
import { ContextAuth } from "../../app/context/AuthContext"

export default function Header() {
  const { getCartCount } = useContext(ContextItemsData)!
  const totalItems = getCartCount()

  const auth = useContext(ContextAuth)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md border-b border-blue-800 bg-[rgb(15,35,95)] text-white">
      <div className="container mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-yellow-500 flex items-center gap-2">
          <Image
            src="https://www.colmeia.io/_next/static/media/logo-negative.d1de93c0.svg"
            alt="Logo Colmeia.io"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Botão de menu (mobile) */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-blue-900 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navegação (desktop) */}
        <nav className="hidden md:flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>

          <Link href="/cartResume">
            <Button variant="ghost" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span id="totalItems">{totalItems}</span>
              Carrinho
            </Button>
          </Link>

          {auth?.authenticated && auth.currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-yellow-400">
                👋 Bem-vindo, <strong>{auth.currentUser.nome.split(" ")[0]}</strong>
              </span>
              <Button
                onClick={auth.logout}
                variant="ghost"
                className="flex items-center gap-2 text-red-400 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          ) : (
            <Link href="/loginSingUpPage">
              <Button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>

      {/* Menu mobile (drop-down) */}
      {menuOpen && (
        <div className="md:hidden bg-[rgb(10,25,70)] border-t border-blue-800 animate-slideDown">
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full flex items-center justify-start gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>

            <Link href="/cartResume" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" className="w-full flex items-center justify-start gap-2">
                <ShoppingCart className="w-4 h-4" />
                Carrinho ({totalItems})
              </Button>
            </Link>

            {auth?.authenticated && auth.currentUser ? (
              <>
                <span className="text-yellow-400 text-sm px-2">
                  👋 Bem-vindo, <strong>{auth.currentUser.nome.split(" ")[0]}</strong>
                </span>
                <Button
                  onClick={() => {
                    auth.logout()
                    setMenuOpen(false)
                  }}
                  variant="ghost"
                  className="w-full flex items-center justify-start gap-2 text-red-400 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>
            ) : (
              <Link href="/loginSingUpPage" onClick={() => setMenuOpen(false)}>
                <Button className="w-full flex items-center justify-start gap-2 bg-yellow-500 hover:bg-yellow-600 text-white">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
