"use server";

import { getUserByEmail, insertUser } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth-utils";
import { createSession, destroySession } from "@/lib/session";
import { redirect } from "next/navigation";

export interface FormState {
  success: boolean;
  error?: string;
}

export async function registerAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!firstName || !lastName || !email || !password) {
    return { success: false, error: "All fields are required" };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long" };
  }

  try {
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return { success: false, error: "A user with this email already exists" };
    }

    const hashedPassword = hashPassword(password);
    const newUser = await insertUser(firstName, lastName, email, hashedPassword);
    

    await createSession(newUser.id);
  } catch (error: unknown) {
    console.error("Registration error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: message };
  }

  redirect("/");
}

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const redirectPath = formData.get("redirect")?.toString() || "/";

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const user = getUserByEmail(email);
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const isCorrect = verifyPassword(password, user.passwordHash);
    if (!isCorrect) {
      return { success: false, error: "Invalid email or password" };
    }

    await createSession(user.id);
  } catch (error: unknown) {
    console.error("Login error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: message };
  }

  redirect(redirectPath);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/login");
}
