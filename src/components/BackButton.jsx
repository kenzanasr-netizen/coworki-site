import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ne pas afficher sur la page d'accueil
  if (location.pathname === "/") {
    return null;
  }

  const handleBack = () => {
    // Si on peut revenir en arrière dans l'historique
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Sinon, aller à l'accueil
      navigate("/");
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      className="fixed top-6 left-6 z-60 bg-white/95 hover:bg-white border border-slate-200 rounded-full p-3 shadow-2xl transition-all duration-300 group"
      title="Retour"
    >
      <ArrowLeft className="h-5 w-5 text-[#0F2A43] group-hover:text-[#7A1E3A] transition-colors" />
    </motion.button>
  );
};

export default BackButton;