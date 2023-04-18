import { createSlice } from "@reduxjs/toolkit";
import {
    loginThunk,
} from "../services/users-thunks";
const initialState = {
    currentUser: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export default usersSlice.reducer;