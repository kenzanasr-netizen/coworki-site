"use client"

import { useMemo, useState } from "react"
import { Search, Filter, MapPin } from "lucide-react"
import { SpaceCard } from "@/components/SpaceCard"
import { MapView } from "@/components/MapView"
import { mockSpaces } from "@/lib/mockSpaces"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const cityOptions = ["Tunis", "Sousse", "Hammamet"]
const sortOptions = [
  { label: "Prix croissant", value: "price" },
  { label: "Meilleure note", value: "rating" },
  { label: "Eco Score", value: "ecoScore" }
]

export default function SpacesPage() {
  const [search, setSearch] = useState("")
  const [city, setCity] = useState<string>("")
  const [sort, setSort] = useState<string>("ecoScore")
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | undefined>(undefined)

  const spaces = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase()

    return [...mockSpaces]
      .filter((space) => {
        if (!normalizedQuery && !city) return true
        return (
          (normalizedQuery === "" || space.name.toLowerCase().includes(normalizedQuery) || space.city.toLowerCase().includes(normalizedQuery)) &&
          (city === "" || space.city === city)
        )
      })
      .sort((a, b) => {
        if (sort === "price") return a.pricePerHour - b.pricePerHour
        if (sort === "rating") return b.averageRating - a.averageRating
        return b.ecoScore - a.ecoScore
      })
  }, [search, city, sort])

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Espaces sélectionnés</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Trouvez votre coworking idéal</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Explorez les espaces avec offres flash, notes en temps réel et ambiance inspirante.
          </p>
        </div>
        <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Filtres rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Recherche</p>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  className="pl-10"
                  placeholder="Nom ou ville"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Ville</p>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Toutes les villes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les villes</SelectItem>
                  {cityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Trier par</p>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="secondary" className="w-full">
              Afficher {spaces.length} espaces
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {spaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              href={`/space/${space.id}`}
              onReserve={(id) => {
                window.location.href = `/reservation?spaceId=${encodeURIComponent(id)}`
              }}
              onViewDetails={() => undefined}
            />
          ))}
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <div className="border-b border-slate-200 bg-slate-950 p-6 text-white">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <MapPin className="h-5 w-5" />
                Vue carte en direct
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Sélectionnez un espace pour voir son emplacement et ses offres spéciales.
              </p>
            </div>
            <div className="h-[560px]">
              <MapView
                spaces={spaces}
                selectedSpaceId={selectedSpaceId}
                onSpaceSelect={setSelectedSpaceId}
                userLocation={{ lat: 36.8065, lng: 10.1815 }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
