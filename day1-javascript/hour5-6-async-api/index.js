// console.log("Start");

// setTimeout(() => {
//   console.log("Patient Data Loaded");
// }, 2000);

// console.log("End");
// //promise
// const promise = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("Patient Found");
//   }, 2000);
// });
// //await
// async function getPatient() {
//   const result = await promise;
//   console.log(result);
// }
//real ex
const patients = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Soumya" }
];

function fetchPatient(id) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {

      const patient = patients.find(
        p => p.id === id
      );

      if (patient) {
        resolve(patient);
      } else {
        reject("Patient Not Found");
      }

    }, 1000);

  });
}

async function getPatient(id) {

  try {
    const patient = await fetchPatient(id);

    console.log(patient);

  } catch (error) {

    console.log(error);

  }

}

getPatient(1);