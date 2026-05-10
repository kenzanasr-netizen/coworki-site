import logo from "../assets/logo-coworki.png";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ImageCarousel from "../components/ImageCarousel";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import HeaderActions from "../components/HeaderActions";
import Breadcrumb from "../components/Breadcrumb";
import SEO from "../components/SEO";
import { spacesData } from "../data/spacesData";
import { apiFetch } from "../data/apiClient";
import { getMockSession } from "../data/mockAuth";
import {
  ArrowLeft,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Presentation,
  Car,
  Snowflake,
  Users,
  CalendarDays,
  Clock3,
  Heart,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Phone,
} from "lucide-react";

function SpaceDetails() {
  const { id } = useParams();

  const space = spacesData.find((item) => item.id === id) || spacesData[0];
  const session = getMockSession();
  const [reviews, setReviews] = useState([]);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const images = space.images || [];
  const gallery = images.slice(1);
  const basePrice = Number.parseInt(space.price, 10) || 15;
  const formulas = [
    ["2h", `${basePrice} TND`],
    ["4h", `${Math.round(basePrice * 1.7)} TND`],
    ["Journée", `${Math.round(basePrice * 2.5)} TND`],
  ];

  const serviceIcons = {
    "Wi-Fi": <Wifi className="h-5 w-5" />,
    Café: <Coffee className="h-5 w-5" />,
    "Salle réunion": <Presentation className="h-5 w-5" />,
    Projecteur: <Presentation className="h-5 w-5" />,
    Parking: <Car className="h-5 w-5" />,
    Climatisation: <Snowflake className="h-5 w-5" />,
    Networking: <Users className="h-5 w-5" />,
    Événements: <CalendarDays className="h-5 w-5" />,
  };

  useEffect(() => {
    let active = true;
    apiFetch(`/api/spaces/${space.id}/reviews`)
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (active && response.ok) setReviews(data.reviews || []);
      })
      .catch(() => {
        if (active) setReviews([]);
      });

    return () => {
      active = false;
    };
  }, [space.id]);

  const addFavorite = async () => {
    setFavoriteMessage("");
    if (!session) {
      setFavoriteMessage("Connectez-vous pour ajouter cet espace aux favoris.");
      return;
    }

    try {
      const response = await apiFetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ spaceId: space.id, space }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible d’ajouter aux favoris.");
      setFavoriteMessage("Espace ajouté à vos favoris.");
    } catch (error) {
      setFavoriteMessage(error.message || "Impossible d’ajouter aux favoris.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      <SEO
        title={`${space.name} - Détails et réservation | CoWorki`}
        description={`Consultez les photos, services, tarifs et disponibilités de ${space.name} sur CoWorki.`}
      />
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-16 w-auto sm:h-20 md:h-24" />
          </Link>

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
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 top-16 h-80 w-80 rounded-[4rem] border border-[#0F6C8D]/20 bg-white/20 backdrop-blur"
        />
        <motion.div
          animate={{ y: [0, -22, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-12 top-36 hidden h-28 w-28 rounded-full bg-[#7A1E3A]/10 md:block"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
          <Breadcrumb
            items={[
              { label: "Accueil", path: "/" },
              { label: "Espaces", path: "/spaces" },
              { label: space.name },
            ]}
          />

          <Link
            to="/spaces"
            className="mb-8 mt-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-black text-[#0F2A43] shadow-sm transition hover:text-[#0F6C8D]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux espaces
          </Link>

          <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#7A1E3A] px-4 py-2 text-xs font-black text-white">
                  {space.type}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7E8] px-4 py-2 text-xs font-black text-[#9A6A13]">
                  <Star className="h-4 w-4 fill-[#D9A441] text-[#D9A441]" />
                  {space.rating} · {space.reviews}
                </span>
              </div>

              <h1 className="max-w-3xl text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-[-0.04em] text-[#0F2A43]">
                {space.name}
              </h1>

              <p className="mt-4 text-lg italic text-[#0F6C8D]">“{space.quote}”</p>

              <p className="mt-5 flex items-center gap-2 text-lg font-bold text-slate-600">
                <MapPin className="h-5 w-5 text-[#0F6C8D]" />
                {space.address}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {space.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#F7FAFC] px-3 py-1 text-sm font-black text-[#0F2A43]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {space.description}
              </p>

              <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
                {formulas.map(([label, price]) => (
                  <div key={label} className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-white/80">
                    <p className="text-sm font-black text-slate-400">Formule {label}</p>
                    <p className="mt-1 text-2xl font-black text-[#7A1E3A]">
                      {price}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2.8rem] bg-gradient-to-br from-[#0F6C8D]/20 to-[#7A1E3A]/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl shadow-slate-300/60">
                <ImageCarousel
                  images={images}
                  title={space.name}
                  heightClass="h-[300px] sm:h-[400px] lg:h-[440px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_380px]">
        <main className="space-y-8">
          {/* GALLERY */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-black text-[#0F2A43]">
              Aperçu de l’espace
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {gallery.map((image, index) => (
                <motion.img
                  key={image}
                  src={image}
                  alt={`Galerie ${index + 1}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-52 w-full rounded-3xl object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-black text-[#0F2A43]">
              Services disponibles
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {space.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-2xl bg-[#F7FAFC] p-4 font-black text-[#0F2A43]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                    {serviceIcons[service] || <CheckCircle2 className="h-5 w-5" />}
                  </div>

                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-black text-[#0F2A43]">
              Informations pratiques
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-[#F7FAFC] p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                  <Clock3 className="h-6 w-6" />
                </div>

                <p className="font-black text-[#0F2A43]">Horaires</p>
                <p className="mt-2 leading-7 text-slate-600">{space.opening}</p>
              </div>

              <div className="rounded-3xl bg-[#F7FAFC] p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                  <Phone className="h-6 w-6" />
                </div>

                <p className="font-black text-[#0F2A43]">Téléphone</p>
                <p className="mt-2 leading-7 text-slate-600">{space.phone}</p>
              </div>

              <div className="rounded-3xl bg-[#F7FAFC] p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                  <Users className="h-6 w-6" />
                </div>

                <p className="font-black text-[#0F2A43]">Capacité</p>
                <p className="mt-2 leading-7 text-slate-600">
                  Adapté pour {space.capacity}
                </p>
              </div>

              <div className="rounded-3xl bg-[#F7FAFC] p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <p className="font-black text-[#0F2A43]">Espace vérifié</p>
                <p className="mt-2 leading-7 text-slate-600">
                  Cet espace est présenté comme un partenaire validé par CoWorki.
                </p>
              </div>

              <div className="rounded-3xl bg-[#F7FAFC] p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                  <Building2 className="h-6 w-6" />
                </div>

                <p className="font-black text-[#0F2A43]">Type d’espace</p>
                <p className="mt-2 leading-7 text-slate-600">{space.type}</p>
              </div>
            </div>
          </div>

          {/* WHY CHOOSE */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-black text-[#0F2A43]">
              Pourquoi choisir cet espace ?
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                [
                  <MapPin className="h-5 w-5" />,
                  "Bien situé",
                  `Un espace facile à repérer à ${space.city}, adapté aux journées de travail et aux réunions.`,
                ],
                [
                  <CheckCircle2 className="h-5 w-5" />,
                  "Services utiles",
                  "Wi-Fi, confort, équipements et ambiance professionnelle pour rester productif.",
                ],
                [
                  <ShieldCheck className="h-5 w-5" />,
                  "Choix rassurant",
                  "Les informations clés sont regroupées pour comparer et réserver plus simplement.",
                ],
              ].map(([icon, title, text]) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl bg-[#F7FAFC] p-5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
                    {icon}
                  </div>
                  <h3 className="font-black text-[#0F2A43]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* REVIEWS */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-2xl font-black text-[#0F2A43]">
              Avis utilisateurs
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {(reviews.length
                ? reviews.map((review) => [review.comment || "Très bonne expérience.", review.user?.fullName || "Utilisateur CoWorki", review.rating])
                : [
                    ["Très bon espace, calme et agréable pour travailler.", "Étudiant", 5],
                    ["Réservation simple et espace bien équipé.", "Freelance", 5],
                  ]
              ).map(([comment, author, rating]) => (
                <div key={author} className="rounded-3xl bg-[#F7FAFC] p-5">
                  <div className="mb-3 flex gap-1 text-[#D9A441]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`h-4 w-4 ${i <= rating ? "fill-current" : ""}`} />
                    ))}
                  </div>

                  <p className="leading-7 text-slate-600">“{comment}”</p>
                  <p className="mt-4 font-black text-[#0F2A43]">— {author}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* BOOKING CARD */}
        <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-100 lg:sticky lg:top-32">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-400">
                À partir de
              </p>
              <p className="text-3xl font-black text-[#7A1E3A]">
                {space.price}
              </p>
            </div>

            <button onClick={addFavorite} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FBEFF3] text-[#7A1E3A] transition hover:scale-105" aria-label="Ajouter aux favoris">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          {favoriteMessage && <p className="mt-3 rounded-2xl bg-[#F7FAFC] px-4 py-3 text-xs font-black text-[#0F6C8D]">{favoriteMessage}</p>}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                Date
              </label>
              <input
                type="date"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                Durée
              </label>
              <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]">
                <option>2 heures</option>
                <option>Demi-journée</option>
                <option>Journée complète</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-[#0F2A43]">
                Nombre de personnes
              </label>
              <input
                type="number"
                min="1"
                placeholder="1"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]"
              />
            </div>

            <Link
  to={`/booking/${space.id}`}
  className="block w-full rounded-2xl bg-[#0F6C8D] px-5 py-4 text-center text-sm font-black text-white shadow-xl shadow-[#0F6C8D]/20 transition hover:bg-[#0B5873]"
>
  Réserver maintenant
</Link>

            <button className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-sm font-black text-[#0F2A43] transition hover:border-[#7A1E3A] hover:text-[#7A1E3A]">
              Contacter l’espace
            </button>
          </div>

          <div className="mt-6 rounded-3xl bg-[#F7FAFC] p-5">
            <p className="flex items-center gap-2 font-black text-[#0F2A43]">
              <ShieldCheck className="h-5 w-5 text-[#0F6C8D]" />
              Réservation sécurisée
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cette page présente une simulation de réservation dans le cadre du
              prototype CoWorki.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default SpaceDetails;
