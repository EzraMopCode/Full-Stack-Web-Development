// In-memory store representing persistent database orders for Addis Eats

let orders = [
  {
    id: '100001',
    userId: 'user_abebe_123',
    name: 'Abebe Kebede',
    phone: '0911234567',
    area: 'Bole',
    address: 'Next to Edna Mall, House No. 123',
    notes: 'Call when near the gate',
    paymentMethod: 'telebirr',
    items: [
      { id: 1, name: 'Doro Wat', price: 240, quantity: 2 },
      { id: 2, name: 'Tibs', price: 220, quantity: 1 }
    ],
    total: 750,
    status: 'delivered',
    createdAt: '2026-10-22T10:15:00.000Z'
  },
  {
    id: '100002',
    userId: 'user_marta_456',
    name: 'Marta Bekele',
    phone: '0922334455',
    area: 'Piassa',
    address: 'Near Churchill Road, Apt 4B',
    notes: 'Ring doorbell twice',
    paymentMethod: 'cbe',
    items: [
      { id: 3, name: 'Tegabino Shiro', price: 150, quantity: 2 }
    ],
    total: 350,
    status: 'delivered',
    createdAt: '2026-10-23T11:30:00.000Z'
  },
  {
    id: '100003',
    userId: 'user_dawit_789',
    name: 'Dawit Yohannes',
    phone: '0933445566',
    area: 'Kazanchis',
    address: 'Behind UNECA, Bloom Tower',
    notes: 'Leave at front desk',
    paymentMethod: 'telebirr',
    items: [
      { id: 4, name: 'Kitfo Special', price: 320, quantity: 2 },
      { id: 6, name: 'Juice Spris', price: 80, quantity: 2 }
    ],
    total: 800,
    status: 'delivered',
    createdAt: '2026-10-24T12:45:00.000Z'
  },
  {
    id: '100004',
    userId: 'user_helen_101',
    name: 'Helen Tadesse',
    phone: '0944556677',
    area: 'Bole',
    address: 'Atlas Hotel area, Villa 12',
    notes: 'Gate code 4091',
    paymentMethod: 'cbe',
    items: [
      { id: 2, name: 'Tibs', price: 220, quantity: 3 }
    ],
    total: 710,
    status: 'delivered',
    createdAt: '2026-10-25T13:20:00.000Z'
  },
  {
    id: '100005',
    userId: 'user_samuel_202',
    name: 'Samuel Alemu',
    phone: '0955667788',
    area: 'Sarbet',
    address: 'Around Old Airport, Compound 7',
    notes: 'Guard will collect',
    paymentMethod: 'cash',
    items: [
      { id: 5, name: 'Derek Tibs', price: 280, quantity: 2 },
      { id: 7, name: 'Ethiopian Traditional Coffee', price: 60, quantity: 4 }
    ],
    total: 850,
    status: 'delivered',
    createdAt: '2026-10-25T14:10:00.000Z'
  },
  {
    id: '100006',
    userId: 'user_selam_303',
    name: 'Selamawit Haile',
    phone: '0966778899',
    area: 'CMC',
    address: 'Michael roundabout, Block 14',
    notes: 'Elevator is working',
    paymentMethod: 'telebirr',
    items: [
      { id: 8, name: 'Special Beyaynetu Combo', price: 350, quantity: 2 }
    ],
    total: 750,
    status: 'preparing',
    createdAt: '2026-10-26T09:15:00.000Z'
  },
  {
    id: '100007',
    userId: 'user_yonas_404',
    name: 'Yonas Tesfaye',
    phone: '0977889900',
    area: 'Mexico',
    address: 'Near Kera, Bunna Board building',
    notes: 'Call on arrival',
    paymentMethod: 'cbe',
    items: [
      { id: 1, name: 'Doro Wat', price: 240, quantity: 1 },
      { id: 3, name: 'Tegabino Shiro', price: 150, quantity: 1 }
    ],
    total: 440,
    status: 'confirmed',
    createdAt: '2026-10-26T10:00:00.000Z'
  },
  {
    id: '100008',
    userId: 'user_tigist_505',
    name: 'Tigist Girma',
    phone: '0988990011',
    area: 'Megenagna',
    address: 'Zefmesh Grand Mall 3rd floor',
    notes: 'Delivery to shop #304',
    paymentMethod: 'telebirr',
    items: [
      { id: 2, name: 'Tibs', price: 220, quantity: 2 },
      { id: 6, name: 'Juice Spris', price: 80, quantity: 2 }
    ],
    total: 650,
    status: 'delivered',
    createdAt: '2026-10-26T15:30:00.000Z'
  },
  {
    id: '100009',
    userId: 'user_bereket_606',
    name: 'Bereket Assefa',
    phone: '0999001122',
    area: 'Bole',
    address: 'Medhanialem Mall area',
    notes: 'Leave with receptionist',
    paymentMethod: 'telebirr',
    items: [
      { id: 4, name: 'Kitfo Special', price: 320, quantity: 3 }
    ],
    total: 1010,
    status: 'confirmed',
    createdAt: '2026-10-27T12:00:00.000Z'
  },
  {
    id: '100010',
    userId: 'user_rahel_707',
    name: 'Rahel Kassaye',
    phone: '0912345678',
    area: 'Sarbet',
    address: 'Vatican Embassy road',
    notes: 'White gate',
    paymentMethod: 'cash',
    items: [
      { id: 8, name: 'Special Beyaynetu Combo', price: 350, quantity: 1 },
      { id: 1, name: 'Doro Wat', price: 240, quantity: 1 }
    ],
    total: 640,
    status: 'preparing',
    createdAt: '2026-10-27T14:40:00.000Z'
  },
  {
    id: '100011',
    userId: 'user_tariku_808',
    name: 'Tariku Worku',
    phone: '0923456789',
    area: 'Piassa',
    address: 'De Gaulle Square',
    notes: 'Yellow building',
    paymentMethod: 'cbe',
    items: [
      { id: 5, name: 'Derek Tibs', price: 280, quantity: 1 }
    ],
    total: 330,
    status: 'delivered',
    createdAt: '2026-10-27T17:10:00.000Z'
  },
  {
    id: '100012',
    userId: 'user_meron_909',
    name: 'Meron Desta',
    phone: '0934567890',
    area: 'Kazanchis',
    address: 'Interluxury Hotel street',
    notes: 'Apartment 2A',
    paymentMethod: 'telebirr',
    items: [
      { id: 1, name: 'Doro Wat', price: 240, quantity: 2 },
      { id: 7, name: 'Ethiopian Traditional Coffee', price: 60, quantity: 2 }
    ],
    total: 650,
    status: 'confirmed',
    createdAt: '2026-10-28T07:20:00.000Z'
  }
];

