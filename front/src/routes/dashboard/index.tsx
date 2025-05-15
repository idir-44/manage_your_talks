import { createFileRoute } from '@tanstack/react-router'
import SpeakerDashboard from '../speaker/index' // 👈 ou ajuste le chemin si nécessaire

export const Route = createFileRoute('/dashboard/')({
  component: SpeakerDashboard,
})