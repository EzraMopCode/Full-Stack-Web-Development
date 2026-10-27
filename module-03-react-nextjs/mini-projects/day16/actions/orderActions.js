'use server';

import { revalidatePath } from 'next/cache';
import { addOrder, getOrderById, updateOrderStatus, getOrders } from '@/data/orderStore';
import { validate } from '@/utils/Validate';

const CURRENT_USER_SESSION = {
  id: 'user_abebe_123',
  name: 'Abebe Kebede',
  role: 'customer'
};

export async function placeOrder(prevState, formData) {
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
      userId: CURRENT_USER_SESSION.id
    };
  } else if (typeof formData === 'object' && formData !== null) {
    rawData = {
      ...formData,
      userId: CURRENT_USER_SESSION.id
    };
  }

  const fieldErrors = validate(rawData);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: 'Unprocessable Entity',
      message: 'Validation failed',
      fieldErrors
    };
  }

  // Persist order in server store
  const newOrder = addOrder(rawData);

  // Exercise 6 requirement: revalidatePath after successful write
  revalidatePath('/orders');
  revalidatePath('/checkout');

  return {
    success: true,
    orderId: newOrder.id,
    order: newOrder,
    fieldErrors: {}
  };
}

/**
 * Server Action: cancelOrder
 * Exercises 7 / Mini-Project requirement:
 * Verifies both session existence and record ownership before writing.
 * Cannot be bypassed by calling from browser console or manipulating DOM.
 */
export async function cancelOrder(orderId) {
  // 1. Session verification
  const session = CURRENT_USER_SESSION;
  if (!session || !session.id) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'You must be logged in to cancel an order.'
    };
  }

  // 2. Record existence check
  const order = getOrderById(orderId);
  if (!order) {
    return {
      success: false,
      error: 'Not Found',
      message: `Order #${orderId} was not found.`
    };
  }

  // 3. Ownership authorization check
  if (order.userId !== session.id) {
    return {
      success: false,
      error: 'Forbidden',
      message: `Access Denied: You cannot cancel order #${orderId} because it belongs to another customer.`
    };
  }

  // 4. Status check
  if (order.status === 'cancelled') {
    return {
      success: false,
      error: 'Conflict',
      message: `Order #${orderId} is already cancelled.`
    };
  }

  // 5. Update and revalidate cached paths
  const updatedOrder = updateOrderStatus(orderId, 'cancelled');
  revalidatePath('/orders');

  return {
    success: true,
    message: `Order #${orderId} has been successfully cancelled.`,
    order: updatedOrder
  };
}
