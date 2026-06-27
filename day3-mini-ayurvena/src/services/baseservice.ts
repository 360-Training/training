export class BaseService<T extends { id: number }> {
  protected items: T[] = [];
  add(item: T): void {
    this.items.push(item);
  }
  getAll(): T[] {
    return this.items;
  }
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }clear(): void {
    this.items = [];
  }
}