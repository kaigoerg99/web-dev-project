import { createSlice } from "@reduxjs/toolkit";
import { likeMovieThunk } from "../services/likes-thunks";
import { getLikesThunk } from "../services/users-thunks";

const initialState = {likes: []};

const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},
    extraReducers: {
        [likeMovieThunk.fulfilled]: (state, {payload}) => {
            state.likes.push(payload);

        },
        [getLikesThunk.fulfilled]: (state, {payload}) => {
            state.likes = payload;
        }
    },
});

export default likesSlice.reducer;