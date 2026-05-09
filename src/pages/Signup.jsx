import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Briefcase,
  Building2,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Languages,
  Leaf,
  Megaphone,
  Palette,
  Search,
  Sparkles,
  User,
  Users,
  Video,
} from "lucide-react";
import logo from "../assets/logo-coworki.png";
import ImageUploadPanel from "../components/ImageUploadPanel";
import { createAccount, roleHomeRoutes } from "../data/mockAuth";

const accountTypes = {
  user: {
    title: "Compte utilisateur",
    description: "Réservez des espaces, participez aux events et accédez au Smart Matching après réservation.",
    button: "Créer un compte utilisateur",
    icon: <User className="h-7 w-7" />,
    success: "Votre compte utilisateur a été créé avec succès.",
  },
  business: {
    title: "Compte entreprise",
    description: "Réservez des salles pour réunions, formations, séminaires et événements professionnels.",
    button: "Créer un compte entreprise",
    icon: <BriefcaseBusiness className="h-7 w-7" />,
    success: "Votre compte entreprise a été créé avec succès.",
  },
  partner: {
    title: "Compte partenaire",
    description: "Référencez votre espace de coworking, gérez vos réservations et développez votre visibilité.",
    button: "Créer un compte partenaire",
    icon: <Building2 className="h-7 w-7" />,
    success: "Votre demande partenaire a été envoyée avec succès. L’équipe CoWorki validera votre espace avant publication.",
  },
};

const tunisianCities = ["Ariana", "Tunis", "Manouba", "Sousse", "Sfax"];

const interestOptions = [
  "Design",
  "UX/UI",
  "Branding",
  "Marketing",
  "Marketing digital",
  "Communication",
  "Réseaux sociaux",
  "Création de contenu",
  "Intelligence artificielle",
  "Data science",
  "Développement web",
  "React",
  "Next.js",
  "Mobile",
  "No-code",
  "Business",
  "Entrepreneuriat",
  "Startups",
  "Innovation",
  "E-commerce",
  "Finance",
  "Comptabilité",
  "RH",
  "Gestion de projet",
  "Product management",
  "Freelance",
  "Télétravail",
  "Networking",
  "Événementiel",
  "Formation",
  "Photographie",
  "Vidéo",
  "Architecture",
  "Développement durable",
  "Leadership",
  "Langues",
];

