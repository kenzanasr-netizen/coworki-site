import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-slate-900">CoWorki</p>
          <p className="max-w-sm text-sm leading-6 text-slate-600">
            Plateforme coworking moderne pour les professionnels et entreprises. Trouvez votre espace idéal, réservez rapidement et gérez vos offres avec fluidité.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-900">Liens rapides</p>
          <div className="grid gap-2 text-sm text-slate-600">
            <Link href="/">Accueil</Link>
            <Link href="/spaces">Espaces</Link>
            <Link href="/reservation">Réservation</Link>
            <Link href="/login">Connexion</Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-900">Contact</p>
          <p className="text-sm text-slate-600">support@coworki.tn</p>
          <p className="text-sm text-slate-600">+216 55 123 456</p>
          <p className="text-sm text-slate-600">Tunis, Tunisie</p>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-white px-6 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} CoWorki. Tous droits réservés.
      </div>
    </footer>
  )
}
