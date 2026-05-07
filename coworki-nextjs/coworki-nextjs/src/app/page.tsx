import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SpaceCard } from "@/components/SpaceCard"
import { mockSpaces } from "@/lib/mockSpaces"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { CheckCircle2, Sparkles, Globe2, ArrowRight } from "lucide-react"

const featuredSpaces = mockSpaces.slice(0, 3)

export default function HomePage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.15),_transparent_26%)]">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-500 text-white">
              Coworking intelligent
            </Badge>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
              Votre espace de travail flexible, local et moderne.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Réservez en quelques secondes, profitez d'offres flash et découvrez des espaces pensés pour votre productivité.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/spaces">
                <Button size="lg">Explorer les espaces</Button>
              </Link>
              <Link href="/reservation">
                <Button variant="outline" size="lg">
                  Réserver maintenant
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Top espaces</p>
                  <p className="text-2xl font-semibold text-slate-900">Offres flash en direct</p>
                </div>
                <Badge variant="secondary" className="bg-green-500 text-white">
                  Mobile & local
                </Badge>
              </div>

              {featuredSpaces.map((space) => (
                <div key={space.id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{space.name}</p>
                      <p className="text-sm text-slate-500">{space.city}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-slate-900">{formatCurrency(space.pricePerHour)}</p>
                      <p className="text-xs text-slate-500">{space.averageRating.toFixed(1)} ⭐</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {[
            {
              title: "Offres flash avec contrôle de l'occupation",
              description:
                "Activez des promotions intelligentes dès qu'un espace est en sous-occupation.",
              icon: Sparkles
            },
            {
              title: "Paiement sécurisé local & international",
              description:
                "Stripe + Konnect assurent des transactions rapides et fiables.",
              icon: Globe2
            },
            {
              title: "Navigation directe aux détails",
              description:
                "Cliquez sur une carte pour accéder immédiatement à la page d'espace.",
              icon: CheckCircle2
            }
          ].map((feature) => {
            const FeatureIcon = feature.icon
            return (
              <Card key={feature.title} className="rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
                  <FeatureIcon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-slate-900">{feature.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Nos espaces</p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-900">Espaces coworking remarquables</h2>
          </div>
          <Link href="/spaces" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            Voir tous les espaces <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredSpaces.map((space) => (
            <SpaceCard key={space.id} space={space} href={`/space/${space.id}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <Card className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] p-10">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Pourquoi choisir CoWorki ?</p>
              <h2 className="text-4xl font-semibold tracking-tight">Un hub coworking conçu pour les professionnels exigents.</h2>
              <p className="max-w-2xl text-base leading-8 text-slate-300">
                Des espaces vérifiés, des paiements sécurisés, des recommandations intelligentes et une expérience optimisée pour les travailleurs indépendants et les équipes.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-white/10 p-6">
                <p className="text-lg font-semibold text-white">+120</p>
                <p className="mt-2 text-sm text-slate-300">Espaces partenaires certifiés</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-6">
                <p className="text-lg font-semibold text-white">15 min</p>
                <p className="mt-2 text-sm text-slate-300">Réservation instantanée</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
