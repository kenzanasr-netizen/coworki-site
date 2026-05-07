// Global type definitions for CoWorki

export type UserRole = 'USER' | 'PARTNER' | 'ENTERPRISE' | 'ADMIN'

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export type PaymentStatus = 'PENDING' | 'HELD' | 'RELEASED' | 'REFUNDED' | 'FAILED'

export type SubscriptionTier = 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE'

export type FlashDealStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  interests: string[]
  phone?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface CoworkingSpace {
  id: string
  name: string
  description: string
  address: string
  city: string
  lat: number
  lng: number
  pricePerHour: number
  capacity: number
  images: string[]
  amenities: string[]
  ecoScore: number
  isVerified: boolean
  partnerId: string
  createdAt: Date
  updatedAt: Date
}

export interface Seat {
  id: string
  spaceId: string
  seatNumber: string
  isAvailable: boolean
  type: 'DESK' | 'ROOM' | 'CABIN'
  pricePerHour?: number
}

export interface Reservation {
  id: string
  userId: string
  spaceId: string
  seatId?: string
  startDate: Date
  endDate: Date
  duration: number // in minutes
  totalAmount: number
  commission: number
  status: ReservationStatus
  paymentStatus: PaymentStatus
  paymentIntentId?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface FlashDeal {
  id: string
  spaceId: string
  discountPercent: number
  startAt: Date
  endAt: Date
  triggeredBy: 'MANUAL' | 'AUTO'
  status: FlashDealStatus
  createdAt: Date
}

export interface SmartMatch {
  id: string
  userId: string
  matchedUserId: string
  spaceId: string
  similarityScore: number
  chatRoomId: string
  createdAt: Date
}

export interface Review {
  id: string
  userId: string
  spaceId: string
  reservationId: string
  rating: number
  comment?: string
  createdAt: Date
}

export interface Subscription {
  id: string
  partnerId: string
  tier: SubscriptionTier
  isActive: boolean
  startDate: Date
  endDate: Date
  price: number
  features: string[]
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

// Search and filter types
export interface SearchFilters {
  city?: string
  priceMin?: number
  priceMax?: number
  amenities?: string[]
  date?: string
  capacity?: number
  lat?: number
  lng?: number
  radiusKm?: number
  sortBy?: 'relevance' | 'price' | 'rating' | 'distance' | 'ecoScore'
  page?: number
  limit?: number
}

// Socket.io event types
export interface ServerToClientEvents {
  'seat:updated': (data: { seatId: string; isAvailable: boolean; lockedBy?: string }) => void
  'flash:deal': (data: { spaceId: string; spaceName: string; discount: number; expiresAt: string }) => void
  'match:found': (data: { matchedUser: any; chatRoomId: string; similarityScore: number }) => void
  'chat:message': (data: { chatRoomId: string; message: string; user: any; timestamp: string }) => void
  'notification:new': (data: { title: string; message: string; type: string }) => void
  'occupancy:alert': (data: { spaceId: string; occupancyRate: number }) => void
  'reservation:confirmed': (data: { reservationId: string }) => void
}

export interface ClientToServerEvents {
  'seat:lock': (data: { seatId: string; userId: string; duration: string }) => void
  'seat:unlock': (data: { seatId: string }) => void
  'user:checkin': (data: { spaceId: string; userId: string; interests: string[] }) => void
  'space:subscribe': (spaceId: string) => void
  'city:subscribe': (city: string) => void
  'chat:message': (data: { chatRoomId: string; message: string; userId: string }) => void
}

// Form types
export interface ReservationFormData {
  spaceId: string
  seatId?: string
  startDate: Date
  duration: number
  notes?: string
}

export interface PaymentFormData {
  amount: number
  currency: 'TND' | 'EUR' | 'USD'
  paymentMethod: 'stripe' | 'konnect'
  reservationId: string
}

// Component prop types
export interface SpaceCardProps {
  space: CoworkingSpace & {
    averageRating: number
    totalReviews: number
    flashDeal?: FlashDeal
    occupancyRate?: number
  }
  onViewDetails: (spaceId: string) => void
  onReserve: (spaceId: string) => void
  className?: string
}

export interface MapViewProps {
  spaces: Array<CoworkingSpace & {
    averageRating: number
    flashDeal?: FlashDeal
    occupancyRate?: number
  }>
  selectedSpaceId?: string
  onSpaceSelect: (spaceId: string) => void
  userLocation?: { lat: number; lng: number }
  className?: string
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

// Environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      JWT_SECRET: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string
      STRIPE_PUBLISHABLE_KEY: string
      KONNECT_API_KEY: string
      KONNECT_API_URL: string
      KONNECT_WEBHOOK_SECRET: string
      ALGOLIA_APP_ID: string
      ALGOLIA_API_KEY: string
      ALGOLIA_INDEX_NAME: string
      SOCKET_IO_PATH: string
      ML_API_URL: string
      OCCUPANCY_API_URL: string
      SMTP_HOST: string
      SMTP_PORT: string
      SMTP_USER: string
      SMTP_PASS: string
      SENTRY_DSN: string
      NEXT_PUBLIC_APP_URL: string
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string
    }
  }
}