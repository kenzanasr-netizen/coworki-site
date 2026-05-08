import logo from "../assets/logo-coworki.png";
import { Link } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import { spacesData } from "../data/spacesData";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Star,
  Wifi,
  Coffee,
  Presentation,
  Car,
  Snowflake,
  Heart,
  Building2,
  Users,
  CalendarDays,
} from "lucide-react";
import { motion } from "framer-motion";

function Spaces() {
  const spaces = spacesData;

  const serviceIcons = {
    "Wi-Fi": <Wifi className="h-4 w-4" />,
    Café: <Coffee className="h-4 w-4" />,
    "Salle réunion": <Presentation className="h-4 w-4" />,
    Projecteur: <Presentation className="h-4 w-4" />,
    Parking: <Car className="h-4 w-4" />,
    Climatisation: <Snowflake className="h-4 w-4" />,
    Networking: <Users className="h-4 w-4" />,
    Events: <CalendarDays className="h-4 w-4" />,
    Calme: <Building2 className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-16 w-auto sm:h-20 md:h-24" />
          </div>

          <MobileNav />

          <nav className="hidden items-center gap-7 rounded-full border border-slate-200/70 bg-white/80 px-6 py-3 text-sm font-black text-slate-600 shadow-sm lg:flex">
            <Link to="/" className="transition hover:text-[#0F6C8D]">
              Accueil
            </Link>

            <Link to="/spaces" className="text-[#0F6C8D]">
              Espaces
            </Link>

            <Link to="/offres" className="transition hover:text-[#0F6C8D]">
              Offres
            </Link>

            <Link to="/events" className="transition hover:text-[#0F6C8D]">
              Events
            </Link>

            <Link to="/partenaires" className="transition hover:text-[#0F6C8D]">
              Partenaires
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
  to="/connexion"
  className="rounded-full px-5 py-3 text-sm font-black text-[#0F2A43] transition hover:bg-white"
>
  Connexion
</Link>
            <Link
  to="/inscription"
  className="rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/25 transition hover:bg-[#64172F]"
>
  Inscription
</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3]">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#9ED8E8]/50 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#7A1E3A]/20 blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 top-20 h-80 w-80 rounded-[4rem] border border-[#0F6C8D]/20 bg-white/20 backdrop-blur"
        />
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-12 top-32 hidden h-28 w-28 rounded-full bg-[#7A1E3A]/10 md:block"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/70 bg-white/75 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
              <SlidersHorizontal className="h-4 w-4" />
              Recherche intelligente d’espaces
            </p>

            <h1 className="mx-auto max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.04em] text-[#0F2A43]">
              Trouvez l’espace qui correspond vraiment à votre façon de travailler.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
              Comparez les espaces de coworking selon la ville, le prix, les services,
              l’ambiance et les disponibilités.
            </p>
          </motion.div>

          {/* SEARCH BOX */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-8 sm:mt-10 max-w-5xl rounded-[2rem] border border-white/80 bg-white/85 p-3 sm:p-4 shadow-2xl shadow-slate-300/60 backdrop-blur-2xl overflow-hidden"
          >
            <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-[1.3fr_1fr_1fr_auto]">
              <div className="flex items-center gap-3 rounded-2xl sm:rounded-3xl bg-[#F7FAFC] px-3 sm:px-4 py-3 sm:py-4">
                <Search className="h-5 w-5 text-[#0F6C8D] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-transparent font-bold text-sm text-[#0F2A43] outline-none placeholder:text-slate-400 transition-colors focus:text-[#0F6C8D]"
                />
              </div>

              <div className="flex items-center gap-3 rounded-2xl sm:rounded-3xl bg-[#F7FAFC] px-3 sm:px-4 py-3 sm:py-4">
                <MapPin className="h-5 w-5 text-[#0F6C8D] flex-shrink-0" />
                <select className="w-full bg-transparent font-bold text-sm text-[#0F2A43] outline-none transition-colors focus:text-[#0F6C8D]">
                  <option>Ville</option>
                  <option>Sousse</option>
                  <option>Tunis</option>
                  <option>Monastir</option>
                  <option>Sfax</option>
                  <option>Ariana</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center gap-3 rounded-3xl bg-[#F7FAFC] px-4 py-4">
                <Building2 className="h-5 w-5 text-[#0F6C8D]" />
                <select className="w-full bg-transparent font-bold text-[#0F2A43] outline-none transition-colors focus:text-[#0F6C8D]">
                  <option>Type</option>
                  <option>Poste individuel</option>
                  <option>Salle de réunion</option>
                  <option>Bureau privé</option>
                  <option>Open space</option>
                </select>
              </div>

              <button className="col-span-1 sm:col-span-auto rounded-2xl sm:rounded-3xl bg-[#7A1E3A] px-4 sm:px-8 py-3 sm:py-4 font-black text-xs sm:text-sm text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:bg-[#64172F] whitespace-nowrap">
                Rechercher
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-6 sm:gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[280px_1fr]">
        {/* FILTERS */}
        <aside className="h-fit rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-6 shadow-sm lg:sticky lg:top-32">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#0F2A43]">Filtres</h2>
            <SlidersHorizontal className="h-5 w-5 text-[#7A1E3A]" />
          </div>

          <div className="mt-7 space-y-7">
            <div>
              <p className="mb-3 text-sm font-black text-[#0F2A43]">Budget</p>
              <div className="space-y-2 text-sm font-bold text-slate-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Moins de 15 TND
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> 15 - 25 TND
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Plus de 25 TND
                </label>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-black text-[#0F2A43]">Services</p>
              <div className="space-y-2 text-sm font-bold text-slate-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Wi-Fi
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Salle réunion
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Parking
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Café
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Projecteur
                </label>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-black text-[#0F2A43]">Profil</p>
              <div className="space-y-2 text-sm font-bold text-slate-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Étudiant
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Freelance
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Entreprise
                </label>
              </div>
            </div>

            <button className="w-full rounded-2xl bg-[#0F2A43] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0F6C8D]">
              Appliquer les filtres
            </button>
          </div>
        </aside>

        {/* RESULTS */}
        <main>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#0F6C8D]">
                Résultats
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0F2A43]">
                {spaces.length} espaces disponibles
              </h2>
            </div>

            <select className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-[#0F2A43] outline-none">
              <option>Trier par pertinence</option>
              <option>Prix croissant</option>
              <option>Meilleures notes</option>
              <option>Plus populaires</option>
            </select>
          </div>

          <div className="grid gap-6 sm:gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {spaces.map((space, index) => (
              <Link key={space.name} to={`/spaces/${space.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  whileHover={{ y: -12, rotateY: 5 }}
                  className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/60 hover:border-[#0F6C8D]/20 cursor-pointer"
                >
                <div className="relative h-56 overflow-hidden">
                  {space.images && space.images.length > 0 ? (
                    <img
                      src={space.images[0]}
                      alt={space.name}
                      className="w-full h-full object-cover rounded-[2rem] transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                      Image non disponible
                    </div>
                  )}

                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Ici on pourrait ajouter une logique pour gérer les favoris
                    }}
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#7A1E3A] backdrop-blur transition hover:scale-105"
                  >
                    <Heart className="h-5 w-5" />
                  </button>

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#0F6C8D] backdrop-blur shadow-sm">
                    {space.city}
                  </span>

                  <span className="absolute bottom-4 left-4 rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white shadow-lg">
                    {space.type}
                  </span>

                  <div className="absolute right-4 top-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/90 text-white shadow-sm backdrop-blur">
                      <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-[#0F2A43]">
                        {space.name}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-slate-500">
                        {space.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-[#FFF7E8] px-3 py-1 text-sm font-black text-[#9A6A13]">
                      <Star className="h-4 w-4 fill-[#D9A441] text-[#D9A441]" />
                      {space.rating}
                    </div>
                  </div>

                  <p className="mt-4 font-bold text-slate-600">
                    {space.reviews}
                  </p>

                  <p className="mt-4 font-bold text-slate-600">
                    À partir de{" "}
                    <span className="text-lg font-black text-[#7A1E3A]">
                      {space.price}
                    </span>
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {space.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center gap-1 rounded-full bg-[#F7FAFC] px-3 py-1 text-xs font-bold text-slate-600"
                      >
                        {serviceIcons[service] || <CheckIcon />}
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-[#0F2A43] transition hover:border-[#0F6C8D] hover:text-[#0F6C8D]"
                    >
                      Voir détails
                    </button>

                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Ici on pourrait ajouter une logique de réservation rapide
                        // Pour l'instant, on redirige vers la page de réservation
                        window.location.href = '/reservation';
                      }}
                      className="rounded-2xl bg-[#0F6C8D] px-4 py-3 text-sm font-black text-white transition hover:bg-[#0B5873]"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}

function CheckIcon() {
  return <span className="h-2 w-2 rounded-full bg-[#0F6C8D]" />;
}

export default Spaces;
