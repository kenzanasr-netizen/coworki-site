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
import GoogleAuthButton from "../components/GoogleAuthButton";
import ImageUploadPanel from "../components/ImageUploadPanel";
import { createAccount, resendVerification, roleHomeRoutes, verifyRegistration } from "../data/mockAuth";

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

const interestCategories = [
  {
    name: "Créatif",
    items: ["Design", "UX/UI", "Branding", "Création de contenu", "Photographie", "Vidéo", "Architecture"],
  },
  {
    name: "Tech",
    items: ["Intelligence artificielle", "Data science", "Développement web", "React", "Next.js", "Mobile", "No-code"],
  },
  {
    name: "Business",
    items: ["Business", "Entrepreneuriat", "Startups", "Innovation", "E-commerce", "Finance", "Comptabilité", "RH", "Gestion de projet", "Product management"],
  },
  {
    name: "Communauté",
    items: ["Freelance", "Télétravail", "Networking", "Événementiel", "Formation", "Leadership", "Langues", "Développement durable"],
  },
];

const popularInterests = ["Design", "Marketing digital", "Intelligence artificielle", "Développement web", "Entrepreneuriat", "Networking"];

function Signup() {
  const [searchParams] = useSearchParams();
  const initialType = accountTypes[searchParams.get("type")] ? searchParams.get("type") : "";
  const [type, setType] = useState(initialType);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState(null);
  const [verificationCodes, setVerificationCodes] = useState({ emailCode: "", phoneCode: "" });
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
      const result = await createAccount(type, baseProfile);
      if (result.requiresVerification) {
        setVerification({
          email: baseProfile.email,
          role: type,
          devVerification: result.devVerification,
        });
        return;
      }
      setSuccess(true);
      window.setTimeout(() => navigate(roleHomeRoutes[type]), 900);
    } catch (authError) {
      setError(authError.message || "Impossible de créer le compte.");
    } finally {
      setLoading(false);
    }
  };

  const submitVerification = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = await verifyRegistration({
        email: verification.email,
        emailCode: verificationCodes.emailCode,
        phoneCode: verificationCodes.phoneCode,
      });
      setSuccess(true);
      window.setTimeout(() => navigate(roleHomeRoutes[session.role]), 900);
    } catch (authError) {
      setError(authError.message || "Code de vérification invalide.");
    } finally {
      setLoading(false);
    }
  };

  const resendCodes = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await resendVerification(verification.email);
      setVerification((current) => ({
        ...current,
        devVerification: result.devVerification,
      }));
    } catch (authError) {
      setError(authError.message || "Impossible de renvoyer les codes.");
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
          <>
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
          </>
        )}

        {type && (
          <section className="mx-auto mt-12 max-w-5xl rounded-[2.5rem] bg-white/90 p-7 shadow-2xl shadow-slate-300/50 ring-1 ring-white sm:p-9">
            {success ? (
              <div className="rounded-[2rem] bg-emerald-50 p-10 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
                <h2 className="mt-5 text-3xl font-black text-[#0F2A43]">{selected.success}</h2>
              </div>
            ) : verification ? (
              <form onSubmit={submitVerification} className="space-y-5">
                <button type="button" onClick={() => setVerification(null)} className="text-sm font-black text-[#0F6C8D]">Retour au formulaire</button>
                <h2 className="text-3xl font-black text-[#0F2A43]">Vérification email et téléphone</h2>
                <p className="leading-7 text-slate-600">
                  Entrez les codes à 6 chiffres envoyés à votre email et à votre numéro tunisien.
                </p>
                {verification.devVerification && (
                  <div className="rounded-2xl bg-[#ECF8FC] p-4 text-sm font-black text-[#0F2A43]">
                    Mode développement : email {verification.devVerification.emailCode} · téléphone {verification.devVerification.phoneCode}
                  </div>
                )}
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput label="Code email" name="emailCode" value={verificationCodes.emailCode} onChange={(value) => setVerificationCodes((current) => ({ ...current, emailCode: value }))} inputMode="numeric" maxLength={6} />
                  <TextInput label="Code téléphone" name="phoneCode" value={verificationCodes.phoneCode} onChange={(value) => setVerificationCodes((current) => ({ ...current, phoneCode: value }))} inputMode="numeric" maxLength={6} />
                </div>
                {error && <p className="rounded-2xl bg-[#FBEFF3] px-4 py-3 text-sm font-black text-[#7A1E3A]">{error}</p>}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button disabled={loading} className="flex-1 rounded-2xl bg-[#7A1E3A] px-6 py-4 text-sm font-black text-white disabled:opacity-60">
                    {loading ? "Vérification..." : "Valider les codes"}
                  </button>
                  <button type="button" disabled={loading} onClick={resendCodes} className="flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-[#0F2A43] disabled:opacity-60">
                    Renvoyer les codes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <button type="button" onClick={() => setType("")} className="mb-6 text-sm font-black text-[#0F6C8D]">Changer de type de compte</button>
                <h2 className="text-3xl font-black text-[#0F2A43]">{selected.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{selected.description}</p>
                <form onSubmit={submit} className="mt-7 space-y-5">
                  <GoogleAuthButton
                    onError={setError}
                    label={`Continuer avec Google${type === "business" ? " comme entreprise" : type === "partner" ? " comme partenaire" : ""}`}
                    role={type === "business" ? "COMPANY" : type === "partner" ? "PARTNER" : "USER"}
                  />
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">ou remplir le formulaire</span>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
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
      name: formData.get("managerName") || formData.get("companyName") || "Nouveau responsable",
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
    name: formData.get("managerName") || formData.get("spaceName") || "Nouveau responsable",
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

function TextInput({ label, name, type = "text", value, onChange, inputMode, maxLength }) {
  return (
    <label className="grid gap-2 text-sm font-black text-[#0F2A43]">
      {label}
      <input
        required
        name={name}
        type={type}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value.replace(/\D/g, "").slice(0, maxLength || undefined)) : undefined}
        inputMode={inputMode}
        maxLength={maxLength}
        className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]"
      />
    </label>
  );
}

function PhoneInput() {
  const [phone, setPhone] = useState("");
  const isInvalid = phone.length > 0 && phone.length !== 8;

  return (
    <label className="grid gap-2 text-sm font-black text-[#0F2A43]">
      Téléphone
      <div className={`flex items-center overflow-hidden rounded-2xl border bg-[#F7FAFC] font-bold outline-none ${isInvalid ? "border-[#7A1E3A]" : "border-slate-200 focus-within:border-[#0F6C8D]"}`}>
        <span className="border-r border-slate-200 bg-white px-4 py-3 text-[#0F6C8D]">+216</span>
        <input
          required
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 8))}
          inputMode="numeric"
          maxLength={8}
          placeholder="22123456"
          className="w-full bg-transparent px-4 py-3 outline-none"
          pattern="\d{8}"
        />
      </div>
      {isInvalid && <span className="text-xs font-black text-[#7A1E3A]">Entrez exactement 8 chiffres tunisiens.</span>}
    </label>
  );
}

