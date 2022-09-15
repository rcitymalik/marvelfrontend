import {useSelector,useDispatch} from "react-redux";
import {selectCharacterForModal, selectShowModal} from "../store/characters/selector";
import {Button, Modal} from "react-bootstrap";
import {modalShow} from "../store/characters/characterSlice";
import {Link} from "react-router-dom";


export const OneCharacterModal = () =>{

    const modalCharacter = useSelector(selectCharacterForModal);
    const showModal = useSelector(selectShowModal);

    const dispatch = useDispatch();

    return(
        <>
            <Modal
                show={showModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{modalCharacter.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalCharacter.description.length > 1 ? modalCharacter.description : "Marvel gave us no description for this one"}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{dispatch(modalShow())}}>
                        Close
                    </Button>
                    <Link to={`/details/${modalCharacter.id}`}>
                        <Button variant="primary" onClick={()=>{dispatch(modalShow())}}>More Info</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}