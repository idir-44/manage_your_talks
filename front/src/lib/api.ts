const API_URL = import.meta.env.VITE_API_URL

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // pour gérer les cookies si auth par session
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || "Erreur API")
  }

  return response.json()
}
