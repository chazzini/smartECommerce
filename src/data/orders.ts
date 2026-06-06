export const orders: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-987654321",
    orderDate: "2026-05-30",
    orderItems: "3 Items (Shoes, T-Shirt, Socks)",
    orderTotal: "$145.00",
    trackOrder: () => {},
  },
  {
    id: 2,
    orderNumber: "ORD-123456789",
    orderDate: "2026-05-28",
    orderItems: "1 Item (Mechanical Keyboard)",
    orderTotal: "$89.99",
    trackOrder: () => {},
  },
  {
    id: 3,
    orderNumber: "ORD-543216789",
    orderDate: "2026-05-15",
    orderItems: "2 Items (Coffee Beans, Mug)",
    orderTotal: "$34.50",
    trackOrder: () => {},
  },
  {
    id: 4,
    orderNumber: "ORD-888877776",
    orderDate: "2026-04-20",
    orderItems: "1 Item (Noise Cancelling Headphones)",
    orderTotal: "$299.99",
    trackOrder: () => {},
  },
  {
    id: 5,
    orderNumber: "ORD-111222333",
    orderDate: "2026-03-05",
    orderItems: "5 Items (Notebook, Pens, Desk Organizer, Lamp, Cable Ties)",
    orderTotal: "$112.40",
    trackOrder: () => {},
  },
];

export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  orderItems: string;
  orderTotal: string;
  trackOrder: () => void;
}

