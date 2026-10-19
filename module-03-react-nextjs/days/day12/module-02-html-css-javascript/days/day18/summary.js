// summary.js

import { withVat, format } from "./pricing.js";

const orders = [
  {
    id: 1,
    customer: "Abebe",
    items: [
      { name: "Coffee", price: 150, qty: 2 },
      { name: "Bread", price: 80, qty: 3 },
    ],
  },
  {
    id: 2,
    customer: "Hana",
    items: [
      { name: "Rice", price: 400, qty: 1 },
      { name: "Oil", price: 250, qty: 2 },
    ],
  },
  {
    id: 3,
    customer: "Dawit",
    items: [
      { name: "Milk", price: 100, qty: 2 },
      { name: "Eggs", price: 10, qty: 12 },
    ],
  },
];

// Calculate total for each order
const ordersWithTotals = orders.map((order) => {
  const subtotal = order.items.reduce((total, { price, qty }) => {
    return total + price * qty;
  }, 0);

  const total = withVat(subtotal);

  return {
    ...order,
    total,
  };
});

// Only orders over 500 ETB
const expensiveOrders = ordersWithTotals.filter(
  ({ total }) => total > 500
);

// Grand total
const grandTotal = ordersWithTotals.reduce(
  (total, { total: orderTotal }) => total + orderTotal,
  0
);

// Print summary
console.log("=== Addis Market Order Summary ===");

ordersWithTotals.forEach(({ id, customer, total }) => {
  console.log(
    `Order #${id} - ${customer}: ${format(total)}`
  );
});

console.log("\nOrders over 500 ETB:");

expensiveOrders.forEach(({ id, customer, total }) => {
  console.log(
    `Order #${id} - ${customer}: ${format(total)}`
  );
});

console.log(`\nGrand Total: ${format(grandTotal)}`);
