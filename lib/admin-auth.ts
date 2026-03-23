export function checkAdminAuth(request: Request): boolean {
  const legacySecret = process.env.ADMIN_SECRET?.trim();
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "") ?? "";
  const requestUsername = request.headers.get("x-admin-username")?.trim() ?? "";

  // Prefer explicit username/password auth when configured.
  if (username || password) {
    if (!username || !password) return false;
    return requestUsername === username && token === password;
  }

  // Backward compatible fallback.
  if (!legacySecret) return true;
  return token === legacySecret;
}
