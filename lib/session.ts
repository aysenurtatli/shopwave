import { cookies } from "next/headers";
import { getUserById } from "@/lib/db";
import { User } from "@/types";
import { signToken, verifyToken, SESSION_COOKIE_NAME } from "./session-edge";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export { signToken, verifyToken };

export async function createSession(userId: number): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const token = await signToken(userId, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
}

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;

  const userId = await verifyToken(sessionCookie.value);
  if (userId === null) return null;

  return getUserById(userId) || null;
}
