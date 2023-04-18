import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { popularMoviesAPI, inTheatersAPI } from "../../imdb/service";


const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [moviesInTheaters, setMoviesInTheaters] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        // const popMovies = await getPopularMovies();
        // setPopularMovies(popMovies);
        // const moviesInTheater = await getMoviesInTheater();
        // setMoviesInTheaters(moviesInTheater);
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
    const getMoviesInTheater = async () => {
        const res = await inTheatersAPI();
        if (res.data.items.length === 0) {
            return [];
        }
        return res.data.items;
    };

    return (
        <>
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