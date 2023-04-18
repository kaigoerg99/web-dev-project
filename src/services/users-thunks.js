import * as userService from "./users-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
    "users/login",
    async (user, thunkAPI) => await userService.login(user)
);

export const profileThunk = createAsyncThunk(
    "users/profile",
    async (user, thunkAPI) => {
        return await userService.profile();
    }
);