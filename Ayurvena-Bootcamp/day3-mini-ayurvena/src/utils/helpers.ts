export function generateId() : number {
    return Math.floor(Math.random() * 1000000);
}
export function formatCurrency(amount : number) : string {
    return '₹${amount.toFixed(2)}';
}
export function getCurrentDate() : string {
    return new Date().toISOString().split("T")[0]!;
}
export function formatDate(date : Date) : string {
    return date.toLocaleDateString("en-IN");
}
export function formatTime(date : Date) : string {
    return date.toLocaleTimeString("en-IN");
}