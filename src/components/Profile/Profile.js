import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, updateUserThunk} from "../../services/users-thunks";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as userService from "../../services/users-service";
import * as likesService from "../../services/likes-service";

const Profile = () => {
    const { userId } = useParams();
    const { likes } = useSelector((state) => state.likes);
    const { currentUser } = useSelector((state) => state.users);
    const [ profile, setProfile] = useState({});
    const [ userLikes, setUserLikes] = useState([]);
    const [ likedMovies, setLikedMovies] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProfile = async () => {
        const user = await userService.findUserById(currentUser._id);
        setProfile(user);
    };

    const getUserByUserId = async () => {
        const user = await userService.findUserById(userId);
        setProfile(user);
    };

    const logout = async () => {
        await dispatch(logoutThunk());
        navigate("/login");
    };

    const updateEmail = async () => {
        if (profile && currentUser && profile.email !== currentUser.email) {
            await dispatch(updateUserThunk(profile));
        };
    };

    const getUserLikes = async (userId) => {
        const res = await userService.getLikes(userId);
        setUserLikes(res);
    };

    console.log(likedMovies);

    useEffect(() => {
        if (userId) {
            getUserByUserId();
        } else if (currentUser) {
            getProfile();
        }
    }, [userId, currentUser]);

    useEffect(() => {
        if (userId) {
            getUserLikes(userId);
        } else if (currentUser) {
            setUserLikes(likes);
        };
    }, [userId, currentUser, likes]);

    useEffect(() => {
        setLikedMovies([]);
        userLikes.map(async (like) => {
            const res = await likesService.getMovie(like.movieId);
            setLikedMovies(likedMovies => [...likedMovies, res]);
        });
    }, [userLikes]);

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
                value={profile.email}
                onChange={(e) => {
                    setProfile({ ...profile, email: e.target.value });
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
            :
            <p>No movies liked</p>
            }
            {currentUser && !userId && <div className="my-2"><button onClick={() => logout()} className="btn btn-danger">
                Logout
            </button></div>}
        </div>
    )
}
export default Profile;