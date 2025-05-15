import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import Header from "@/components/organisms/Header";

import type { AuthContext } from "@/contexts/auth";

interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <main className="min-h-[calc(100vh-120px)] px-4">
        <Outlet />
      </main>
    </>
  ),
});
