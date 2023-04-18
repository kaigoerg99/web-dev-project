import * as userService from "./users-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
    "users/login", async (credentials) => {
        const user = await userService.login(credentials);
        return user;
    }
);

export const registerThunk = createAsyncThunk(
    "users/register", async (credentials) => {
        const user = await userService.register(credentials);
        return user;
    }
);

export const profileThunk = createAsyncThunk(
    "users/profile", async () => {
        return await userService.profile();
    }
);

export const logoutThunk = createAsyncThunk(
    "users/logout", async () => {
        return await userService.logout();
    }
);

export const updateUserThunk = createAsyncThunk(
    "users/updateUser", async (user) => {
        await userService.updateUser(user);
        return user;
    }
);