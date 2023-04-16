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
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                        <tr>
                            {results.map((result) => {
                                return (
                                    <td>
                                        <Link to={`/details/${result.id}`}>
                                            <img src={result.image} alt="" width={300} height={300}/>
                                            <br/>
                                            <p className="h4">{result.title}</p>
                                        </Link>
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

export default Search;