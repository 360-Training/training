//id generation
export function generateId(): number {
  return Math.floor(Date.now() + Math.random() * 1000);
}
//date format
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
//delay fn
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}