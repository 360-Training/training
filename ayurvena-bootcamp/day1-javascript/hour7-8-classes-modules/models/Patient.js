export class Patient {
    constructor(id, name, age, phone, bloodGroup) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.bloodGroup = bloodGroup;
        this.allergies = [];
        this.isActive = true;
    }
    addAllergy(allergy) {
    this.allergies.push(allergy);
}
removeAllergy(allergy) {
    this.allergies = this.allergies.filter(
        item => item !== allergy
    );
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