import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, updateUserThunk} from "../../services/users-thunks";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as userService from "../../services/users-service";
import * as likesService from "../../services/likes-service";

const Profile = () => {
    const { userId } = useParams();
    const { currentUser } = useSelector((state) => state.users);
    const [ newEmail, setNewEmail ] = useState();
    const [ profile, setProfile] = useState({});
    const [ likedMovies, setLikedMovies] = useState([]);
    const [ reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProfile = async () => {
        const user = await userService.getUser(currentUser._id);
        setProfile(user);
    };

    const getUserByUserId = async (userId) => {
        const user = await userService.getUser(userId);
        setProfile(user);
    };

    const logout = async () => {
        await dispatch(logoutThunk());
        navigate("/login");
    };

    const updateEmail = async () => {
        await dispatch(updateUserThunk({ ...profile, email: newEmail }));
    };

    const getUserLikes = async (userId) => {
        const res = await userService.getLikes(userId);
        const movieIds = res.map(like => like.movieId);
        const moviesData = await likesService.getMovies(movieIds);
        setLikedMovies(moviesData);
    };

    const getReviews = async (userId) => {
        const res = await likesService.getReviewsByUser(userId);
        setReviews(res);
    };

    const removeReview = async (reviewId) => {
        await likesService.deleteReview(reviewId);
        window.location.reload(false);
    };

    useEffect(() => {
        if (userId) {
            getUserByUserId(userId);
            getUserLikes(userId);
            getReviews(userId);
        } else {
            if (currentUser) {
                getProfile();
                getUserLikes(currentUser._id);
                getReviews(currentUser._id);
            };
        }
    }, [userId, currentUser]);

    useEffect(() => {
        setNewEmail(profile.email);
    }, [profile]);

    return (
        <div className="container">
            <h1>Information</h1>
            {profile && <>
            <p>Username: {profile.username}</p>
            <p>Role: {profile.role}</p>
            </>}
            {currentUser && !userId && profile && <>
            <label>Email</label>
            <input
                type="text"
                className="form-control"
                value={newEmail}
                onChange={(e) => {
                    setNewEmail(e.target.value);
                }}
            />
            <div className="mt-2">
                <button onClick={() => updateEmail()} className="btn btn-primary">
                    Update Email
                </button>
            </div>
            </>}

            <h1>Likes</h1>
            {(likedMovies.length > 0) ? <>
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                            <tr>
                        {likedMovies.map((result) => {
                        return (
                            <td>
                                <div className="card m-2" style={{"width": "300px", "height": "400px"}}>
                                    <img className="card-img-top" src={result.image} alt="" width={300} height={300}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{result.name}</h5>
                                        <Link className="card-link" to={`/details/${result.movieId}`}>View details</Link>
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
            :
            <p>No movies liked</p>
            }

            {(profile.role === 'critic') && <>
                <h1>Reviews</h1>
                {reviews.length > 0 ? <>
                    {reviews.map((review) => {
                        return (
                            <div className="d-flex justify-content-between">
                                <Link to={`/details/${review.movieId}`}><p>{review.review}</p></Link>
                                <i class="bi bi-trash" onClick={() => removeReview(review._id)} ></i>
                            </div>
                            
                        )
                    })}
                </>
                :
                <p>No movies reviewed</p>
                }  
            </>
            }

            {currentUser && !userId && <div className="my-2"><button onClick={() => logout()} className="btn btn-danger">
                Logout
            </button></div>}
        </div>
    )
}
export default Profile;