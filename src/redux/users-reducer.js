import { createSlice } from "@reduxjs/toolkit";
import {loginThunk, logoutThunk, registerThunk, profileThunk, updateUserThunk} from "../services/users-thunks";

const usersSlice = createSlice({
    name: "users",
    initialState: {currentUser: null},
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, {payload}) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
});

export default usersSlice.reducer;