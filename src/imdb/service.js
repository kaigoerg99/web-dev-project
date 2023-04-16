import axios from "axios";
export const API = 'https://imdb-api.com/en/API';
export const API_KEY = 'k_3cnqqgzp';

export const searchMovie = async (searchTerm) => {
    const res = await axios.get(
        `${API}/SearchMovie/${API_KEY}/${searchTerm}`
    );
    return res;
};

export const getMovie = async (id) => {
    const res = await axios.get(
        `${API}/Title/${API_KEY}/${id}`
    );
    return res;
}