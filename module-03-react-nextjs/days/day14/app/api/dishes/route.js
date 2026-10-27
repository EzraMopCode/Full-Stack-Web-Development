import { NextResponse } from 'next/server';
import { getDishes } from '@/data/menuData';

export async function GET() {
  try {
    const dishes = await getDishes();
    return NextResponse.json(dishes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to fetch dishes' },
      { status: 500 }
    );
  }
}
