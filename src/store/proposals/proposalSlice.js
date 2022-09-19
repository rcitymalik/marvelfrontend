import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    auctions:[],
    oneAuction:null,
    auctionDetailsModal:false,
    makeAuctionModal:false,
    myAuctionsModal:false
}

const proposalSlice = createSlice({
    name:"proposals",
    initialState,
    reducers:{
        auctionsFetched: (state, action)=>{
            state.auctions = action.payload
        },
        oneAuctionFetched: (state, action)=>{
            state.oneAuction = action.payload
        },
        showAuctionDetailModal: (state)=>{
            state.auctionDetailsModal = !state.auctionDetailsModal
        },
        showMakeAuctionModal:(state)=>{
            state.makeAuctionModal = !state.makeAuctionModal
        },
        showMyAuctionsModal:(state)=>{
            state.myAuctionsModal = !state.myAuctionsModal
        }

    }
})

export const {auctionsFetched,oneAuctionFetched,showAuctionDetailModal,showMakeAuctionModal,showMyAuctionsModal} = proposalSlice.actions;
export default proposalSlice.reducer;