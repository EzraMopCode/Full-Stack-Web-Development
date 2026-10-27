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

  revalidatePath('/orders');
  revalidatePath('/checkout');

  return {
    success: true,
    orderId: newOrder.id,
    order: newOrder,
    fieldErrors: {}
  };
}

export async function cancelOrder(orderId) {
  const session = CURRENT_USER_SESSION;
  if (!session || !session.id) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'You must be logged in to cancel an order.'
    };
  }

  const order = getOrderById(orderId);
  if (!order) {
    return {
      success: false,
      error: 'Not Found',
      message: `Order #${orderId} was not found.`
    };
  }

  if (order.userId !== session.id) {
    return {
      success: false,
      error: 'Forbidden',
      message: `Access Denied: You cannot cancel order #${orderId} because it belongs to another customer.`
    };
  }

  if (order.status === 'cancelled') {
    return {
      success: false,
      error: 'Conflict',
      message: `Order #${orderId} is already cancelled.`
    };
  }

  const updatedOrder = updateOrderStatus(orderId, 'cancelled');
  revalidatePath('/orders');

  return {
    success: true,
    message: `Order #${orderId} has been successfully cancelled.`,
    order: updatedOrder
  };
}