export function getOrders() {
  return [...orders];
}

export function getOrdersByUserId(userId, role = 'customer') {
  if (role === 'staff') {
    return [...orders];
  }
  return orders.filter((o) => o.userId === userId);
}

export function getOrderById(id) {
  return orders.find(o => o.id === String(id)) || null;
}

export function addOrder(orderData) {
  const newOrder = {
    id: String(Math.floor(100000 + Math.random() * 900000)),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    ...orderData
  };
  orders.unshift(newOrder);
  return newOrder;
}

export function updateOrderStatus(id, status) {
  const order = orders.find(o => o.id === String(id));
  if (order) {
    order.status = status;
    return order;
  }
  return null;
}

/**
 * Exercise 1: Server-Side Aggregation
 * Aggregates revenue and order counts grouped by neighbourhood.
 * Only the summary records cross the wire to client components.
 */
export function aggregateRevenueByNeighbourhood(sourceOrders = orders) {
  const map = {};
  for (const order of sourceOrders) {
    const area = order.area || 'Other';
    if (!map[area]) {
      map[area] = { area, revenue: 0, ordersCount: 0 };
    }
    map[area].revenue += Number(order.total) || 0;
    map[area].ordersCount += 1;
  }
  return Object.values(map).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Exercise 1 & 3: Server-Side Daily Aggregation
 * Groups orders and total revenue per calendar day.
 */
export function aggregateOrdersByDay(sourceOrders = orders) {
  const map = {};
  for (const order of sourceOrders) {
    const day = order.createdAt ? order.createdAt.split('T')[0] : 'Unknown';
    if (!map[day]) {
      map[day] = { date: day, count: 0, revenue: 0 };
    }
    map[day].count += 1;
    map[day].revenue += Number(order.total) || 0;
  }
  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Exercise 6 & 7: Paged and Sorted Orders
 * Handles server-side sorting and pagination based on query params.
 */
export function getPagedAndSortedOrders({
  page = 1,
  limit = 5,
  sort = 'createdAt',
  order = 'desc',
  forceEmpty = false
} = {}) {
  if (forceEmpty) {
    return {
      orders: [],
      totalOrders: 0,
      totalPages: 0,
      currentPage: 1
    };
  }

  const all = [...orders];

  all.sort((a, b) => {
    let valA = a[sort];
    let valB = b[sort];

    if (sort === 'total') {
      valA = Number(valA);
      valB = Number(valB);
    } else if (sort === 'createdAt') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    } else {
      valA = String(valA || '').toLowerCase();
      valB = String(valB || '').toLowerCase();
    }

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit, 10) || 5);
  const totalOrders = all.length;
  const totalPages = Math.ceil(totalOrders / pageSize) || 1;
  const start = (pageNum - 1) * pageSize;
  const paginated = all.slice(start, start + pageSize);

  return {
    orders: paginated,
    totalOrders,
    totalPages,
    currentPage: pageNum
  };
}
