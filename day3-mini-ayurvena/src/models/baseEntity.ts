export class BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  constructor() {
    this.id = Date.now();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}