

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';

async function getPrisma() {
  const { prisma } = await import('@/lib/db');
  return prisma;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ error: 'Not available during build' }, { status: 503 });
    }

    const prisma = await getPrisma();
    
    const location = await prisma.location.findUnique({
      where: {
        id: params.id,
        isActive: true,
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

    if (!location) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error('Location fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ error: 'Not available during build' }, { status: 503 });
    }

    const prisma = await getPrisma();
    
    const body = await request.json();

    const location = await prisma.location.update({
      where: {
        id: params.id,
      },
      data: body,
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

    return NextResponse.json(location);
  } catch (error) {
    console.error('Location update error:', error);
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ error: 'Not available during build' }, { status: 503 });
    }

    const prisma = await getPrisma();
    
    await prisma.location.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Location deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    );
  }
}

