"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("Connexion simulée réussie. Redirection vers l'espace utilisateur...")
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-16rem)] max-w-3xl items-center justify-center px-6 py-10">
      <Card className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Connexion</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Reprenez le contrôle de vos réservations</h1>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5">
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
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit">Se connecter</Button>
          </form>
          {message && <p className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">{message}</p>}
          <p className="text-sm text-slate-600">
            Nouveau sur CoWorki ? <Link href="/register" className="font-semibold text-blue-600">Créer un compte</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
