import {configureStore} from "@reduxjs/toolkit";

import characterSlice from "./characters/characterSlice";
import userReducer from "./user/usersSlice"

export const index = configureStore({
    reducer:{
        allCharacters: characterSlice,
        user: userReducer,
    }
});