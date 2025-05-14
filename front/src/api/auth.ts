const API_URL = import.meta.env.VITE_API_URL

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // important pour le cookie JWT
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || "Erreur de connexion")
  }

  return res.json()
}
export async function register(email: string, password: string) {
    const res = await fetch(`${API_URL}/v1/speakers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
  
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText || "Erreur d'inscription")
    }
  
    return res.json()
  }
  