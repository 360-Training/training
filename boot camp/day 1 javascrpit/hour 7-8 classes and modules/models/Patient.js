let pCount = 1;

export class Patient {
  constructor(data) {
    this.id = "P" + String(pCount++).padStart(4, "0");
    this.name = data.name;
    this.age = data.age;
    this.phone = data.phone;
    this.bloodGroup = data.bloodGroup;
    this.allergies = data.allergies ? [...data.allergies] : [];
    this.isActive = true;
  }

  addAllergy(allergy) {
    if (!this.allergies.includes(allergy)) {
      this.allergies.push(allergy);
    }
    return this.allergies;
  }

  removeAllergy(allergy) {
    this.allergies = this.allergies.filter(a => a !== allergy);
    return this.allergies;
  }

  getProfile() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      phone: this.phone,
      bloodGroup: this.bloodGroup,
      allergies: this.allergies,
      isActive: this.isActive
    };
  }

  deactivate() {
    this.isActive = false;
  }
}