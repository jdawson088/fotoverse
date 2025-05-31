
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  Trophy,
  Calendar,
  Users,
  Camera,
  Clock,
  Gift,
  Upload,
  Heart,
  Eye
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  rules: string[];
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'ENDED' | 'UPCOMING';
  prizes: string[];
  coverImage: string | null;
  submissions: Array<{
    id: string;
    title: string;
    imageUrl: string;
    votes: number;
    user: {
      id: string;
      name: string | null;
      avatar: string | null;
    };
  }>;
  _count: {
    submissions: number;
  };
}

interface ChallengesResponse {
  challenges: Challenge[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchChallenges();
  }, [activeTab]);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') {
        params.append('status', activeTab.toUpperCase());
      }

      const response = await fetch(`/api/challenges?${params}`);
      if (response.ok) {
        const data: ChallengesResponse = await response.json();
        setChallenges(data.challenges);
      }
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-800';
      case 'ENDED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Trophy className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Photography Challenges
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Showcase your creativity, compete with fellow photographers, and win amazing prizes
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ended">Ended</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden card-hover border-0 shadow-lg h-full">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={challenge.coverImage || 'https://i.pinimg.com/originals/a9/ae/70/a9ae7020a3f171750944926a729c1de6.jpg'}
                          alt={challenge.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={getStatusColor(challenge.status)}>
                            {challenge.status}
                          </Badge>
                        </div>
                        {challenge.status === 'ACTIVE' && (
                          <div className="absolute top-4 right-4">
                            <Badge variant="destructive">
                              {getDaysRemaining(challenge.endDate)} days left
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {challenge.description}
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>
                              {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{challenge._count.submissions} submissions</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <Gift className="h-4 w-4 mr-2" />
                            <span>{challenge.prizes.length} prizes</span>
                          </div>
                        </div>

                        {/* Top Submissions Preview */}
                        {challenge.submissions.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Top Submissions:</p>
                            <div className="flex space-x-2">
                              {challenge.submissions.slice(0, 3).map((submission) => (
                                <div key={submission.id} className="relative">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                                    <Image
                                      src={submission.imageUrl}
                                      alt={submission.title}
                                      width={48}
                                      height={48}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {submission.votes}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button asChild className="flex-1">
                            <Link href={`/challenges/${challenge.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          {challenge.status === 'ACTIVE' && (
                            <Button variant="outline">
                              <Upload className="h-4 w-4 mr-2" />
                              Submit
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && challenges.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No challenges found</h3>
                <p className="text-gray-600">
                  {activeTab === 'active' 
                    ? 'No active challenges at the moment. Check back soon!'
                    : `No ${activeTab} challenges found.`
                  }
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <Camera className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Ready to Showcase Your Talent?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Join our photography challenges and compete with talented creators from around the world. 
                  Win amazing prizes and get featured in our community gallery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">
                    <Upload className="h-5 w-5 mr-2" />
                    Submit to Active Challenge
                  </Button>
                  <Button size="lg" variant="outline">
                    <Trophy className="h-5 w-5 mr-2" />
                    View Past Winners
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
