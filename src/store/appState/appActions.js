import {DEFAULT_MESSAGE_TIMEOUT} from "../../config/constants";
import {setMessage,clearMessage} from "./appSlice";

export const showMessageWithTimeout = (
    variant,
    dismissable,
    text,
    timeOutMilliSeconds
) => {
    return (dispatch) => {
        dispatch(setMessage({ variant, dismissable, text }));

        const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

        setTimeout(() => dispatch(clearMessage()), timeout);
    };
};