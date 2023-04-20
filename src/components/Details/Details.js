import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getMovie } from "../../imdb/service";
import { useSelector } from "react-redux";

const Details = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const { currentUser } = useSelector((state) => state.users);

    useEffect(() => {
        if (id) {
            getMovieData();
        }
    }, [id]);

    const getMovieData = async () => {
        const res = await getMovie(id);
        setMovie(res.data);
    }

    const submitReview = () => {
        navigate(`/review/${id}/${movie.title}`);
    }

    return (
        <div className="container">
            <h1 className="display-4">{movie.fullTitle}</h1>
            <div className="my-5"><h6 className="text-start">{movie.plot}</h6></div>
            <div className="row mb-3">
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
            {
                currentUser && currentUser.role === 'critic' && <button type="button" className="btn btn-primary" onClick={submitReview}>Review Movie</button>
            } 
        </div>
    )
}

export default Details;