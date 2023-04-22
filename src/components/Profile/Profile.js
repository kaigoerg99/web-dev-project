import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, updateUserThunk} from "../../services/users-thunks";
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

    const updateEmail = async () => {
        if (profile && currentUser && profile.email !== currentUser.email) {
            await dispatch(updateUserThunk(profile));
        };
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
            <div className="my-2">
                <button onClick={() => updateEmail()} className="btn btn-primary">
                    Update Email
                </button>
            </div>
            <button onClick={() => logout()} className="btn btn-danger">
                Logout
            </button>
            </>}
        </div>
    )
}
export default Profile;