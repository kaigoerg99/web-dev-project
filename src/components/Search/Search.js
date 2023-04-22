import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {searchMovie} from "../../imdb/service";
import {useDispatch, useSelector} from "react-redux";
import {likeMovieThunk} from "../../services/likes-thunks";

const Search = () => {
    const {searchTerm} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.users);
    const {likes} = useSelector((state) => state.likes);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            getResults();
        }
    }, [searchTerm]);

    const getResults = async () => {
        const res = await searchMovie(searchTerm);
        setResults(res.data.results);
        if (res.data.results.length === 0) {
            navigate('/search');
        }
    }

    const onLike = (result) => {
        if (currentUser) {
            dispatch(likeMovieThunk({name: result.title, movieId: result.id, image: result.image}));
        } else {
            navigate('/login');
        }
    }

    return (
        <>
            <p className="lead">Search results for {searchTerm}</p>
            <div className="row ">
                {results.map((result) => {
                    return (
                        <div className="col">
                            <div className="card m-2" style={{"width": "300px", "height": "530px"}}>
                                <img className="card-img-top" src={result.image} alt="" width={394} height={520}/>
                                <div className="card-body">
                                    <h5 className="card-title" class="text-truncate">{result.title}</h5>
                                    <div className="row">
                                        <div className="col-10">
                                            <Link className="card-link" to={`/details/${result.id}`}>View details</Link>
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
                        </div>
                    );
                })}
            </div>
        </>
    )
}

    export default Search;