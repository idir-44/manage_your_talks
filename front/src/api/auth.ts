import { apiFetch } from "@/lib/api";

const API_URL = import.meta.env.VITE_API_URL;

export type Speaker = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
};

export type Role = "organizer" | "speaker";

export type UserRole = {
  id: string;
  email: string;
  role: Role;
};

export async function logoutCall() {
  const res = await fetch(`${API_URL}/v1/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.ok) {
    console.log(res.json());
  }
}

export async function login(
  email: string,
  password: string,
): Promise<UserRole> {
  const res = await fetch(`${API_URL}/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Erreur de connexion");
  }

  return res.json();
}
export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/v1/speakers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Erreur d'inscription");
  }

  return res.json();
}

export async function getMe(): Promise<UserRole> {
  return apiFetch<UserRole>("/v1/me", {
    method: "GET",
  });
}
