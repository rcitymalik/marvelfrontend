import {useSelector,useDispatch} from "react-redux";
import {selectOneAuction,selectAuctionModal} from "../store/proposals/proposalSelctors";
import {showAuctionDetailModal} from "../store/proposals/proposalSlice";
import {Modal, Button, Card, Form} from "react-bootstrap";
import {selectToken} from "../store/user/userSelectors";
import {useState} from "react";
import {selectUser} from "../store/user/userSelectors";
import {postProposals} from "../store/proposals/proposalActions";

export const AuctionDetails = () =>{

    const dispatch = useDispatch();
    const profile = useSelector(selectUser);
    const modal = useSelector(selectAuctionModal);
    const auction = useSelector(selectOneAuction);
    const auctionId = auction?.id;
    const userId = profile?.id;
    const auctionUser = auction?.userId
    const token = useSelector(selectToken);
    console.log("auction details",auction);

    const [proposal,setProposal]= useState(0);
    console.log(proposal);

    const handleSubmit =()=>{
        const ammount = proposal;
        const newProposal = {ammount,auctionId,userId};
        console.log(newProposal)
    }

    return(
        <>
            {auction ? <Modal show={modal} fullscreen={true} >
                <Modal.Header>
                    <p>  </p><Button style={{float:"right"}} variant="outline-light" onClick={()=>{dispatch(showAuctionDetailModal())}}>❌</Button>
                </Modal.Header>
                <Modal.Title style={{textAlign:"center"}}>{(auction.productName).toUpperCase()}</Modal.Title>
                <Modal.Body>
                    <Card style={{border:"none"}}>
                        <Card.Img variant="top" src={auction.productImg}
                                  style={{width:'650px',height:'550px',marginTop:"10px"
                                      ,alignContent:'center', marginLeft:'auto'
                                      , marginRight: 'auto', fontSize: "1.6rem",
                                      display: "grid", placeItems: "center",
                                      minHeight: "200px", border: "8px solid",
                                      padding: "1rem", borderImage: "linear-gradient(to left, turquoise, greenyellow) 1 0"
                                  }}/>
                        <br/>
                        <Card.Subtitle as="h4">{auction.productDescription}</Card.Subtitle>
                        <br/>
                        <Card.Subtitle as="h5">Type: {auction.productType}</Card.Subtitle>
                        <br/>
                        <Card.Subtitle as="h5">Condition: {auction.productCondition}</Card.Subtitle>
                        <br/>
                        <Card.Subtitle as="h5">Min. Bid: ${auction.minBid}</Card.Subtitle>
                        <br/>
                        <Card.Title as="h5">Previous Bids: {auction.bids.map((bid,index)=>{
                            return(
                                <Card.Body key={index}>
                                    <Card.Subtitle>${bid.ammount}</Card.Subtitle>
                                </Card.Body>
                            )
                        })}</Card.Title>
                        <br/>
                        <Card.Footer>
                            {
                                auctionUser === userId || !token ? "" :
                                    <Form style={{width:"180px"}}>
                                        <Form.Group>
                                            <Form.Label>Enter Your Bid</Form.Label>
                                            <Form.Control style={{width:"130px",marginBottom:"5px"}} type="Number" placeholder={`Your bid`} value={proposal} onChange={(e)=>{setProposal(e.target.value)}} />
                                            <Button onClick={handleSubmit} >Make Proposal</Button>
                                        </Form.Group>
                                    </Form>
                            }

                        </Card.Footer>
                    </Card>
                </Modal.Body>
            </Modal> :""}
        </>
    )
}