import React from "react";
import { useParams } from "react-router-dom";

const Search = ({results}) => {
    const { searchTerm } = useParams();

    return (
        <div>
            {searchTerm}
        </div>
    )
}

export default Search;