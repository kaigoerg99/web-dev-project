import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { popularMoviesAPI, inTheatersAPI } from "../../imdb/service";
import { useDispatch, useSelector } from "react-redux";
import { likeMovieThunk } from "../../services/likes-thunks";
import { getMovie } from "../../services/likes-service";


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [popularMovies, setPopularMovies] = useState([]);
    const [moviesInTheaters, setMoviesInTheaters] = useState([]);
    const [recentLike, setRecentLike] = useState('');
    const {likes} = useSelector((state) => state.likes);
    const { currentUser } = useSelector((state) => state.users);

    useEffect(() => {
        //fetchCurrentMovies();
    }, []);

    useEffect(() => {
        if (currentUser && likes.length > 0 && currentUser.role === 'viewer') {
            const lastMovieId = likes.slice(-1)[0].movieId;
            retrieveRecentLike(lastMovieId);
        }
    }, [currentUser, likes]);

    const fetchCurrentMovies = async () => {
        const popMovies = await getPopularMovies();
        setPopularMovies(popMovies);
        const moviesInTheater = await getMoviesInTheater();
        setMoviesInTheaters(moviesInTheater);
    };

    const getPopularMovies = async () => {
        const res = await popularMoviesAPI();
        if (res.data.items.length === 0) {
            return [];
        }
        return res.data.items;
    };
    const getMoviesInTheater = async () => {
        const res = await inTheatersAPI();
        if (res.data.items.length === 0) {
            return [];
        }
        return res.data.items;
    };

    const onLike = (result) => {
        if (currentUser) {
            dispatch(likeMovieThunk({name: result.title, movieId: result.id}));
        } else {
            navigate('/login');
        }
    }

    const retrieveRecentLike = async (movieId) => {
        const res = await getMovie(movieId);
        setRecentLike(res.name);
        return res.name;
    }

    return (
        <>
            {
                currentUser && likes.length > 0 && recentLike && currentUser.role === 'viewer' && <>
                    <p className="lead">Most Recent Like: {recentLike}</p>
                </>
            }
            {
                currentUser && currentUser.role === 'critic' && <>
                    <p className="lead">Most Recent Movie Reviewed: </p>
                </>
            }
            <p className="lead">Most Popular Current Movies</p>
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                        <tr>
                    {popularMovies.map((result) => {
                    return (
                        <td>
                            <div className="card m-2" style={{"width": "300px", "height": "480px"}}>
                                <img className="card-img-top" src={result.image} alt="" width={300} height={300}/>
                                <div className="card-body">
                                    <h5 className="card-title">{result.title}</h5>
                                    <p className="card-text">{result.description}</p>
                                    <Link className="card-link" to={`/details/${result.id}`}>View details</Link>
                                    <br></br>
                                    {(likes.filter(movie => movie.movieId === result.id).length > 0) ?
                                        <i className="bi bi-heart-fill"></i>
                                        :
                                        <i className="bi bi-heart" onClick={() => onLike(result)}></i>
                                    }
                                </div>
                            </div>
                        </td>
                    );
                })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="lead">Movies in Theaters</p>
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                        <tr>
                    {moviesInTheaters.map((result) => {
                    return (
                        <td>
                            <div className="card m-2" style={{"width": "300px", "height": "480px"}}>
                                <img className="card-img-top" src={result.image} alt="" width={300} height={300}/>
                                <div className="card-body">
                                    <h5 className="card-title">{result.title}</h5>
                                    <p className="card-text">{result.description}</p>
                                    <Link className="card-link" to={`/details/${result.id}`}>View details</Link>
                                    <br></br>
                                    {(likes.filter(movie => movie.movieId === result.id).length > 0) ?
                                        <i className="bi bi-heart-fill"></i>
                                        :
                                        <i className="bi bi-heart" onClick={() => onLike(result)}></i>
                                    }
                                </div>
                            </div>
                        </td>
                    );
                })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home;