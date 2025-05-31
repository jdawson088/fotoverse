

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
      return NextResponse.json({ challenges: [], pagination: { page: 1, limit: 12, total: 0, pages: 0 } });
    }

    const prisma = await getPrisma();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (category) {
      where.category = category;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (status) {
      where.status = status;
    }

    const [challenges, total] = await Promise.all([
      prisma.challenge.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              submissions: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.challenge.count({ where }),
    ]);

    return NextResponse.json({
      challenges,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Challenges fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenges' },
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
    const creatorId = 'placeholder-user-id';

    const challenge = await prisma.challenge.create({
      data: {
        ...body,
        creatorId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });

    return NextResponse.json(challenge, { status: 201 });
  } catch (error) {
    console.error('Challenge creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create challenge' },
      { status: 500 }
    );
  }
}

