const doctors = [];
//doctors fn creating
function registerDoctor(name, specialization, fee) {
  const doctor = {
    id: doctors.length + 1,
    name,
    specialization,
    fee,
    isAvailable: true
  };

  doctors.push(doctor);
  return doctor;
}
//adding of doctors
registerDoctor("Dr. Ramesh", "Cardiology", 500);
registerDoctor("Dr. Priya", "Dermatology", 400);
registerDoctor("Dr. Kumar", "Orthopedics", 600);
console.log(doctors);

//finding of doctors
function findDoctorsBySpecialization(specialization) {
  return doctors.filter(
    doctor => doctor.specialization === specialization
  );
}

console.log(findDoctorsBySpecialization("Cardiology"));
//avaiability of doctors
function listAvailableDoctors() {
  return doctors.filter(
    doctor => doctor.isAvailable
  );
}

console.log(listAvailableDoctors());
//unavilable
function markDoctorUnavailable(id) {
  const doctor = doctors.find(
    doctor => doctor.id === id
  );

  if (doctor) {
    doctor.isAvailable = false;
  }
}
markDoctorUnavailable(1);

console.log(listAvailableDoctors());