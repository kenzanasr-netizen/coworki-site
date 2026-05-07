"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReservationPage() {
  const params = useSearchParams()
  const selectedSpace = params.get("spaceId")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [duration, setDuration] = useState("2")
  const [notes, setNotes] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("Réservation simulée: nous reviendrons vers vous avec les détails de confirmation.")
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-16rem)] max-w-4xl items-center justify-center px-6 py-10">
      <Card className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Réservation</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Finalisez votre réservation</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Choisissez votre créneau, renseignez vos informations et confirmez votre place dans un espace inspirant.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Espace sélectionné</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{selectedSpace ? selectedSpace : "Aucun espace sélectionné"}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="bonjour@exemple.tn"
                required
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Durée (heures)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  min={1}
                  max={12}
                  onChange={(event) => setDuration(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes complémentaires</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Indiquez vos besoins spécifiques, nombre de personnes, etc."
              />
            </div>
            <Button type="submit">Confirmer la réservation</Button>
            {message && <p className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">{message}</p>}
          </form>
        </div>
      </Card>
    </div>
  )
}
