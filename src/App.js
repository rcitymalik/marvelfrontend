import Homepage from "./pages/Homepage";
import {AppNavbar} from "./components/AppNavbar";
import {Route,Routes} from "react-router-dom";
import {CharacterDetails} from "./components/CharacterDetails";
import {MarvelCharactersMain} from "./components/MarvelCharactersMain";
import {EventDetails} from "./components/EventDetails";
import {OffCanvasSearch} from "./components/OffCanvasSearch";
import {getUserWithStoredToken} from "./store/user/userActions";
import {useEffect} from "react";

import {useSelector,useDispatch} from "react-redux";
import {selectShowOffCanvasSearch} from "./store/characters/selector";
import {Login} from "./pages/Login";
import {SignUp} from "./pages/SignUp";
import {Profile} from "./components/Profile";



function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserWithStoredToken());
    }, [dispatch]);
    const OffCanvas = useSelector(selectShowOffCanvasSearch)
  return (
    <div style={{backgroundImage:`url("https://wallpapers.com/images/hd/marvel-all-in-one-3twzbzkk15m1le1f-3twzbzkk15m1le1f.jpg")`}}>
        <AppNavbar/>
        {OffCanvas ? <OffCanvasSearch/>:""}
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/details/:id" element={<CharacterDetails/>}/>
            <Route path="/allCharacters" element={<MarvelCharactersMain/>}/>
            <Route path="/eventDetails/:name" element={<EventDetails/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="profile/:id" element={<Profile/>}/>
        </Routes>
    </div>
  );
}

export default App;
