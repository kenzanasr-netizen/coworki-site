import logo from "../assets/logo-coworki.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import HeaderActions from "../components/HeaderActions";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Ville");
  const [selectedType, setSelectedType] = useState("Type");
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [sortBy, setSortBy] = useState("pertinence");

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

  const toggleFilter = (value, setter) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const getPrice = (space) => Number.parseInt(space.price, 10) || 0;

  const matchesBudget = (space) => {
    if (selectedBudgets.length === 0) return true;
    const price = getPrice(space);
    return selectedBudgets.some((budget) => {
      if (budget === "under15") return price < 15;
      if (budget === "15to25") return price >= 15 && price <= 25;
      if (budget === "over25") return price > 25;
      return true;
    });
  };

  const matchesProfile = (space) => {
    if (selectedProfiles.length === 0) return true;
    const searchable = `${space.name} ${space.type} ${space.description} ${space.tags.join(" ")} ${space.services.join(" ")}`.toLowerCase();
    return selectedProfiles.some((profile) => {
      if (profile === "Étudiant") return searchable.includes("étudiant") || searchable.includes("calme");
      if (profile === "Freelance") return searchable.includes("freelance") || searchable.includes("networking") || searchable.includes("moderne");
      if (profile === "Entreprise") return searchable.includes("entreprise") || searchable.includes("meeting") || searchable.includes("b2b") || searchable.includes("bureau");
      return true;
    });
  };

  const filteredSpaces = (() => {
    const query = searchQuery.trim().toLowerCase();

    return spacesData
      .filter((space) => {
        const searchable = `${space.name} ${space.city} ${space.address} ${space.type} ${space.description} ${space.tags.join(" ")} ${space.services.join(" ")}`.toLowerCase();
        const queryMatch = query.length === 0 || searchable.includes(query);
        const cityMatch = selectedCity === "Ville" || space.city === selectedCity;
        const typeMatch =
          selectedType === "Type" ||
          space.type.toLowerCase().includes(selectedType.toLowerCase()) ||
          space.services.some((service) => service.toLowerCase().includes(selectedType.toLowerCase())) ||
          space.tags.some((tag) => tag.toLowerCase().includes(selectedType.toLowerCase()));
        const serviceMatch =
          selectedServices.length === 0 ||
          selectedServices.every((service) => space.services.includes(service));

        return queryMatch && cityMatch && typeMatch && matchesBudget(space) && serviceMatch && matchesProfile(space);
      })
      .sort((a, b) => {
        if (sortBy === "price") return getPrice(a) - getPrice(b);
        if (sortBy === "rating") return Number(b.rating) - Number(a.rating);
        if (sortBy === "popular") return Number.parseInt(b.reviews, 10) - Number.parseInt(a.reviews, 10);
        return 0;
      });
  })();

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("Ville");
    setSelectedType("Type");
    setSelectedBudgets([]);
    setSelectedServices([]);
    setSelectedProfiles([]);
    setSortBy("pertinence");
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

          <DesktopNav />

          <HeaderActions />
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-transparent font-bold text-sm text-[#0F2A43] outline-none placeholder:text-slate-400 transition-colors focus:text-[#0F6C8D]"
                />
              </div>

              <div className="flex items-center gap-3 rounded-2xl sm:rounded-3xl bg-[#F7FAFC] px-3 sm:px-4 py-3 sm:py-4">
                <MapPin className="h-5 w-5 text-[#0F6C8D] flex-shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent font-bold text-sm text-[#0F2A43] outline-none transition-colors focus:text-[#0F6C8D]"
                >
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
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-transparent font-bold text-[#0F2A43] outline-none transition-colors focus:text-[#0F6C8D]"
                >
                  <option>Type</option>
                  <option>Poste individuel</option>
                  <option value="Salle réunion">Salle de réunion</option>
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
                  <input
                    type="checkbox"
                    checked={selectedBudgets.includes("under15")}
                    onChange={() => toggleFilter("under15", setSelectedBudgets)}
                  />{" "}
                  Moins de 15 TND
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBudgets.includes("15to25")}
                    onChange={() => toggleFilter("15to25", setSelectedBudgets)}
                  />{" "}
                  15 - 25 TND
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBudgets.includes("over25")}
                    onChange={() => toggleFilter("over25", setSelectedBudgets)}
                  />{" "}
                  Plus de 25 TND
                </label>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-black text-[#0F2A43]">Services</p>
              <div className="space-y-2 text-sm font-bold text-slate-600">
                {["Wi-Fi", "Salle réunion", "Parking", "Café", "Projecteur"].map((service) => (
                  <label key={service} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => toggleFilter(service, setSelectedServices)}
                    />{" "}
                    {service}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-black text-[#0F2A43]">Profil</p>
              <div className="space-y-2 text-sm font-bold text-slate-600">
                {["Étudiant", "Freelance", "Entreprise"].map((profile) => (
                  <label key={profile} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedProfiles.includes(profile)}
                      onChange={() => toggleFilter(profile, setSelectedProfiles)}
                    />{" "}
                    {profile}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full rounded-2xl bg-[#0F2A43] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0F6C8D]"
            >
              Réinitialiser les filtres
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
                {filteredSpaces.length} espace{filteredSpaces.length > 1 ? "s" : ""} disponible{filteredSpaces.length > 1 ? "s" : ""}
              </h2>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-[#0F2A43] outline-none"
            >
              <option value="pertinence">Trier par pertinence</option>
              <option value="price">Prix croissant</option>
              <option value="rating">Meilleures notes</option>
              <option value="popular">Plus populaires</option>
            </select>
          </div>

          {filteredSpaces.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-100 bg-white p-10 text-center shadow-sm">
              <h3 className="text-2xl font-black text-[#0F2A43]">
                Aucun espace ne correspond à ces filtres.
              </h3>
              <p className="mt-3 text-slate-600">
                Essaie une autre ville, un budget différent ou moins de services.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 rounded-full bg-[#0F6C8D] px-6 py-3 text-sm font-black text-white"
              >
                Voir tous les espaces
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredSpaces.map((space, index) => (
              <motion.div
                key={space.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                whileHover={{ y: -10 }}
                className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:border-[#0F6C8D]/20 hover:shadow-2xl hover:shadow-slate-300/60"
              >
                <Link to={`/spaces/${space.id}`} className="block">
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={space.images[0]}
                      alt={space.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F2A43]/45 via-transparent to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#0F6C8D] shadow-sm backdrop-blur">
                      {space.city}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#7A1E3A] shadow-sm backdrop-blur transition hover:scale-105"
                      aria-label="Ajouter aux favoris"
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    <span className="absolute bottom-4 left-4 rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white shadow-lg">
                      Disponible
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black leading-tight text-[#0F2A43]">
                          {space.name}
                        </h3>
                        <p className="mt-2 flex items-start gap-2 text-sm font-bold leading-6 text-slate-500">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6C8D]" />
                          {space.address}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF7E8] px-3 py-1 text-sm font-black text-[#9A6A13]">
                        <Star className="h-4 w-4 fill-[#D9A441] text-[#D9A441]" />
                        {space.rating}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F7FAFC] px-4 py-3">
                      <span className="text-sm font-bold text-slate-500">À partir de</span>
                      <span className="text-lg font-black text-[#7A1E3A]">
                        {space.price}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {space.services.slice(0, 4).map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1 rounded-full bg-[#ECF8FC] px-3 py-1 text-xs font-bold text-[#0F2A43]"
                        >
                          {serviceIcons[service] || <CheckIcon />}
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl bg-[#0F2A43] px-4 py-3 text-center text-sm font-black text-white transition group-hover:bg-[#0F6C8D]">
                      Voir détails
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          )}
        </main>
      </section>
    </div>
  );
}

function CheckIcon() {
  return <span className="h-2 w-2 rounded-full bg-[#0F6C8D]" />;
}

export default Spaces;
