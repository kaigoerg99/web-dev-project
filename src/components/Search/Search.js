import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { likeMovie, searchMovie } from "../../imdb/service";
import { useSelector } from "react-redux";

const Search = () => {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.users);
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
            likeMovie({name: result.title, movieId: result.id});
        } else {
            navigate('/login');
        }
    }

    return (
        <>
            <p className="lead">Search results for {searchTerm}</p>
            <div className="row " >
                {results.map((result) => {
                    return (
                        <div className="col">
                            <div className="card m-2" style={{"width": "300px", "height": "480px"}}>
                                <img className="card-img-top" src={result.image} alt="" width={300} height={300}/>
                                <div className="card-body">
                                    <h5 className="card-title">{result.title}</h5>
                                    <p className="card-text">{result.description}</p>
                                    <Link className="card-link" to={`/details/${result.id}`}>View details</Link>
                                    <br></br>
                                    <i className="bi bi-heart" onClick={() => onLike(result)}></i>
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