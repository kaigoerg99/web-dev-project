import * as likesService from "./likes-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const likeMovieThunk = createAsyncThunk(
    "likes/likeMovie", async (movie) => {
        const res = await likesService.likeMovie(movie);
        return res;
    }
)