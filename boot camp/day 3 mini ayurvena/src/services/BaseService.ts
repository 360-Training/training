import { IBaseEntity} from "../types/interfaces";

export class BaseService<T extends IBaseEntity> {
    protected items: T[]= [];

    create(item: T): void {
        this.items.push(item);
    }
    getAll(): T[] {
        return this.items;
    }
    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }
    delete(id: number): boolean {
        const index = this.items.findIndex(item=> item.id === id);
        if(index === -1){
            return false;
        }
        this.items.splice(index,1);
        return true;
    }
  }
