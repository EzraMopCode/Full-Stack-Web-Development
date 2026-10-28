'use server';

import { revalidatePath } from 'next/cache';
import { addOrder, getOrderById, updateOrderStatus } from '@/data/orderStore';
import { validate } from '@/utils/Validate';
import { getSession } from '@/lib/session';

/**
 * Server Action: placeOrder
 * Requirement: Session and ownership verified on every write.
 * Rejects writes if user is not authenticated.
 */
export async function placeOrder(prevState, formData) {
  // 1. Session verification check (Blocks Attack 1)
  const session = await getSession();
  if (!session) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'You must be signed in to place an order.'
    };
  }

  let rawData = {};
  if (formData instanceof FormData) {
    rawData = {
      name: (formData.get('name') || '').toString(),
      phone: (formData.get('phone') || '').toString(),
      area: (formData.get('area') || '').toString(),
      address: (formData.get('address') || '').toString(),
      notes: (formData.get('notes') || '').toString(),
      paymentMethod: (formData.get('paymentMethod') || 'telebirr').toString(),
      items: formData.get('items') ? JSON.parse(formData.get('items').toString()) : [],
      total: formData.get('total') ? Number(formData.get('total')) : 0,
      userId: session.userId
    };
  } else if (typeof formData === 'object' && formData !== null) {
    rawData = {
      ...formData,
      userId: session.userId
    };
  }

  // Validate using shared schema
  const fieldErrors = validate(rawData);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: 'Unprocessable Entity',
      message: 'Validation failed',
      fieldErrors
    };
  }

  const newOrder = addOrder(rawData);
  revalidatePath('/orders');
  revalidatePath('/kitchen');

  return {
    success: true,
    orderId: newOrder.id,
    order: newOrder,
    fieldErrors: {}
  };
}

/**
 * Server Action: cancelOrder
 * Requirement:
 * 1. Checks session existence.
 * 2. Checks order record owner matching session.userId (Blocks Attack 2).
 */
export async function cancelOrder(orderId) {
  // 1. Verify session
  const session = await getSession();
  if (!session || !session.userId) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'Session missing: You must be logged in to perform order cancellations.'
    };
  }

  // 2. Fetch record
  const order = getOrderById(orderId);
  if (!order) {
    return {
      success: false,
      error: 'Not Found',
      message: `Order #${orderId} was not found.`
    };
  }

  // 3. Line that stops Attack 2: Ownership validation
  if (order.userId !== session.userId && session.role !== 'staff') {
    return {
      success: false,
      error: 'Forbidden',
      message: `Access Denied: Order #${orderId} belongs to another account.`
    };
  }

  if (order.status === 'cancelled') {
    return {
      success: false,
      error: 'Conflict',
      message: `Order #${orderId} is already cancelled.`
    };
  }

  const updated = updateOrderStatus(orderId, 'cancelled');
  revalidatePath('/orders');
  revalidatePath('/kitchen');

  return {
    success: true,
    message: `Order #${orderId} has been successfully cancelled.`,
    order: updated
  };
}