function Signup() {
  const [searchParams] = useSearchParams();
  const initialType = accountTypes[searchParams.get("type")] ? searchParams.get("type") : "";
  const [type, setType] = useState(initialType);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const selected = useMemo(() => accountTypes[type], [type]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const baseProfile = buildProfile(type, formData);
      await createAccount(type, baseProfile);
      setSuccess(true);
      window.setTimeout(() => navigate(roleHomeRoutes[type]), 900);
    } catch (authError) {
      setError(authError.message || "Impossible de créer le compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] text-slate-950">
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Logo CoWorki" className="h-20 w-auto" />
          </Link>
          <Link to="/login" className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-black text-[#0F2A43]">
            Connexion
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#9ED8E8]/80 bg-white/70 px-4 py-2 text-sm font-black text-[#0F6C8D] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Rejoindre CoWorki
          </p>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.04em] text-[#0F2A43] md:text-7xl">
            Créer un compte
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Choisissez votre type de compte pour accéder au bon parcours CoWorki.
          </p>
        </div>

        {!type && (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {Object.entries(accountTypes).map(([key, item]) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => setType(key)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2.5rem] bg-white/90 p-7 text-left shadow-2xl shadow-slate-300/50 ring-1 ring-white transition hover:-translate-y-1"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ECF8FC] text-[#0F6C8D]">{item.icon}</span>
                <span className="mt-6 block text-3xl font-black text-[#0F2A43]">{item.title}</span>
                <span className="mt-3 block min-h-24 leading-7 text-slate-600">{item.description}</span>
                <span className="mt-6 inline-flex rounded-full bg-[#7A1E3A] px-5 py-3 text-sm font-black text-white">{item.button}</span>
              </motion.button>
            ))}
          </div>
        )}

        {type && (
          <section className="mx-auto mt-12 max-w-5xl rounded-[2.5rem] bg-white/90 p-7 shadow-2xl shadow-slate-300/50 ring-1 ring-white sm:p-9">
            {success ? (
              <div className="rounded-[2rem] bg-emerald-50 p-10 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
                <h2 className="mt-5 text-3xl font-black text-[#0F2A43]">{selected.success}</h2>
              </div>
            ) : (
              <>
                <button type="button" onClick={() => setType("")} className="mb-6 text-sm font-black text-[#0F6C8D]">Changer de type de compte</button>
                <h2 className="text-3xl font-black text-[#0F2A43]">{selected.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{selected.description}</p>
                <form onSubmit={submit} className="mt-7 space-y-5">
                  {type === "user" && <UserSignupFields />}
                  {type === "business" && <BusinessSignupFields />}
                  {type === "partner" && <PartnerSignupFields />}
                  {error && (
                    <p className="rounded-2xl bg-[#FBEFF3] px-4 py-3 text-sm font-black text-[#7A1E3A]">
                      {error}
                    </p>
                  )}
                  <button disabled={loading} className="w-full rounded-2xl bg-[#7A1E3A] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20 disabled:cursor-not-allowed disabled:opacity-60">
                    {loading ? "Création du compte..." : selected.button}
                  </button>
                </form>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function buildProfile(type, formData) {
  if (type === "user") {
    return {
      name: formData.get("fullName") || "Nouveau membre CoWorki",
      email: formData.get("email") || "",
      password: formData.get("password") || "",
      phone: formData.get("phone") || "",
      status: "Utilisateur",
      roleLabel: formData.get("profile") || "Utilisateur",
      city: formData.get("city") || "Tunis",
      interests: formData.getAll("interests"),
      points: 0,
      hasConfirmedBooking: false,
    };
  }

  if (type === "business") {
    return {
      name: formData.get("companyName") || "Nouvelle entreprise",
      company: formData.get("companyName") || "Nouvelle entreprise",
      email: formData.get("email") || "",
      password: formData.get("password") || "",
      phone: formData.get("phone") || "",
      status: "Entreprise",
      city: formData.get("city") || "Tunis",
      contact: formData.get("managerName") || "",
      need: formData.get("needType") || "Réunion",
    };
  }

  return {
    name: formData.get("spaceName") || "Nouvel espace partenaire",
    space: formData.get("spaceName") || "Nouvel espace partenaire",
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    phone: formData.get("phone") || "",
    status: "Partenaire",
    validationStatus: "Espace en attente de validation",
    city: formData.get("city") || "Tunis",
    contact: formData.get("managerName") || "",
    services: formData.getAll("services"),
    spaceTypes: formData.getAll("spaceTypes"),
  };
}

function TextInput({ label, name, type = "text" }) {
  return (
    <label className="grid gap-2 text-sm font-black text-[#0F2A43]">
      {label}
      <input required name={name} type={type} className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
    </label>
  );
}

function UserSignupFields() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Nom complet" name="fullName" />
        <TextInput label="Email" name="email" type="email" />
        <TextInput label="Mot de passe" name="password" type="password" />
        <TextInput label="Confirmer le mot de passe" name="confirmPassword" type="password" />
        <CitySelect />
      </div>
      <SelectGroup title="Profil" name="profile" items={["Étudiant", "Freelance", "Télétravailleur", "Entrepreneur", "Jeune diplômé"]} />
      <InterestPicker />
    </>
  );
}

function BusinessSignupFields() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Nom de l’entreprise" name="companyName" />
        <TextInput label="Nom du responsable" name="managerName" />
        <TextInput label="Email professionnel" name="email" type="email" />
        <TextInput label="Mot de passe" name="password" type="password" />
        <TextInput label="Confirmer le mot de passe" name="confirmPassword" type="password" />
        <TextInput label="Téléphone" name="phone" />
        <CitySelect />
        <TextInput label="Nombre moyen de participants" name="participants" />
      </div>
      <SelectGroup title="Type de besoin" name="needType" items={["Réunion", "Formation", "Séminaire", "Événement", "Workshop"]} />
    </>
  );
}

function PartnerSignupFields() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Nom du responsable" name="managerName" />
        <TextInput label="Nom de l’espace" name="spaceName" />
        <TextInput label="Email professionnel" name="email" type="email" />
        <TextInput label="Mot de passe" name="password" type="password" />
        <TextInput label="Confirmer le mot de passe" name="confirmPassword" type="password" />
        <TextInput label="Téléphone" name="phone" />
        <CitySelect />
        <TextInput label="Adresse" name="address" />
        <TextInput label="Capacité" name="capacity" />
      </div>
      <CheckboxGroup title="Types d’espaces disponibles" name="spaceTypes" items={["Postes individuels", "Bureaux privés", "Salle de réunion", "Espace événementiel"]} />
      <CheckboxGroup title="Services disponibles" name="services" items={["Wi-Fi", "Café", "Parking", "Imprimante", "Projecteur", "Climatisation", "Terrasse"]} />
      <label className="grid gap-2 text-sm font-black text-[#0F2A43]">
        Message complémentaire
        <textarea name="message" rows="4" className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
      </label>
      <ImageUploadPanel />
    </>
  );
}

function CitySelect() {
  return (
    <label className="grid gap-2 text-sm font-black text-[#0F2A43]">
      Ville
      <select required name="city" className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]">
        <option value="">Choisir une ville</option>
        {tunisianCities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </label>
  );
}

function SelectGroup({ title, name, items }) {
  return (
    <label className="grid gap-2 text-sm font-black text-[#0F2A43]">
      {title}
      <select name={name} className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]">
        {items.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}

function InterestPicker() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const filteredInterests = interestOptions.filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase())
  );

  const toggleInterest = (interest) => {
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  return (
    <div className="relative">
      <p className="mb-2 text-sm font-black text-[#0F2A43]">Centres d’intérêt</p>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-4 text-left font-bold outline-none transition hover:border-[#9ED8E8] focus:border-[#0F6C8D]"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0F6C8D] shadow-sm">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-[#0F2A43]">
              {selected.length ? `${selected.length} centre${selected.length > 1 ? "s" : ""} sélectionné${selected.length > 1 ? "s" : ""}` : "Choisir vos centres d’intérêt"}
            </span>
            <span className="block truncate text-xs font-bold text-slate-500">
              {selected.length ? selected.join(", ") : "Cliquez pour rechercher et sélectionner"}
            </span>
          </span>
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[#0F6C8D] transition ${open ? "rotate-180" : ""}`} />
      </button>

      {selected.map((item) => (
        <input key={item} type="hidden" name="interests" value={item} />
      ))}

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-3 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-slate-300/60">
          <div className="border-b border-slate-100 p-4">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F6C8D]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un intérêt..."
                className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] py-3 pl-11 pr-4 text-sm font-bold outline-none focus:border-[#0F6C8D]"
              />
            </label>
          </div>

          <div className="max-h-80 overflow-y-auto p-3">
            <div className="grid gap-2 md:grid-cols-2">
              {filteredInterests.map((item) => {
                const checked = selected.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`flex items-center justify-between gap-3 rounded-2xl p-3 text-left transition ${
                      checked
                        ? "bg-[#ECF8FC] text-[#0F6C8D] ring-1 ring-[#9ED8E8]"
                        : "bg-[#F7FAFC] text-slate-600 hover:bg-[#ECF8FC]"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${checked ? "bg-white" : "bg-white"} text-[#0F6C8D] shadow-sm`}>
                        {getInterestIcon(item)}
                      </span>
                      <span className="truncate text-sm font-black">{item}</span>
                    </span>
                    {checked && (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F6C8D] text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-[#F7FAFC] p-4">
            <p className="text-xs font-bold text-slate-500">
              {selected.length ? `${selected.length} sélectionné(s)` : "Aucun centre sélectionné"}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#7A1E3A] px-5 py-2.5 text-xs font-black text-white transition hover:bg-[#64172F]"
            >
              Valider
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {selected.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggleInterest(item)}
            className="inline-flex items-center gap-2 rounded-full bg-[#ECF8FC] px-3 py-2 text-xs font-black text-[#0F6C8D]"
          >
            {item}
            <span className="text-[#7A1E3A]">×</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function getInterestIcon(item) {
  const value = item.toLowerCase();
  if (["design", "ux/ui", "branding", "architecture"].some((word) => value.includes(word))) return <Palette className="h-5 w-5" />;
  if (["ia", "intelligence", "data", "innovation"].some((word) => value.includes(word))) return <Brain className="h-5 w-5" />;
  if (["développement", "react", "next", "mobile", "no-code"].some((word) => value.includes(word))) return <Code2 className="h-5 w-5" />;
  if (["marketing", "communication", "réseaux"].some((word) => value.includes(word))) return <Megaphone className="h-5 w-5" />;
  if (["business", "finance", "comptabilité", "rh", "management"].some((word) => value.includes(word))) return <Briefcase className="h-5 w-5" />;
  if (["freelance", "networking", "startup", "entrepreneuriat"].some((word) => value.includes(word))) return <Users className="h-5 w-5" />;
  if (["photographie", "vidéo", "contenu"].some((word) => value.includes(word))) return <Video className="h-5 w-5" />;
  if (["durable"].some((word) => value.includes(word))) return <Leaf className="h-5 w-5" />;
  if (["langues"].some((word) => value.includes(word))) return <Languages className="h-5 w-5" />;
  return <Sparkles className="h-5 w-5" />;
}

function CheckboxGroup({ title, name, items }) {
  return (
    <div>
      <p className="mb-3 text-sm font-black text-[#0F2A43]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <label key={item} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#F7FAFC] px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-100">
            <input name={name} value={item} type="checkbox" className="accent-[#0F6C8D]" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Signup;
