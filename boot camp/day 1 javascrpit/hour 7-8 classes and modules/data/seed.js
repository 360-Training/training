const firstNames = ["Rahul", "Priya", "Amit", "Sneha", "Vikram", "Anita", "Suresh", "Kavita", "Arjun", "Pooja", "Rohit", "Neha", "Sanjay", "Divya", "Manoj", "Swati", "Karan", "Meena", "Ravi", "Anjali"];
const lastNames = ["Sharma", "Verma", "Iyer", "Reddy", "Gupta", "Nair", "Patel", "Singh", "Joshi", "Mehta"];
const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
const specs = ["Cardiology", "Orthopedics", "Dermatology", "Pediatrics", "Neurology"];
const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randPhone() {
  let p = "9";
  for (let i = 0; i < 9; i++) p += Math.floor(Math.random() * 10);
  return p;
}

function randDate() {
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(Math.random() * 14));
  return d.toISOString().slice(0, 10);
}

export function seedAll(services) {
  const patients = [];
  for (let i = 0; i < 20; i++) {
    patients.push(services.patientService.register({
      name: pick(firstNames) + " " + pick(lastNames),
      age: 18 + Math.floor(Math.random() * 60),
      phone: randPhone(),
      bloodGroup: pick(bloodGroups)
    }));
  }

  const doctors = [];
  for (let i = 0; i < 5; i++) {
    doctors.push(services.doctorService.add({
      name: "Dr. " + pick(lastNames),
      specialization: specs[i % specs.length],
      fee: 300 + Math.floor(Math.random() * 5) * 100
    }));
  }

  const appointments = [];
  let tries = 0;
  while (appointments.length < 10 && tries < 100) {
    tries++;
    try {
      const appt = services.appointmentService.book(
        pick(patients).id,
        pick(doctors).id,
        randDate(),
        pick(times)
      );
      appointments.push(appt);
    } catch (e) {
      // slot taken, just try again
    }
  }

  // mix up the statuses a bit so dashboard has something to show
  appointments.forEach((a, i) => {
    if (i % 2 === 0) a.complete();
    else if (i % 5 === 0) a.cancel();
  });

  return { patients, doctors, appointments };
}