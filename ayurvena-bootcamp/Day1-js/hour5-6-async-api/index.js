function getData() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Patient data loaded");
    }, 2000);
  });
}
async function showData() {
  try {
    let data = await getData();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
showData();