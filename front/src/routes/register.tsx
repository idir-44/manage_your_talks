import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "@/components/molecules/RegisterForm";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Créer un compte
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
export default RegisterPage;
