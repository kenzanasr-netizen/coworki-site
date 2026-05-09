import { Search } from "lucide-react";

function EmptyState({ title = "Aucune donnée pour le moment.", text = "Les informations apparaîtront ici dès qu’elles seront disponibles." }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECF8FC] text-[#0F6C8D]">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-2xl font-black text-[#0F2A43]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">{text}</p>
    </div>
  );
}

export default EmptyState;
