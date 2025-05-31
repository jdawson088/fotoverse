

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';

async function getPrisma() {
  const { prisma } = await import('@/lib/db');
  return prisma;
}

export async function GET(request: NextRequest) {
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ locations: [], pagination: { page: 1, limit: 12, total: 0, pages: 0 } });
    }

    const prisma = await getPrisma();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const vibe = searchParams.get('vibe');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (vibe) {
      where.vibe = vibe;
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.hourlyRate = {};
      if (minPrice) where.hourlyRate.gte = parseFloat(minPrice);
      if (maxPrice) where.hourlyRate.lte = parseFloat(maxPrice);
    }

    const [locations, total] = await Promise.all([
      prisma.location.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.location.count({ where }),
    ]);

    return NextResponse.json({
      locations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Locations fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ error: 'Not available during build' }, { status: 503 });
    }

    const prisma = await getPrisma();
    
    const body = await request.json();
    
    // Get current user (you'd implement this based on your auth)
    // For now, we'll use a placeholder
    const ownerId = 'placeholder-user-id';

    const location = await prisma.location.create({
      data: {
        ...body,
        ownerId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    console.error('Location creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    );
  }
}

