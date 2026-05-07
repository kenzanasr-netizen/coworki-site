# CoWorki - Plateforme de Coworking Moderne

Une plateforme complète de coworking construite avec Next.js 14, offrant des fonctionnalités avancées comme le matching intelligent, les offres flash en temps réel, et les paiements intégrés.

## 🚀 Fonctionnalités

### Pour les Utilisateurs
- **Recherche intelligente** : Trouvez l'espace parfait avec filtres avancés
- **Matching IA** : Découvrez des coworkers avec des intérêts similaires
- **Réservations temps réel** : Système de verrouillage et confirmation instantanée
- **Carte interactive** : Visualisez les espaces sur une carte avec géolocalisation
- **Paiements multiples** : Stripe (international) et Konnect (Tunisie)
- **Notifications temps réel** : Mises à jour en direct via Socket.io

### Pour les Partenaires
- **Dashboard analytics** : Métriques détaillées et graphiques en temps réel
- **Gestion d'occupation** : Suivi en direct du taux d'occupation
- **Offres flash automatisées** : Déclenchement intelligent basé sur l'IA
- **Gestion des réservations** : Interface complète pour gérer les bookings
- **Intégration paiements** : Gestion des revenus et commissions

### Fonctionnalités Techniques
- **IA/ML** : Matching intelligent et prédiction d'occupation
- **Temps réel** : WebSocket avec namespaces spécialisés
- **Paiements escrow** : Séquestre automatique avec libération conditionnelle
- **Recherche géographique** : Algolia avec recherche geo-spatiale
- **Progressive Web App** : Installation et fonctionnement hors ligne

## 🛠️ Stack Technique

### Frontend
- **Next.js 14** - App Router, Server Components, Server Actions
- **TypeScript** - Type safety complète
- **Tailwind CSS** - Styling utility-first
- **shadcn/ui** - Composants UI modernes
- **Framer Motion** - Animations fluides
- **React Hook Form + Zod** - Gestion et validation des formulaires

### Backend
- **Prisma + PostgreSQL** - ORM et base de données
- **pgvector** - Embeddings pour l'IA
- **NextAuth.js** - Authentification (Clerk en option)
- **Socket.io** - Temps réel avec namespaces

### Paiements
- **Stripe** - Paiements internationaux avec escrow
- **Konnect** - Paiements locaux tunisiens

### IA/ML
- **FastAPI** - Services de ML
- **scikit-learn** - Algorithmes de matching
- **sentence-transformers** - Embeddings textuels
- **Random Forest** - Prédiction d'occupation

### DevOps
- **Docker** - Conteneurisation
- **GitHub Actions** - CI/CD
- **Sentry** - Monitoring et erreurs
- **Vercel** - Déploiement (optionnel)

## 📁 Structure du Projet

```
coworki-nextjs/
├── prisma/
│   └── schema.prisma          # Schéma base de données
├── src/
│   ├── actions/               # Server Actions
│   │   ├── reservation.ts     # Gestion réservations
│   │   └── payment.ts         # Gestion paiements
│   ├── app/                   # App Router Next.js
│   │   ├── (auth)/            # Routes d'authentification
│   │   ├── (dashboard)/       # Dashboard utilisateur/partenaire
│   │   ├── api/               # API routes
│   │   └── spaces/            # Pages espaces
│   ├── components/            # Composants React
│   │   ├── SpaceCard.tsx      # Carte d'espace
│   │   ├── MapView.tsx        # Vue carte
│   │   ├── OccupancyGauge.tsx # Jauge occupation
│   │   └── PartnerDashboard.tsx # Dashboard partenaire
│   ├── lib/                   # Utilitaires
│   │   ├── prisma.ts          # Client Prisma
│   │   ├── stripe.ts          # Configuration Stripe
│   │   ├── konnect.ts         # Configuration Konnect
│   │   ├── socket.ts          # Serveur Socket.io
│   │   └── ml/                # Services IA
│   │       ├── smartmatching.py # Matching intelligent
│   │       └── occupancy.py   # Prédiction occupation
│   └── types/                 # Types TypeScript
├── public/                    # Assets statiques
└── .env.example              # Variables d'environnement
```

## 🚀 Installation & Configuration

