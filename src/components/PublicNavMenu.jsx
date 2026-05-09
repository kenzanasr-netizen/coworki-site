import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function PublicNavMenu({ label, path, items }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = pathname === path || pathname.startsWith(`${path}/`);

  if (!items?.length) {
    return (
      <Link to={path} className={active ? "text-[#0F6C8D]" : "transition hover:text-[#0F6C8D]"}>
        {label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Link to={path} className={`inline-flex items-center gap-1.5 transition hover:text-[#0F6C8D] ${active ? "text-[#0F6C8D]" : ""}`}>
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-4"
          >
            <div className="rounded-[1.5rem] border border-slate-200 bg-white/95 p-3 text-left shadow-2xl shadow-slate-300/60 backdrop-blur-2xl">
              {items.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setOpen(false)} className="block rounded-2xl p-3 transition hover:bg-[#ECF8FC]">
                  <span className="block text-sm font-black text-[#0F2A43]">{item.label}</span>
                  <span className="mt-1 block text-xs font-bold leading-5 text-slate-500">{item.description}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PublicNavMenu;
