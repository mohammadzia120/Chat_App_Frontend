const validateInput = (value, pattern) => {
  const regex = new RegExp(pattern);
  if (!regex.test(value)) {
    return true;
  }
  return false;
};
module.exports = validateInput;
