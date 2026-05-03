interface ValidatorResult {
  valid: boolean;
  value: string;
  error: string | null;
}

export function validateHabitName(name: string): ValidatorResult {
  const value = name.trim();
  if (!value) {
    return { valid: false, value, error: 'Name is required.' };
  }
  if (value.length < 3) {
    return { valid: false, value, error: "Name must be at least 3 characters" };
  }
  return { valid: true, value, error: null };
}

// Additional validators if needed
