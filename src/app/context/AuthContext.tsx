"use client"

import React, { useEffect } from "react"
import LoadingScreen from "../../components/loadingScreen"

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"

// ============================
// Tipos
// ============================
export type UserType = {
  nome: string
  email: string
  endereco: string | null
  senha: string
}

type AuthContextType = {
  authenticated: boolean
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  users: UserType[]
  addUser: (novoUsuario: Omit<UserType, "endereco"> & { endereco?: string | null }) => boolean
  login: (email: string, senha: string) => boolean
  logout: () => void
  currentUser: UserType | null
  setCurrentUser: Dispatch<SetStateAction<UserType | null>>
}

// ============================
// Contexto
// ============================
export const ContextAuth = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  // usuário mock padrão (inicializa já no state para evitar race condition)
  const defaultUser: UserType = {
    nome: "João Oliveira",
    email: "joao@email.com",
    endereco: "Rua das Palmeiras, 123 - São Paulo/SP",
    senha: "123456",
  }

  // Inicializa com o mock para garantir disponibilidade imediata
  const [users, setUsers] = useState<UserType[]>([defaultUser])
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  // ============================
  // Carregar dados do localStorage (se houver)
  // ============================
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("users")
      const storedAuth = localStorage.getItem("authenticated")
      const storedUser = localStorage.getItem("currentUser")

      if (storedUsers) {
        // se houver users no storage, sobrescreve (mantém compatibilidade)
        setUsers(JSON.parse(storedUsers))
      } else {
        // caso não haja, garante que o mock esteja salvo no storage
        localStorage.setItem("users", JSON.stringify([defaultUser]))
      }

      if (storedAuth === "true" && storedUser) {
        setAuthenticated(true)
        setCurrentUser(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error("Erro ao carregar dados do localStorage:", err)
    } finally {
      setTimeout(() => setLoading(false), 300)
    }
  }, [])

  // ============================
  // Salvar dados no localStorage
  // ============================
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem("authenticated", String(authenticated))
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [authenticated, currentUser])

  // ============================
  // Criar conta
  // ============================
  const addUser = (
    novoUsuario: Omit<UserType, "endereco"> & { endereco?: string | null }
  ): boolean => {
    const existe = users.some((u) => u.email === novoUsuario.email)
    if (existe) {
      alert("⚠️ Email já cadastrado.")
      return false
    }

    const usuarioComEndereco: UserType = {
      ...novoUsuario,
      endereco: novoUsuario.endereco ?? null,
    }

    setUsers((prev) => [...prev, usuarioComEndereco])
    setCurrentUser(usuarioComEndereco)
    setAuthenticated(true)
    return true
  }

  // ============================
  // Login (corrigido: trim + case-insensitive no email)
  // ============================
  const login = (email: string, senha: string): boolean => {
    const emailClean = email.trim().toLowerCase()
    const senhaClean = senha.trim()

    const user = users.find(
      (u) => u.email.trim().toLowerCase() === emailClean && u.senha === senhaClean
    )
    if (!user) {
      return false
    }

    setCurrentUser(user)
    setAuthenticated(true)
    return true
  }

  // ============================
  // Logout
  // ============================
  const logout = () => {
    setAuthenticated(false)
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    localStorage.setItem("authenticated", "false")
  }

  if (loading) return <LoadingScreen />

  return (
    <ContextAuth.Provider
      value={{
        authenticated,
        setAuthenticated,
        users,
        addUser,
        login,
        logout,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </ContextAuth.Provider>
  )
}
