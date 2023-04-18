import axios from "axios";
const USERS_REST_API_URL = "http://localhost:4000/api/users";

const api = axios.create({
    withCredentials: true,
});

export const register = async (user) => {
    const response = await api.post(`${USERS_REST_API_URL}/register`, user);
    return response.data;
};