import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {logoutThunk, profileThunk} from "../../services/users-thunks";
import {useNavigate, useParams} from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getProfile = async () => {
        const action = await dispatch(profileThunk());
        setProfile(action.payload);
    }
    const logout = async () => {
        await dispatch(logoutThunk());
        navigate("/login");
    };
    useEffect(() => {
        if (username) {
            // TODO: Change to user retrieval
            getProfile();
        } else {
            getProfile();
        }
    }, []);
    return (
        <div>
            <label>Username</label>
            <input
                type="text"
                className="form-control"
                value={profile.username}
                onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                }
            />
            <label>Email</label>
            <input
                type="text"
                className="form-control"
                value={profile.email}
                onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                }
            />
            <label>Role</label>
            <input
                type="text"
                className="form-control"
                value={profile.role}
                onChange={(e) =>
                    setProfile({ ...profile, profile: e.target.value })
                }
            />
            <button onClick={() => logout()} className="btn btn-danger">
                Logout
            </button>
        </div>
    )
}
export default Profile;