import {Button, Card, Offcanvas} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import {selectSearchBar, selectShowOffCanvasSearch} from "../store/characters/selector";
import {OffCanvasSearchShow,searchBarResult} from "../store/characters/characterSlice";
import Form from "react-bootstrap/Form";
import {fetchCharacterByName} from "../store/characters/characteractions";
import {Link} from "react-router-dom";

export const OffCanvasSearch = ()=>{
    const dispatch = useDispatch();
    const OffCanvas = useSelector(selectShowOffCanvasSearch);
    const searchResults = useSelector(selectSearchBar)
    return(
        <Offcanvas show={OffCanvas} placement="end">
            <Offcanvas.Header>
                <Offcanvas.Title></Offcanvas.Title><Button variant="outline-light" onClick={()=>{dispatch(OffCanvasSearchShow());dispatch(searchBarResult(null))}}>❌</Button>
            </Offcanvas.Header>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e)=>{ dispatch(fetchCharacterByName(e.target.value))}}
                />
            </Form>
            <Offcanvas.Body>
                {searchResults ?
                    <div>
                        <ul style={{listStyle:'none'}}>
                            {searchResults.map((result,index)=>{
                                return(
                                    <li key={index}>
                                        <Card style={{ width: '13rem', margin:'5px', background:'#29273f'}}>
                                            <Card.Img variant="top" src={`${result.thumbnail.path}/portrait_incredible.jpg`} style={{ width: '205px',height:'150px'}}/>
                                            <Link to={`/details/${result.id}`}>
                                                <Button onClick={()=>{dispatch(OffCanvasSearchShow())}} variant="info" style={{transform: 'rotate(2deg)', alignSelf:'center', margin:'5px',
                                                    padding:'0 5px',
                                                    background:'#ddd',
                                                    border:'1px solid #222',
                                                    boxShadow:'3px 3px 0 #222'}}><Card.Title>{result.name}</Card.Title></Button>
                                            </Link>

                                        </Card>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    :""}
            </Offcanvas.Body>
        </Offcanvas>
    )
}