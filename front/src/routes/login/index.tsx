import LoginForm from "@/components/molecules/LoginForm"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute('/login/')({
  component: LoginPage,
})

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">Connexion</h1>
        <LoginForm />

        <p className="text-sm text-center mt-6">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  )
}

