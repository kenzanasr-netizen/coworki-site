import { useState } from "react";
import { ImagePlus, Star, Trash2, Upload } from "lucide-react";

function ImageUploadPanel({ className = "" }) {
  const [images, setImages] = useState([]);

  const handleImages = (event) => {
    const files = Array.from(event.target.files || [])
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 8 - images.length)
      .map((file, index) => ({
        id: `${file.name}-${file.lastModified}-${index}`,
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
        isCover: images.length === 0 && index === 0,
      }));

    setImages((current) => [...current, ...files]);
    event.target.value = "";
  };

  const removeImage = (id) => {
    setImages((current) => {
      const removed = current.find((image) => image.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      const next = current.filter((image) => image.id !== id);
      if (next.length > 0 && !next.some((image) => image.isCover)) {
        return next.map((image, index) => ({ ...image, isCover: index === 0 }));
      }
      return next;
    });
  };

  const setCover = (id) => {
    setImages((current) => current.map((image) => ({ ...image, isCover: image.id === id })));
  };

  return (
    <section className={`mt-8 rounded-[2rem] border border-slate-100 bg-[#F7FAFC] p-5 sm:p-6 ${className}`}>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="flex items-center gap-2 text-xl font-black text-[#0F2A43]">
            <ImagePlus className="h-5 w-5 text-[#0F6C8D]" />
            Images de l’espace
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Ajoutez des photos lumineuses et réalistes : espace principal, postes de travail, salle de réunion, café, terrasse ou équipements.
          </p>
        </div>
        <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F6C8D] shadow-sm">
          {images.length}/8 images
        </span>
      </div>

      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-[#0F6C8D]/35 bg-white px-6 py-10 text-center transition hover:border-[#7A1E3A]/45 hover:bg-[#FBEFF3]/40">
        <Upload className="h-9 w-9 text-[#0F6C8D]" />
        <span className="mt-4 text-lg font-black text-[#0F2A43]">Glisser-déposer ou choisir des images</span>
        <span className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Formats acceptés : JPG, PNG ou WebP. Recommandé : au moins 5 photos horizontales, nettes, sans filtre excessif.
        </span>
        <input type="file" accept="image/*" multiple onChange={handleImages} className="sr-only" />
      </label>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {[
          "Photo principale claire et bien cadrée",
          "Montrer les services réellement disponibles",
          "Éviter les photos sombres ou trop zoomées",
        ].map((tip) => (
          <div key={tip} className="rounded-2xl bg-white p-4 text-sm font-bold leading-6 text-slate-600">
            {tip}
          </div>
        ))}
      </div>

      {images.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
              <div className="relative h-36">
                <img src={image.preview} alt={image.name} className="h-full w-full object-cover" />
                {image.isCover && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#7A1E3A] px-3 py-1 text-xs font-black text-white">
                    <Star className="h-3 w-3 fill-current" />
                    principale
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="truncate text-sm font-black text-[#0F2A43]">{image.name}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{formatSize(image.size)}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => setCover(image.id)} className="rounded-full bg-[#ECF8FC] px-3 py-2 text-xs font-black text-[#0F6C8D]">
                    Définir principale
                  </button>
                  <button type="button" onClick={() => removeImage(image.id)} className="rounded-full bg-[#FBEFF3] px-3 py-2 text-xs font-black text-[#7A1E3A]">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function formatSize(size) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} Ko`;
  return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
}

export default ImageUploadPanel;
