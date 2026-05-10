import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, CheckCircle2, MapPin, Sparkles, Upload, UserRound } from "lucide-react";
import logo from "../assets/logo-coworki.png";
import { apiFetch } from "../data/apiClient";
import { getMockSession, roleHomeRoutes, setAuthenticatedSession } from "../data/mockAuth";

const cities = ["Tunis", "Ariana", "Mannouba", "Sousse", "Sfax", "Monastir", "Hammamet", "Nabeul"];
const userInterests = ["Travail calme", "Networking", "Startups", "Freelancing", "Design", "Technologie", "Business", "Formation", "Réunions", "Événements"];
const userNeeds = ["Poste individuel", "Salle de réunion", "Budget flexible", "Proche transport", "Communauté active", "Promos flash"];
const partnerServices = ["Wi-Fi", "Salle de réunion", "Café", "Imprimante", "Parking", "Climatisation", "Open space", "Bureau privé", "Événements", "Terrasse"];
const companyNeeds = ["Réunions", "Coworking régulier", "Événements", "Formations", "Réservations d’équipe"];

const roleConfig = {
  user: {
    icon: UserRound,
    label: "Utilisateur",
    title: "Personnalisez votre expérience CoWorki",
    text: "Complétez votre profil pour recevoir des recommandations adaptées à votre façon de travailler.",
    endpoint: "/api/onboarding/user",
  },
  partner: {
    icon: Building2,
    label: "Partenaire",
    title: "Présentez votre espace à CoWorki",
    text: "Ajoutez les informations clés de votre espace pour préparer sa validation et recevoir vos premières réservations.",
    endpoint: "/api/onboarding/partner",
  },
  company: {
    icon: Building2,
    label: "Entreprise",
    title: "Configurez votre espace entreprise",
    text: "Votre entreprise pourra réserver plus facilement des espaces adaptés à ses équipes, réunions et événements.",
    endpoint: "/api/onboarding/company",
  },
};

