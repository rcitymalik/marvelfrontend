import axios from "axios";
import {
    charactersFetched,
    characterDetailsFetched,
    searchBarResult,
    teamFetched,
    teamCharacters, characterGifs
} from "./characterSlice";


import {apiKey, backEndUrl,giphyApiKey,giphyApiUrl} from "../../config/constants";
import {apiUrl} from "../../config/constants";
import {timeStamp} from "../../config/constants";
import {secrectHash} from "../../config/constants";


export const fetchCharacters = ()=>{
    return async (dispatch) =>{
        try {
            const response = await axios.get(`${apiUrl}/characters?limit=50&ts=${timeStamp}&&apikey=${apiKey}&hash=${secrectHash}`);
            const {results} = response.data.data;
            console.log(results)
            dispatch(charactersFetched(results))
        }
        catch (e) {
            console.log(e.message)
        }
    };
};

export const fetchCharacterById = (id)=>{
    return async (dispatch)=>{

        try {
            console.log(`Got the Id ${id}`)
            const response = await axios.get(`${apiUrl}/characters/${id}?ts=${timeStamp}&&apikey=${apiKey}&hash=${secrectHash}`)
            const {results} = response.data.data
            console.log(`Details of single Character`,results)
            dispatch(characterDetailsFetched(results))
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const fetchEvents = (eventUrl)=>{
    return async (dispatch)=>{
        try {
          console.log(`url to get event ${eventUrl}`)  ;
          const response = await axios.get(`${eventUrl}?ts=${timeStamp}&&apikey=${apiKey}&hash=${secrectHash}`);
          const {results} = response.data.data;
          console.log(results);
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const fetchCharacterByName = (words)=>{
    return async (dispatch)=>{
        if (words.length <= 0) return;
        try {
            const response = await axios.get(`${apiUrl}/characters?nameStartsWith=${words}&ts=${timeStamp}&&apikey=${apiKey}&hash=${secrectHash}`)
            const {results} = response.data.data
            console.log(results)
            dispatch(searchBarResult(results))
        }
        catch (e) {
            console.trace(e.message)
        }
    }
}

export const makeTeam = ({name,userId})=>{
    return async (dispatch,getState)=>{
        try {

            const {authToken} = getState().user

            console.log("it is here",authToken)

            if (authToken === null) return

            const response = await axios.post(`${backEndUrl}/newteam`,{name,userId},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
            console.log(response)
        }
        catch (e) {
            console.trace(e.message)
        }
    }
};


export const getTeam = (userId)=>{
    return async (dispatch,getState)=>{

        try {
            console.log("get team thunk", userId)

            const {authToken} = getState().user;

            if (authToken === null) return

            const response = await  axios.get(`${backEndUrl}/getteam`,
                {headers: {
                        Authorization: `Bearer ${authToken}`,id:userId
                    }})
            dispatch(teamFetched(response.data))

            const response2 = await  axios.get(`${backEndUrl}/getteamcharacters`,
                {headers: {
                        Authorization: `Bearer ${authToken}`,id:userId
                    }})
            dispatch(teamCharacters(response2.data))
        }
        catch (e) {
            console.trace(e.message)
        }
    }
};

export const addCharacterToTeam = ({name,apiId,imageUrl,teamId})=>{
    return async (dispatch,getState)=>{
        try {
            const {authToken} = getState().user

            if (authToken === null) return

            console.log("passed the token stage",authToken)

            const response = await axios.post(`${backEndUrl}/newmember`,{name,apiId,imageUrl,teamId},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
            console.log(response)
        }
        catch (e) {
            console.trace(e.message)
        }
    }
};

export const deleteCharacter = (cId)=>{
    return async (dispatch,getState)=>{
        try {
            const {authToken} = getState().user

            if (authToken === null) return

            console.log("passed the token stage",authToken)

            const response = await axios.delete(`${backEndUrl}/deletemember`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,id:cId
                    }
                }
            )
            console.log(response)
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const getCharacterGifs = (word)=>{
    return async (dispatch,getState)=>{
        try {
            const response = await axios.get(`${giphyApiUrl}search?q=${word}&api_key=${giphyApiKey}&limit=6`)
            const result =  response.data.data;
            dispatch(characterGifs(result))
        }
        catch (e) {
            console.log(e.message)
        }
    }
}



