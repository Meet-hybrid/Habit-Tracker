import { readFromStorage, writeToStorage, removeFromStorage } from "./storage";
import { STORAGE_KEYS } from "./constants";
import type { User, Session } from "@/types/auth";

function getUsers(): User[] {
  return readFromStorage<User[]>(STORAGE_KEYS.users, []);
}

function saveUsers(users: User[]): void {
  writeToStorage(STORAGE_KEYS.users, users);
}

// SIGNUP FUNCTION
export function signup(
  email: string,
  password: string,
): {
  success: boolean;
  error: string | null;
} {
  // load all existing users
  const users = getUsers();

  // check for duplicates
  const existingUser = users.find((user) => user.email === email);

  // if there is duplicate (an existing user)
  if (existingUser) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  // if there isn't, create a new user
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  // create a new user and a session for said user immediately
  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  const session: Session = {
    userId: newUser.id,
    email: newUser.email,
  };

  writeToStorage(STORAGE_KEYS.session, session);
  // Sync to cookie for server
  if (typeof document !== 'undefined') {
    setCookie('habit-session', JSON.stringify(session));
  }

  return {
    success: true,
    error: null,
  };
}

// LOGIN FUNCTION
export function login(
  email: string,
  password: string,
): {
  success: boolean;
  error: string | null;
} {
  // read all saved users
  const users = getUsers();

  // find a user whose email and password both match
  const user = users.find(
    (storedUser) =>
      storedUser.email === email && storedUser.password === password,
  );

  // if there is no matche return an error message
  if (!user) {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  // if there is, create a session without storing the password
  const session: Session = {
    userId: user.id,
    email: user.email,
  };

  writeToStorage(STORAGE_KEYS.session, session);
  // Sync to cookie for server
  if (typeof document !== 'undefined') {
    setCookie('habit-session', JSON.stringify(session));
  }

  return {
    success: true,
    error: null,
  };
}

// LOGOUT FUNCTION
export function logout(): void {
  removeFromStorage(STORAGE_KEYS.session);
  // Clear cookie
  document.cookie = 'habit-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days = 30): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/; Secure; SameSite=Strict`;
}

function getCurrentSession(): Session | null {
  // Cookie fallback for SSR compat
  const cookieSession = getCookie('habit-session');
  if (cookieSession) {
    try {
      return JSON.parse(decodeURIComponent(cookieSession)) as Session;
    } catch {
      // invalid cookie
    }
  }
  // LocalStorage primary
  return readFromStorage<Session | null>(STORAGE_KEYS.session, null);
}
