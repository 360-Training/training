"use strict";
let patientName = "Ram";
let age = 25;
let isActive = true;
let salary = 200000;
console.log(patientName, age, isActive, salary);
let fruits = ["Apple", "Mango", "Orange"];
let marks = [90, 85, 95];
console.log(fruits);
console.log(marks);
let patient = [101, "Arun"];
console.log(patient);
var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Approved"] = 1] = "Approved";
    Status[Status["Rejected"] = 2] = "Rejected";
})(Status || (Status = {}));
let currentStatus = Status.Rejected;
console.log(currentStatus);
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["Doctor"] = "DOCTOR";
    Role["Patient"] = "PATIENT";
})(Role || (Role = {}));
let currentRole = Role.Doctor;
console.log(currentRole);
function add(a, b) {
    return a + b;
}
console.log(add(10, 20));
const multiply = (a, b) => {
    return a * b;
};
console.log(multiply(5, 4));
let data = "Hello";
if (typeof data === "string") {
    console.log(data.toUpperCase());
}
let data2 = 100;
if (typeof data2 === "string") {
    console.log(data2.toUpperCase());
}
else if (typeof data2 === "number") {
    console.log(data2 * 2);
}
function identity(value) {
    return value;
}
let userName = identity("siri");
let userId = identity(23);
console.log(userName);
console.log(userId);
const userResponse = {
    success: true,
    data: {
        id: 1,
        name: "Ram",
    },
};
console.log(userResponse);
function save(data) {
    console.log("Saved successfully");
    return data;
}
const savedPatient = save({
    id: 2,
    name: "Ram",
});
const savedDoctor = save({
    id: 10,
    specialization: "Cardiologist",
});
console.log(savedPatient);
console.log(savedDoctor);
