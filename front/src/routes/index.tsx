import Footer from "@/components/organisms/Footer";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight animate-slide-in">
            Gérez vos <span className="text-blue-600">talks techniques</span>{" "}
            <br />
            en toute simplicité 🎤
          </h1>

          <p className="text-lg text-gray-600 mb-10 animate-fade-in delay-200">
            TalkMaster est la solution pour les conférenciers, organisateurs et
            passionnés de tech. Proposez, organisez et explorez des
            interventions inspirantes lors d’événements professionnels.
          </p>

          <div className="flex justify-center gap-6 animate-fade-in delay-500">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Créer un compte
            </Link>
          </div>
        </div>

        <div className="mt-16 animate-slide-in-up delay-700">
          <img
            src="https://www.svgrepo.com/show/499867/speech-bubble.svg"
            alt="Talk illustration"
            className="w-48 opacity-80"
          />
          <p className="mt-4 text-sm text-gray-400">
            Illustration libre - svgrepo.com
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
