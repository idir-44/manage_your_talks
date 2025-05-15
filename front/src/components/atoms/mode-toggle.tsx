// src/components/atoms/ModeToggle.tsx
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/atoms/button"

export function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = storedTheme || (systemDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = (value: "light" | "dark") => {
    setTheme(value)
    localStorage.setItem("theme", value)
    document.documentElement.classList.toggle("dark", value === "dark")
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toggleTheme("light")}
        className={theme === "light" ? "bg-accent text-accent-foreground" : ""}
        title="Light mode"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toggleTheme("dark")}
        className={theme === "dark" ? "bg-accent text-accent-foreground" : ""}
        title="Dark mode"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Dark mode</span>
      </Button>
    </div>
  )
}
