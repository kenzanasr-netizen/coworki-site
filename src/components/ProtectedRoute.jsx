import { Link } from "react-router-dom";
import { getMockSession } from "../data/mockAuth";

function ProtectedRoute({ role, children }) {
  const session = getMockSession();

  if (!session) {
    return (
      <AccessState
        title="Accès réservé."
        text="Veuillez vous connecter pour continuer."
        actionLabel="Se connecter"
        actionPath="/login"
      />
    );
  }

  if (session.role !== role) {
    return (
      <AccessState
        title="Vous n’avez pas les droits nécessaires pour accéder à cet espace."
        text={`Vous êtes connecté comme ${session.status}. Cet espace est réservé au rôle ${role}.`}
        actionLabel="Retour à l’accueil"
        actionPath="/"
      />
    );
  }

  return children;
}

function AccessState({ title, text, actionLabel, actionPath }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] px-6 py-20 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-3xl items-center justify-center">
        <div className="rounded-[2.5rem] bg-white p-8 text-center shadow-2xl shadow-slate-200/70 ring-1 ring-slate-100 sm:p-12">
          <p className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FBEFF3] text-2xl font-black text-[#7A1E3A]">
            !
          </p>
          <h1 className="text-3xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-600">{text}</p>
          <Link
            to={actionPath}
            className="mt-8 inline-flex rounded-full bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:bg-[#64172F]"
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProtectedRoute;
