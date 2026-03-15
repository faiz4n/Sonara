import api from "./api";

export async function registerUser(userData) {
  const response = await api.post("/api/auth/register", userData);
  // Store token in localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
}

export async function loginUser(userData) {
  const response = await api.post("/api/auth/login", userData);
  // Store token in localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
}

export async function logoutUser() {
  // Remove token from localStorage
  localStorage.removeItem("token");
  await api.post("/api/auth/logout");
}

export async function getCurrentUser() {
  const res = await api.get("/api/auth/me");
  return res.data.user;
}
