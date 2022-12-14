import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    characters:[],
    characterDetails:{},
    showModal:false,
    modalCharacter:null,
    searchBar: null,
    OffCanvasSearchBar:false,
    team:null,
    teamCharacters: null,
    oneCharacterGifs:null,
    eventInformation:{},
    oneCharacter:{},
    characterVideos:[]
}

const characterSlice = createSlice({
    name:"characters",
    initialState,
    reducers:{
        charactersFetched:(state, action)=>{
            console.log("Characters action",action);
            state.characters = [...state.characters,...action.payload]
        },
        characterDetailsFetched: (state, action)=>{
            state.characterDetails = action.payload
        },
        characterToBeModal: (state, action)=>{
            state.modalCharacter = action.payload
        },
        modalShow:(state)=>{
            state.showModal = !state.showModal;
        },
        searchBarResult:(state, action)=>{
            state.searchBar = action.payload;
        },
        OffCanvasSearchShow:(state)=>{
            state.OffCanvasSearchBar = !state.OffCanvasSearchBar;
        },
        teamFetched:(state, action)=>{
            state.team = action.payload;
        },
        teamCharacters: (state, action)=>{
            state.teamCharacters = action.payload;
        },
        characterGifs: (state, action)=>{
            state.oneCharacterGifs = action.payload
        },
        fetchedVideos: (state, action)=>{
            state.characterVideos = action.payload
        },
        eventDetails: (state, action)=>{
            state.eventInformation = action.payload
        },
        oneCharacterDetails: (state, action)=>{
            state.oneCharacter = action.payload
        }
    }
})

export const {charactersFetched,characterDetailsFetched,
    characterToBeModal,modalShow,searchBarResult,
    OffCanvasSearchShow,teamFetched,teamCharacters,
    characterGifs,eventDetails,
    oneCharacterDetails,fetchedVideos} = characterSlice.actions;

export default characterSlice.reducer;