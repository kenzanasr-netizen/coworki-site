"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Star,
  Zap,
  Target,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface DashboardProps {
  spaceId: string;
  className?: string;
}

// Données mockées pour la démonstration
const mockData = {
  overview: {
    todayRevenue: 1250,
    todayBookings: 8,
    occupancyRate: 0.75,
    averageRating: 4.6,
    totalReviews: 127
  },
  weeklyRevenue: [
    { day: 'Lun', revenue: 850, bookings: 6 },
    { day: 'Mar', revenue: 920, bookings: 7 },
    { day: 'Mer', revenue: 1100, bookings: 9 },
    { day: 'Jeu', revenue: 980, bookings: 8 },
    { day: 'Ven', revenue: 1350, bookings: 11 },
    { day: 'Sam', revenue: 450, bookings: 3 },
    { day: 'Dim', revenue: 320, bookings: 2 }
  ],
  hourlyOccupancy: [
    { hour: '9h', occupancy: 0.2 },
    { hour: '10h', occupancy: 0.4 },
    { hour: '11h', occupancy: 0.6 },
    { hour: '12h', occupancy: 0.8 },
    { hour: '13h', occupancy: 0.9 },
    { hour: '14h', occupancy: 0.7 },
    { hour: '15h', occupancy: 0.8 },
    { hour: '16h', occupancy: 0.6 },
    { hour: '17h', occupancy: 0.4 },
    { hour: '18h', occupancy: 0.2 }
  ],
  revenueByService: [
    { name: 'Coworking', value: 65, color: '#3b82f6' },
    { name: 'Réunions', value: 25, color: '#10b981' },
    { name: 'Événements', value: 10, color: '#f59e0b' }
  ],
  recentBookings: [
    {
      id: '1',
      user: 'Ahmed Ben Ali',
      time: '14:00 - 16:00',
      service: 'Coworking',
      amount: 40,
      status: 'confirmed'
    },
    {
      id: '2',
      user: 'Sarah Mansouri',
      time: '10:00 - 12:00',
      service: 'Réunion',
      amount: 80,
      status: 'confirmed'
    },
    {
      id: '3',
      user: 'Mohamed Trabelsi',
      time: '09:00 - 17:00',
      service: 'Coworking',
      amount: 160,
      status: 'pending'
    }
  ],
  alerts: [
    {
      type: 'occupancy',
      message: 'Taux d\'occupation faible ce matin',
      severity: 'warning',
      action: 'Déclencher offre flash'
    },
    {
      type: 'maintenance',
      message: 'Nettoyage prévu demain 8h-9h',
      severity: 'info',
      action: null
    }
  ]
};

export function PartnerDashboard({ spaceId, className }: DashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [realTimeData, setRealTimeData] = useState(mockData);

  // Simulation de données temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          occupancyRate: Math.max(0, Math.min(1, prev.overview.occupancyRate + (Math.random() - 0.5) * 0.1))
        }
      }));
    }, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => `${amount} DT`;
  const formatPercentage = (value: number) => `${Math.round(value * 100)}%`;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Partenaire</h1>
          <p className="text-gray-600">Vue d'ensemble de votre espace de coworking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Offre Flash
          </Button>
        </div>
      </div>

      {/* Alertes */}
      {realTimeData.alerts.length > 0 && (
        <div className="space-y-2">
          {realTimeData.alerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-4 rounded-lg border flex items-center justify-between",
                alert.severity === 'warning' && "bg-yellow-50 border-yellow-200",
                alert.severity === 'info' && "bg-blue-50 border-blue-200",
                alert.severity === 'error' && "bg-red-50 border-red-200"
              )}
            >
              <div className="flex items-center gap-3">
                {alert.severity === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                {alert.severity === 'info' && <Activity className="w-5 h-5 text-blue-600" />}
                {alert.severity === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
                <span className="text-sm">{alert.message}</span>
              </div>
              {alert.action && (
                <Button size="sm" variant="outline">
                  {alert.action}
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus aujourd'hui</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(realTimeData.overview.todayRevenue)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% par rapport à hier
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeData.overview.todayBookings}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% par rapport à hier
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(realTimeData.overview.occupancyRate)}</div>
            <Progress value={realTimeData.overview.occupancyRate * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeData.overview.averageRating}/5</div>
            <div className="text-xs text-gray-600">
              {realTimeData.overview.totalReviews} avis
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques détaillés */}
      <Tabs defaultValue="occupancy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="occupancy">Occupation</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="occupancy" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gauge d'occupation */}
            <OccupancyGauge
              spaceId={spaceId}
              currentOccupancy={Math.round(realTimeData.overview.occupancyRate * 20)} // Simulation avec 20 places max
              maxCapacity={20}
              trend="up"
              flashDealActive={false}
            />

            {/* Graphique horaire */}
            <Card>
              <CardHeader>
                <CardTitle>Occupation horaire aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={realTimeData.hourlyOccupancy}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis tickFormatter={(value) => `${value * 100}%`} />
                    <Tooltip formatter={(value: number) => [`${Math.round(value * 100)}%`, 'Occupation']} />
                    <Area
                      type="monotone"
                      dataKey="occupancy"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenus hebdomadaires */}
            <Card>
              <CardHeader>
                <CardTitle>Revenus cette semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={realTimeData.weeklyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `${value} DT`} />
                    <Tooltip formatter={(value: number) => [`${value} DT`, 'Revenus']} />
                    <Bar dataKey="revenue" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Répartition par service */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition des revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={realTimeData.revenueByService}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {realTimeData.revenueByService.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value}%`, 'Part']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Réservations récentes */}
          <Card>
            <CardHeader>
              <CardTitle>Réservations récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realTimeData.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.user}</p>
                        <p className="text-sm text-gray-600">{booking.time} • {booking.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(booking.amount)}</p>
                      <Badge
                        variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {booking.status === 'confirmed' ? (
                          <><CheckCircle className="w-3 h-3 mr-1" />Confirmé</>
                        ) : (
                          <><Clock className="w-3 h-3 mr-1" />En attente</>
                        )}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}