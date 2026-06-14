interface ValidatorResult {
  valid: boolean;
  value: string;
  error: string | null;
}

export function validateHabitName(name: string): ValidatorResult {
  const value = name.trim();
  if (!value) {
    return { valid: false, value, error: 'Habit name is required' };
  }
  if (value.length < 3) {
    return { valid: false, value, error: "Name must be at least 3 characters" };
  }
  if (value.length > 60) {
    return { valid: false, value, error: "Habit name must be 60 characters or fewer" };
  }
  return { valid: true, value, error: null };
}

export function validatePassword(password: string): ValidatorResult {
  if (password.length < 8) {
    return { valid: false, value: password, error: "Password must be at least 8 characters long" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, value: password, error: "Password must contain at least one uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, value: password, error: "Password must contain at least one lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, value: password, error: "Password must contain at least one number" };
  }
  return { valid: true, value: password, error: null };
}

// Additional validators if needed
