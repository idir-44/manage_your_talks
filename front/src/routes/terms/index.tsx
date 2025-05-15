import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/terms/")({
  component: () => <div className="p-8">Conditions d'utilisation à venir.</div>,
})
