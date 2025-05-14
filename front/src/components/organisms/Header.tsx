import { Link } from "@tanstack/react-router"

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-white shadow flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-black">
        TalkMaster 🎤
      </Link>
      <nav className="flex gap-4">
        <Link to="/login" className="text-gray-700 hover:text-black">Connexion</Link>
        <Link to="/register" className="text-gray-700 hover:text-black">Inscription</Link>
      </nav>
    </header>
  )
}

export default Header
