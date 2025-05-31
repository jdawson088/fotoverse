

async function getPrisma() {
  const { prisma } = await import('./db');
  return prisma;
}

export async function seedDatabase() {
  // Skip during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return { message: 'Skipped during build' };
  }

  const prisma = await getPrisma();

  try {
    // Create users
    const users = await Promise.all([
      prisma.user.create({
        data: {
          name: 'Alex Chen',
          email: 'alex@example.com',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password123
          bio: 'Professional photographer specializing in urban landscapes and street photography.',
          location: 'San Francisco, CA',
          website: 'https://alexchen.photography',
          instagramHandle: '@alexchen_photo',
          portfolioUrl: 'https://alexchen.photography/portfolio',
          isVerified: true,
        },
      }),
      prisma.user.create({
        data: {
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password123
          bio: 'Wedding and portrait photographer with 10+ years of experience.',
          location: 'New York, NY',
          instagramHandle: '@sarahjohnson_weddings',
          isVerified: true,
        },
      }),
      prisma.user.create({
        data: {
          name: 'Mike Rodriguez',
          email: 'mike@example.com',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password123
          bio: 'Nature and wildlife photographer. Always chasing the perfect shot.',
          location: 'Denver, CO',
          twitterHandle: '@mike_captures',
          isVerified: false,
        },
      }),
      prisma.user.create({
        data: {
          name: 'Emma Wilson',
          email: 'emma@example.com',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // password123
          bio: 'Fashion and commercial photographer based in LA.',
          location: 'Los Angeles, CA',
          website: 'https://emmawilson.com',
          instagramHandle: '@emmawilson_fashion',
          portfolioUrl: 'https://emmawilson.com/work',
          isVerified: true,
        },
      }),
    ]);

    // Create locations
    const locations = await Promise.all([
      prisma.location.create({
        data: {
          title: 'Golden Gate Bridge Viewpoint',
          description: 'Perfect spot for capturing the iconic Golden Gate Bridge with stunning sunrise and sunset views.',
          address: 'Battery Spencer, Sausalito, CA 94965',
          city: 'Sausalito',
          state: 'CA',
          country: 'USA',
          latitude: 37.8272,
          longitude: -122.4816,
          type: 'OUTDOOR',
          vibe: 'SCENIC',
          hourlyRate: 0,
          amenities: ['Parking', 'Restrooms', 'Scenic Views'],
          rules: ['No drones without permit', 'Respect other visitors', 'Leave no trace'],
          images: [
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          ],
          ownerId: users[0].id,
          isActive: true,
        },
      }),
      prisma.location.create({
        data: {
          title: 'Brooklyn Bridge Photography Studio',
          description: 'Professional photography studio with Brooklyn Bridge views. Perfect for portraits and commercial shoots.',
          address: '123 Front St, Brooklyn, NY 11201',
          city: 'Brooklyn',
          state: 'NY',
          country: 'USA',
          latitude: 40.7061,
          longitude: -73.9969,
          type: 'STUDIO',
          vibe: 'URBAN',
          hourlyRate: 150,
          amenities: ['Professional Lighting', 'Backdrop Options', 'Changing Room', 'WiFi', 'Air Conditioning'],
          rules: ['24-hour advance booking required', 'No smoking', 'Clean up after use'],
          images: [
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
          ],
          ownerId: users[1].id,
          isActive: true,
        },
      }),
      prisma.location.create({
        data: {
          title: 'Rocky Mountain National Park - Bear Lake',
          description: 'Breathtaking alpine lake surrounded by snow-capped peaks. Ideal for landscape and nature photography.',
          address: 'Bear Lake Rd, Estes Park, CO 80517',
          city: 'Estes Park',
          state: 'CO',
          country: 'USA',
          latitude: 40.3131,
          longitude: -105.6448,
          type: 'OUTDOOR',
          vibe: 'NATURE',
          hourlyRate: 0,
          amenities: ['Hiking Trails', 'Parking', 'Restrooms', 'Picnic Areas'],
          rules: ['Park entrance fee required', 'Stay on designated trails', 'Wildlife viewing from distance'],
          images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
          ],
          ownerId: users[2].id,
          isActive: true,
        },
      }),
    ]);

    // Create equipment listings
    const equipment = await Promise.all([
      prisma.equipmentListing.create({
        data: {
          title: 'Canon EOS R5 Camera Body',
          description: 'Professional full-frame mirrorless camera with 45MP sensor and 8K video recording.',
          category: 'CAMERA',
          brand: 'Canon',
          model: 'EOS R5',
          condition: 'EXCELLENT',
          dailyRate: 75,
          weeklyRate: 450,
          monthlyRate: 1500,
          deposit: 500,
          images: [
            'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
          ],
          specifications: {
            sensor: '45MP Full Frame',
            video: '8K RAW, 4K 120p',
            iso: '100-51200',
            autofocus: 'Dual Pixel CMOS AF II',
          },
          ownerId: users[0].id,
          isAvailable: true,
        },
      }),
      prisma.equipmentListing.create({
        data: {
          title: 'Sony FX3 Cinema Camera',
          description: 'Compact full-frame cinema camera designed for content creators and filmmakers.',
          category: 'CAMERA',
          brand: 'Sony',
          model: 'FX3',
          condition: 'GOOD',
          dailyRate: 85,
          weeklyRate: 510,
          monthlyRate: 1700,
          deposit: 600,
          images: [
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
          ],
          specifications: {
            sensor: '12.1MP Full Frame',
            video: '4K 120p, S-Log3',
            iso: '80-102400',
            stabilization: 'Active SteadyShot',
          },
          ownerId: users[1].id,
          isAvailable: true,
        },
      }),
      prisma.equipmentListing.create({
        data: {
          title: 'Profoto B1X 500 Flash Kit',
          description: 'Professional off-camera flash kit with wireless TTL and HSS capabilities.',
          category: 'LIGHTING',
          brand: 'Profoto',
          model: 'B1X 500',
          condition: 'EXCELLENT',
          dailyRate: 45,
          weeklyRate: 270,
          monthlyRate: 900,
          deposit: 300,
          images: [
            'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
          ],
          specifications: {
            power: '500Ws',
            recycling: '0.05-1.9s',
            flashes: '325 at full power',
            wireless: 'AirTTL',
          },
          ownerId: users[3].id,
          isAvailable: true,
        },
      }),
    ]);

    // Create community challenges
    const challenges = await Promise.all([
      prisma.communityChallenge.create({
        data: {
          title: 'Urban Street Photography Challenge',
          description: 'Capture the essence of city life through candid street photography. Show us the stories that unfold on busy streets.',
          category: 'STREET',
          difficulty: 'INTERMEDIATE',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-02-29'),
          prizePool: 1000,
          rules: [
            'Photos must be taken in urban environments',
            'Candid shots preferred over posed portraits',
            'Black and white or color accepted',
            'Maximum 3 submissions per participant',
          ],
          judgesCriteria: ['Composition', 'Storytelling', 'Technical Quality', 'Originality'],
          creatorId: users[0].id,
          isActive: true,
        },
      }),
      prisma.communityChallenge.create({
        data: {
          title: 'Golden Hour Landscapes',
          description: 'Showcase the magic of golden hour lighting in landscape photography. Capture those warm, dreamy moments.',
          category: 'LANDSCAPE',
          difficulty: 'BEGINNER',
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-03-31'),
          prizePool: 750,
          rules: [
            'Photos must be taken during golden hour',
            'Natural landscapes only',
            'Minimal post-processing preferred',
            'Include EXIF data',
          ],
          judgesCriteria: ['Use of Light', 'Composition', 'Color Harmony', 'Impact'],
          creatorId: users[2].id,
          isActive: true,
        },
      }),
    ]);

    // Create articles
    const articles = await Promise.all([
      prisma.article.create({
        data: {
          title: 'Mastering Golden Hour Photography: Tips and Techniques',
          slug: 'mastering-golden-hour-photography',
          excerpt: 'Learn how to capture stunning photos during the magical golden hour with these professional tips and techniques.',
          content: 'Golden hour photography is one of the most rewarding aspects of photography...',
          category: 'TUTORIAL',
          featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          authorId: users[0].id,
          isPublished: true,
          publishedAt: new Date(),
        },
      }),
      prisma.article.create({
        data: {
          title: 'Street Photography Ethics: Capturing Life Respectfully',
          slug: 'street-photography-ethics',
          excerpt: 'A comprehensive guide to ethical street photography practices and how to capture authentic moments while respecting your subjects.',
          content: 'Street photography is an art form that documents life as it happens...',
          category: 'GUIDE',
          featuredImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
          authorId: users[1].id,
          isPublished: true,
          publishedAt: new Date(),
        },
      }),
      prisma.article.create({
        data: {
          title: 'Building Your Photography Portfolio: A Complete Guide',
          slug: 'building-photography-portfolio',
          excerpt: 'Everything you need to know about creating a compelling photography portfolio that showcases your best work and attracts clients.',
          content: 'Your photography portfolio is your visual resume...',
          category: 'BUSINESS',
          featuredImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
          authorId: users[3].id,
          isPublished: true,
          publishedAt: new Date(),
        },
      }),
    ]);

    // Create some reviews
    await Promise.all([
      prisma.review.create({
        data: {
          rating: 5,
          comment: 'Amazing location with breathtaking views! Perfect for sunrise shots.',
          reviewerId: users[1].id,
          locationId: locations[0].id,
        },
      }),
      prisma.review.create({
        data: {
          rating: 4,
          comment: 'Great studio space with professional equipment. Highly recommended!',
          reviewerId: users[2].id,
          locationId: locations[1].id,
        },
      }),
      prisma.review.create({
        data: {
          rating: 5,
          comment: 'Excellent camera in perfect condition. Owner was very helpful!',
          reviewerId: users[3].id,
          equipmentListingId: equipment[0].id,
        },
      }),
    ]);

    return {
      users: users.length,
      locations: locations.length,
      equipment: equipment.length,
      challenges: challenges.length,
      articles: articles.length,
    };
  } catch (error) {
    console.error('Seeding error:', error);
    throw error;
  }
}

