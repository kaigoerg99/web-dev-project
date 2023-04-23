import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {popularMoviesAPI, inTheatersAPI} from "../../imdb/service";
import {useDispatch, useSelector} from "react-redux";
import {likeMovieThunk} from "../../services/likes-thunks";
import {getMovie} from "../../services/likes-service";


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [popularMovies, setPopularMovies] = useState([]);
    const [moviesInTheaters, setMoviesInTheaters] = useState([]);
    const [recentLike, setRecentLike] = useState('');
    const {likes} = useSelector((state) => state.likes);
    const {currentUser} = useSelector((state) => state.users);

    useEffect(() => {
        //fetchCurrentMovies();
    }, []);

    useEffect(() => {
        if (currentUser && likes.length > 0) {
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
            dispatch(likeMovieThunk({name: result.title, movieId: result.id, image: result.image}));
        } else {
            navigate('/login');
        }
    };

    const retrieveRecentLike = async (movieId) => {
        const res = await getMovie(movieId);
        setRecentLike(res);
    };

    return (
        <>
            {
                currentUser && likes.length > 0 && recentLike && <>
                    <h2>Most Recently Liked Movie</h2>
                    <div className="card m-2" style={{"width": "300px", "height": "530px", "overflowY": "hidden"}}>
                        <img className="card-img-top" src={recentLike.image} alt="" width={394} height={520}/>
                        <div className="card-body">
                            <h5 className="card-title" class="text-truncate">{recentLike.name}</h5>
                            <div className="row">
                                <div className="col-10">
                                    <Link className="card-link" to={`/details/${recentLike.movieId}`}>View details</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            <h2>Most Popular Current Movies</h2>
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                    <tr>
                        {popularMovies.map((result) => {
                            return (
                                <td>
                                    <div className="card m-2" style={{"width": "300px", "height": "530px", "overflowY": "hidden"}}>
                                        <img className="card-img-top" src={result.image} alt="" width={394}
                                             height={520}/>
                                        <div className="card-body">
                                            <h5 className="card-title" class="text-truncate">{result.title}</h5>
                                            <div className="row">
                                                <div className="col-10">
                                                    <Link className="card-link" to={`/details/${result.id}`}>View
                                                        details</Link>
                                                </div>
                                                <div className="col">
                                                    {(likes.filter(movie => movie.movieId === result.id).length > 0) ?
                                                        <i className="bi bi-heart-fill"></i>
                                                        :
                                                        <i className="bi bi-heart" onClick={() => onLike(result)}></i>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                    </tbody>
                </table>
            </div>
            <h2>Movies in Theaters</h2>
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                    <tr>
                        {moviesInTheaters.map((result) => {
                            return (
                                <td>
                                    <div className="card m-2" style={{"width": "300px", "height": "530px", "overflowY": "hidden"}}>
                                        <img className="card-img-top" src={result.image} alt="" width={394}
                                             height={520}/>
                                        <div className="card-body">
                                            <h5 className="card-title" class="text-truncate">{result.title}</h5>
                                            <div className="row">
                                                <div className="col-10">
                                                    <Link className="card-link" to={`/details/${result.id}`}>View
                                                        details</Link>
                                                </div>
                                                <div className="col">
                                                    {(likes.filter(movie => movie.movieId === result.id).length > 0) ?
                                                        <i className="bi bi-heart-fill"></i>
                                                        :
                                                        <i className="bi bi-heart" onClick={() => onLike(result)}></i>
                                                    }
                                                </div>
                                            </div>
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