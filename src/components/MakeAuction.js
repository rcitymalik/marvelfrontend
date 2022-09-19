import {Modal, Button, ButtonGroup, Form,ToggleButton} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {postAuction} from "../store/proposals/proposalActions";
import {showAuctionDetailModal, showMakeAuctionModal} from "../store/proposals/proposalSlice";
import {selectmakeAuctionModal} from "../store/proposals/proposalSelctors";
import {useState} from "react";

export const MakeAuction = () =>{

    const dispatch = useDispatch();

    const [productName,setProductName]=useState("");
    const [productDescription,setProductDescription]=useState("");
    const [productImg,setProductImg]=useState("");
    const [minBid,setMinBid]=useState(0);
    const [productCondition, setProductCondition] = useState("");
    const [productType,setProductType] = useState("");

    const handleSubmit = ()=>{
        const newAuction = {productName,productDescription,productImg,productCondition,productType,minBid}
        console.log(newAuction)
    }

    const show = useSelector(selectmakeAuctionModal)
    return(
        <>
            <Modal show={show}>
                <Modal.Header>
                    <p>  </p><Button style={{float:"right"}} variant="outline-light" onClick={()=>{dispatch(showMakeAuctionModal())}}>❌</Button>
                </Modal.Header>
                <Modal.Title style={{textAlign:"center"}}>Your Auction Details</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control style={{border:"solid"}} type="text" plaintext="Product Name" value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control style={{border:"solid"}} type="text" plaintext="Product Description" value={productDescription} onChange={(e)=>{setProductDescription(e.target.value)}}/>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="formBasicNumber">
                            <Form.Label>Minimum Bid</Form.Label>
                            <Form.Control style={{border:"solid"}} type="Number" plaintext="Your Minimum asking Price" value={minBid} onChange={(e)=>{setMinBid(e.target.value)}}/>
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <select
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                            >
                                <option></option>
                                <option value="Toys">Toys</option>
                                <option value="Comics">Comics</option>
                            </select>
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Condition</Form.Label>
                            <select
                                value={productCondition}
                                onChange={(e) => setProductCondition(e.target.value)}
                            >
                                <option></option>
                                <option value="Mint">Mint</option>
                                <option value="Near Mint">Near Mint</option>
                                <option value="Average">Average</option>
                            </select>
                        </Form.Group>
                        <Button onChange={handleSubmit}>Auction</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}