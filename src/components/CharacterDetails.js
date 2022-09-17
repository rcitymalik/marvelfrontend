import {
    fetchCharacterById,
    fetchEvents,
    addCharacterToTeam,
    getTeam,
    getCharacterGifs,
    getCharacterVideos,
} from "../store/characters/characteractions";
import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {selectCharacterById,selectTeam,selectCharacterGifs,selectVideos} from "../store/characters/selector";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {selectUser} from "../store/user/userSelectors";
import {Col, Button, Row,Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import logo from "../Poweredby_100px-White_VertLogo.png"


export const CharacterDetails = () =>{

    const chosenCharacter = useSelector(selectCharacterById);
    const videos = useSelector(selectVideos)
    console.log(videos)
    const team = useSelector(selectTeam);
    const user = useSelector(selectUser);
    const userId = user?.id;
    const gifs = useSelector(selectCharacterGifs)
    const {id} = useParams();
    const dispatch = useDispatch();
    const characterName = chosenCharacter[0]?.name;

    useEffect(()=>{
        dispatch(fetchCharacterById(id))
        dispatch(getCharacterGifs(characterName))
        dispatch(getCharacterVideos(characterName))
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
    };

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
                    <Card.Title>{chosenCharacter[0].description.length > 1 ? chosenCharacter[0].description : "Marvel Wrote no Description in their API" }</Card.Title>
                    {/*<a href={comicsUrl}>*/}
                    {/*    <Button><Card.Text>Check out comics of {chosenCharacter[0].name}</Card.Text></Button>*/}
                    {/*</a>*/}
                    <br/>
                    <div style={{marginRight:"auto",marginLeft:"auto",alignContent:"center",textAlign:"center",marginBottom:"5px"}}>
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
                        <Card.Title style={{textAlign:"right",marginRight:"270px"}}><Card.Img src={logo} style={{width:"80px",height:"30px"}}/></Card.Title>
                    </div>
                    <br/>
                    <div>
                        <Card.Title style={{textAlign:"center"}}><FontAwesomeIcon style={{width:"50px",height:"50px",backgroundColor:"red",borderRadius:"25px 25px"}} icon={faCirclePlay} /></Card.Title>
                        <Row md="3">
                            {videos ? videos.map(video =>{
                                return(
                                    <Col style={{width: "250", height: "200", marginBottom: "5px"}}>
                                        <iframe key={video.id} title={video.id}
                                                src={`https://www.youtube.com/embed/${video.id.videoId}`}/>
                                    </Col>
                                )
                            }) : ""}
                        </Row>
                    </div>
                    <br/>
                    <Card.Subtitle as="h3" style={{textAlign:"center",marginBottom:"10px"}}>Events</Card.Subtitle>
                    <div>
                        <Row md="4">
                            {chosenCharacter[0].events.items.map((item,index) =>{
                                return(
                                    <ul style={{listStyle:"none"}} key={index}>
                                        <Link to={`/eventDetails/${item.name}`}>
                                            <li style={{textAlign:"center"}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}>{(item.name).toUpperCase()}</li>
                                        </Link>
                                    </ul>
                                )
                            })}
                        </Row>
                    </div>
                    <br/>
                    <Card.Subtitle as="h3" style={{textAlign:"center",marginBottom:"10px"}}>Series</Card.Subtitle>
                    <div>
                        <Row md="4">
                            {chosenCharacter[0].series.items.map((item,index) =>{
                                return(
                                    <ul key={index} style={{listStyle:"none"}}>
                                        <Link to="/eventDetails">
                                            <li style={{textAlign:"center"}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{(item.name).toUpperCase()}</Card.Subtitle></li>
                                        </Link>
                                    </ul>
                                )
                            })}
                        </Row>
                    </div>
                    <br/>
                    <Card.Subtitle as="h3" style={{textAlign:"center",marginBottom:"10px"}}>Stories</Card.Subtitle>
                    <div>
                        <Row md="4">
                            {chosenCharacter[0].stories.items.map((item,index) =>{
                                return(
                                    <ul key={index} style={{listStyle:"none"}}>
                                        <Link to="/eventDetails">
                                            <li style={{textAlign:"center"}} variant="dark" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{(item.name).toUpperCase()}</Card.Subtitle></li>
                                        </Link>
                                    </ul>
                                )
                            })}
                        </Row>
                    </div>
                </Card.Body>
            </Card> :<h3>Loading</h3>}
        </>
    )
}