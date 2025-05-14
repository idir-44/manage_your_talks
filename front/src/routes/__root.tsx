import { Outlet, createRootRoute } from "@tanstack/react-router"
import Header from "@/components/organisms/Header"
import Footer from "@/components/organisms/Footer"

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="min-h-[calc(100vh-120px)] px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  ),
})
