import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { searchMovie } from "../../imdb/service";

const Search = () => {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
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

    return (
        <>
            <p className="lead">Search results for {searchTerm}</p>
            <div className="row" >
                {results.map((result) => {
                    return (
                        <div className="col">
                            <div className="card m-2" style={{"width": "300px", "height": "450px"}}>
                                <img className="card-img-top" src={result.image} alt="" width={300} height={300}/>
                                <div className="card-body">
                                    <h5 class="card-title">{result.title}</h5>
                                    <p class="card-text">{result.description}</p>
                                    <Link className="card-link" to={`/details/${result.id}`}>View details</Link>
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