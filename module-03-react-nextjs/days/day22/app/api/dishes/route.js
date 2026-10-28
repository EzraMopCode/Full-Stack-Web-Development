import { NextResponse } from 'next/server';
import { getDishes } from '@/data/menuData';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'All';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    let dishes = await getDishes();

    // Filter by category
    if (category && category !== 'All') {
      dishes = dishes.filter((d) => d.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by search query (debounced term)
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      dishes = dishes.filter((d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }

    const total = dishes.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedDishes = dishes.slice(startIndex, startIndex + limit);

    return NextResponse.json(
      {
        dishes: paginatedDishes,
        total,
        page,
        totalPages,
        limit
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to fetch dishes' },
      { status: 500 }
    );
  }
}
