// Generic Function
function getData<T>(data: T): T {
  return data;
}
console.log(getData<string>("Soumya"));
console.log(getData<number>(22));
console.log(getData<boolean>(true));
//generic interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
const patientResponse: ApiResponse<string> = {
  success: true,
  data: "Patient Registered"
};
console.log(patientResponse);
// Generic Class
class DataStorage<T> {
  private items: T[] = [];
  add(item: T) {
    this.items.push(item);
  }
  getAll(): T[] {
    return this.items;
  }
}
const patientStorage = new DataStorage<string>();
patientStorage.add("Rahul");
patientStorage.add("Soumya");
console.log(patientStorage.getAll());