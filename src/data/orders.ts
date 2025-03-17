
export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

// For demo purposes
export const generateMockOrders = (userId: string): Order[] => {
  return [
    {
      id: 'ord_' + Math.random().toString(36).substring(2, 10),
      userId,
      items: [
        {
          id: 'item_1',
          productId: 'p1',
          name: 'Classic Cotton T-Shirt',
          price: 35.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          size: 'M',
          color: 'White',
          quantity: 2
        },
        {
          id: 'item_2',
          productId: 'p5',
          name: 'Leather Sneakers',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          size: '9',
          color: 'White',
          quantity: 1
        }
      ],
      totalAmount: 221.97,
      status: 'delivered',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA'
      }
    },
    {
      id: 'ord_' + Math.random().toString(36).substring(2, 10),
      userId,
      items: [
        {
          id: 'item_3',
          productId: 'p3',
          name: 'Cashmere Sweater',
          price: 159.99,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          size: 'M',
          color: 'Cream',
          quantity: 1
        }
      ],
      totalAmount: 159.99,
      status: 'shipped',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA'
      }
    },
    {
      id: 'ord_' + Math.random().toString(36).substring(2, 10),
      userId,
      items: [
        {
          id: 'item_4',
          productId: 'p7',
          name: 'Wool Coat',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1548624313-0396c75d8772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          size: 'S',
          color: 'Black',
          quantity: 1
        },
        {
          id: 'item_5',
          productId: 'p6',
          name: 'Leather Belt',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1624623278313-a930126a11c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
          size: 'M',
          color: 'Brown',
          quantity: 1
        }
      ],
      totalAmount: 379.98,
      status: 'processing',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA'
      }
    }
  ];
};

// Get orders for a specific user
export const getUserOrders = (userId: string): Order[] => {
  // In a real app, this would fetch from an API
  return generateMockOrders(userId);
};
