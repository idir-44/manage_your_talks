import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"

import { ThemeProvider } from "@/components/templates/theme-provider"
import { AuthProvider } from "@/components/templates/auth-provider"
import { router } from "./router" // Tu gardes ton router.ts ici

import "./styles.css"
import reportWebVitals from "./reportWebVitals"

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <RouterProvider router={router}> {/* ✅ Doit envelopper tout */}
      <ThemeProvider>
        <AuthProvider>
          {/* Les enfants sont injectés via RouterProvider */}
        </AuthProvider>
      </ThemeProvider>
    </RouterProvider>
  </React.StrictMode>
)
reportWebVitals()
