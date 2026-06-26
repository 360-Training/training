export function validatePhone(phone) {
  const p = String(phone).trim();
  if (!/^\d{10}$/.test(p)) {
    return { valid: false, error: "phone needs to be 10 digits" };
  }
  return { valid: true };
}

export function validateDate(date) {
  if (!date) return { valid: false, error: "date is required" };
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return { valid: false, error: "not a valid date" };
  }
  return { valid: true };
}

export function validateEmail(email) {
  if (!email || !email.includes("@") || !email.includes(".")) {
    return { valid: false, error: "invalid email" };
  }
  return { valid: true };
}