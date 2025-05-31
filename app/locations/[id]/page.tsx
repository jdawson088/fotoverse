
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Wifi,
  Car,
  Camera,
  Clock,
  DollarSign,
  User,
  Calendar,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface LocationDetails {
  id: string;
  title: string;
  description: string;
  type: string;
  vibe: string;
  address: string;
  city: string;
  state: string;
  country: string;
  hourlyRate: number;
  dailyRate: number | null;
  minBooking: number;
  maxBooking: number;
  rating: number;
  reviewCount: number;
  images: string[];
  coverImage: string | null;
  amenities: string[];
  lighting: string[];
  access: string;
  parking: boolean;
  wifi: boolean;
  restroom: boolean;
  owner: {
    id: string;
    name: string | null;
    avatar: string | null;
    bio: string | null;
  };
  reviews: Array<{
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    user: {
      id: string;
      name: string | null;
      avatar: string | null;
    };
  }>;
}

export default function LocationDetailPage() {
  const params = useParams();
  const [location, setLocation] = useState<LocationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (params?.id) {
      fetchLocation(params.id as string);
    }
  }, [params?.id]);

  const fetchLocation = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/locations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setLocation(data);
      }
    } catch (error) {
      console.error('Failed to fetch location:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (location) {
      setCurrentImageIndex((prev) => 
        prev === location.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (location) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? location.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-96 rounded-lg mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Location not found</h1>
          <p className="text-gray-600">The location you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-8"
        >
          <Image
            src={location.images[currentImageIndex] || '/placeholder-location.jpg'}
            alt={location.title}
            fill
            className="object-cover"
          />
          
          {location.images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {location.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-4 right-4 flex space-x-2">
            <Button variant="secondary" size="sm" className="rounded-full p-2">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full p-2">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{location.type.replace('_', ' ')}</Badge>
                <Badge variant="outline">{location.vibe.replace('_', ' ')}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {location.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{location.rating}</span>
                  <span className="text-gray-600 ml-1">({location.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{location.city}, {location.state}</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {location.description}
              </p>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {location.wifi && (
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 text-blue-600 mr-2" />
                      <span>WiFi</span>
                    </div>
                  )}
                  {location.parking && (
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Parking</span>
                    </div>
                  )}
                  {location.restroom && (
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Restroom</span>
                    </div>
                  )}
                  {location.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Camera className="h-5 w-5 text-blue-600 mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lighting */}
              {location.lighting.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Lighting</h3>
                  <div className="flex flex-wrap gap-2">
                    {location.lighting.map((light, index) => (
                      <Badge key={index} variant="outline">{light}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Access Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Access</h3>
                <p className="text-gray-700">{location.access}</p>
              </div>

              {/* Owner */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Hosted by</h3>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={location.owner.avatar || ''} />
                    <AvatarFallback>
                      {location.owner.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{location.owner.name}</p>
                    {location.owner.bio && (
                      <p className="text-gray-600 text-sm">{location.owner.bio}</p>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>

              {/* Reviews */}
              {location.reviews.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                  <div className="space-y-4">
                    {location.reviews.slice(0, 3).map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={review.user.avatar || ''} />
                              <AvatarFallback>
                                {review.user.name?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{review.user.name}</p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-gray-700 text-sm">{review.comment}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">${location.hourlyRate}</span>
                      <span className="text-gray-600 ml-1">/hour</span>
                    </div>
                    {location.dailyRate && (
                      <div className="flex items-baseline mt-1">
                        <span className="text-xl font-semibold">${location.dailyRate}</span>
                        <span className="text-gray-600 ml-1">/day</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Min booking: {location.minBooking} hours</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Max booking: {location.maxBooking} hours</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mb-4"
                    onClick={() => setShowBookingModal(true)}
                  >
                    Book Now
                  </Button>

                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Owner
                  </Button>

                  <Separator className="my-4" />

                  <div className="text-center text-sm text-gray-600">
                    <p>You won't be charged yet</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
