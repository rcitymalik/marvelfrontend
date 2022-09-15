import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    authToken: localStorage.getItem("token"),
    currentProfile: null,
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginSuccess:(state, action)=>{
            localStorage.setItem("token",action.payload.token);
            state.authToken = action.payload.token;
            state.currentProfile = action.payload.user;
        },
        logOut:(state, action)=>{
            localStorage.removeItem("token");
            state.authToken = null;
            state.currentProfile = null;
        },
        tokenStillValid:(state, action)=>{
            state.currentProfile = action.payload.user;
        },
    }
})

export const {loginSuccess,logOut,tokenStillValid} = userSlice.actions;

export default userSlice.reducer;