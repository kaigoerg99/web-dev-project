import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { popularMoviesAPI } from "../../imdb/service";


const Home = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        const movies = await getPopularMovies();
        setResults(movies);
    };

    fetchData();
    }, []);

    const getPopularMovies = async () => {
        const res = await popularMoviesAPI();
        if (res.data.items.length === 0) {
            return [];
        }
        return res.data.items;
    };

    return (
        <>
            <p className="lead">Most Popular Movies</p>
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
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Home;