function Onboarding({ type = "user" }) {
  const navigate = useNavigate();
  const session = getMockSession();
  const config = roleConfig[type] || roleConfig.user;
  const Icon = config.icon;
  const [form, setForm] = useState(defaultForm(type, session));
  const [selected, setSelected] = useState([]);
  const [secondarySelected, setSecondarySelected] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const expectedRole = type === "company" ? "business" : type;
  const canAccess = session?.role === expectedRole;
  const selectedLabel = useMemo(() => {
    if (type === "partner") return "Services sélectionnés";
    if (type === "company") return "Besoins sélectionnés";
    return "Centres d’intérêt sélectionnés";
  }, [type]);

  const update = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  const toggle = (value, setter = setSelected) => {
    setter((items) => (items.includes(value) ? items.filter((item) => item !== value) : [...items, value]));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = buildPayload(type, form, selected, secondarySelected);
      const response = await apiFetch(config.endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible d’enregistrer votre onboarding.");

      if (data.user) {
        setAuthenticatedSession(data.user, data.token || session.token, {
          nextStep: data.nextStep,
          profileCompleted: true,
        });
      }
      setSuccess(data.message || "Votre profil est prêt.");
      setTimeout(() => navigate(data.nextStep || roleHomeRoutes[session.role] || "/"), 700);
    } catch (submitError) {
      setError(submitError.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <OnboardingState title="Connexion requise" text="Connectez-vous avec Google pour compléter votre profil CoWorki." action="/login" actionLabel="Se connecter" />;
  }

  if (!canAccess) {
    return <OnboardingState title="Parcours non disponible" text="Ce formulaire ne correspond pas au type de votre compte CoWorki." action={roleHomeRoutes[session.role] || "/"} actionLabel="Retour à mon espace" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] px-6 py-8 text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo CoWorki" className="h-16 w-auto" />
        </Link>
        <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0F6C8D] shadow-sm">
          Onboarding {config.label}
        </span>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 py-10 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-[2.5rem] bg-white/90 p-8 shadow-2xl shadow-slate-200/70 ring-1 ring-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#ECF8FC] text-[#0F6C8D]">
            <Icon className="h-7 w-7" />
          </div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-[#7A1E3A]">Après connexion Google</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#0F2A43] md:text-6xl">{config.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{config.text}</p>
          <div className="mt-8 space-y-3">
            {["Identité Google récupérée", "Données métier complétées ici", "Profil sauvegardé dans Prisma"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#F7FAFC] p-4 text-sm font-black text-[#0F2A43]">
                <CheckCircle2 className="h-5 w-5 text-[#0F6C8D]" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <form onSubmit={submit} className="rounded-[2.5rem] bg-white/95 p-7 shadow-2xl shadow-slate-200/70 ring-1 ring-white sm:p-9">
          {type === "user" && (
            <UserOnboardingFields form={form} update={update} selected={selected} toggle={toggle} secondarySelected={secondarySelected} setSecondarySelected={setSecondarySelected} />
          )}
          {type === "partner" && (
            <PartnerOnboardingFields form={form} update={update} selected={selected} toggle={toggle} />
          )}
          {type === "company" && (
            <CompanyOnboardingFields form={form} update={update} selected={selected} toggle={toggle} />
          )}

          <div className="mt-7 rounded-3xl bg-[#F7FAFC] p-5">
            <p className="text-sm font-black text-[#0F2A43]">{selectedLabel}</p>
            <p className="mt-2 text-sm font-bold text-slate-500">{selected.length ? selected.join(", ") : "Aucune option sélectionnée pour le moment."}</p>
          </div>

          {error && <p className="mt-5 rounded-2xl bg-[#FBEFF3] px-4 py-3 text-sm font-black text-[#7A1E3A]">{error}</p>}
          {success && <p className="mt-5 rounded-2xl bg-[#ECF8FC] px-4 py-3 text-sm font-black text-[#0F6C8D]">{success}</p>}

          <button disabled={loading} className="mt-7 w-full rounded-2xl bg-[#7A1E3A] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Enregistrement..." : "Finaliser mon profil"}
          </button>
        </form>
      </main>
    </div>
  );
}

function UserOnboardingFields({ form, update, selected, toggle, secondarySelected, setSecondarySelected }) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Vos préférences de travail" text="CoWorki utilise ces informations pour mieux recommander les espaces." />
      <SelectInput label="Ville" value={form.city} onChange={(value) => update("city", value)} options={cities} icon={MapPin} />
      <SelectInput label="Type d’espace préféré" value={form.preferredSpaceType} onChange={(value) => update("preferredSpaceType", value)} options={["Poste individuel", "Salle de réunion", "Open space", "Espace calme", "Espace événementiel"]} />
      <TextInput label="Budget approximatif" value={form.budget} onChange={(value) => update("budget", value)} placeholder="Ex. 20 TND / jour" />
      <OptionGrid label="Centres d’intérêt" options={userInterests} selected={selected} onToggle={toggle} />
      <OptionGrid label="Besoins principaux" options={userNeeds} selected={secondarySelected} onToggle={(value) => toggle(value, setSecondarySelected)} />
    </div>
  );
}

function PartnerOnboardingFields({ form, update, selected, toggle }) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Votre activité" text="Ces informations restent modifiables depuis votre dashboard partenaire." />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Nom de l’entreprise" value={form.companyName} onChange={(value) => update("companyName", value)} />
        <TextInput label="Téléphone" value={form.phone} onChange={(value) => update("phone", value.replace(/\D/g, "").slice(0, 8))} prefix="+216" placeholder="22123456" />
      </div>
      <SelectInput label="Ville" value={form.city} onChange={(value) => update("city", value)} options={cities} />
      <TextArea label="Description de l’activité" value={form.activityDescription} onChange={(value) => update("activityDescription", value)} />
      <SectionTitle title="Premier espace" text="L’espace reste non publié tant que l’administration n’a pas validé le partenaire." />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Nom de l’espace" value={form.spaceName} onChange={(value) => update("spaceName", value)} />
        <TextInput label="Adresse" value={form.address} onChange={(value) => update("address", value)} />
        <TextInput label="Capacité" value={form.capacity} onChange={(value) => update("capacity", value.replace(/\D/g, ""))} />
        <TextInput label="Horaires" value={form.openingHours} onChange={(value) => update("openingHours", value)} placeholder="Ex. Lun-Sam, 8h-20h" />
      </div>
      <TextArea label="Description de l’espace" value={form.spaceDescription} onChange={(value) => update("spaceDescription", value)} />
      <div className="grid gap-4 md:grid-cols-3">
        <TextInput label="Prix 2h" value={form.price2h} onChange={(value) => update("price2h", value.replace(/\D/g, ""))} />
        <TextInput label="Prix 4h" value={form.price4h} onChange={(value) => update("price4h", value.replace(/\D/g, ""))} />
        <TextInput label="Prix journée" value={form.priceDay} onChange={(value) => update("priceDay", value.replace(/\D/g, ""))} />
      </div>
      <OptionGrid label="Services disponibles" options={partnerServices} selected={selected} onToggle={toggle} />
      <TextArea label="Photos de l’espace" value={form.images} onChange={(value) => update("images", value)} icon={Upload} placeholder="Collez des liens d’images, un par ligne. L’upload fichier pourra être branché plus tard." />
    </div>
  );
}

