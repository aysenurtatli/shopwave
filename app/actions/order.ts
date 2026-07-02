"use server";

import { createOrder } from "@/lib/db";
import { getSessionUser } from "@/lib/session";

export interface PlaceOrderResult {
  success: boolean;
  orderId?: number;
  error?: string;
}

export async function placeOrderAction(
  shipping: {
    name: string;
    address: string;
    phone: string;
    city: string;
    zip: string;
  },
  cartItems: { productId: string; quantity: number }[]
): Promise<PlaceOrderResult> {
  const user = await getSessionUser();
  if (!user) {
    return { success: false, error: "You must be logged in to place an order" };
  }

  if (cartItems.length === 0) {
    return { success: false, error: "Your cart is empty" };
  }

  try {
    const order = await createOrder(user.id, shipping, cartItems);
    return { success: true, orderId: order.id };
  } catch (error: unknown) {
    console.error("Order placement error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: message };
  }
}
