import { NextResponse } from 'next/server';
import { getOrderById } from '@/data/orderStore';
import { getSession } from '@/lib/session';

export async function GET(request, { params }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be signed in to view this order.' },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;
    const order = getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Not Found', message: `Order #${id} not found` },
        { status: 404 }
      );
    }

    // Refuse access to someone else's order
    if (order.userId !== session.userId && session.role !== 'staff') {
      return NextResponse.json(
        { error: 'Forbidden', message: `Access denied to Order #${id}` },
        { status: 403 }
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
