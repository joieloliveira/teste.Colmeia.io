"use client"

import React, { createContext, ReactNode } from "react"
import { AuthProvider } from "./AuthContext"
import { ItemsDataProvider } from "./ItemsDataContext"

// 👉 Tipagem do contexto principal (adicione mais campos conforme precisar)
type AllContextType = Record<string, never> // vazio por enquanto

// Criação do contexto com tipo opcional
export const ContextAuth = createContext<AllContextType | undefined>(undefined)

type AllContextProviderProps = {
  children: ReactNode
}

export function AllContextProvider({ children }: AllContextProviderProps) {
  return (
    <ContextAuth.Provider value={{}}>
      <AuthProvider>
        <ItemsDataProvider>
          {children}
        </ItemsDataProvider>
      </AuthProvider>
    </ContextAuth.Provider>
  )
}
