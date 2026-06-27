// Validate age 
export function isValidAge(age: number): boolean {
  return age > 0 && age <= 120;
}
// Validate name 
export function isValidName(name: string): boolean {
  return typeof name === "string" && name.trim().length >= 2;
}
// Validate gender
export function isValidGender(gender: string): boolean {
  return ["MALE", "FEMALE", "OTHER"].includes(gender);
}