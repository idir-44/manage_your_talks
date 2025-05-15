import { getMe } from "@/api/auth";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  createFileRoute,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/speaker")({
  component: AuthLayout,
});

function AuthLayout() {
  const router = useRouter();

  const { setAuth, setAuthenticated, isAuthenticated } = useAuth();
  const {
    data: currentUser,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 1,
  });

  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      setAuth(currentUser);
      setAuthenticated(true);
      if (currentUser.role !== "speaker") {
        router.navigate({ to: "/organizer/dashboard", replace: true });
      }
    }
  }, [currentUser]);

  if (isError) {
    return (
      <Navigate to="/login" search={{ redirect: location.href }} replace />
    );
  }

  if (isPending || !isAuthenticated) {
    return <div>loading...</div>;
  }

  return <Outlet />;
}
