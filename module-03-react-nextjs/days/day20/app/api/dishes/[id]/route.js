import { NextResponse } from 'next/server';
import { getDishById } from '@/data/menuData';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const dish = await getDishById(id);

    if (!dish) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: `Dish with ID ${id} not found`
        },
        { status: 404 }
      );
    }

    return NextResponse.json(dish, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to fetch dish' },
      { status: 500 }
    );
  }
}
