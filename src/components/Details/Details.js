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
        <div>
            <h1>{movie.title}</h1>
            {/* {currentUser && (
                <button
                onClick={() => {
                    likeAlbum({ name: album.name, albumId: album.id });
                }}
                className="btn btn-warning"
                >
                Like
                </button>
            )} */}
            <br />
            <img alt="" src={movie.image} height={300} width={300}/>
            {/* {currentUser && (
                <>
                <h2>Review this album</h2>
                <textarea className="form-control"></textarea>
                <button className="btn btn-primary">Submit</button>
                </>
            )} */}
            <h2>Actors</h2>
        </div>
    )
}

export default Details;