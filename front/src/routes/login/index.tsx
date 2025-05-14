import LoginForm from "@/components/molecules/LoginForm"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/login/')({
  component: LoginPage,
})

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">Connexion</h1>
        <LoginForm />
      </div>
    </div>
  )
}
