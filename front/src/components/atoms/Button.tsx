import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50",
        className
      )}
    />
  )
}
