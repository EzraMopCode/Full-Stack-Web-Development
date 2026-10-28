'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DeliveryMap from './DeliveryMap';
import { etb, when, relative } from '@/lib/format';

/**
 * Exercise 2, 4 & 5:
 * Live Delivery Tracker consuming Server-Sent Events (SSE) via EventSource:
 * - Seeded from server-rendered initial order data (zero spinner)
 * - Closes connection on unmount (navigation away closes connection)
 * - Closes connection deliberately when status === 'delivered'
 * - Displays visible connection indicator badge (Connecting, Live Stream Connected, Delivered / Closed)
 * - Formats every price, date, and elapsed time using shared lib/format.js
 * - Repeats all map delivery information in accessible text alongside the map
 */
export default function LiveOrderTracker({ initialOrder }) {
  const [orderState, setOrderState] = useState({
    status: initialOrder?.status || 'confirmed',
    stepText: 'Kitchen preparing your authentic Ethiopian dishes',
    etaMinutes: 25,
    courier: {
      lat: 9.0016,
      lng: 38.7845,
      name: 'Tewodros Kassahun',
      phone: '0911002233'
    },
    lastUpdated: initialOrder?.createdAt || new Date().toISOString()
  });

  // Connection State: 'connecting' | 'connected' | 'delivered_closed' | 'error'
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    if (!initialOrder?.id) return;

    let eventSource = null;

    try {
      // Connect to SSE route handler
      eventSource = new EventSource(`/api/orders/${initialOrder.id}/stream`);

      eventSource.onopen = () => {
        setConnectionStatus('connected');
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setOrderState((prev) => ({
            ...prev,
            status: data.status || prev.status,
            stepText: data.stepText || prev.stepText,
            etaMinutes: data.etaMinutes !== undefined ? data.etaMinutes : prev.etaMinutes,
            courier: data.courier || prev.courier,
            lastUpdated: data.timestamp || new Date().toISOString()
          }));

          // Deliberately close on delivery
          if (data.status === 'delivered') {
            setConnectionStatus('delivered_closed');
            eventSource.close();
          }
        } catch (err) {
          console.error('Error parsing SSE event:', err);
        }
      };

      eventSource.onerror = (err) => {
        // If already delivered, closing is expected
        if (orderState.status === 'delivered') {
          setConnectionStatus('delivered_closed');
        } else {
          setConnectionStatus('error');
        }
        eventSource.close();
      };
    } catch (e) {
      setConnectionStatus('error');
    }

    // CRITICAL: Cleanup on component unmount
    // Guarantees that navigating away closes the EventSource connection immediately (0 orphaned connections)
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [initialOrder?.id]);

  const restaurantCoords = { lat: 9.0016, lng: 38.7845 };
  const destinationCoords = { lat: 9.0110, lng: 38.7780 };

  return (
    <div className="space-y-6">
      {/* Header & Connection Indicator Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xs">
        <div>
          <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
            Order Tracking · Ticket #{initialOrder.id}
          </span>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {initialOrder.name}&apos;s Delivery
          </h2>
        </div>

        {/* Visible Connection State Indicator */}
        <div className="flex items-center gap-2">
          {connectionStatus === 'connected' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live SSE Connected
            </span>
          )}
          {connectionStatus === 'connecting' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Connecting Stream...
            </span>
          )}
          {connectionStatus === 'delivered_closed' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
              ✓ Delivery Complete (Stream Closed)
            </span>
          )}
          {connectionStatus === 'error' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              Stream Closed
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Left Map, Right Accessible Delivery Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Dynamic Leaflet Map with sized placeholder (7 Columns) */}
        <div className="lg:col-span-7 space-y-3">
          <DeliveryMap
            courierPos={orderState.courier}
            destinationPos={destinationCoords}
            restaurantPos={restaurantCoords}
            status={orderState.status}
          />
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Fit to view: Restaurant (Bole) ↔ Courier ↔ Delivery Destination. Map updates in real-time.
          </p>
        </div>

        {/* Exercise 2 Requirement: Exact Delivery Information Repeated in Text (5 Columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-6">
          <header className="border-b border-stone-100 dark:border-stone-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Estimated Delivery
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-mono">
                {orderState.etaMinutes > 0 ? `${orderState.etaMinutes} mins` : 'Arrived!'}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                ({orderState.stepText})
              </span>
            </div>
          </header>

          {/* Courier Details Pane */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Courier On Duty
            </h4>
            <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                  🛵
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {orderState.courier.name}
                  </div>
                  <div className="text-xs font-mono text-stone-500">
                    {orderState.courier.phone}
                  </div>
                </div>
              </div>
              <a
                href={`tel:${orderState.courier.phone}`}
                className="px-3 py-1.5 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg text-xs font-bold text-stone-800 dark:text-stone-200 hover:bg-stone-100"
              >
                Call
              </a>
            </div>
          </div>

          {/* Delivery Location & Order Summary (All formatted with lib/format.js) */}
          <dl className="space-y-3 text-xs divide-y divide-stone-100 dark:divide-stone-800">
            <div className="pt-2 flex justify-between">
              <dt className="text-stone-500 font-medium">Delivery Address</dt>
              <dd className="font-semibold text-stone-900 dark:text-stone-100 text-right">
                {initialOrder.address} ({initialOrder.area})
              </dd>
            </div>
            <div className="pt-2 flex justify-between">
              <dt className="text-stone-500 font-medium">Current Status</dt>
              <dd className="font-bold text-amber-700 dark:text-amber-400 capitalize">
                {orderState.status.replace(/_/g, ' ')}
              </dd>
            </div>
            <div className="pt-2 flex justify-between">
              <dt className="text-stone-500 font-medium">Order Total</dt>
              <dd className="font-mono font-bold text-stone-900 dark:text-stone-100">
                {etb(initialOrder.total, true)}
              </dd>
            </div>
            <div className="pt-2 flex justify-between">
              <dt className="text-stone-500 font-medium">Order Placed</dt>
              <dd className="font-mono text-stone-700 dark:text-stone-300">
                {when(initialOrder.createdAt)}
              </dd>
            </div>
            <div className="pt-2 flex justify-between">
              <dt className="text-stone-500 font-medium">Last Live GPS Ping</dt>
              <dd className="font-mono text-stone-500">
                {relative(orderState.lastUpdated)}
              </dd>
            </div>
          </dl>

          <footer className="pt-2">
            <Link
              href="/orders"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold rounded-xl transition-colors"
            >
              ← Back to All Orders
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
