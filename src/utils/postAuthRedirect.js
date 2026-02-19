const STORAGE_KEY = "postAuthRedirect";

/**
 * Saves the post-auth redirect context to sessionStorage.
 * Used as a fallback when navigating between login and register pages
 * (query params are the primary mechanism).
 *
 * @param {{ redirectTo: string, planId?: string }} context
 */
export function savePostAuthRedirect({ redirectTo, planId }) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ redirectTo, planId }));
}

/**
 * Reads the post-auth redirect context from sessionStorage.
 * @returns {{ redirectTo: string, planId?: string } | null}
 */
export function getPostAuthRedirect() {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Clears the post-auth redirect context from sessionStorage.
 */
export function clearPostAuthRedirect() {
  sessionStorage.removeItem(STORAGE_KEY);
}

/**
 * Resolves the destination after a successful authentication.
 * Priority: URL query params → sessionStorage → fallback.
 * Clears sessionStorage after consuming it.
 *
 * @param {URLSearchParams} searchParams - from useSearchParams()
 * @param {string} [fallback="/app"] - default destination
 * @returns {string} the destination path
 */
export function resolvePostAuthDestination(searchParams, fallback = "/app") {
  const qRedirectTo = searchParams.get("redirectTo");
  const qPlanId = searchParams.get("planId");

  if (qRedirectTo) {
    clearPostAuthRedirect();
    return qPlanId ? `${qRedirectTo}?planId=${qPlanId}` : qRedirectTo;
  }

  const stored = getPostAuthRedirect();
  if (stored?.redirectTo) {
    clearPostAuthRedirect();
    return stored.planId
      ? `${stored.redirectTo}?planId=${stored.planId}`
      : stored.redirectTo;
  }

  return fallback;
}
