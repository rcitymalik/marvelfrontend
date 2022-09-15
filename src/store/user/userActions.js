import {backEndUrl} from "../../config/constants";
import axios from "axios";
import {selectToken} from "./userSelectors";
import {appLoading,appDoneLoading,setMessage} from "../appState/appSlice";
import {showMessageWithTimeout} from "../appState/appActions";
import {loginSuccess,logOut,tokenStillValid} from "./usersSlice";


export const signUp = (name,email,password)=>{
    return async (dispatch)=>{
        dispatch(appLoading());
        try {
            const response = await axios.post(`${backEndUrl}/auth/signup`,{
                name,
                email,
                password
            });
            dispatch(loginSuccess({token:response.data.token, user: response.data.user}));
            dispatch(showMessageWithTimeout("success", true, "account created"));
            dispatch(appDoneLoading());
        }
        catch (e) {
            if (e.response) {
                console.log(e.response.data.message);
                dispatch(
                    setMessage({
                        variant: "danger",
                        dismissable: true,
                        text: e.response.data.message,
                    })
                );
            } else {
                console.log(e.message);
                dispatch(
                    setMessage({
                        variant: "danger",
                        dismissable: true,
                        text: e.message,
                    })
                );
            }
            dispatch(appDoneLoading());
        }


    }
}

export const login = (email, password) => {
    return async (dispatch, getState) => {
        dispatch(appLoading());
        try {
            const response = await axios.post(`${backEndUrl}/auth/login`, {
                email,
                password,
            });

            console.log(response)

            dispatch(
                loginSuccess({ token: response.data.token, user: response.data.user })
            );
            dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                dispatch(
                    setMessage({
                        variant: "danger",
                        dismissable: true,
                        text: error.response.data.message,
                    })
                );
            } else {
                console.log(error.message);
                dispatch(
                    setMessage({
                        variant: "danger",
                        dismissable: true,
                        text: error.response.data.message,
                    })
                );
            }
            dispatch(appDoneLoading());
        }
    };
};

export const getUserWithStoredToken = () => {
    return async (dispatch, getState) => {
        // get token from the state
        const token = selectToken(getState());

        // if we have no token, stop
        if (token === null) return;

        dispatch(appLoading());
        try {
            // if we do have a token,
            // check wether it is still valid or if it is expired
            const response = await axios.get(`${backEndUrl}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // token is still valid
            dispatch(tokenStillValid({ user: response.data }));
            dispatch(appDoneLoading());
        } catch (error) {
            if (error.response) {
                console.log(error.response.message);
            } else {
                console.log(error);
            }
            // if we get a 4xx or 5xx response,
            // get rid of the token by logging out
            dispatch(logOut());
            dispatch(appDoneLoading());
        }
    };
};

