export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  featured: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: number;
  customer: OrderCustomer;
  items: CartItem[];
  total: number;
  createdAt: string;
}
