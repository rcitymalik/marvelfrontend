import {selectAuctions,selectAuctionModal} from "../store/proposals/proposalSelctors";
import {fetchAuctions} from "../store/proposals/proposalActions";
import {Container,Row,Col,Card,Button} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {useEffect} from "react";
import {oneAuctionFetched, showAuctionDetailModal} from "../store/proposals/proposalSlice";
import {AuctionDetails} from "./AuctionDetails";

export const AllAuctions = () =>{

    const dispatch = useDispatch()
    const auctions = useSelector(selectAuctions)

    useEffect(()=>{
        dispatch(fetchAuctions())
    },[dispatch])

    const oneAuction = (auction)=>{
        dispatch(oneAuctionFetched(auction))
        dispatch(showAuctionDetailModal())
    }

    console.log(auctions)

    return(
        <Container>
            <AuctionDetails/>
            <Row>
                {auctions ? auctions.map((auction,index) =>{
                    return(
                        <Col key={index}>
                            <Card style={{ width: '18rem', margin:'5px', background:'#e2ebc5'}}>
                                <Card.Img variant="top" src={auction.productImg} style={{ width: '286px',height:'280px'}}/>
                                <Button onClick={()=>{oneAuction(auction)}} variant="outline-secondary" style={{textDecoration:"none"}} to={`/auction/${auction.id}`}>
                                    <Card.Title style={{textAlign:"center",textDecoration:"none"}}>{(auction.productName).toUpperCase()}</Card.Title>
                                </Button>
                                <Card.Subtitle style={{marginBottom:"5px"}}>Type: {(auction.productType).toUpperCase()}</Card.Subtitle>
                                <Card.Subtitle>Bid Start's: ${auction.minBid} </Card.Subtitle>
                            </Card>
                        </Col>
                    )
                }): ""}
            </Row>
        </Container>
    )
}