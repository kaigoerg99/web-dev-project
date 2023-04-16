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
        setMovie(res.data);
    }
    return (
        <div className="container">
            <h1 className="display-4">{movie.fullTitle}</h1>
            <div className="my-5"><h6 className="text-start">{movie.plot}</h6></div>
            <div className="row">
                <div className="col">
                    <img alt="" src={movie.image} style={{"maxWidth": 400}}/>
                </div>
                <dl className="col row">
                    <dt className="col-sm-3"><p className="text-start">Content Rating</p></dt>
                    <dd className="col-sm-9"><p className="text-start">{movie.contentRating}</p></dd>
                    <dt className="col-sm-3"><p className="text-start">Directors</p></dt>
                    <dd className="col-sm-9"><p className="text-start">{movie.directors}</p></dd>
                    <dt className="col-sm-3"><p className="text-start">Genres</p></dt>
                    <dd className="col-sm-9"><p className="text-start">{movie.genres}</p></dd>
                    <dt className="col-sm-3"><p className="text-start">IMDB Rating</p></dt>
                    <dd className="col-sm-9"><p className="text-start">{movie.imDbRating}</p></dd>
                    <dt className="col-sm-3"><p className="text-start">Release Date</p></dt>
                    <dd className="col-sm-9"><p className="text-start">{movie.releaseDate}</p></dd>
                    <dt className="col-sm-3"><p className="text-start">Run Time</p></dt>
                    <dd className="col-sm-9"><p className="text-start">{movie.runtimeStr}</p></dd>
                    <dt className="col-sm-3"><p className="text-start">Stars</p></dt>
                    <dd className="col-sm-9"><p className="text-start">{movie.stars}</p></dd>
                    <dt className="col-sm-3"><p className="text-start">Awards</p></dt>
                    <dd className="col-sm-9"><p className="text-start">{movie.awards}</p></dd>
                </dl>
            </div>
        </div>
    )
}

export default Details;