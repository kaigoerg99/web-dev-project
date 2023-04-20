import axios from "axios";

export const MOVIE_API = "http://localhost:4000/api/movies";

const api = axios.create({
    withCredentials: true,
});

export const likeMovie = async (movie) => {
    const response = await api.post(`${MOVIE_API}/${movie.movieId}/likes`, movie);
    return response.data;
};

export const getMovie = async (movieId) => {
    const response = await api.get(`${MOVIE_API}/${movieId}`);
    return response.data;
};

export const reviewMovie = async ({movie, review}) => {
    const res = await api.post(`${MOVIE_API}/${movie.movieId}/review`, {movie, review});
    return res.data;
}