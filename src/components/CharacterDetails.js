import {fetchCharacterById, fetchEvents, addCharacterToTeam, getTeam} from "../store/characters/characteractions";

import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {selectCharacterById,selectTeam} from "../store/characters/selector";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {selectUser} from "../store/user/userSelectors";
import {getCharacterGifs} from "../store/characters/characteractions";
import {selectCharacterGifs} from "../store/characters/selector";
import {Col, Row} from "react-bootstrap";


export const CharacterDetails = () =>{

    const chosenCharacter = useSelector(selectCharacterById);
    const team = useSelector(selectTeam);
    const user = useSelector(selectUser);
    const userId = user?.id;
    const gifs = useSelector(selectCharacterGifs)
    const {id} = useParams();
    const dispatch = useDispatch();
    const characterName = chosenCharacter[0]?.name
    useEffect(()=>{
        dispatch(fetchCharacterById(id))
        dispatch(getCharacterGifs(characterName))
    },[dispatch,id,characterName]);



    const addCharacter = (e)=>{
        e.preventDefault()
        const name = chosenCharacter[0].name
        const apiId = chosenCharacter[0].id
        const imageUrl = chosenCharacter[0].thumbnail.path
        const teamId = team?.id

        const newTeamMember = {name,apiId,imageUrl,teamId}
        console.log(newTeamMember)

        dispatch(addCharacterToTeam(newTeamMember))
        dispatch(getTeam(userId))

    }

    return(
        <>
            {chosenCharacter.length > 0 ? <Card>
                <Card.Header as="h2" style={{textAlign:'center'}}>{chosenCharacter[0].name}</Card.Header>
                        <Card.Img variant="top" src={`${chosenCharacter[0].thumbnail.path}/portrait_uncanny.jpg`}
                                  style={{width:'450px',height:'450px'
                                      ,alignContent:'center', marginLeft:'auto'
                                      , marginRight: 'auto',background:'#fff',
                                      border: 'solid black',borderColor: 'black',
                                      borderWidth: '3px 3px 5px 5px', borderRadius:'4% 95% 6% 95%/95% 4% 92% 5%',transform: 'rotate(-2deg)'}}/>
                <Card.Body>
                    {user ? <Button onClick={addCharacter} variant="outline-secondary">Add to your team</Button> : ""}
                    <Card.Title>Comic Book Events: {chosenCharacter[0].events.items.map((item,index) =>{
                        return(
                            <div key={index}>
                                <Link to={`/eventDetails/${item.name}`}>
                                    <Button style={{marginRight:'auto',marginLeft:'auto'}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}>{item.name}</Button>
                                </Link>
                            </div>
                        )
                    })}</Card.Title>

                    <Card.Title>Comic Book Series: {chosenCharacter[0].series.items.map((item,index) =>{
                        return(
                            <div key={index}>
                                <Link to="/eventDetails">
                                    <Button style={{marginRight:'auto',marginLeft:'auto'}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{item.name}</Card.Subtitle></Button>
                                </Link>
                            </div>
                        )
                    })}</Card.Title>

                    <Card.Title>Comic Book Stories: {chosenCharacter[0].stories.items.map((item,index) =>{
                        return(
                            <div key={index}>
                                <Link to="/eventDetails">
                                    <Button style={{marginRight:'auto',marginLeft:'auto'}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{item.name}</Card.Subtitle></Button>
                                </Link>
                            </div>
                        )
                    })}</Card.Title>
                    <Card.Title>Description: {chosenCharacter[0].description.length > 1 ? chosenCharacter[0].description : "Marvel Wrote no Description in their API" }</Card.Title>
                    {/*<a href={comicsUrl}>*/}
                    {/*    <Button><Card.Text>Check out comics of {chosenCharacter[0].name}</Card.Text></Button>*/}
                    {/*</a>*/}
                    <div style={{marginRight:"auto",marginLeft:"auto",alignContent:"center"}}>
                        <Card.Title>Gif's</Card.Title>

                                <Row md="3">
                                {gifs ? gifs.map((gif,i) =>{
                                    return(
                                        <Col style={{alignContent:"center"}}>
                                            <Card key={i}  style={{ width: '205px',height:'150px', margin:'5px', background:'whitesmoke'}}>
                                                <Card.Img src={gif.images.downsized.url} style={{ width: '205px',height:'150px'}}/>
                                            </Card>
                                        </Col>
                                    )
                                }) : ""}

                                </Row>

                    </div>
                </Card.Body>
            </Card> :<h3>Loading</h3>}
        </>
    )
}