
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'PHOTOGRAPHER' | 'CREATOR' | 'LOCATION_OWNER' | 'ADMIN';
  avatar: string | null;
  bio: string | null;
  website: string | null;
  instagram: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  title: string;
  description: string;
  type: 'HOME_STUDIO' | 'COMMERCIAL_STUDIO' | 'OUTDOOR_SPOT' | 'UNIQUE_SPACE';
  vibe: 'SOFT_LUXE' | 'WITCHY' | 'MODERN' | 'VINTAGE' | 'MINIMALIST' | 'RUSTIC' | 'URBAN' | 'NATURAL';
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  hourlyRate: number;
  dailyRate: number | null;
  minBooking: number;
  maxBooking: number;
  amenities: string[];
  lighting: string[];
  access: string;
  parking: boolean;
  wifi: boolean;
  restroom: boolean;
  images: string[];
  coverImage: string | null;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  ownerId: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  locationId: string;
  location: Location;
  userId: string;
  user: User;
  startDate: Date;
  endDate: Date;
  totalHours: number;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  purpose: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EquipmentListing {
  id: string;
  title: string;
  description: string;
  category: 'CAMERA' | 'LENS' | 'LIGHTING' | 'BACKDROP' | 'PROPS' | 'WARDROBE' | 'ACCESSORIES';
  brand: string | null;
  model: string | null;
  condition: string;
  price: number;
  images: string[];
  specifications: string | null;
  isAvailable: boolean;
  isSold: boolean;
  city: string;
  state: string;
  sellerId: string;
  seller: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  rules: string[];
  startDate: Date;
  endDate: Date;
  status: 'ACTIVE' | 'ENDED' | 'UPCOMING';
  prizes: string[];
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string[];
  category: string;
  isPublished: boolean;
  publishedAt: Date | null;
  authorId: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  query?: string;
  type?: string;
  vibe?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  lighting?: string[];
}
