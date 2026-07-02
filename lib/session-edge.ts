export const SESSION_COOKIE_NAME = "sw_session";
const SECRET_KEY_STR = process.env.SESSION_SECRET || "shopwave-super-secret-salt-and-key-998877";

async function getCryptoKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SECRET_KEY_STR);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signToken(userId: number, expiresAt: number): Promise<string> {
  const dataStr = `${userId}:${expiresAt}`;
  const encoder = new TextEncoder();
  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(dataStr));
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${dataStr}:${signatureHex}`;
}

export async function verifyToken(token: string): Promise<number | null> {
  if (!token) return null;
  const parts = token.split(":");
  if (parts.length !== 3) return null;

  const [userIdStr, expiresAtStr, signatureHex] = parts;
  const userId = parseInt(userIdStr, 10);
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(userId) || isNaN(expiresAt)) return null;
  if (expiresAt < Date.now()) return null;

  const dataStr = `${userIdStr}:${expiresAtStr}`;
  const encoder = new TextEncoder();
  const key = await getCryptoKey();
  
  const sigBytes = new Uint8Array(
    signatureHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(dataStr));
  return isValid ? userId : null;
}
