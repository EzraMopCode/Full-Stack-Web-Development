import { notFound } from 'next/navigation';
import { getOrderById } from '@/data/orderStore';
import OrderStatusTracker from '@/components/OrderStatusTracker';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) return { title: 'Order Not Found | Addis Eats' };
  return {
    title: `Order #${order.id} Status | Addis Eats`,
    description: `Real-time tracking for order #${order.id}.`
  };
}

/**
 * Exercise 4 & Mini-Project Requirement:
 * Render the order in a Server Component and pass it into the client tracker as fallbackData.
 * Ensures initial paint has complete order data with ZERO loading spinner.
 */
export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 font-sans transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <OrderStatusTracker initialOrder={order} orderId={id} />
      </div>
    </div>
  );
}
