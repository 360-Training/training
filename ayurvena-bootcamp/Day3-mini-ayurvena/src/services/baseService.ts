export class BaseService<T extends { id: number }> {
    protected data: T[] = [];
    getAll(): T[] {
        return this.data;
    }
    getById(id: number): T | undefined {
        return this.data.find(item => item.id === id);
    }
    add(item: T): void {
        this.data.push(item);
    }
    delete(id: number): boolean {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        this.data.splice(index, 1);
        return true;
    }
}