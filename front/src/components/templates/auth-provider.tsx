// src/components/templates/AuthProvider.tsx
import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { useNavigate } from "@tanstack/react-router"

interface User {
  id: string
  name: string
  email: string
  role: "speaker" | "organizer" | "public"
}

interface RegisterInput {
  email: string
  password: string
  role: "speaker" | "organizer" | "public"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterInput) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate API

    const mockUser: User = {
      id: "user_123",
      name: "Sarah Johnson",
      email,
      role: "speaker",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    document.cookie = "authenticated=true; path=/; max-age=86400"
    navigate({ to: "/dashboard" })
    setIsLoading(false)
  }

  const register = async (userData: RegisterInput) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: crypto.randomUUID(),
        name: "New User",
        email: userData.email,
        role: userData.role,
      }

      localStorage.setItem("user", JSON.stringify(newUser))

      navigate({ to: "/login", search: { registered: "true" } })
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    document.cookie = "authenticated=; path=/; max-age=0"
    navigate({ to: "/" })
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
