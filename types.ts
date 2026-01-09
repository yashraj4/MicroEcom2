export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export enum ServiceStatus {
  OPERATIONAL = 'OPERATIONAL',
  DEGRADED = 'DEGRADED',
  DOWN = 'DOWN',
}

export interface MicroserviceHealth {
  name: string;
  status: ServiceStatus;
  latency: number;
  uptime: number;
  requestsPerSecond: number;
}
