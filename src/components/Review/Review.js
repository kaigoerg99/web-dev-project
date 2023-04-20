import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { reviewMovie } from "../../services/likes-service";

const Review = () => {
    const navigate = useNavigate();
    const { id, title } = useParams();
    const [review, setReview] = useState('');

    const submitReview = async () => {
        if (review) {
            await reviewMovie({movie: {name: title, movieId: id}, review});
            navigate('/profile');
        }
    };

    return (
        <div className="container">
            <div class="form-group mb-3">
                <p className="fs-1">Write a review for {title}</p>
                <textarea class="form-control" placeholder="Insert Review" rows="3" value={review} onChange={(e) => setReview(e.target.value)}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={submitReview}>Submit Review</button>
        </div>
    );
}

export default Review;