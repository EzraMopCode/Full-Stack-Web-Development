import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getOrderById } from '@/data/orderStore';
import { getSession } from '@/lib/session';
import LiveOrderTracker from '@/components/tracking/LiveOrderTracker';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Live Tracking Order #${id} | Addis Eats`,
    description: `Real-time delivery courier map and live status updates for order #${id}.`
  };
}

/**
 * Exercise 1, 2, 4 & 5:
 * Live Delivery Tracking Page for Addis Eats:
 * - Server Component verifies session and fetches initial order record
 * - Seeds the Client Tracker with server-rendered data (zero layout jump)
 * - Consumes Server-Sent Events via EventSource
 */
export default async function OrderTrackingPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=/orders/${id}/tracking`);
  }

  const order = getOrderById(id);
  if (!order) {
    notFound();
  }

  // Authorisation layer: Customer can only track own order (staff can track all)
  if (order.userId !== session.userId && session.role !== 'staff') {
    redirect('/orders');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <LiveOrderTracker initialOrder={order} />
    </div>
  );
}
