import services from "./movieService";
const baseUrl = "http://localhost:3030/users";

export const login = (data) => services.post(`${baseUrl}/login`,data);

export const register = (data) => services.post(`${baseUrl}/register`,data);

export const logout = (token) => services.get(`${baseUrl}/logout`,null, token )