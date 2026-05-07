import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg">
            C
          </div>
          CoWorki
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="transition hover:text-slate-900">
            Accueil
          </Link>
          <Link href="/spaces" className="transition hover:text-slate-900">
            Espaces
          </Link>
          <Link href="/reservation" className="transition hover:text-slate-900">
            Réservation
          </Link>
          <Link href="/dashboard" className="transition hover:text-slate-900">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Connexion
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">S'inscrire</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
