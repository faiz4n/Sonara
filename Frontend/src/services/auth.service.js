import api from "./api";

export async function registerUser(userData) {
  const response = await api.post("/api/auth/register", userData);
  console.log(response);
  return response.data;
}
export async function loginUser(userData) {
  const response = await api.post("/api/auth/login", userData);
  return response.data;
}

export async function logoutUser() {
  await api.post("/api/auth/logout");
}

export async function getCurrentUser() {
  const res = await api.get("/api/auth/me");
  return res.data.user;
}

export default { registerUser, loginUser };
