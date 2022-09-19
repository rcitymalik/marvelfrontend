import {configureStore} from "@reduxjs/toolkit";

import characterSlice from "./characters/characterSlice";
import userReducer from "./user/usersSlice";
import proposal from "./proposals/proposalSlice"

export const index = configureStore({
    reducer:{
        allCharacters: characterSlice,
        user: userReducer,
        proposals: proposal,
    }
});