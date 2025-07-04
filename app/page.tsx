

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Camera,
  MapPin,
  ShoppingBag,
  Trophy,
  BookOpen,
  Users,
  Star,
  Search,
  ArrowRight,
  Heart,
  Zap,
  Globe,
  Sparkles,
  Compass
} from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="text-4xl font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      icon: Compass,
      title: 'Discover Your Next Adventure',
      description: 'Uncover hidden gems and magical spaces where your creative vision comes alive. Every location tells a story waiting for you to capture.',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Share the Creative Journey',
      description: 'Connect with passionate creators who understand your artistic soul. Trade gear, share stories, and build lasting friendships.',
      color: 'text-green-600'
    },
    {
      icon: Sparkles,
      title: 'Ignite Your Creativity',
      description: 'Push your boundaries with inspiring challenges that spark new ideas and help you discover styles you never knew existed.',
      color: 'text-yellow-600'
    },
    {
      icon: BookOpen,
      title: 'Learn from the Masters',
      description: 'Dive deep into the minds of visionary artists. Every tutorial is a doorway to new possibilities and creative breakthroughs.',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Find Your Creative Tribe',
      description: 'Join a community where passion meets purpose. Collaborate, inspire, and grow together with fellow dreamers and creators.',
      color: 'text-pink-600'
    },
    {
      icon: Zap,
      title: 'Create Without Limits',
      description: 'Turn inspiration into reality instantly. When creativity strikes, nothing should stand between you and your vision.',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Creative Souls', value: 15000, suffix: '+' },
    { label: 'Magical Spaces', value: 2500, suffix: '+' },
    { label: 'Dreams Shared', value: 8000, suffix: '+' },
    { label: 'Stories Told', value: 150, suffix: '+' }
  ];

  const featuredLocations = [
    {
      id: '1',
      title: 'Minimalist Studio Downtown',
      type: 'Creative Sanctuary',
      vibe: 'Modern',
      price: 75,
      rating: 4.9,
      image: 'https://i.pinimg.com/originals/4f/37/c4/4f37c42fbe16fdbd1e2d3078a191026b.jpg',
      city: 'New York'
    },
    {
      id: '2',
      title: 'Vintage Bookshop Cafe',
      type: 'Storytelling Haven',
      vibe: 'Vintage',
      price: 45,
      rating: 4.8,
      image: 'https://i.pinimg.com/originals/fe/25/fe/fe25fe33458795634f082e0b39239cfa.jpg',
      city: 'Portland'
    },
    {
      id: '3',
      title: 'Rooftop Garden Oasis',
      type: 'Natural Wonder',
      vibe: 'Natural',
      price: 60,
      rating: 4.7,
      image: 'https://thumbs.dreamstime.com/b/beautiful-rooftop-garden-lush-green-plants-wooden-pathway-overlooking-city-skyline-perfect-relaxation-nature-329915282.jpg',
      city: 'Los Angeles'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full bg-gray-900">
            <Image
              src="https://s-media-cache-ak0.pinimg.com/originals/f3/5b/af/f35baf3760eb49da46cc13d2b0fc9dc1.jpg"
              alt="Professional photography studio with photographer working with camera equipment and dramatic lighting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Your Creative{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Photography
              </span>
              {' '}Playground
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
              Where passion meets possibility. Discover magical spaces, connect with kindred spirits, 
              and transform your creative dreams into breathtaking reality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button size="lg" className="btn-primary text-lg px-8 py-4">
              <Link href="/locations" className="flex items-center">
                Begin Your Adventure
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href="/auth/register">Join the Movement</Link>
            </Button>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for inspiring spaces, creative sanctuaries, or hidden gems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white/90 border-0 rounded-full"
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                onClick={() => {
                  if (searchQuery.trim()) {
                    window.location.href = `/locations?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              >
                Explore
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Counter end={stat.value} suffix={stat.suffix} />
                <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Where Dreams Take{' '}
              <span className="text-primary">Flight</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FOTOVERSE isn't just a platform—it's a canvas for your imagination, 
              a community for your soul, and a launchpad for your creative journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Spaces That <span className="text-primary">Inspire</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step into worlds where creativity knows no bounds. Each space is carefully curated 
              to spark your imagination and bring your artistic vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden card-hover border-0 shadow-lg">
                  <div className="relative aspect-[4/3] bg-gray-200">
                    <Image
                      src={location.image}
                      alt={location.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="rounded-full p-2">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{location.type}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{location.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{location.title}</h3>
                    <p className="text-gray-600 mb-4">{location.city}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold">${location.price}</span>
                        <span className="text-gray-600">/hour</span>
                      </div>
                      <Badge variant="outline">{location.vibe}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/locations">
                Discover More Magic
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Unleash Your Creative Spirit?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of passionate creators who've found their artistic home in FOTOVERSE. 
              Your next masterpiece is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                <Link href="/auth/register">Start Creating Today</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                <Link href="/locations">Explore the Playground</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

