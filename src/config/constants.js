import MD5 from "crypto-js/md5";

export const timeStamp = Date.now().toString();
export const apiUrl = process.env.REACT_APP_API_URL;
export const apiKey = process.env.REACT_APP_API_KEY;
export const privateKey = process.env.REACT_APP_PRIVATE_KEY;
export const secrectHash = MD5(timeStamp+privateKey+apiKey).toString();
export const backEndUrl = "http://localhost:4000";
export const DEFAULT_MESSAGE_TIMEOUT = 2000;
export const giphyApiKey = process.env.REACT_APP_GIFPHY_KEY;
export const giphyApiUrl = "https://api.giphy.com/v1/gifs/";