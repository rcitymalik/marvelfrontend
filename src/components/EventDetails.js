import {selectEvent, selectOneCharacter} from "../store/characters/selector";
import {fetchEvents,fetchByName} from "../store/characters/characteractions";
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";


import {Col,Row,Button,Card} from "react-bootstrap";
import {useEffect} from "react";

export const EventDetails = () =>{

    const dispatch = useDispatch();
    const character = useSelector(selectOneCharacter)
    const eventInfo = useSelector(selectEvent)
    useEffect(()=>{
        dispatch(fetchByName("hulk"))
    },[])
    return(
        <Card>
            <Card.Header as="h2" style={{textAlign:'center'}}>{eventInfo[0]?.title}</Card.Header>
            <Card.Img variant="top" src={`${eventInfo[0]?.thumbnail.path}/portrait_uncanny.jpg`}
                      style={{width:'450px',height:'450px'
                          ,alignContent:'center', marginLeft:'auto'
                          , marginRight: 'auto',background:'#fff',
                          border: 'solid black',borderColor: 'black',
                          borderWidth: '3px 3px 5px 5px', borderRadius:'4% 95% 6% 95%/95% 4% 92% 5%',transform: 'rotate(-2deg)'}}
            />
            <Card.Title as="h6">{eventInfo[0]?.description}</Card.Title>
            <br/>
            <Card.Subtitle as="h5">Started: {eventInfo[0]?.start}</Card.Subtitle>
            <Card.Subtitle as="h5">Ended: {eventInfo[0]?.end}</Card.Subtitle>
            <br/>
            <Card.Text as="h4">Previous Event: <Link to={`/eventDetails/${eventInfo[0]?.previous.name}`}><Button onClick={()=>{dispatch(fetchEvents(eventInfo[0]?.previous.resourceURI))}} variant={"outline-dark"}>{eventInfo[0]?.previous.name}</Button>  </Link></Card.Text>
            <Card.Text as="h4">Next Event: <Link to={`/eventDetails/${eventInfo[0]?.next.name}` }><Button onClick={()=>{dispatch(fetchEvents(eventInfo[0]?.next.resourceURI))}} variant={"outline-dark"}>{eventInfo[0]?.next.name}</Button>  </Link></Card.Text>
            <br/>
            <Card.Title>Characters: {eventInfo[0]?.characters.items.map((item,index) =>{
                // dispatch(fetchByName(fetchByName(eventInfo[0].name)))
                // console.log(character)
                return(
                    <div key={index}>
                        <Link to="/eventDetails">
                            <Button style={{marginRight:'auto',marginLeft:'auto'}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{item.name}</Card.Subtitle></Button>
                        </Link>
                    </div>
                )
            })}</Card.Title>
            <br/>
            <Card.Title>Comic Books: {eventInfo[0]?.comics.items.map((item,index) =>{
                return(
                    <div key={index}>
                        <Link to="/eventDetails">
                            <Button style={{marginRight:'auto',marginLeft:'auto'}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{item.name}</Card.Subtitle></Button>
                        </Link>
                    </div>
                )
            })}</Card.Title>
            <br/>
            <Card.Title>Series: {eventInfo[0]?.series.items.map((item,index) =>{
                return(
                    <div key={index}>
                        <Link to="/eventDetails">
                            <Button style={{marginRight:'auto',marginLeft:'auto'}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{item.name}</Card.Subtitle></Button>
                        </Link>
                    </div>
                )
            })}</Card.Title>
            <br/>
            <Card.Title>Stories: {eventInfo[0]?.stories.items.map((item,index) =>{
                return(
                    <div key={index}>
                        <Link to="/eventDetails">
                            <Button style={{marginRight:'auto',marginLeft:'auto'}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{item.name}</Card.Subtitle></Button>
                        </Link>
                    </div>
                )
            })}</Card.Title>
            <br/>

            <Card.Title>Creators: {eventInfo[0]?.creators.items.map((item,index) =>{
                return(
                    <div key={index}>
                        <Link to="/eventDetails">
                            <Button style={{marginRight:'auto',marginLeft:'auto'}} variant="Info" onClick={()=>{dispatch(fetchEvents(item.resourceURI))}}><Card.Subtitle>{item.name}</Card.Subtitle></Button>
                        </Link>
                    </div>
                )
            })}</Card.Title>
        </Card>
    )
}