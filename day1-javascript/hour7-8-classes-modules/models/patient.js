export class Patient {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
  getProfile() {
    return {
      id: this.id,
      name: this.name,
      age: this.age
    };
  }
}