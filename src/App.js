import Homepage from "./pages/Homepage";
import {AppNavbar} from "./components/AppNavbar";
import {Route,Routes,Navigate} from "react-router-dom";
import {CharacterDetails} from "./components/CharacterDetails";
import {MarvelCharactersMain} from "./components/MarvelCharactersMain";
import {AllAuctions} from "./components/AllAuction";
import {EventDetails} from "./components/EventDetails";
import {OffCanvasSearch} from "./components/OffCanvasSearch";
import {getUserWithStoredToken} from "./store/user/userActions";
import {useEffect} from "react";
import {selectEvent} from "./store/characters/selector";

import {useSelector,useDispatch} from "react-redux";
import {selectShowOffCanvasSearch} from "./store/characters/selector";
import {Login} from "./pages/Login";
import {SignUp} from "./pages/SignUp";
import {Profile} from "./components/Profile";
import {selectToken} from "./store/user/userSelectors";
import {AuctionDetails} from "./components/AuctionDetails";


function App() {
    const token = useSelector(selectToken)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserWithStoredToken());
    }, [dispatch]);
    const OffCanvas = useSelector(selectShowOffCanvasSearch)

    const ProtectedRoute = ({component}) => {
        if(!token){
            return <Navigate to="/login"/>
        }
    }

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
            <Route path="/auction" element={<AllAuctions/>}/>
            <Route path="/auction/:id" element={<AuctionDetails/>}/>
        </Routes>
    </div>
  );
}

export default App;
