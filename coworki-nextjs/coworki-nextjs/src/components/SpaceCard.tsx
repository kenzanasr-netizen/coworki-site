"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Wifi,
  Coffee,
  Car,
  Zap,
  Leaf,
  Heart,
  Share2,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpaceCardProps {
  space: {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    pricePerHour: number;
    capacity: number;
    images: string[];
    amenities: string[];
    ecoScore: number;
    averageRating: number;
    totalReviews: number;
    isVerified: boolean;
    flashDeal?: {
      discountPercent: number;
      endAt: string;
    };
    occupancyRate?: number;
  };
  href?: string;
  onViewDetails?: (spaceId: string) => void;
  onReserve?: (spaceId: string) => void;
  className?: string;
}

const amenityIcons = {
  wifi: Wifi,
  coffee: Coffee,
  parking: Car,
  power: Zap,
  eco: Leaf,
};

export function SpaceCard({ space, href, onViewDetails, onReserve, className }: SpaceCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const discountedPrice = space.flashDeal
    ? space.pricePerHour * (1 - space.flashDeal.discountPercent / 100)
    : space.pricePerHour;

  const handleNavigate = () => {
    if (href) {
      router.push(href);
    } else if (onViewDetails) {
      onViewDetails(space.id);
    } else if (onReserve) {
      onReserve(space.id);
    }
  };

  const handleImageNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % space.images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + space.images.length) % space.images.length);
    }
  };

  const hasAction = Boolean(href || onViewDetails || onReserve);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn("group", className, hasAction && "cursor-pointer")}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={!href && hasAction ? handleNavigate : undefined}
      role={!href && hasAction ? "button" : undefined}
      tabIndex={!href && hasAction ? 0 : undefined}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !href && hasAction) {
          handleNavigate();
        }
      }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
        {href && (
          <Link
            href={href}
            className="absolute inset-0 z-0"
            aria-label={`Voir l'espace ${space.name}`}
          />
        )}
        <div className="relative z-10">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <motion.div
            className="aspect-[4/3] relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={space.images[currentImageIndex]}
              alt={space.name}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            <AnimatePresence>
              {isHovered && space.images.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleImageNavigation('prev')
                    }}
                  >
                    ‹
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleImageNavigation('next')
                    }}
                  >
                    ›
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {space.isVerified && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  Vérifié
                </Badge>
              )}
              {space.flashDeal && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse"
                >
                  -{space.flashDeal.discountPercent}%
                </motion.div>
              )}
            </div>

            {/* Eco Score */}
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs">
                <Leaf className="w-3 h-3" />
                {space.ecoScore}/100
              </div>
            </div>

            {/* Occupancy Indicator */}
            {space.occupancyRate !== undefined && (
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1 bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs">
                  <Users className="w-3 h-3" />
                  {Math.round(space.occupancyRate * 100)}%
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/80 hover:bg-white text-gray-700 h-8 w-8 p-0"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={cn("w-4 h-4", isLiked && "fill-red-500 text-red-500")} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/80 hover:bg-white text-gray-700 h-8 w-8 p-0"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Image Indicators */}
          {space.images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-1">
              {space.images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  )}
                  onClick={(event) => {
                    event.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                {space.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{space.address}, {space.city}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{space.averageRating.toFixed(1)}</span>
              <span className="text-xs text-gray-500">({space.totalReviews})</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {space.description}
          </p>

          {/* Amenities */}
          <div className="flex items-center gap-2 mb-3">
            {space.amenities.slice(0, 4).map((amenity) => {
              const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi;
              return (
                <div key={amenity} className="flex items-center gap-1 text-xs text-gray-500">
                  <Icon className="w-3 h-3" />
                  <span className="capitalize">{amenity}</span>
                </div>
              );
            })}
            {space.amenities.length > 4 && (
              <span className="text-xs text-gray-500">+{space.amenities.length - 4}</span>
            )}
          </div>

          {/* Capacity & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">Jusqu'à {space.capacity} personnes</span>
            </div>
            <div className="text-right">
              {space.flashDeal ? (
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500 line-through">
                    {space.pricePerHour} DT/h
                  </span>
                  <span className="font-bold text-lg text-red-600">
                    {discountedPrice.toFixed(0)} DT/h
                  </span>
                </div>
              ) : (
                <span className="font-bold text-lg text-gray-900">
                  {space.pricePerHour} DT/h
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3 pt-0">
          <Button
            variant="outline"
            className="flex-1"
            onClick={(event) => {
              event.stopPropagation()
              if (href) {
                router.push(href)
              } else if (onViewDetails) {
                onViewDetails(space.id)
              }
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            Voir détails
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={(event) => {
              event.stopPropagation()
              if (onReserve) {
                onReserve(space.id)
              } else {
                router.push(`/reservation?spaceId=${encodeURIComponent(space.id)}`)
              }
            }}
          >
            <Clock className="w-4 h-4 mr-2" />
            Réserver
          </Button>
        </CardFooter>
      </div>
      </Card>
    </motion.div>
  );
}