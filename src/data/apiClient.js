const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const API_FALLBACK_URLS = ["http://localhost:4000", "http://127.0.0.1:4000"];
const TOKEN_KEY = "coworki-auth-token";

export async function apiFetch(path, options = {}) {
  const urls = API_BASE_URL ? [`${API_BASE_URL}${path}`] : API_FALLBACK_URLS.map((url) => `${url}${path}`);

  let lastError = null;

  for (const url of urls) {
    try {
      return await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
          ...(options.headers || {}),
        },
      });
    } catch (error) {
      lastError = error;
    }
  }

  console.error("COWORKI_API_UNAVAILABLE", lastError);
  throw new Error("Serveur CoWorki indisponible. Lancez npm run dev puis réessayez.");
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

function authHeader() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}