function CompanyOnboardingFields({ form, update, selected, toggle }) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Informations entreprise" text="CoWorki adaptera les propositions B2B à vos besoins." />
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Nom de l’entreprise" value={form.companyName} onChange={(value) => update("companyName", value)} />
        <TextInput label="Secteur d’activité" value={form.sector} onChange={(value) => update("sector", value)} />
        <TextInput label="Téléphone" value={form.phone} onChange={(value) => update("phone", value.replace(/\D/g, "").slice(0, 8))} prefix="+216" placeholder="22123456" />
        <TextInput label="Nombre d’employés" value={form.employees} onChange={(value) => update("employees", value.replace(/\D/g, ""))} />
      </div>
      <TextInput label="Adresse de facturation" value={form.billingAddress} onChange={(value) => update("billingAddress", value)} />
      <TextInput label="Matricule fiscal / identifiant" value={form.taxNumber} onChange={(value) => update("taxNumber", value)} />
      <OptionGrid label="Besoins principaux" options={companyNeeds} selected={selected} onToggle={toggle} />
    </div>
  );
}

function SectionTitle({ title, text }) {
  return (
    <div>
      <h2 className="text-2xl font-black tracking-[-0.03em] text-[#0F2A43]">{title}</h2>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder = "", prefix = "" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-[#0F2A43]">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 focus-within:border-[#0F6C8D]">
        {prefix && <span className="text-sm font-black text-[#0F6C8D]">{prefix}</span>}
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent font-bold outline-none" />
      </div>
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder = "", icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-black text-[#0F2A43]">{Icon && <Icon className="h-4 w-4 text-[#0F6C8D]" />}{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={4} className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
    </label>
  );
}

function SelectInput({ label, value, onChange, options, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-black text-[#0F2A43]">{Icon && <Icon className="h-4 w-4 text-[#0F6C8D]" />}{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-black text-[#0F2A43] outline-none focus:border-[#0F6C8D]">
        <option value="">Choisir</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function OptionGrid({ label, options, selected, onToggle }) {
  return (
    <div>
      <p className="mb-3 text-sm font-black text-[#0F2A43]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`rounded-full border px-4 py-2 text-sm font-black transition ${
              selected.includes(option)
                ? "border-[#0F6C8D] bg-[#ECF8FC] text-[#0F6C8D]"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#9ED8E8]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function OnboardingState({ title, text, action, actionLabel }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ECF8FC] via-white to-[#FBEFF3] px-6 text-center">
      <div className="max-w-xl rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-slate-200/70">
        <Sparkles className="mx-auto h-10 w-10 text-[#0F6C8D]" />
        <h1 className="mt-5 text-4xl font-black text-[#0F2A43]">{title}</h1>
        <p className="mt-3 leading-7 text-slate-600">{text}</p>
        <Link to={action} className="mt-6 inline-flex rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white">{actionLabel}</Link>
      </div>
    </div>
  );
}

function defaultForm(type, session) {
  if (type === "partner") {
    return {
      companyName: session?.space || "",
      phone: "",
      city: "",
      activityDescription: "",
      spaceName: session?.space || "",
      address: "",
      spaceDescription: "",
      capacity: "",
      price2h: "",
      price4h: "",
      priceDay: "",
      images: "",
      openingHours: "",
    };
  }

  if (type === "company") {
    return {
      companyName: session?.company || "",
      sector: "",
      phone: "",
      billingAddress: "",
      taxNumber: "",
      employees: "",
    };
  }

  return {
    city: "",
    preferredSpaceType: "",
    budget: "",
  };
}

function buildPayload(type, form, selected, secondarySelected) {
  if (type === "partner") {
    return {
      ...form,
      phone: form.phone ? `+216${form.phone}` : "",
      services: selected,
      images: String(form.images || "").split("\n").map((item) => item.trim()).filter(Boolean),
    };
  }

  if (type === "company") {
    return {
      ...form,
      phone: form.phone ? `+216${form.phone}` : "",
      needs: selected,
    };
  }

  return {
    ...form,
    interests: selected,
    needs: secondarySelected,
  };
}

export default Onboarding;
