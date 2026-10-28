import { getOrderById } from '@/data/orderStore';
import { getSession } from '@/lib/session';

/**
 * Exercise 3 & Requirement:
 * Stream route handler providing live order status over Server-Sent Events (SSE).
 * - Correct framing: "data: <json>\n\n"
 * - Sends progressive delivery steps with live courier coordinates in Addis Ababa
 * - Deliberately closes the stream controller upon reaching "delivered" status
 * - Session and ownership verification protects against unauthorized telemetry snooping
 */
export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized', message: 'Authentication required to stream tracking data.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return new Response(JSON.stringify({ error: 'Order not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (order.userId !== session.userId && session.role !== 'staff') {
    return new Response(JSON.stringify({ error: 'Forbidden', message: 'Access denied: You do not own this order.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Predefined Addis Ababa route waypoints (from restaurant at Bole to customer)
  const waypoints = [
    {
      status: 'confirmed',
      stepText: 'Kitchen confirmed ticket — preparing authentic dishes',
      etaMinutes: 28,
      courier: { lat: 9.0016, lng: 38.7845, name: 'Tewodros Kassahun', phone: '0911002233' }
    },
    {
      status: 'preparing',
      stepText: 'Chef slow-cooking stew & packaging injera in thermal warmers',
      etaMinutes: 20,
      courier: { lat: 9.0035, lng: 38.7830, name: 'Tewodros Kassahun', phone: '0911002233' }
    },
    {
      status: 'on_the_way',
      stepText: 'Courier picked up order and is navigating past Edna Mall',
      etaMinutes: 12,
      courier: { lat: 9.0070, lng: 38.7805, name: 'Tewodros Kassahun', phone: '0911002233' }
    },
    {
      status: 'approaching',
      stepText: 'Courier approaching delivery street — ring call incoming',
      etaMinutes: 3,
      courier: { lat: 9.0102, lng: 38.7788, name: 'Tewodros Kassahun', phone: '0911002233' }
    },
    {
      status: 'delivered',
      stepText: 'Order delivered safely to customer. Enat balegna!',
      etaMinutes: 0,
      courier: { lat: 9.0110, lng: 38.7780, name: 'Tewodros Kassahun', phone: '0911002233' }
    }
  ];

  let currentStep = 0;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial state immediately
      const initialPayload = {
        orderId: order.id,
        orderName: order.name,
        area: order.area,
        address: order.address,
        total: order.total,
        ...waypoints[0],
        timestamp: new Date().toISOString()
      };
      
      // SSE Framing: "data: ...\n\n"
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialPayload)}\n\n`));

      // Interval simulating courier delivery progression
      const intervalId = setInterval(() => {
        currentStep++;

        if (currentStep < waypoints.length) {
          const stepData = {
            orderId: order.id,
            orderName: order.name,
            area: order.area,
            address: order.address,
            total: order.total,
            ...waypoints[currentStep],
            timestamp: new Date().toISOString()
          };

          // Send SSE frame
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(stepData)}\n\n`));

          // Deliberately close on delivery
          if (waypoints[currentStep].status === 'delivered') {
            clearInterval(intervalId);
            controller.close();
          }
        } else {
          clearInterval(intervalId);
          controller.close();
        }
      }, 4000); // Progresses every 4 seconds for lively demonstration

      // Clean up if client disconnects early
      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        try {
          controller.close();
        } catch (e) {
          // Stream already closed
        }
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    }
  });
}
