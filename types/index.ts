export type Category =
  | "sneakers"
  | "audio"
  | "watches"
  | "bags"
  | "cameras"
  | "tech";

export interface Product {
  id: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: "New" | "Sale" | "Hot" | "Limited";
  slug: string;
  category: Category;
  description: string;
  tags: string[];
  inStock: boolean;
  stockCount?: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Order {
  id: number;
  user_id: number;
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  shippingCity: string;
  shippingZip: string;
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: string;
  quantity: number;
  unit_price: number; // Historical price stored separately
}

export interface Review {
  id: number;
  product_id: string;
  user_id: number;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
