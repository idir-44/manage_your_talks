import { create } from "zustand"

type UserRole = "organisateur" | "conférencier" | "public" | null

interface UserState {
  token: string | null
  role: UserRole
  email: string | null
  setUser: (data: { token: string; role: UserRole; email: string }) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  role: null,
  email: null,
  setUser: ({ token, role, email }) => set({ token, role, email }),
  logout: () => set({ token: null, role: null, email: null }),
}))
