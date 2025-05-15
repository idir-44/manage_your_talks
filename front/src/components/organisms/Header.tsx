import { useAuth } from "@/contexts/auth";
import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";

const Header = () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <header className="w-full px-6 py-4 bg-white shadow flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-black">
        TalkMaster 🎤
      </Link>
      {!auth.isAuthenticated ? (
        <nav className="flex gap-4">
          <Link to="/login" className="text-gray-700 hover:text-black">
            Connexion
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-black">
            Inscription
          </Link>
        </nav>
      ) : (
        <Button
          variant="link"
          onClick={() => {
            router.navigate({ to: "/login", replace: true });
            auth.logout();
          }}
        >
          Logout
        </Button>
      )}
    </header>
  );
};

export default Header;
