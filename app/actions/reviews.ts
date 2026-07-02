"use server";

import { getReviewsByProductId, insertReview } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { Review } from "@/types";

export interface ReviewState {
  success: boolean;
  reviews?: Review[];
  error?: string;
}

export async function getReviewsAction(productId: string) {
  try {
    const reviews = getReviewsByProductId(productId);
    return { success: true, reviews };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch reviews";
    return { success: false, error: message };
  }
}

export async function addReviewAction(
  productId: string,
  rating: number,
  comment: string
) {
  const user = await getSessionUser();
  
  if (!user) {
    return { success: false, error: "You must be logged in to submit a review." };
  }

  if (rating < 1 || rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5." };
  }

  if (!comment.trim()) {
    return { success: false, error: "Review comment cannot be empty." };
  }

  try {
    const userName = `${user.firstName} ${user.lastName[0]}.`;
    const review = await insertReview(productId, user.id, userName, rating, comment);
    return { success: true, review };
  } catch (error: unknown) {
    console.error("Add review action error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: message };
  }
}
