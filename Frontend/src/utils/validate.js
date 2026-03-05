export function validate({ username, email, password }) {
  const errors = {};
  if (username !== undefined && !username.trim())
    errors.username = "Name is required";
  if (!email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email";
  if (!password) errors.password = "Password is required";
  else if (password.length < 6)
    errors.password = "Must be at least 6 characters";
  return errors;
}

export default validate;
