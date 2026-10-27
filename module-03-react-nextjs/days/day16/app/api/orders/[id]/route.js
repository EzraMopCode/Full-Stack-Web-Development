import { NextResponse } from 'next/server';
import { getOrderById } from '@/data/orderStore';

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const order = getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Not Found', message: `Order #${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to fetch order status' },
      { status: 500 }
    );
  }
}
