import {Modal, Button, Card,Row,Col} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {showMyAuctionsModal} from "../store/proposals/proposalSlice";
import {selectMyAuctionsModal} from "../store/proposals/proposalSelctors";
import {useEffect} from "react";
import {fetchAuctions} from "../store/proposals/proposalActions";

import {selectUser} from "../store/user/userSelectors";
import {selectAuctions} from "../store/proposals/proposalSelctors";

export const SeeMyAuctions = () =>{

    const dispatch = useDispatch();
    const profile = useSelector(selectUser);
    const userId = profile?.id;
    const auctions = useSelector(selectAuctions);
    const show = useSelector(selectMyAuctionsModal)

    const userAuctions = auctions.filter(auction =>{
        if(auction.userId === userId){
            return(
                auction
            )
        }
    });

    console.log("user auctions",userAuctions)

    useEffect(()=>{
        dispatch(fetchAuctions())
    },[])

    return(
        <>
            {userAuctions ?
                <Modal show={show} fullscreen={true}>
                    <Modal.Header>
                        <p>  </p><Button style={{float:"right"}} variant="outline-light" onClick={()=>{dispatch(showMyAuctionsModal())}}>❌</Button>
                    </Modal.Header>
                    {userAuctions.map(auction=>{
                        return(
                            <Card style={{ width: '15rem', margin:'5px', background:'whitesmoke'}}>
                                <Card.Title>{auction?.productName}</Card.Title>
                                <Card.Img variant="top" src={auction?.productImg} style={{ width: '205px',height:'150px'}}/>
                                <br/>
                                <Card.Subtitle>Your asking price: ${auction?.minBid}</Card.Subtitle>
                                <br/>
                                <Card.Body>Proposals:
                                    <Row>
                                        {auction.bids.map(bid=>{
                                            return(
                                                <Col style={{display:"inline-flex"}}>
                                                    <h6>${bid.ammount}</h6> <Button style={{marginLeft:"10px"}}>Approve</Button>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Modal>
                :""}
        </>
    )
}