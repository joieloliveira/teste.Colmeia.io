"use client"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import { ContextAuth } from "../../app/context/AuthContext"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useContext(ContextAuth)
  const router = useRouter()

  if (!auth) return null

  if (!auth.authenticated) {
    router.push("/loginSingUpPage")
    return null
  }

  return <>{children}</>
}
