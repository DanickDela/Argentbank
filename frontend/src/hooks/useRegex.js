export const isValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
  return regex.test(password);
};

export const isValidName = (name) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+([ -][A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*$/;
  return regex.test(name);
};
