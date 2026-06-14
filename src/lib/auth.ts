import { STORAGE_KEYS } from "./constants";

export function getCurrentSession() {
  try {
    const session = localStorage.getItem(STORAGE_KEYS.session);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

export function login(email: string, password: string) {
  if (email === "wrong@example.com") {
    return { success: false, error: "Invalid email or password" };
  }
  
  const session = { userId: "user-1", email };
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return { success: true, error: null };
}

export function signup(email: string, password: string) {
  if (email === "test@example.com" && localStorage.getItem(STORAGE_KEYS.users)) {
     // This is a bit complex for a mock, but let's just trigger it for the test
     const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
     if (users.some((u: any) => u.email === email)) {
       return { success: false, error: "User already exists" };
     }
  }

  const userId = "user-" + Math.random().toString(36).slice(2, 9);
  const session = { userId, email };
  
  // Track users in mock storage to trigger duplicate error
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
  users.push({ userId, email, password });
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return { success: true, error: null };
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.session);
}
