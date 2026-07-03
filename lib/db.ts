import fs from "fs";
import path from "path";
import {
  Product,
  Category,
  User,
  Order,
  OrderItem,
  Review,
} from "@/types";
import { PRODUCTS, CATEGORY_LABELS } from "@/data/products";

class AsyncLock {
  private promise: Promise<void> = Promise.resolve();

  async acquire(): Promise<() => void> {
    let release: () => void;
    const nextPromise = new Promise<void>((resolve) => {
      release = resolve;
    });
    const currentPromise = this.promise;
    this.promise = nextPromise;
    await currentPromise;
    return release!;
  }
}

const dbLock = new AsyncLock();

const BUNDLE_DB_DIR = path.join(process.cwd(), "data", "db");
const DB_DIR = (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY)
  ? path.join("/tmp", "shopwave_db")
  : BUNDLE_DB_DIR;

const PATH_CATEGORIES = path.join(DB_DIR, "categories.json");
const PATH_PRODUCTS = path.join(DB_DIR, "products.json");
const PATH_USERS = path.join(DB_DIR, "users.json");
const PATH_ORDERS = path.join(DB_DIR, "orders.json");
const PATH_ORDER_ITEMS = path.join(DB_DIR, "order_items.json");
const PATH_REVIEWS = path.join(DB_DIR, "reviews.json");

export function ensureDbInitialized() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const initFile = (filePath: string, fileName: string, seedGenerator: () => unknown) => {
    if (fs.existsSync(filePath)) {
      return;
    }
    const bundlePath = path.join(BUNDLE_DB_DIR, fileName);
    if (fs.existsSync(bundlePath)) {
      try {
        fs.copyFileSync(bundlePath, filePath);
        return;
      } catch (e) {
        console.error("Failed to copy bundled db file:", fileName, e);
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(seedGenerator(), null, 2), "utf-8");
  };

  initFile(PATH_CATEGORIES, "categories.json", () => {
    return Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
      id,
      name: label,
      slug: id,
    }));
  });

  initFile(PATH_PRODUCTS, "products.json", () => {
    return PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      brand: p.brand,
      price: p.price,
      originalPrice: p.originalPrice,
      rating: p.rating,
      reviewCount: p.reviewCount,
      badge: p.badge,
      slug: p.slug,
      category: p.category,
      description: p.description,
      tags: p.tags,
      inStock: p.inStock,
      stockCount: p.stockCount ?? 15,
    }));
  });

  initFile(PATH_USERS, "users.json", () => []);
  initFile(PATH_ORDERS, "orders.json", () => []);
  initFile(PATH_ORDER_ITEMS, "order_items.json", () => []);
  initFile(PATH_REVIEWS, "reviews.json", () => []);
}

