export class BaseEntity {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(id: number) {
        this.id = id;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    updateTimestamp(): void {
        this.updatedAt = new Date();
    }
}