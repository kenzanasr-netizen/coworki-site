import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ImageUploadPanel from "../components/ImageUploadPanel";
import { PageHero, PageShell } from "../components/SiteLayout";
import { apiFetch } from "../data/apiClient";

const initialForm = {
  name: "",
  address: "",
  city: "",
  price2h: "",
  price4h: "",
  priceDay: "",
  capacity: "",
  description: "",
  isPublished: true,
};

function PartnerSpaceForm() {
  const [form, setForm] = useState(initialForm);
  const [selectedServices, setSelectedServices] = useState([]);
  const [published, setPublished] = useState(false);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const services = ["Wi-Fi", "Café", "Salle réunion", "Climatisation", "Parking", "Imprimante", "Espace calme", "Terrasse"];

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const toggleService = (service) => {
    setSelectedServices((current) => (current.includes(service) ? current.filter((item) => item !== service) : [...current, service]));
  };

  const submitSpace = async (event) => {
    event.preventDefault();
    setLoading(true);
    setNotice("");
    setPublished(false);

    try {
      const response = await apiFetch("/api/partner/spaces", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          services: selectedServices,
          images: [],
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Impossible d’ajouter l’espace.");
      setPublished(true);
      setForm(initialForm);
      setSelectedServices([]);
      setNotice(data.message || "Espace ajouté avec succès.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell active="/dashboard/partner">
      <PageHero eyebrow="Espace partenaire" title="Publier ou modifier un espace." text="Un formulaire complet pour rendre votre espace visible sur CoWorki." />
      <main className="mx-auto max-w-5xl px-6 py-14">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
          {published && (
            <div className="mb-6 rounded-[2rem] bg-emerald-50 p-8 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
              <h2 className="mt-4 text-2xl font-black text-[#0F2A43]">Votre espace a été enregistré dans la base.</h2>
              <p className="mt-2 text-sm font-bold text-slate-600">S’il doit attendre une validation, il restera non publié automatiquement.</p>
            </div>
          )}
          {notice && <div className="mb-6 rounded-2xl bg-[#ECF8FC] p-4 text-sm font-black text-[#0F6C8D]">{notice}</div>}
          <form onSubmit={submitSpace}>
            <div className="grid gap-4 md:grid-cols-3">
              <Input label="Nom de l’espace" value={form.name} onChange={(value) => updateField("name", value)} required />
              <Input label="Adresse" value={form.address} onChange={(value) => updateField("address", value)} required />
              <Input label="Ville" value={form.city} onChange={(value) => updateField("city", value)} required />
              <Input label="Prix 2h" type="number" value={form.price2h} onChange={(value) => updateField("price2h", value)} />
              <Input label="Prix 4h" type="number" value={form.price4h} onChange={(value) => updateField("price4h", value)} />
              <Input label="Prix journée" type="number" value={form.priceDay} onChange={(value) => updateField("priceDay", value)} />
              <Input label="Capacité" type="number" value={form.capacity} onChange={(value) => updateField("capacity", value)} />
            </div>
            <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="Description professionnelle de l’espace" className="mt-4 min-h-32 w-full rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]" />
            <label className="mt-4 flex items-center gap-3 rounded-2xl bg-[#F7FAFC] p-4 text-sm font-black text-[#0F2A43]">
              <input type="checkbox" checked={form.isPublished} onChange={(event) => updateField("isPublished", event.target.checked)} />
              Publier automatiquement si mon compte partenaire est approuvé
            </label>
            <p className="mt-6 font-black text-[#0F2A43]">Services disponibles</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {services.map((service) => (
                <label key={service} className={`rounded-full px-4 py-2 text-sm font-black ${selectedServices.includes(service) ? "bg-[#0F6C8D] text-white" : "bg-[#ECF8FC] text-[#0F6C8D]"}`}>
                  <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} className="mr-2" />
                  {service}
                </label>
              ))}
            </div>
            <ImageUploadPanel />
            <button disabled={loading} className="mt-6 rounded-2xl bg-[#7A1E3A] px-7 py-4 text-sm font-black text-white disabled:opacity-60">
              {loading ? "Enregistrement..." : "Publier l’espace"}
            </button>
          </form>
        </section>
      </main>
    </PageShell>
  );
}

function Input({ label, value, onChange, type = "text", required = false }) {
  return (
    <input
      required={required}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={label}
      className="rounded-2xl border border-slate-200 bg-[#F7FAFC] px-4 py-3 font-bold outline-none focus:border-[#0F6C8D]"
    />
  );
}

export default PartnerSpaceForm;
