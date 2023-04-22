import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, profileThunk} from "../../services/users-thunks";
import {useNavigate, useParams} from "react-router-dom";
import * as userService from "../../services/users-service";

const Profile = () => {
    const { userId } = useParams();
    const { currentUser } = useSelector((state) => state.users);
    const [ profile, setProfile] = useState({});
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

    useEffect(() => {
        if (userId) {
            getUserByUserId();
        } else if (currentUser) {
            getProfile();
        }
      }, [userId, currentUser]);

      //TODO: Show list of reviews or likes with links

    return (
        <div>
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
            <button onClick={() => {
                //TODO: Update Email
            }} className="btn btn-primary">
                Update Email
            </button>
            <br></br>
            <button onClick={() => logout()} className="btn btn-danger">
                Logout
            </button>
            </>}
        </div>
    )
}
export default Profile;