export class Helper {
    static generateId(): number {
        return Math.floor(Math.random() * 1000000);
    }

    static formatDate(date: Date): string {
        return date.toLocaleDateString("en-IN");
    }

    static formatCurrency(amount: number): string {
        return `₹${amount.toFixed(2)}`;
    }

    static capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
}