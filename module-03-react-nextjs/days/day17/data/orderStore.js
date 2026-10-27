let orders = [
  {
    id: '100001',
    userId: 'user_abebe_123',
    name: 'Abebe Kebede',
    phone: '0911234567',
    area: 'bole',
    address: 'Next to Edna Mall, House No. 123',
    notes: 'Call when near the gate',
    paymentMethod: 'telebirr',
    items: [
      { id: 1, name: 'Doro Wat', price: 240, quantity: 2 },
      { id: 2, name: 'Tibs', price: 220, quantity: 1 }
    ],
    total: 750,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: '100002',
    userId: 'user_marta_456',
    name: 'Marta Bekele',
    phone: '0922334455',
    area: 'piassa',
    address: 'Near Churchill Road, Apt 4B',
    notes: 'Ring doorbell twice',
    paymentMethod: 'cbe',
    items: [
      { id: 3, name: 'Tegabino Shiro', price: 150, quantity: 2 }
    ],
    total: 350,
    status: 'confirmed',
    createdAt: new Date().toISOString()
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