### Prérequis
- Node.js 18+
- PostgreSQL 15+ avec extension pgvector
- Python 3.9+ (pour les services ML)
- Redis (optionnel, pour Socket.io scaling)

### 1. Clonage et installation
```bash
git clone <repository-url>
cd coworki-nextjs
npm install
```

### 2. Configuration base de données
```bash
# Créer la base de données PostgreSQL
createdb coworki

# Installer l'extension pgvector
psql coworki -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Configuration Prisma
npx prisma generate
npx prisma db push
```

### 3. Variables d'environnement
```bash
cp .env.example .env.local
# Éditer .env.local avec vos clés API
```

### 4. Services ML (optionnel)
```bash
cd src/lib/ml
pip install -r requirements.txt
# Lancer les services FastAPI
python smartmatching.py &
python occupancy.py &
```

### 5. Démarrage
```bash
npm run dev
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Démarrage production
npm run lint         # Linting
npm run type-check   # Vérification TypeScript

# Base de données
npx prisma studio    # Interface graphique Prisma
npx prisma migrate   # Migrations
npx prisma generate  # Génération client

# ML Services
cd src/lib/ml
python smartmatching.py  # Service matching
python occupancy.py      # Service prédiction
```

## 📊 API Routes

### Principales Endpoints
- `GET /api/spaces` - Recherche d'espaces
- `POST /api/reservations` - Création réservation
- `POST /api/payments` - Traitement paiements
- `GET /api/socket` - WebSocket temps réel

### Server Actions
- `createReservation` - Réservation avec verrouillage
- `createEscrowPayment` - Paiement séquestré Stripe
- `createKonnectPayment` - Paiement local tunisien
- `searchSpaces` - Recherche avec filtres

## 🔒 Authentification & Autorisation

### Rôles Utilisateur
- **USER** : Utilisateur standard
- **PARTNER** : Gérant d'espace
- **ENTERPRISE** : Compte entreprise
- **ADMIN** : Administrateur

### Permissions
- Routes protégées avec middleware NextAuth
- Autorisation granulaire par rôle
- Validation côté serveur avec Zod

## 💳 Système de Paiements

### Stripe (International)
- Paiements avec séquestre automatique
- Libération manuelle après service
- Webhooks pour confirmations

### Konnect (Tunisie)
- Paiements locaux en DT
- Intégration API Konnect
- Support cartes locales

### Commissions
- 15% commission sur chaque réservation
- Transfert automatique aux partenaires
- Gestion des remboursements

## 🤖 Intelligence Artificielle

### Smart Matching
- Analyse des intérêts utilisateurs
- Similarité sémantique avec embeddings
- Matching temps réel dans les espaces

### Prédiction d'Occupation
- Modèle Random Forest
- Features : heure, jour, météo, historique
- Déclenchement automatique d'offres flash

## 📱 Progressive Web App

### Fonctionnalités PWA
- Installation sur mobile/desktop
- Fonctionnement hors ligne
- Notifications push
- Service workers pour cache

### Technologies
- Next.js PWA plugin
- Workbox pour service workers
- Manifest.json configuré

## 🔍 Recherche & Découverte

### Algolia Integration
- Indexation des espaces
- Recherche geo-spatiale
- Filtres facettés
- Autocomplétion

### Filtres Disponibles
- Prix, équipements, capacité
- Distance géographique
- Note moyenne, éco-score
- Disponibilité temps réel

## 📈 Analytics & Monitoring

### Métriques Trackées
- Taux d'occupation par heure
- Revenus et réservations
- Satisfaction utilisateurs
- Performance des offres flash

### Outils
- Sentry pour erreurs
- Analytics personnalisés
- Logs structurés
- Alertes temps réel

## 🚀 Déploiement

### Production Checklist
- [ ] Variables d'environnement configurées
- [ ] Base de données migrée
- [ ] Services ML déployés
- [ ] Webhooks configurés
- [ ] Domaines SSL configurés
- [ ] Monitoring activé

### Plateformes Recommandées
- **Vercel** : Frontend Next.js
- **Railway** : Base de données PostgreSQL
- **Render** : Services ML FastAPI
- **Upstash** : Redis pour Socket.io

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour le support, ouvrez une issue sur GitHub ou contactez l'équipe de développement.

---

**CoWorki** - Révolutionnez l'expérience coworking avec l'IA et le temps réel ! 🚀
