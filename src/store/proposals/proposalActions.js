import axios from "axios";
import {auctionsFetched,oneAuctionFetched} from "./proposalSlice";
import {backEndUrl} from "../../config/constants";

export const fetchAuctions = ()=>{
    return async (dispatch) =>{
        try {
            const response = await axios.get(`${backEndUrl}/getauction`)
            console.log(response.data)
            dispatch(auctionsFetched(response.data))
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const postProposals = ({ammount,auctionId,userId})=>{
    return async (dispatch,getState) =>{
        try {
            const {authToken} = getState().user
            if (authToken === null) return
            const response = await axios.post(`${backEndUrl}/postauctionproposal`,{ammount,auctionId,userId},{
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response)
        }
        catch (e) {
            console.log(e.message)
        }
    }
}

export const postAuction = ({productName,productDescription,productImg,productCondition,productType,minBid})=>{
    return async (dispatch,getState)=>{
        try {
            const {authToken} = getState().user
            if(authToken === null) return
            const response = await axios.post(`${backEndUrl}/postauction`,{productName,productDescription,productImg,productCondition,productType,minBid},{
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response)
        }
        catch (e) {
            console.log(e.message)
        }
    }
}