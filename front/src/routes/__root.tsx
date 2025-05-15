import { Outlet, createRootRoute } from "@tanstack/react-router"
import { AuthProvider } from "@/components/templates/auth-provider"
import { ThemeProvider } from "@/components/templates/theme-provider"

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <AuthProvider>
        <Outlet /> {/* Toutes les routes de l’app passent ici */}
      </AuthProvider>
    </ThemeProvider>
  ),
})
