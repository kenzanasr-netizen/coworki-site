"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Search,
  Filter,
  Navigation,
  ZoomIn,
  ZoomOut,
  Locate,
  Layers,
  Star,
  Clock,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Space {
  id: string;
  name: string;
  lat: number;
  lng: number;
  pricePerHour: number;
  capacity: number;
  averageRating: number;
  flashDeal?: {
    discountPercent: number;
  };
  occupancyRate?: number;
}

interface MapViewProps {
  spaces: Space[];
  selectedSpaceId?: string;
  onSpaceSelect: (spaceId: string) => void;
  userLocation?: { lat: number; lng: number };
  className?: string;
}

export function MapView({
  spaces,
  selectedSpaceId,
  onSpaceSelect,
  userLocation,
  className
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite'>('standard');
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState({ lat: 36.8065, lng: 10.1815 }); // Tunis par défaut

  // Simulation d'initialisation de carte (remplacer par une vraie implémentation Leaflet/Mapbox)
  useEffect(() => {
    if (mapRef.current && !map) {
      // Simulation d'initialisation
      const mockMap = {
        setView: (coords: { lat: number; lng: number }, zoomLevel: number) => {
          setCenter(coords);
          setZoom(zoomLevel);
        },
        getZoom: () => zoom,
        getCenter: () => center
      };
      setMap(mockMap);
    }
  }, [mapRef, map, zoom, center]);

  // Centrer sur la position utilisateur
  const handleLocateUser = () => {
    if (userLocation && map) {
      map.setView(userLocation, 15);
    }
  };

  // Filtrage des espaces
  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcul du prix minimum/maximum pour les filtres
  const priceRange = spaces.length > 0 ? {
    min: Math.min(...spaces.map(s => s.pricePerHour)),
    max: Math.max(...spaces.map(s => s.pricePerHour))
  } : { min: 0, max: 100 };

  return (
    <div className={cn("relative h-full w-full", className)}>
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden"
      >
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Grid pattern pour simuler une carte */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Espaces sur la carte */}
          {filteredSpaces.map((space) => (
            <motion.div
              key={space.id}
              className="absolute cursor-pointer"
              style={{
                left: `${50 + (space.lng - center.lng) * 1000}px`,
                top: `${50 + (space.lat - center.lat) * 1000}px`,
                transform: 'translate(-50%, -50%)'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSpaceSelect(space.id)}
            >
              <div className={cn(
                "relative",
                selectedSpaceId === space.id && "z-10"
              )}>
                {/* Marker */}
                <div className={cn(
                  "w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center",
                  selectedSpaceId === space.id
                    ? "bg-blue-600"
                    : space.flashDeal
                      ? "bg-red-500"
                      : "bg-green-600"
                )}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>

                {/* Price Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs font-bold whitespace-nowrap",
                      space.flashDeal && "bg-red-500 text-white"
                    )}
                  >
                    {space.flashDeal
                      ? `${Math.round(space.pricePerHour * (1 - space.flashDeal.discountPercent / 100))} DT`
                      : `${space.pricePerHour} DT`
                    }
                  </Badge>
                </div>

                {/* Occupancy Indicator */}
                {space.occupancyRate !== undefined && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                      {Math.round(space.occupancyRate * 100)}%
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* User Location */}
          {userLocation && (
            <motion.div
              className="absolute z-20"
              style={{
                left: `${50 + (userLocation.lng - center.lng) * 1000}px`,
                top: `${50 + (userLocation.lat - center.lat) * 1000}px`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {/* Zoom Controls */}
          <Card className="p-1">
            <div className="flex flex-col gap-1">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0"
                onClick={() => setZoom(Math.min(zoom + 1, 18))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0"
                onClick={() => setZoom(Math.max(zoom - 1, 3))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Locate User */}
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={handleLocateUser}
          >
            <Locate className="w-4 h-4" />
          </Button>

          {/* Map Style Toggle */}
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={() => setMapStyle(mapStyle === 'standard' ? 'satellite' : 'standard')}
          >
            <Layers className="w-4 h-4" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="absolute top-4 left-4 right-20">
          <Card className="p-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un espace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-4 right-20 z-10"
            >
              <Card className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Prix par heure</label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="number"
                        placeholder={`${priceRange.min} DT`}
                        className="text-sm"
                      />
                      <span className="self-center">-</span>
                      <Input
                        type="number"
                        placeholder={`${priceRange.max} DT`}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Équipements</label>
                    <div className="flex gap-1 mt-1">
                      {['wifi', 'coffee', 'parking'].map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Space Details Popup */}
        <AnimatePresence>
          {selectedSpaceId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-4 left-4 right-4 z-10"
            >
              <Card className="p-4">
                {(() => {
                  const space = spaces.find(s => s.id === selectedSpaceId);
                  if (!space) return null;

                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{space.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {space.averageRating.toFixed(1)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {space.capacity} pers.
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {space.pricePerHour} DT/h
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => onSpaceSelect(space.id)}>
                        Voir détails
                      </Button>
                    </div>
                  );
                })()}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}