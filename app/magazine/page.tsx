
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Calendar,
  User,
  ArrowRight,
  Camera,
  Lightbulb,
  Users,
  Zap
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  tags: string[];
  publishedAt: string | null;
  author: {
    id: string;
    name: string | null;
    avatar: string | null;
  };
}

interface ArticlesResponse {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function MagazinePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchArticles();
    fetchFeaturedArticles();
  }, [activeCategory]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'all') {
        params.append('category', activeCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/articles?${params}`);
      if (response.ok) {
        const data: ArticlesResponse = await response.json();
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedArticles = async () => {
    try {
      const response = await fetch('/api/articles?limit=3');
      if (response.ok) {
        const data: ArticlesResponse = await response.json();
        setFeaturedArticles(data.articles.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch featured articles:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  const categories = [
    { value: 'all', label: 'All Articles', icon: BookOpen },
    { value: 'tutorials', label: 'Tutorials', icon: Lightbulb },
    { value: 'techniques', label: 'Techniques', icon: Camera },
    { value: 'interviews', label: 'Interviews', icon: Users },
    { value: 'gear', label: 'Gear Reviews', icon: Zap },
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <BookOpen className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              FOTOVERSE Magazine
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Learn from the best photographers, discover new techniques, and stay updated 
              with the latest trends in photography
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles, tutorials, and guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/90 border-0 rounded-full text-gray-900"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                >
                  Search
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/magazine/${article.id}`}>
                    <Card className="overflow-hidden card-hover border-0 shadow-lg h-full">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={article.coverImage || 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/0489f987003305.5daa8e963399b.png'}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-900">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={article.author.avatar || ''} />
                              <AvatarFallback className="text-xs">
                                {article.author.name?.charAt(0) || 'A'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">
                              {article.author.name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Categories and Articles */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.value} value={category.value} className="flex items-center">
                  <Icon className="h-4 w-4 mr-2 hidden sm:block" />
                  {category.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeCategory}>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/magazine/${article.id}`}>
                      <Card className="overflow-hidden card-hover border-0 shadow-md h-full">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={article.coverImage || 'https://i.pinimg.com/originals/9a/76/f2/9a76f211c6d7d2f06760746527d2d860.png'}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                              {article.excerpt}
                            </p>
                          )}
                          
                          {/* Tags */}
                          {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {article.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={article.author.avatar || ''} />
                                <AvatarFallback className="text-xs">
                                  {article.author.name?.charAt(0) || 'A'}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">
                                {article.author.name}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(article.publishedAt)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && articles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery 
                    ? 'Try adjusting your search terms.'
                    : `No articles in the ${activeCategory} category yet.`
                  }
                </p>
                {searchQuery && (
                  <Button onClick={() => { setSearchQuery(''); fetchArticles(); }}>
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get the latest photography tips, tutorials, and industry insights 
                delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button>
                  Subscribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
