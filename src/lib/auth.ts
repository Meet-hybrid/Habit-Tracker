export function getCurrentSession() {
  try {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

export function login(username: string, password: string) {
  // fake login for now
  localStorage.setItem("session", JSON.stringify({ username }));
  return { success: true, error: null };
}

export function signup(username: string, password: string) {
  // fake signup for now
  localStorage.setItem("session", JSON.stringify({ username }));
  return { success: true, error: null };
}

export function logout() {
  localStorage.removeItem("session");
}
