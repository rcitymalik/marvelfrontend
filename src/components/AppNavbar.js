import {useDispatch,useSelector} from "react-redux";
import {selectSearchBar} from "../store/characters/selector";
import {OffCanvasSearchShow} from "../store/characters/characterSlice";
import {Link} from "react-router-dom";
import {selectToken} from "../store/user/userSelectors";
import {logOut} from "../store/user/usersSlice";
import {selectUser} from "../store/user/userSelectors";


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const AppNavbar = () =>{

    const token = useSelector(selectToken);
    const searchResults = useSelector(selectSearchBar)
    console.log("search result",searchResults)

    const dispatch = useDispatch();

    const profile = useSelector(selectUser)
    console.log(profile);
    const name = profile?.name;

    const id = profile?.id;
    return(
        <Navbar bg="dark" variant="dark" expand="lg" >
            <Container fluid>
                <Navbar.Brand as={Link} to={"/"}><img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png'
                    width="95"
                    height="35"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {profile ? <Nav.Link as={Link} to={`/profile/${id}`}>{name.toUpperCase()}</Nav.Link> :""}
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Marvel Comic Universe" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/allCharacters"}>
                                Marvel Characters
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button style={{marginRight:'25px'}} variant="outline-dark" onClick={()=>{dispatch(OffCanvasSearchShow())}}>🔍</Button>
                    {token ? <Button variant="outline-danger" onClick={()=>dispatch(logOut())}>Logout</Button> :
                        <Link to="/login">
                            <Button variant="outline-light">Log In</Button>
                        </Link>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

};