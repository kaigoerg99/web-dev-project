import axios from "axios";
export const API = 'https://imdb-api.com/en/API';
export const API_KEY = 'k_3cnqqgzp';

export const searchAPI = async (query) => {
    const res = await axios.get(
        `${API}/SearchMovie/${API_KEY}/${query}`
    );
    return res;
};