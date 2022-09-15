import {selectToken} from "../store/user/userSelectors";
import {login} from "../store/user/userActions";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";

export const Login = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = useSelector(selectToken)

    useEffect(() => {
        if (token !== null) {
            navigate("/");
        }
    }, [token, navigate]);

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return(
        <div className="mx-auto d-flex justify-content-center" style={{marginTop:"8%",paddingBottom:"9.5%"}} >
            <Card border="warning" text='light' bg='dark' style={{ width: '40%' }}>
                <img style={{alignSelf:"center",marginTop:"5px",marginBottom:"5px"}}
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png'
                    width="95"
                    height="35"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                <Card.Title style={{textAlign:"center",fontWeight:"700"}}>WELCOME</Card.Title>
                <Card.Subtitle style={{textAlign:"center"}}>Log in to the App to continue</Card.Subtitle>
                <Card.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="outline-light" type="submit">
                            Submit
                        </Button>
                    </Form>
                                <label>Don't have an account? </label>
                                <a style={{marginLeft:"5px"}} href="/signUp">Sign up</a>

                </Card.Body>
            </Card>

        </div>
    )
}