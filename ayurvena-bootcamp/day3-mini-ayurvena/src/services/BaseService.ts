import type {IBaseEntity} from "../types/models.js";
export class BaseService<T extends IBaseEntity>{
  protected items: T[]=[];
  create(
    data:Omit<T,"id"|"createdAt"|"updatedAt">
  ): T{
    const item={
      ...data,
      id:this.items.length + 1,
    hospitalId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    } as T;

    this.items.push(item);

    return item;
  }
  findById(
    id:number
  ):T|undefined{
    return this.items.find(
      item=>item.id==id
    );
  }
  findAll():T[]{
    return this.items;
  }
  update(
    id: number,
    data:Partial<T>
  ): T{
    const item=this.findById(id);
    if(!item){
      throw new Error("item not found");
    }
    Object.assign(
      item,
      data,
      {
        updatedAt: new Date()
      }
    );
    return item;
}
delete(
  id:number
): boolean{
  const initialLength=this.items.length;
  this.items=this.items.filter(
    item=>item.id!==id
  );
  return this.items.length<initialLength;
}
findByHospital(

    hospitalId: number

): T[] {

    return this.items.filter(

        item => item.hospitalId === hospitalId

    );

}
}