export class BaseService<T extends { id: number }> {
    protected items: T[] = [];
    protected currentId = 1;

    create(item: T): T {
        this.items.push(item);
        return item;
    }
    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }
    getAll(): T[] {
        return this.items;
    }
    update(id: number, updatedItem: Partial<T>): T | undefined {
        const item = this.findById(id);
        if (!item) {
            return undefined;
        }
        Object.assign(item, updatedItem);
        return item;
    }
    delete(id: number): boolean {

        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        return true;
    }
}