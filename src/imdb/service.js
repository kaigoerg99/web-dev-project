import axios from "axios";
export const IMDB_API = 'https://imdb-api.com/en/API';
export const MOVIE_API = "http://localhost:4000/api/movies";
export const API_KEY = 'k_6eqvvwbo';

/* 
API Keys:
k_3cnqqgzp
k_3ugpx59m
k_6eqvvwbo
k_ssytjabd
*/

export const searchMovie = async (searchTerm) => {
    const res = await axios.get(
        `${IMDB_API}/SearchMovie/${API_KEY}/${searchTerm}`
    );
    return res;
};

export const getMovie = async (id) => {
    const res = await axios.get(
        `${IMDB_API}/Title/${API_KEY}/${id}`
    );
    return res;
}

export const popularMoviesAPI = async () => {
    const res = await axios.get(
        `${IMDB_API}/MostPopularMovies/${API_KEY}`
    );
    return res;
}

export const inTheatersAPI = async () => {
    const res = await axios.get(
        `${IMDB_API}/InTheaters/${API_KEY}`
    );
    return res;
}