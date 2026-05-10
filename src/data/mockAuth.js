import { apiFetch, setAuthToken } from "./apiClient";
import { supabase } from "../lib/supabaseClient";

const SESSION_KEY = "coworki-session-user-id";
const SESSION_PROFILE_KEY = "coworki-session-profile";

const roleLabels = {
  user: "Utilisateur",
  partner: "Partenaire",
  business: "Entreprise",
  admin: "Administrateur",
};

export const roleHomeRoutes = {
  user: "/dashboard",
  business: "/company/dashboard",
  partner: "/partner/dashboard",
  admin: "/admin/dashboard",
};

export function getMockSession() {
  return getStoredServerSession();
}

export async function createAccount(role, profile) {
  const response = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      fullName: profile.name || profile.fullName || profile.company || profile.space,
      email: profile.email,
      password: profile.password,
      phone: profile.phone,
      role,
      interests: profile.interests || [],
      city: profile.city,
      occupation: profile.roleLabel,
      companyName: profile.company,
      spaceName: profile.space,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Impossible de créer le compte.");
  }

  if (data.requiresVerification) {
    return data;
  }

  const session = toClientSession(data.user, role, data.token);
  setServerSession(session);
  return session;
}

export async function verifyRegistration({ email, emailCode, phoneCode }) {
  const response = await apiFetch("/api/auth/verify-registration", {
    method: "POST",
    body: JSON.stringify({ email, emailCode, phoneCode }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Code de vérification invalide.");
  }
  const session = toClientSession(data.user, null, data.token);
  session.nextStep = data.nextStep || roleHomeRoutes[session.role] || "/";
  session.profileCompleted = Boolean(data.profileCompleted ?? data.user?.profileCompleted);
  setServerSession(session);
  return session;
}

export async function resendVerification(email) {
  const response = await apiFetch("/api/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Impossible de renvoyer les codes.");
  }
  return data;
}

export async function loginWithCredentials(email, password) {
  const response = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Email ou mot de passe incorrect.");
  }

  const session = toClientSession(data.user, null, data.token);
  setServerSession(session);
  return session;
}

export async function syncOAuthAccount(payload) {
  const response = await apiFetch("/api/auth/oauth-sync", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Impossible de synchroniser le compte Google.");
  }

  const session = toClientSession(data.user, null, data.token);
  setServerSession(session);
  return session;
}

export function setAuthenticatedSession(user, token = "", extra = {}) {
  const session = {
    ...toClientSession(user, null, token),
    ...extra,
  };
  setServerSession(session);
  return session;
}

export function clearMockSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_PROFILE_KEY);
  setAuthToken(null);
  supabase.auth.signOut();
  window.dispatchEvent(new Event("coworki-auth-change"));
}

export function setMockSession(role, profile = null) {
  if (profile) {
    return createAccount(role, profile);
  }

  throw new Error("La connexion par compte par défaut a été supprimée. Utilisez email + mot de passe.");
}

export async function updateCurrentUser(updates) {
  const session = getMockSession();
  if (!session) throw new Error("Vous devez être connecté.");

  const nextSession = {
    ...session,
    ...updates,
    profile: { ...session.profile, ...(updates.profile || {}) },
  };
  setServerSession(nextSession);
  window.dispatchEvent(new Event("coworki-auth-change"));
  return nextSession;
}

function setServerSession(session) {
  localStorage.setItem(SESSION_KEY, session.id);
  localStorage.setItem(SESSION_PROFILE_KEY, JSON.stringify(session));
  setAuthToken(session.token);
  window.dispatchEvent(new Event("coworki-auth-change"));
}

function getStoredServerSession() {
  try {
    const stored = localStorage.getItem(SESSION_PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function toClientSession(user, fallbackRole, token = "") {
  const role = normalizeRole(user.role || fallbackRole);
  return {
    id: user.id,
    token,
    fullName: user.fullName,
    name: user.fullName,
    email: user.email,
    phone: user.phone || "",
    avatar: user.profile?.avatar || "",
    role,
    profileCompleted: Boolean(user.profileCompleted),
    status: roleLabels[role],
    city: user.profile?.city || "",
    roleLabel: user.profile?.occupation || roleLabels[role],
    interests: user.profile?.interests?.length ? user.profile.interests : user.interests || [],
    points: 0,
    hasConfirmedBooking: false,
    company: user.company?.companyName || "",
    space: user.partner?.companyName || "",
    validationStatus: user.partner?.status === "PENDING" ? "Espace en attente de validation" : "",
    profile: user.profile || null,
    partner: user.partner || null,
    companyProfile: user.company || null,
  };
}

function normalizeRole(role) {
  const value = String(role || "").toUpperCase();
  if (value === "PARTNER") return "partner";
  if (value === "COMPANY") return "business";
  if (value === "ADMIN") return "admin";
  return "user";
}
