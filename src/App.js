import React,{useState} from 'react';
import {Switch,Route,Link} from "react-router-dom"
import './App.css';
import Signup from './components/Signup'
import Home from'./components/Home'
import OverviewPage from './components/OverviewPage';
import Feeds from './components/Feeds'
import UserAlbum from './components/UserAlbum'
import Travelbuddy from './components/Travelbuddy'
import EachAlbum from './components/EachAlbum'
import MyContext from './Context/PostContext'
import {Endpoints} from './Context/EndpointContext'
import EachFeed from './components/EachFeed'

function App() {

const roverEndpoint = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_ENDPOINT : process.env.REACT_APP_PROD_ENDPOINT

  const [postDescription, setPostDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const [searchResults,setSearchResults] = useState(null);
  const [searchStatus, setSearchStatus] = useState(false);
  const [token,setToken] = useState(null)

  return(
    <>
    <Endpoints.Provider value={roverEndpoint}>
    <MyContext.Provider value={{ token,setToken,postDescription, setPostDescription ,  selectedFiles, setSelectedFiles,searchContent, setSearchContent,searchResults,setSearchResults,searchStatus, setSearchStatus}}>
    <Switch>
    <Route path={'/post/:id'} render={(props) => (<EachFeed {...props}/>)}/>
    <Route path={'/record-your-experience'} render={(props) => (<OverviewPage {...props}  />)}/>
    <Route path={'/place/:id'} render={(props) => (<EachAlbum {...props}/>)}/>
    <Route path={"/find-travel-buddies"} render={(props) => (<Travelbuddy {...props}/>)}/>
    <Route path={"/profile"} render={(props) => (<UserAlbum  {...props}/>)}/>
    <Route path={"/sign-up"} render={(props) => ( <Signup {...props}/>)}/>
    <Route path={'/feeds'} render={(props) => (<Feeds {...props} />)}/>
    
    <Route path={"/"} render={(props) => ( <Home {...props} />)}/>
   
    </Switch>
    </MyContext.Provider>
    </Endpoints.Provider>
    </>
  )
}

export default App;
