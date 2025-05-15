// src/components/templates/ThemeProvider.tsx
import { useEffect } from "react"
import type { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const darkMode = localStorage.getItem("theme")
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return children
}
