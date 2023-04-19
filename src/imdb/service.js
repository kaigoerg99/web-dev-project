import axios from "axios";
export const IMDB_API = 'https://imdb-api.com/en/API';
export const MOVIE_API = "http://localhost:4000/api/movies";
export const API_KEY = 'k_ssytjabd';

const api = axios.create({
    withCredentials: true,
});

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

export const likeMovie = async (movie) => {
    const response = await api.post(`${MOVIE_API}/${movie.movieId}/likes`, movie);
    return response.data;
};