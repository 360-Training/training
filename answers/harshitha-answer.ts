interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

class BaseService<T extends IBaseEntity> {
  protected items: T[] = [];

  create(data: Omit<T, keyof IBaseEntity>): T {
    const now = new Date();
    const newItem = { ...data, id: this.items.length + 1, createdAt: now, updatedAt: now } as unknown as T;
    this.items.push(newItem);
    return newItem;
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }

  update(id: number, data: Partial<T>): T | undefined {
    const item = this.findById(id);
    if (!item) return undefined;
    Object.assign(item, data, { updatedAt: new Date() });
    return item;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

interface IPatient extends IBaseEntity {
  name: string;
  age: number;
  phone: string;
  bloodGroup: string;
  isActive: boolean;
}

class PatientService extends BaseService<IPatient> {
  findByPhone(phone: string): IPatient | undefined {
    return this.items.find(p => p.phone === phone);
  }
}

// Tests
const service = new PatientService();
const p1 = service.create({ name: "Rahul", age: 30, phone: "9876543210", bloodGroup: "A+", isActive: true });
const p2 = service.create({ name: "Priya", age: 25, phone: "9876543211", bloodGroup: "B+", isActive: true });
const p3 = service.create({ name: "Amit", age: 35, phone: "9876543212", bloodGroup: "O+", isActive: false });

console.log("Find by ID:", service.findById(1));
console.log("Update age:", service.update(1, { age: 31 }));
console.log("Delete:", service.delete(3));
console.log("Find by phone:", service.findByPhone("9876543211"));
console.log("Remaining count:", service.findAll().length);
