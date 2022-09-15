import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchCharacters,} from "../store/characters/characteractions";
import {selectAllCharacters,selectShowModal} from "../store/characters/selector";

import {MarvelCharacters} from "../components/MarvelCharacters";

import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {OneCharacterModal} from "./OneCharacterModal";

export const MarvelCharactersMain = () =>{

    const showModal = useSelector(selectShowModal);
    const dispatch = useDispatch();
    const allCharacters = useSelector(selectAllCharacters);
    useEffect(()=>{
        dispatch(fetchCharacters())
    },[dispatch]);

    return(
                <div>
                    {showModal ? <OneCharacterModal/> : ""}
                    <Container className="overflow-auto" >
                        <Row>
                            {allCharacters? allCharacters.map((character,index)=>(<MarvelCharacters character={character} key={index}/>)) :"Loading"}
                        </Row>
                    </Container>
                </div>

    )
}