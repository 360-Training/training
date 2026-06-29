interface IBaseEntity {
    id : string;
    createdAt: Date;
    updatedAt: Date;
}
class BaseService<T extends IBaseEntity>
{
    protected items: T[] = [];
    create(data: Omit<T, keyof IBaseEntity>):T {
        const newItem: T = {
            ...data,
            id: Math.random().toString(36).slice(2, 11),
            createdAt: new Date(),
            updatedAt: new Date(),
        } as T;
        this.items.push(newItem);
        return newItem;
    }
    findById(id: string): T | undefined{
        return this.items.find((items) => this.items.id === id);
    }
    findAll(): T[] {
        return [...this.items];

    }
    update(
        id: String,
        data: Partial<Omit<T, keyof IBaseEntity>>
    ): T | undefined {
        const index = this.items.findIndex((item) => this.items.id === id);
        if (index === -1){
            return undefined;

        }
        this.items[index] = {
            ...this.items[index],
            ...data,
            updatedAt: new Date(),
        };
        return this.items[index];

    }
    delete(id:string): boolean{
        const index = this.items.findIndex((item) => this.items.id === id);
        if (index === -1){
            return false;
        }
        this.items.
    }
}