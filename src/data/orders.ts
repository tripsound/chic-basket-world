
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

// Mock orders data
export const orders: Order[] = [
  {
    id: 'ord_123456',
    userId: 'usr_123456',
    date: '2023-10-15',
    status: 'delivered',
    total: 129.97,
    items: [
      { id: 'item_1', name: 'Classic White T-Shirt', price: 29.99, quantity: 2 },
      { id: 'item_2', name: 'Slim Fit Jeans', price: 69.99, quantity: 1 }
    ]
  },
  {
    id: 'ord_234567',
    userId: 'usr_123456',
    date: '2023-11-20',
    status: 'shipped',
    total: 159.98,
    items: [
      { id: 'item_3', name: 'Wool Sweater', price: 79.99, quantity: 2 }
    ]
  }
];
