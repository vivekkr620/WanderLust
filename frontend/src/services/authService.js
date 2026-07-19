import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await API.post("/signup", userData);
  return response.data;
};

export default API;