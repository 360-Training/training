export class Helper {

    static generateId(): number {

        return Math.floor(
            Math.random() * 100000
        );

    }

    static formatCurrency(
        amount: number
    ): string {

        return `₹${amount}`;

    }

    static formatDate(
        date: Date
    ): string {

        return date.toLocaleDateString();

    }

}