
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Heart,
  Camera,
  Plus,
  ShoppingBag,
  Star,
  MessageCircle
} from 'lucide-react';

interface Equipment {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string | null;
  model: string | null;
  condition: string;
  price: number;
  images: string[];
  city: string;
  state: string;
  seller: {
    id: string;
    name: string | null;
    avatar: string | null;
  };
  createdAt: string;
}

interface EquipmentResponse {
  equipment: Equipment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function MarketplacePage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    condition: '',
    city: '',
    priceRange: [0, 5000],
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchEquipment();
  }, [filters, pagination.page]);

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.condition) params.append('condition', filters.condition);
      if (filters.city) params.append('city', filters.city);
      if (filters.priceRange[0] > 0) params.append('minPrice', filters.priceRange[0].toString());
      if (filters.priceRange[1] < 5000) params.append('maxPrice', filters.priceRange[1].toString());

      const response = await fetch(`/api/marketplace?${params}`);
      if (response.ok) {
        const data: EquipmentResponse = await response.json();
        setEquipment(data.equipment);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchEquipment();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      condition: '',
      city: '',
      priceRange: [0, 5000],
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const categories = [
    { value: 'CAMERA', label: 'Cameras' },
    { value: 'LENS', label: 'Lenses' },
    { value: 'LIGHTING', label: 'Lighting' },
    { value: 'BACKDROP', label: 'Backdrops' },
    { value: 'PROPS', label: 'Props' },
    { value: 'WARDROBE', label: 'Wardrobe' },
    { value: 'ACCESSORIES', label: 'Accessories' },
  ];

  const conditions = [
    { value: 'New', label: 'New' },
    { value: 'Like New', label: 'Like New' },
    { value: 'Good', label: 'Good' },
    { value: 'Fair', label: 'Fair' },
  ];

  const getEquipmentImage = (item: Equipment) => {
    if (item.images && item.images.length > 0) {
      return item.images[0];
    }
    
    // Return appropriate placeholder based on category
    switch (item.category) {
      case 'CAMERA':
        return 'https://c8.alamy.com/comp/HJ466G/professional-dslr-digital-camera-with-big-white-tele-lens-on-white-HJ466G.jpg';
      case 'LENS':
        return 'https://i.ytimg.com/vi/WE-b4IPMnq8/maxresdefault.jpg';
      case 'LIGHTING':
        return 'https://i.pinimg.com/originals/80/1a/d6/801ad69ccf345ad7830e09a97da1bed7.jpg';
      case 'BACKDROP':
        return 'https://i.pinimg.com/originals/e2/20/1a/e2201a6a102d029f095446eb52fb6d46.jpg';
      case 'PROPS':
        return 'https://i.pinimg.com/originals/cc/4e/5a/cc4e5a996cd15c29d3acfc89f76f28bb.jpg';
      case 'WARDROBE':
        return 'https://i.pinimg.com/originals/44/b3/61/44b36189feeedd5d2c66edbb1d1aabc8.jpg';
      case 'ACCESSORIES':
        return 'https://i.pinimg.com/originals/01/ab/b9/01abb9383b2321c0314acde2434f55e8.png';
      default:
        return 'https://images.pexels.com/photos/4011762/pexels-photo-4011762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Equipment Marketplace</h1>
              <p className="text-gray-600 mt-1">
                Buy and sell photography gear with the community
              </p>
            </div>
            
            <Button className="lg:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              List Equipment
            </Button>
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
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Search */}
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search equipment..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </form>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select
                      value={filters.category || undefined}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, category: value || '' }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any category</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Condition</label>
                    <Select
                      value={filters.condition || undefined}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, condition: value || '' }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any condition</SelectItem>
                        {conditions.map((condition) => (
                          <SelectItem key={condition.value} value={condition.value}>
                            {condition.label}
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
                      Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                      max={5000}
                      step={50}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {pagination.total} items found
              </p>
            </div>

            {/* Equipment Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {equipment.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden card-hover border-0 shadow-md">
                      <div className="relative aspect-square bg-gray-200">
                        <Image
                          src={getEquipmentImage(item)}
                          alt={`${item.title} - ${item.category.replace('_', ' ')} for sale in ${item.city}`}
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
                            {item.category.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                        
                        {item.brand && item.model && (
                          <p className="text-gray-600 text-sm mb-2">
                            {item.brand} {item.model}
                          </p>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{item.condition}</Badge>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{item.city}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={item.seller.avatar || ''} />
                              <AvatarFallback className="text-xs">
                                {item.seller.name?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{item.seller.name}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-green-600">
                            ${item.price.toLocaleString()}
                          </span>
                          <Button size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && equipment.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No equipment found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
