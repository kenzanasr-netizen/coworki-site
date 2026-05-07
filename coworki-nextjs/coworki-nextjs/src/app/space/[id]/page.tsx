import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockSpaces } from "@/lib/mockSpaces"
import { formatCurrency } from "@/lib/utils"
import { MapPin, Star, Users, Wifi, Coffee, Car, Zap, Leaf } from "lucide-react"

const amenityIcons = {
  wifi: Wifi,
  coffee: Coffee,
  parking: Car,
  power: Zap,
  eco: Leaf
}

export default function SpaceDetailsPage({ params }: { params: { id: string } }) {
  const space = mockSpaces.find((item) => item.id === params.id)

  if (!space) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    {space.isVerified ? "Vérifié" : "Non vérifié"}
                  </Badge>
                  <Badge variant="outline">{space.city}</Badge>
                </div>
                <h1 className="mt-4 text-4xl font-semibold text-slate-900">{space.name}</h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  {space.description}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Capacité</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">Jusqu'à {space.capacity} personnes</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Prix horaire</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{formatCurrency(space.pricePerHour)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Réservation rapide</p>
                  <p className="mt-4 text-3xl font-semibold">{formatCurrency(space.pricePerHour)}</p>
                  <p className="mt-3 text-sm text-slate-300">Sélectionnez une date, puis réservez directement en ligne.</p>
                  <Link href={`/reservation?spaceId=${space.id}`}>
                    <Button className="mt-6 w-full">Réserver maintenant</Button>
                  </Link>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span>{space.averageRating.toFixed(1)} / 5</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Basé sur {space.totalReviews} avis</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Card className="rounded-[2rem] border-slate-200">
              <CardHeader>
                <CardTitle>Galerie & emplacement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {space.images.slice(0, 4).map((src, index) => (
                    <img key={index} src={src} alt={`${space.name} ${index + 1}`} className="h-56 w-full rounded-3xl object-cover" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="rounded-[2rem] border-slate-200">
                <CardHeader>
                  <CardTitle>Adresse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-5 w-5" />
                    <p>{space.address}, {space.city}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-slate-200">
                <CardHeader>
                  <CardTitle>Éco score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-3xl bg-emerald-50 p-4 text-emerald-700">
                    <p className="text-xl font-semibold">{space.ecoScore}/100</p>
                    <p className="mt-1 text-sm">Espace engagé avec des pratiques durables.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="rounded-[2rem] border-slate-200">
            <CardHeader>
              <CardTitle>Équipements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {space.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi
                  return (
                    <div key={amenity} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <Icon className="h-5 w-5 text-slate-700" />
                      <p className="text-sm text-slate-700 capitalize">{amenity}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="rounded-[2rem] border-slate-200">
            <CardHeader>
              <CardTitle>Pourquoi choisir CoWorki ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <div className="space-y-2 rounded-3xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Offres flash dynamiques</p>
                <p>Profitez de réductions instantanées sur des espaces disponibles.</p>
              </div>
              <div className="space-y-2 rounded-3xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Paiement sécurisé</p>
                <p>Réglez facilement avec Stripe ou Konnect.</p>
              </div>
              <div className="space-y-2 rounded-3xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Réservation rapide</p>
                <p>Choisissez votre créneau et confirmez en quelques clics.</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
