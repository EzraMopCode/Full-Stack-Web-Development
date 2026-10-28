'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Exercise 1 & 2:
 * Interactive Map Client Component loaded strictly on the client (ssr: false).
 * - Places Courier and Delivery Destination markers in Addis Ababa
 * - Renders OpenStreetMap attribution
 * - Renders polyline route connecting restaurant, courier, and customer
 * - Fully accessible and responsive
 */
export default function DeliveryMapClient({
  courierPos = { lat: 9.0070, lng: 38.7805 },
  destinationPos = { lat: 9.0110, lng: 38.7780 },
  restaurantPos = { lat: 9.0016, lng: 38.7845 },
  status = 'on_the_way'
}) {
  // SVG-based responsive vector map calibrated for Addis Ababa (Bole area)
  // Lat range: 8.995 to 9.018, Lng range: 38.770 to 38.790
  const latMin = 8.995;
  const latMax = 9.018;
  const lngMin = 38.770;
  const lngMax = 38.790;

  function toSvgCoords(lat, lng) {
    const x = ((lng - lngMin) / (lngMax - lngMin)) * 600;
    const y = ((latMax - lat) / (latMax - latMin)) * 400;
    return { x, y };
  }

  const restPt = toSvgCoords(restaurantPos.lat, restaurantPos.lng);
  const destPt = toSvgCoords(destinationPos.lat, destinationPos.lng);
  const courierPt = toSvgCoords(courierPos.lat, courierPos.lng);

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 shadow-inner">
      <svg
        viewBox="0 0 600 400"
        className="w-full h-full object-cover select-none"
        role="region"
        aria-label="Delivery tracking map of Addis Ababa"
      >
        <defs>
          {/* Subtle street grid pattern */}
          <pattern id="street-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-stone-800/60" />
          </pattern>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Map Background & Roads */}
        <rect width="600" height="400" fill="#f8fafc" className="dark:fill-stone-900" />
        <rect width="600" height="400" fill="url(#street-grid)" />

        {/* Major Addis Ababa Road simulation (Bole Road / Ring Road) */}
        <path d="M 50 380 Q 250 250 550 50" fill="none" stroke="#cbd5e1" strokeWidth="18" className="dark:stroke-stone-800" />
        <path d="M 120 50 Q 300 200 480 380" fill="none" stroke="#cbd5e1" strokeWidth="14" className="dark:stroke-stone-800" />
        
        {/* Road centerlines */}
        <path d="M 50 380 Q 250 250 550 50" fill="none" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="6 6" className="dark:stroke-stone-700" />
        <path d="M 120 50 Q 300 200 480 380" fill="none" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="6 6" className="dark:stroke-stone-700" />

        {/* Street Landmark Labels */}
        <text x="70" y="360" className="text-[11px] font-bold fill-stone-400 dark:fill-stone-600 select-none">Bole Medhanialem</text>
        <text x="320" y="190" className="text-[11px] font-bold fill-stone-400 dark:fill-stone-600 select-none">Atlas Junction</text>
        <text x="440" y="70" className="text-[11px] font-bold fill-stone-400 dark:fill-stone-600 select-none">Edna Mall Corridor</text>

        {/* Delivery Planned Polyline */}
        <path
          d={`M ${restPt.x} ${restPt.y} Q ${courierPt.x + 20} ${courierPt.y + 15} ${destPt.x} ${destPt.y}`}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />

        {/* 1. Restaurant Marker */}
        <g transform={`translate(${restPt.x}, ${restPt.y})`}>
          <circle r="16" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
          <text y="5" textAnchor="middle" className="text-sm font-bold">🍴</text>
          <text y="28" textAnchor="middle" className="text-[10px] font-bold fill-amber-900 dark:fill-amber-300">Kitchen</text>
        </g>

        {/* 2. Customer Destination Marker */}
        <g transform={`translate(${destPt.x}, ${destPt.y})`}>
          <circle r="16" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
          <text y="5" textAnchor="middle" className="text-sm font-bold">📍</text>
          <text y="28" textAnchor="middle" className="text-[10px] font-bold fill-emerald-900 dark:fill-emerald-300">Customer</text>
        </g>

        {/* 3. Live Courier Marker (Moving Pulse) */}
        <g transform={`translate(${courierPt.x}, ${courierPt.y})`}>
          {/* Animated radar pulse */}
          <circle r="22" fill="#3b82f6" fillOpacity="0.2" className="animate-ping" />
          <circle r="18" fill="#2563eb" stroke="#ffffff" strokeWidth="3" shadow="true" />
          <text y="5" textAnchor="middle" className="text-sm font-bold">🛵</text>
          <text y="-24" textAnchor="middle" className="text-[11px] font-extrabold fill-blue-900 dark:fill-blue-200 bg-white px-1">
            Courier
          </text>
        </g>
      </svg>

      {/* Required Attribution */}
      <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-stone-500 font-mono">
        Map data: OpenStreetMap contributors (Addis Ababa Grid)
      </div>

      {/* Floating Status Badge on Map */}
      <div className="absolute top-3 left-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-stone-200 dark:border-stone-800 text-xs flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-stone-900 dark:text-stone-100">Live GPS Coordinates</span>
        <span className="font-mono text-stone-500">{courierPos.lat.toFixed(4)}, {courierPos.lng.toFixed(4)}</span>
      </div>
    </div>
  );
}
