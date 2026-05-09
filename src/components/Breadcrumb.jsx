import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav aria-label="Fil d’Ariane" className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.path && index < items.length - 1 ? (
            <Link to={item.path} className="transition hover:text-[#0F6C8D]">{item.label}</Link>
          ) : (
            <span className="text-[#0F2A43]">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-slate-300">/</span>}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
