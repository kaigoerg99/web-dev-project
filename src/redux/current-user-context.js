import { getLikesThunk, profileThunk } from "../services/users-thunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function CurrentUserContext({ children }) {
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.users)

    const getProfile = async () => {
        await dispatch(profileThunk());
    };

    const getLikes = async (userId) => {
        await dispatch(getLikesThunk(userId));
    };

    useEffect(() => {
        getProfile();    
    }, []);

    useEffect(() => {
        if (currentUser) {
            getLikes(currentUser._id);
        }
    }, [currentUser]);

    return children;
}

export default CurrentUserContext;