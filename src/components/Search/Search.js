import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchAPI } from "../API/service";

const Search = () => {
    const { searchTerm } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            getResults();
        }
    }, [searchTerm]);

    const getResults = async () => {
        const res = await searchAPI(searchTerm);
        setResults(res.data.results);
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
                                        <img src={result.image} alt="" width={300} height={300}/>
                                        <br/>
                                        <p className="h4">{result.title}</p>
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