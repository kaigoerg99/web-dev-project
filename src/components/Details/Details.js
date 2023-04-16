import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovie } from "../../imdb/service";

const Details = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        if (id) {
            getMoviData();
        }
    }, [id]);

    const getMoviData = async () => {
        const res = await getMovie(id);
        console.log(res);
        setMovie(res.data);
    }
    return (
        <div className="container">
            <h1 className="display-4">{movie.fullTitle}</h1>
            <h6 className="mb-1">{movie.plot}</h6>
            <div className="row">
                <div className="col">
                    <img alt="" src={movie.image} style={{"maxWidth": 400}}/>
                </div>
                <dl className="col row">
                    <dt className="col-sm-3">Content Rating</dt>
                    <dd className="col-sm-9">{movie.contentRating}</dd>
                    <dt className="col-sm-3">Directors</dt>
                    <dd className="col-sm-9">{movie.directors}</dd>
                    <dt className="col-sm-3">Genres</dt>
                    <dd className="col-sm-9">{movie.genres}</dd>
                    <dt className="col-sm-3">IMDB Rating</dt>
                    <dd className="col-sm-9">{movie.imDbRating}</dd>
                    <dt className="col-sm-3">Release Date</dt>
                    <dd className="col-sm-9">{movie.releaseDate}</dd>
                    <dt className="col-sm-3">Run Time</dt>
                    <dd className="col-sm-9">{movie.runtimeStr}</dd>
                    <dt className="col-sm-3">Stars</dt>
                    <dd className="col-sm-9">{movie.stars}</dd>
                </dl>
            </div>
        </div>
    )
}

export default Details;