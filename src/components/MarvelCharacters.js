import {useState} from "react";
import {characterToBeModal,modalShow} from "../store/characters/characterSlice";
import {useDispatch} from "react-redux";

import {Button} from "react-bootstrap";
import {Card} from "react-bootstrap";
import {Col} from "react-bootstrap";


export const MarvelCharacters = ({character})=>{

    const dispatch = useDispatch();


    const oneCharacter = (character)=>{
        console.log("worjing")
        dispatch(characterToBeModal(character))
        dispatch(modalShow())
    }


    return(
        <Col md={4}>
            <Card style={{ width: '18rem', margin:'5px', background:'#29273f'}}>
                <Card.Img variant="top" src={`${character.thumbnail.path}/portrait_incredible.jpg`} style={{ width: '286px',height:'280px'}}/>
                <Button variant="info" style={{transform: 'rotate(2deg)', alignSelf:'center', margin:'5px',
                    padding:'0 5px',
                    background:'#ddd',
                    border:'1px solid #222',
                    boxShadow:'3px 3px 0 #222'}} onClick={()=>{oneCharacter(character)}}><Card.Title>{character.name}</Card.Title></Button>


                {/*    <Button style={{float:"right"}} variant="primary" onClick={()=>{*/}
                {/*        setId(character.id);*/}
                {/*        console.log(character.thumbnail.path)*/}
                {/*        setName(character.name);*/}
                {/*        addCharacter()*/}
                {/*}}>Add</Button>*/}
            </Card>
        </Col>
    )
}

