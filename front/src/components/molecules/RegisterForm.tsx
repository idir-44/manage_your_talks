import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import Button from "@/components/atoms/Button"
import { useUserStore } from "@/stores/userStore"
import { register } from "@/api/auth" // 👈 On importe la fonction API

const RegisterForm = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "conférencier",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // 👇 Appel vers l'API backend pour créer un conférencier
      await register(formData.email, formData.password)

      // 👇 Mettre à jour l'utilisateur dans le store
      setUser({
        email: formData.email,
        token: "fake-token", // Plus tard, tu récupéreras le vrai token
        role: formData.role as "organisateur" | "conférencier" | "public",
      })

      // 👇 Redirige vers le dashboard
      navigate({ to: "/dashboard" })
    } catch (error) {
      console.error("Erreur d'inscription :", error)
      alert("Erreur lors de l'inscription. Vérifie ton email ou ton mot de passe.")
    }
  }

  const handleSocialLogin = (provider: string) => {
    alert(`Connexion avec ${provider} non disponible pour l’instant.`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Rôle
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="conférencier">Conférencier</option>
          <option value="organisateur">Organisateur</option>
          <option value="public">Public</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Créer un compte
      </Button>

      <div className="flex flex-col gap-2 pt-4">
        <Button
          type="button"
          className="w-full bg-red-500 hover:bg-red-600"
          onClick={() => handleSocialLogin("Google")}
        >
          Continuer avec Google
        </Button>
        <Button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => handleSocialLogin("Facebook")}
        >
          Continuer avec Facebook
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
