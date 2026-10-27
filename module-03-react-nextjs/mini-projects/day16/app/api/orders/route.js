import { NextResponse } from 'next/server';
import { addOrder, getOrders } from '@/data/orderStore';
import { validate } from '@/utils/Validate';

export async function GET() {
  const orders = getOrders();
  return NextResponse.json(orders, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const fieldErrors = validate(body);

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: 'Unprocessable Entity',
          message: 'Validation failed',
          fieldErrors
        },
        { status: 422 }
      );
    }

    const newOrder = addOrder({
      userId: body.userId || 'user_abebe_123',
      name: body.name.trim(),
      phone: body.phone.trim(),
      area: body.area.trim(),
      address: body.address.trim(),
      notes: body.notes ? body.notes.trim() : '',
      paymentMethod: body.paymentMethod || 'telebirr',
      items: body.items || [],
      total: body.total || 0
    });

    return NextResponse.json(
      {
        message: 'Order created successfully',
        order: newOrder
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request', message: 'Invalid request body or JSON syntax error' },
      { status: 400 }
    );
  }
}
