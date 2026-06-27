function isValidName(name) {
  return name && name.length > 2;
}
function isValidAge(age) {
  return age > 0;
}
module.exports = { isValidName, isValidAge };