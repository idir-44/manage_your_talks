import { createFileRoute } from "@tanstack/react-router"
import { ArrowRight, Calendar, Megaphone, User } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms/card"
import { Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">TalkMaster</h1>
          <nav className="hidden md:flex space-x-4">
            <Link to="/public" className="text-sm font-medium hover:underline">
              Public
            </Link>
            <Link to="/login" className="text-sm font-medium hover:underline">
              Speaker Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Manage Event Talks with Ease</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            A comprehensive platform for speakers, organizers, and attendees
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/public">
                Browse Events <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/login">
                Speaker Login <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              <Card className="group overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-lg dark:hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">For Speakers</CardTitle>
                  <CardDescription>Manage your talks, submissions, and schedules</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Submit proposals, track acceptance status, and manage your speaker profile all in one place.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to="/login">Speaker Login</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-lg dark:hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                    <Megaphone className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">For Organizers</CardTitle>
                  <CardDescription>Review submissions and manage event logistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Review talk proposals, schedule sessions, and manage venue details with powerful tools.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to="/login">Organizer Login</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-lg dark:hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">For Public</CardTitle>
                  <CardDescription>Discover and attend exciting talks and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Browse upcoming events, view talk details, and create your personalized schedule.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to="/public">Public Dashboard</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t mt-24">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TalkMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
