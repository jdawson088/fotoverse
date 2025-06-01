

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Heart,
  Wifi,
  Car,
  Camera,
  Grid3X3,
  Map,
  Sparkles,
  Compass
} from 'lucide-react';

interface Location {
  id: string;
  title: string;
  description: string;
  type: string;
  vibe: string;
  city: string;
  state: string;
  hourlyRate: number;
  dailyRate: number | null;
  rating: number;
  reviewCount: number;
  images: string[];
  coverImage: string | null;
  amenities: string[];
  parking: boolean;
  wifi: boolean;
  owner: {
    id: string;
    name: string | null;
    avatar: string | null;
  };
}

interface LocationsResponse {
  locations: Location[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

function LocationsPageContent() {
  const searchParams = useSearchParams();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filters, setFilters] = useState({
    search: searchParams?.get('search') || '',
    type: '',
    vibe: '',
    city: '',
    priceRange: [0, 500],
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchLocations();
  }, [filters, pagination.page]);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (filters.search) params.append('search', filters.search);
      if (filters.type) params.append('type', filters.type);
      if (filters.vibe) params.append('vibe', filters.vibe);
      if (filters.city) params.append('city', filters.city);
      if (filters.priceRange[0] > 0) params.append('minPrice', filters.priceRange[0].toString());
      if (filters.priceRange[1] < 500) params.append('maxPrice', filters.priceRange[1].toString());

      const response = await fetch(`/api/locations?${params}`);
      if (response.ok) {
        const data: LocationsResponse = await response.json();
        setLocations(data.locations);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchLocations();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      vibe: '',
      city: '',
      priceRange: [0, 500],
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const locationTypes = [
    { value: 'HOME_STUDIO', label: 'Intimate Studios' },
    { value: 'COMMERCIAL_STUDIO', label: 'Professional Sanctuaries' },
    { value: 'OUTDOOR_SPOT', label: 'Natural Wonders' },
    { value: 'UNIQUE_SPACE', label: 'Hidden Gems' },
  ];

  const locationVibes = [
    { value: 'SOFT_LUXE', label: 'Soft Luxe' },
    { value: 'WITCHY', label: 'Mystical' },
    { value: 'MODERN', label: 'Contemporary' },
    { value: 'VINTAGE', label: 'Timeless' },
    { value: 'MINIMALIST', label: 'Pure & Simple' },
    { value: 'RUSTIC', label: 'Rustic Charm' },
    { value: 'URBAN', label: 'City Soul' },
    { value: 'NATURAL', label: 'Earth\'s Beauty' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Compass className="h-8 w-8 mr-3 text-primary" />
                Discover Your Creative Canvas
              </h1>
              <p className="text-gray-600 mt-1">
                Explore magical spaces where your artistic vision comes alive
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Gallery
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-primary" />
                    Find Your Perfect Space
                  </h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Reset
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Search */}
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search for inspiration..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </form>

                  {/* Location Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Space Type</label>
                    <Select
                      value={filters.type || undefined}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, type: value || '' }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any space type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any space type</SelectItem>
                        {locationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vibe */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Creative Vibe</label>
                    <Select
                      value={filters.vibe || undefined}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, vibe: value || '' }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any vibe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any vibe</SelectItem>
                        {locationVibes.map((vibe) => (
                          <SelectItem key={vibe.value} value={vibe.value}>
                            {vibe.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">City</label>
                    <Input
                      placeholder="Enter city"
                      value={filters.city}
                      onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Investment Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}/hour
                    </label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                      max={500}
                      step={10}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    {pagination.total} inspiring spaces await your creativity
                  </p>
                </div>

                {/* Locations Grid */}
                {loading ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 aspect-[4/3] rounded-lg mb-4" />
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {locations.map((location, index) => (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link href={`/locations/${location.id}`}>
                          <Card className="overflow-hidden card-hover border-0 shadow-md">
                            <div className="relative aspect-[4/3] bg-gray-200">
                              <Image
                                src={location.coverImage || location.images[0] || 'https://i.pinimg.com/736x/33/43/64/3343649eb38526c36b4aa321695ffa5e.jpg'}
                                alt={`${location.title} - Creative space in ${location.city} perfect for photography and artistic expression`}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-3 right-3">
                                <Button size="sm" variant="secondary" className="rounded-full p-2">
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="absolute top-3 left-3">
                                <Badge variant="secondary">
                                  {location.type.replace('_', ' ')}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-lg truncate">{location.title}</h3>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="ml-1 text-sm font-medium">{location.rating}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{location.city}, {location.state}</span>
                              </div>

                              <div className="flex items-center gap-2 mb-3">
                                {location.wifi && <Wifi className="h-4 w-4 text-gray-400" />}
                                {location.parking && <Car className="h-4 w-4 text-gray-400" />}
                                <Camera className="h-4 w-4 text-gray-400" />
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-xl font-bold">${location.hourlyRate}</span>
                                  <span className="text-gray-600">/hour</span>
                                </div>
                                <Badge variant="outline">{location.vibe.replace('_', ' ')}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        disabled={pagination.page === 1}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      >
                        Previous
                      </Button>
                      
                      {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={pagination.page === page ? 'default' : 'outline'}
                            onClick={() => setPagination(prev => ({ ...prev, page }))}
                          >
                            {page}
                          </Button>
                        );
                      })}
                      
                      <Button
                        variant="outline"
                        disabled={pagination.page === pagination.pages}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Interactive Map Coming Soon</h3>
                <p className="text-gray-600">
                  We're crafting a beautiful map experience to help you discover creative spaces near you.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LocationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading magical spaces...</div>}>
      <LocationsPageContent />
    </Suspense>
  );
}

