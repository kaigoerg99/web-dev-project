import axios from "axios";

const USERS_REST_API_URL = "http://localhost:4000/api/users";

const api = axios.create({
    withCredentials: true,
});

export const register = async (user) => {
    const response = await api.post(`${USERS_REST_API_URL}/register`, user);
    return response.data;
};

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_REST_API_URL}/login`, {
        username,
        password,
    });
    const user = response.data;
    return user;
};

export const profile = async () => {
    const response = await api.get(`${USERS_REST_API_URL}/profile`);
    return response.data;
};

export const logout = async () => {
    const response = await api.post(`${USERS_REST_API_URL}/logout`);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_REST_API_URL}/${user._id}`, user);
    return response.data;
};

export const getLikes = async (user) => {
    const res = await api.get(`${USERS_REST_API_URL}/likes/${user}`);
    return res.data;
};

export const findUserById = async (id) => {
    const response = await api.get(`${USERS_REST_API_URL}/${id}`);
    return response.data;
  };