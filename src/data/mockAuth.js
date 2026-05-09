const USERS_KEY = "coworki-users";
const SESSION_KEY = "coworki-session-user-id";

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
  seedAdminAccount();
  const sessionUserId = localStorage.getItem(SESSION_KEY);
  if (!sessionUserId) return null;

  const user = getUsers().find((item) => item.id === sessionUserId);
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }

  return toPublicSession(user);
}

export async function createAccount(role, profile) {
  seedAdminAccount();
  const users = getUsers();
  const email = normalizeEmail(profile.email);

  if (!email) {
    throw new Error("Veuillez saisir une adresse email valide.");
  }

  if (users.some((user) => normalizeEmail(user.email) === email)) {
    throw new Error("Un compte existe déjà avec cette adresse email.");
  }

  if (!profile.password || profile.password.length < 8) {
    throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
  }

  const now = new Date().toISOString();
  const user = {
    id: crypto.randomUUID(),
    fullName: profile.name || profile.fullName || profile.company || profile.space || "Membre CoWorki",
    name: profile.name || profile.fullName || profile.company || profile.space || "Membre CoWorki",
    email,
    phone: profile.phone || "",
    role,
    status: roleLabels[role],
    city: profile.city || "",
    roleLabel: profile.roleLabel || roleLabels[role],
    interests: profile.interests || [],
    points: 0,
    hasConfirmedBooking: false,
    company: profile.company || "",
    space: profile.space || "",
    validationStatus: role === "partner" ? "Espace en attente de validation" : "",
    profile: {
      bio: "",
      occupation: profile.roleLabel || "",
      city: profile.city || "",
      interests: profile.interests || [],
    },
    partner:
      role === "partner"
        ? {
            companyName: profile.space || profile.name,
            status: "PENDING",
            services: profile.services || [],
            spaceTypes: profile.spaceTypes || [],
          }
        : null,
    companyProfile:
      role === "business"
        ? {
            companyName: profile.company || profile.name,
            need: profile.need || "",
          }
        : null,
    passwordHash: await hashPassword(profile.password),
    createdAt: now,
    updatedAt: now,
  };

  saveUsers([...users, user]);
  setSessionUser(user.id);
  return toPublicSession(user);
}

export async function loginWithCredentials(email, password) {
  seedAdminAccount();
  const normalizedEmail = normalizeEmail(email);
  const passwordHash = await hashPassword(password || "");
  const user = getUsers().find((item) => normalizeEmail(item.email) === normalizedEmail);

  if (!user || user.passwordHash !== passwordHash) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  setSessionUser(user.id);
  return toPublicSession(user);
}

export function clearMockSession() {
  localStorage.removeItem(SESSION_KEY);
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

  const users = getUsers();
  const nextUsers = users.map((user) =>
    user.id === session.id
      ? {
          ...user,
          ...updates,
          profile: { ...user.profile, ...(updates.profile || {}) },
          updatedAt: new Date().toISOString(),
        }
      : user
  );
  saveUsers(nextUsers);
  window.dispatchEvent(new Event("coworki-auth-change"));
  return getMockSession();
}

function toPublicSession(user) {
  const safeUser = { ...user };
  delete safeUser.passwordHash;
  return {
    ...safeUser,
    status: safeUser.status || roleLabels[safeUser.role],
    name: safeUser.name || safeUser.fullName,
    interests: safeUser.profile?.interests?.length ? safeUser.profile.interests : safeUser.interests || [],
    city: safeUser.profile?.city || safeUser.city || "",
  };
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSessionUser(userId) {
  localStorage.setItem(SESSION_KEY, userId);
  window.dispatchEvent(new Event("coworki-auth-change"));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function seedAdminAccount() {
  const users = getUsers();
  if (users.some((user) => user.role === "admin")) return;

  const admin = {
    id: "admin-coworki",
    fullName: "Admin CoWorki",
    name: "Admin CoWorki",
    email: "admin@coworki.tn",
    phone: "",
    role: "admin",
    status: "Administrateur",
    city: "Tunis",
    roleLabel: "Administrateur",
    interests: [],
    points: 0,
    hasConfirmedBooking: false,
    company: "",
    space: "",
    validationStatus: "",
    profile: { bio: "", occupation: "Administrateur", city: "Tunis", interests: [] },
    partner: null,
    companyProfile: null,
    passwordHash: "db735458867474ed3163fd668a7324d4c03853bec77d1ab3dc2f070ad92d80dc",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveUsers([...users, admin]);
}