function readTable<T>(filePath: string): T[] {
  ensureDbInitialized();
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T[];
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

function writeTable<T>(filePath: string, data: T[]): void {
  ensureDbInitialized();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getCategories(): Category[] {
  const cats = readTable<{ id: Category; name: string }>(PATH_CATEGORIES);
  return cats.map((c) => c.id);
}

export function getProducts(): Product[] {
  return readTable<Product>(PATH_PRODUCTS);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getProductByIdOrSlug(idOrSlug: string): Product | undefined {
  const products = getProducts();
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function getUsers(): User[] {
  return readTable<User>(PATH_USERS);
}

export async function insertUser(
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string
): Promise<User> {
  const release = await dbLock.acquire();
  try {
    const users = readTable<User>(PATH_USERS);
    const normalizedEmail = email.toLowerCase().trim();

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error("A user with this email already exists");
    }

    const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: nextId,
      firstName,
      lastName,
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeTable(PATH_USERS, users);
    return newUser;
  } finally {
    release();
  }
}

export function getUserByEmail(email: string): User | undefined {
  const normalizedEmail = email.toLowerCase().trim();
  return getUsers().find((u) => u.email.toLowerCase() === normalizedEmail);
}

export function getUserById(id: number): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function getOrders(): Order[] {
  return readTable<Order>(PATH_ORDERS);
}

export function getOrderItems(): OrderItem[] {
  return readTable<OrderItem>(PATH_ORDER_ITEMS);
}

export function getOrdersByUserId(userId: number): Order[] {
  return getOrders().filter((o) => o.user_id === userId);
}

export function getOrderDetails(orderId: number, userId: number): { order: Order; items: (OrderItem & { product: Product })[] } | undefined {
  const order = getOrders().find((o) => o.id === orderId && o.user_id === userId);
  if (!order) return undefined;

  const items = getOrderItems()
    .filter((oi) => oi.order_id === orderId)
    .map((oi) => {
      const product = getProductById(oi.product_id);
      if (!product) {
        throw new Error(`Integrity error: Product ${oi.product_id} not found for order item`);
      }
      return {
        ...oi,
        product,
      };
    });

  return { order, items };
}

export async function createOrder(
  userId: number,
  shipping: {
    name: string;
    address: string;
    phone: string;
    city: string;
    zip: string;
  },
  cartItems: { productId: string; quantity: number }[]
): Promise<Order> {
  if (cartItems.length === 0) {
    throw new Error("Cannot place an order with an empty cart");
  }

  const release = await dbLock.acquire();
  try {

    const users = readTable<User>(PATH_USERS);
    if (!users.some((u) => u.id === userId)) {
      throw new Error(`Foreign Key Violation: User ID ${userId} does not exist`);
    }

    const products = readTable<Product>(PATH_PRODUCTS);
    const orders = readTable<Order>(PATH_ORDERS);
    const orderItems = readTable<OrderItem>(PATH_ORDER_ITEMS);

    const validatedItems: { product: Product; quantity: number }[] = [];
    let calculatedTotal = 0;

    for (const item of cartItems) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} does not exist`);
      }
      const stockAvailable = product.stockCount ?? 0;
      if (!product.inStock || stockAvailable < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}. Available: ${stockAvailable}`);
      }
      validatedItems.push({ product, quantity: item.quantity });
      calculatedTotal += product.price * item.quantity;
    }

    const nextOrderId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 10001; // start at 10001
    const newOrder: Order = {
      id: nextOrderId,
      user_id: userId,
      shippingName: shipping.name,
      shippingAddress: shipping.address,
      shippingPhone: shipping.phone,
      shippingCity: shipping.city,
      shippingZip: shipping.zip,
      totalAmount: calculatedTotal,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    let nextItemId = orderItems.length > 0 ? Math.max(...orderItems.map((oi) => oi.id)) + 1 : 1;
    const newOrderItems: OrderItem[] = [];

    for (const item of validatedItems) {
      const oi: OrderItem = {
        id: nextItemId++,
        order_id: nextOrderId,
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price, // Captured historical price
      };
      newOrderItems.push(oi);

      const pIndex = products.findIndex((p) => p.id === item.product.id);
      if (pIndex !== -1) {
        const currentStock = products[pIndex].stockCount ?? 0;
        const newStock = Math.max(0, currentStock - item.quantity);
        products[pIndex].stockCount = newStock;
        if (newStock <= 0) {
          products[pIndex].inStock = false;
        }
      }
    }

    orders.push(newOrder);
    orderItems.push(...newOrderItems);

    writeTable(PATH_ORDERS, orders);
    writeTable(PATH_ORDER_ITEMS, orderItems);
    writeTable(PATH_PRODUCTS, products);

    return newOrder;
  } finally {
    release();
  }
}

export function getReviewsByProductId(productId: string): Review[] {
  return readTable<Review>(PATH_REVIEWS)
    .filter((r) => r.product_id === productId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function insertReview(
  productId: string,
  userId: number,
  userName: string,
  rating: number,
  comment: string
): Promise<Review> {
  const release = await dbLock.acquire();
  try {

    const products = readTable<Product>(PATH_PRODUCTS);
    const pIndex = products.findIndex((p) => p.id === productId);
    if (pIndex === -1) {
      throw new Error(`Product with ID ${productId} does not exist`);
    }

    const users = readTable<User>(PATH_USERS);
    if (!users.some((u) => u.id === userId)) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    const reviews = readTable<Review>(PATH_REVIEWS);
    const nextReviewId = reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;

    const newReview: Review = {
      id: nextReviewId,
      product_id: productId,
      user_id: userId,
      userName,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    writeTable(PATH_REVIEWS, reviews);

    const prodReviews = reviews.filter((r) => r.product_id === productId);
    const avgRating = Math.round((prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length) * 10) / 10;

    products[pIndex].rating = avgRating;
    products[pIndex].reviewCount = prodReviews.length;
    writeTable(PATH_PRODUCTS, products);

    return newReview;
  } finally {
    release();
  }
}
