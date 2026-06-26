// Patient Class

class Patient {
    constructor(id, name, age, phone, bloodGroup, allergies = []) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.bloodGroup = bloodGroup;
        this.allergies = allergies;
        this.isActive = true;
    }
    addAllergy(allergy) {
    this.allergies.push(allergy);
    }
    removeAllergy(allergy) {
    this.allergies = this.allergies.filter(a => a !== allergy);
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
// --------------------
// TEST 1
// --------------------

const patient1 = new Patient(
    1,
    "Rahul Kumar",
    32,
    "8889998888",
    "O+"
);

console.log(patient1);

// --------------------
// TEST 2
// --------------------

console.log("\n--- TEST 2: Add Allergy ---");

patient1.addAllergy("Dust");

console.log(patient1);

// --------------------
// TEST 3
// --------------------

console.log("\n--- TEST 3: Remove Allergy ---");

patient1.removeAllergy("Dust");

console.log(patient1);

// --------------------
// TEST 4
// --------------------

console.log("\n--- TEST 4: Patient Profile ---");

console.log(patient1.getProfile());

// --------------------
// TEST 5
// --------------------

console.log("\n--- TEST 5: Deactivate Patient ---");

patient1.deactivate();

console.log(patient1.getProfile());

module.exports = Patient;