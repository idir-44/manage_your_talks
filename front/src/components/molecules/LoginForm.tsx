import { useState } from "react"
import { useUserStore } from "@/stores/userStore"
import { useNavigate } from "@tanstack/react-router"
import { login } from "@/api/auth"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { setUser } = useUserStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)

      // Pas besoin de récupérer le token ici, il est stocké dans un cookie HTTP Only
      setUser({
        token: "from-cookie", // ou null, le plus important est de stocker le rôle et l'email
        role: "conférencier", // à ajuster si ton backend le renvoie (sinon tu peux faire un GET /me après)
        email,
      })

      navigate({ to: "/dashboard" })
    } catch (err: any) {
      setError("Email ou mot de passe invalide.")
      console.error("Erreur de connexion :", err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
          placeholder="********"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Se connecter
      </button>
    </form>
  )
}

export default LoginForm
