import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ergonomic Developer Chair',
    price: 349.99,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600',
    description: 'High-performance chair for long coding sessions.',
    stock: 50,
  },
  {
    id: 'p2',
    name: 'Mechanical Keyboard 60%',
    price: 129.50,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600',
    description: 'Clicky blue switches with RGB backlighting.',
    stock: 120,
  },
  {
    id: 'p3',
    name: '4K Ultra Monitor',
    price: 499.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600',
    description: 'Crystal clear display for pixel-perfect design.',
    stock: 30,
  },
  {
    id: 'p4',
    name: 'Wireless Noise Cancelling Headphones',
    price: 299.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    description: 'Focus on your work with industry-leading noise cancellation.',
    stock: 85,
  },
  {
    id: 'p5',
    name: 'Smart Connectivity Hub',
    price: 89.99,
    category: 'Smart Home',
    // Using photo-1558089748-129605532158 which corresponds to ID JxgSbyAqUlk
    image: 'https://images.unsplash.com/photo-1558089748-129605532158?auto=format&fit=crop&q=80&w=600',
    description: 'Control all your devices from one central unit. Features DDR4 memory and RV1109 chip.',
    stock: 200,
  },
  {
    id: 'p6',
    name: 'Holographic Anime Battle Lamp',
    price: 45.00,
    category: 'Decor',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600',
    description: 'A stunning visual holographic lamp for your battle station.',
    stock: 75,
  },
];