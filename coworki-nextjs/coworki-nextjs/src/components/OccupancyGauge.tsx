"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OccupancyGaugeProps {
  spaceId: string;
  currentOccupancy: number;
  maxCapacity: number;
  trend?: 'up' | 'down' | 'stable';
  flashDealActive?: boolean;
  className?: string;
}

const occupancyLevels = {
  low: { threshold: 0.3, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  medium: { threshold: 0.7, color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
  high: { threshold: 1.0, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" }
};

export function OccupancyGauge({
  spaceId,
  currentOccupancy,
  maxCapacity,
  trend = 'stable',
  flashDealActive = false,
  className
}: OccupancyGaugeProps) {
  const [animatedOccupancy, setAnimatedOccupancy] = useState(currentOccupancy);

  const occupancyRate = currentOccupancy / maxCapacity;
  const percentage = Math.round(occupancyRate * 100);

  // Animation du taux d'occupation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedOccupancy(currentOccupancy);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentOccupancy]);

  // Détermination du niveau d'occupation
  const getOccupancyLevel = (rate: number) => {
    if (rate <= occupancyLevels.low.threshold) return occupancyLevels.low;
    if (rate <= occupancyLevels.medium.threshold) return occupancyLevels.medium;
    return occupancyLevels.high;
  };

  const level = getOccupancyLevel(occupancyRate);

  // Messages selon le niveau
  const getOccupancyMessage = () => {
    if (occupancyRate <= 0.3) {
      return {
        message: "Faible affluence",
        suggestion: "Offre flash recommandée",
        icon: AlertTriangle,
        variant: "destructive" as const
      };
    } else if (occupancyRate <= 0.7) {
      return {
        message: "Affluence modérée",
        suggestion: "Bon taux d'occupation",
        icon: CheckCircle,
        variant: "secondary" as const
      };
    } else {
      return {
        message: "Forte affluence",
        suggestion: "Espace très demandé",
        icon: TrendingUp,
        variant: "default" as const
      };
    }
  };

  const occupancyInfo = getOccupancyMessage();
  const StatusIcon = occupancyInfo.icon;

  return (
    <Card className={cn("relative overflow-hidden", level.bgColor, level.borderColor, className)}>
      {/* Flash Deal Indicator */}
      <AnimatePresence>
        {flashDealActive && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-1 text-xs font-bold"
          >
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" />
              OFFRE FLASH ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CardHeader className={cn("pb-3", flashDealActive && "pt-8")}>
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>Taux d'occupation</span>
          </div>
          <Badge variant={occupancyInfo.variant} className="text-xs">
            <StatusIcon className="w-3 h-3 mr-1" />
            {occupancyInfo.message}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Gauge principale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {currentOccupancy} / {maxCapacity} places
            </span>
            <motion.span
              key={percentage}
              initial={{ scale: 1.2, color: "#3b82f6" }}
              animate={{ scale: 1, color: level.color }}
              className={cn("font-bold text-lg", level.color)}
            >
              {percentage}%
            </motion.span>
          </div>

          <div className="relative">
            <Progress
              value={percentage}
              className="h-3"
            />
            {/* Indicateurs de niveaux */}
            <div className="absolute top-0 left-0 right-0 h-3 flex">
              <div className="w-1/3 border-r border-gray-300"></div>
              <div className="w-1/3 border-r border-gray-300"></div>
            </div>
          </div>

          {/* Labels des niveaux */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>Faible (0-30%)</span>
            <span>Moyen (30-70%)</span>
            <span>Élevé (70-100%)</span>
          </div>
        </div>

        {/* Tendance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
            {trend === 'stable' && <div className="w-4 h-4 rounded-full bg-gray-400"></div>}
            <span className="text-sm text-gray-600">
              {trend === 'up' && 'En augmentation'}
              {trend === 'down' && 'En baisse'}
              {trend === 'stable' && 'Stable'}
            </span>
          </div>

          <div className="text-xs text-gray-500">
            Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>

        {/* Suggestion d'action */}
        <div className={cn(
          "p-3 rounded-lg border",
          occupancyRate <= 0.3 ? "bg-red-50 border-red-200" :
          occupancyRate <= 0.7 ? "bg-yellow-50 border-yellow-200" :
          "bg-green-50 border-green-200"
        )}>
          <div className="flex items-start gap-2">
            <StatusIcon className={cn("w-4 h-4 mt-0.5", level.color)} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {occupancyInfo.suggestion}
              </p>
              {occupancyRate <= 0.3 && (
                <p className="text-xs text-gray-600 mt-1">
                  Considérez une offre flash pour attirer plus de coworkers.
                </p>
              )}
              {occupancyRate > 0.7 && (
                <p className="text-xs text-gray-600 mt-1">
                  Excellent taux d&apos;occupation ! Continuez ainsi.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {Math.max(0, maxCapacity - currentOccupancy)}
            </div>
            <div className="text-xs text-gray-500">Places libres</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {Math.round((currentOccupancy / maxCapacity) * 100)}%
            </div>
            <div className="text-xs text-gray-500">Occupation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {maxCapacity}
            </div>
            <div className="text-xs text-gray-500">Capacité max</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}