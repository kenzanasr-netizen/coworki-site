import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { PageShell } from "../components/SiteLayout";

function NotFound() {
  return (
    <PageShell active="">
      <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6 py-16 text-center">
        <div className="rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-100 sm:p-12">
          <p className="text-8xl font-black tracking-[-0.08em] text-[#ECF8FC]">404</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#0F2A43] md:text-5xl">
            Cette page n’existe pas encore.
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-slate-600">
            Le lien demandé n’est pas disponible. Vous pouvez revenir à l’accueil ou explorer les espaces CoWorki.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
            <Link to="/spaces" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-[#0F2A43]">
              <Search className="h-4 w-4" />
              Explorer les espaces
            </Link>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

export default NotFound;
