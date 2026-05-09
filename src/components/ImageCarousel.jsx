import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ImageCarousel = ({ images, title, heightClass = "h-48" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Si une seule image, on la retourne directement
  if (!images || images.length === 0) {
    return null;
  }

  // Si une seule image, pas de carousel
  if (images.length === 1) {
    return (
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <img
          src={images[0]}
          alt={title || "Image"}
          className={`w-full ${heightClass} object-cover rounded-lg hover:scale-105 transition-transform duration-300`}
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 transition-all duration-300 group-hover:bg-black/20">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium">
              Voir l'image
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Carousel pour plusieurs images
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Carousel miniature */}
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <img
          src={images[currentIndex]}
          alt={`${title || "Image"} ${currentIndex + 1}`}
          className={`w-full ${heightClass} object-cover rounded-lg hover:scale-105 transition-transform duration-300`}
        />

        {/* Indicateurs d'images multiples */}
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full border border-white/70 transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Flèches de navigation */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-white/90 p-2 text-gray-800 shadow-lg transition-all duration-300 hover:bg-white hover:scale-105"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-white/90 p-2 text-gray-800 shadow-lg transition-all duration-300 hover:bg-white hover:scale-105"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Overlay au survol */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/0 transition-all duration-300 group-hover:bg-black/20">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium">
              {images.length} images - Cliquer pour agrandir
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour voir les images en grand */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Image principale */}
              <img
                src={images[currentIndex]}
                alt={`${title || "Image"} ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white/20 p-2 text-white transition-all duration-300 hover:bg-white/30"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white/20 p-2 text-white transition-all duration-300 hover:bg-white/30"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Indicateurs */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          index === currentIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Compteur */}
                  <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCarousel;
