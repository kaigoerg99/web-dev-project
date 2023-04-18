import axios from "axios";
export const API = 'https://imdb-api.com/en/API';
export const API_KEY = 'k_ssytjabd';

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

export const popularMoviesAPI = async () => {
    const res = await axios.get(
        `${API}/MostPopularMovies/${API_KEY}`
    );
    return res;
}

export const inTheatersAPI = async () => {
    const res = await axios.get(
        `${API}/InTheaters/${API_KEY}`
    );
    return res;
}