function UserSignupFields() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Nom complet" name="fullName" />
        <TextInput label="Email" name="email" type="email" />
        <PhoneInput />
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
        <PhoneInput />
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
        <PhoneInput />
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
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selected, setSelected] = useState([]);
  const activeItems = activeCategory === "Tous"
    ? interestOptions
    : interestCategories.find((category) => category.name === activeCategory)?.items || interestOptions;
  const filteredInterests = activeItems.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()));
  const selectedText = selected.length
    ? `${selected.length} centre${selected.length > 1 ? "s" : ""} sélectionné${selected.length > 1 ? "s" : ""}`
    : "Aucun centre sélectionné";

  const toggleInterest = (interest) => {
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#ECF8FC] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#0F6C8D]">
            <Sparkles className="h-3.5 w-3.5" />
            Smart Matching
          </p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#0F2A43]">Vos centres d’intérêt</h3>
          <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-slate-500">
            Sélectionnez au moins 3 thèmes pour personnaliser vos recommandations d’espaces, d’événements et de profils compatibles.
          </p>
        </div>
        <div className="rounded-2xl bg-[#F7FAFC] px-4 py-3 text-left lg:min-w-48">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Progression</p>
          <p className="mt-1 text-lg font-black text-[#0F2A43]">{selectedText}</p>
        </div>
      </div>

      {selected.map((item) => (
        <input key={item} type="hidden" name="interests" value={item} />
      ))}

      <input className="sr-only" tabIndex={-1} value={selected.join(",")} onChange={() => {}} required aria-hidden="true" />

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F6C8D]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un intérêt..."
              className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] py-3 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-[#0F6C8D] focus:bg-white"
            />
          </label>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">Populaires</p>
            <div className="flex flex-wrap gap-2">
              {popularInterests.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black transition ${
                    selected.includes(item)
                      ? "bg-[#0F6C8D] text-white"
                      : "bg-[#ECF8FC] text-[#0F6C8D] hover:bg-[#DDF3FA]"
                  }`}
                >
                  {selected.includes(item) && <Check className="h-3.5 w-3.5" />}
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400">Catégories</p>
            <div className="grid grid-cols-2 gap-2">
              {["Tous", ...interestCategories.map((category) => category.name)].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-2xl border px-3 py-3 text-sm font-black transition ${
                    activeCategory === category
                      ? "border-[#0F6C8D] bg-[#0F6C8D] text-white shadow-lg shadow-[#0F6C8D]/15"
                      : "border-slate-200 bg-[#F7FAFC] text-slate-600 hover:border-[#9ED8E8] hover:bg-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-[#F7FAFC] p-3">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{filteredInterests.length} options</p>
            {selected.length > 0 && (
              <button type="button" onClick={() => setSelected([])} className="text-xs font-black text-[#7A1E3A]">
                Tout retirer
              </button>
            )}
          </div>
          <div className="grid max-h-96 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
            {filteredInterests.map((item) => {
              const checked = selected.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`group flex min-h-20 items-center justify-between gap-3 rounded-2xl p-3 text-left transition ${
                    checked
                      ? "bg-white text-[#0F6C8D] ring-2 ring-[#9ED8E8]"
                      : "bg-white/80 text-slate-600 ring-1 ring-transparent hover:-translate-y-0.5 hover:text-[#0F2A43] hover:shadow-md"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm ${checked ? "bg-[#ECF8FC] text-[#0F6C8D]" : "bg-[#F7FAFC] text-[#0F6C8D]"}`}>
                      {getInterestIcon(item)}
                    </span>
                    <span>
                      <span className="block text-sm font-black">{item}</span>
                      <span className="mt-0.5 block text-xs font-bold text-slate-400">{getInterestCategory(item)}</span>
                    </span>
                  </span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
                    checked ? "border-[#0F6C8D] bg-[#0F6C8D] text-white" : "border-slate-200 bg-white text-transparent group-hover:text-slate-300"
                  }`}>
                    <Check className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
            {!filteredInterests.length && (
              <div className="col-span-full rounded-2xl bg-white p-6 text-center">
                <p className="text-sm font-black text-[#0F2A43]">Aucun centre trouvé</p>
                <p className="mt-1 text-xs font-bold text-slate-500">Essayez un autre mot-clé ou changez de catégorie.</p>
              </div>
            )}
          </div>
        </div>
      </div>

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
    </section>
  );
}

function getInterestCategory(item) {
  return interestCategories.find((category) => category.items.includes(item))?.name || "Général";
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
