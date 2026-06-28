import type { IEntity } from "../types/interfaces.js";
export class BaseService<T extends IEntity> {
    protected items : T[] = [];
    create(item: T): void {
        this.items.push(item);
    }
    getAll(): T[] {
        return this.items;
    }
    getById(id : number): T | undefined {
        return this.items.find(item => item.id === id);
    }
    update(id : number, updatedData : Partial<T>): T | undefined{
        const item = this.getById(id);
        if(!item) {
            return undefined;
        }
        Object.assign(item, updatedData);
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
    count(): number {
        return this.items.length;
    }
    exists(id: number): boolean {
        return this.items.some(item => item.id === id);
    }
    clear(): void {
        this.items = [];
    }
}