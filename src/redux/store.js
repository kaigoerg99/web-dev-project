
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users-reducer";
import likesReducer from "./likes-reducer";

const store = configureStore({
    reducer: {
        users: usersReducer,
        likes: likesReducer
    },
});

export default store;