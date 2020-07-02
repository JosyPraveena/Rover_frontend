import React,{useState} from 'react';
import {Switch,Route,Link} from "react-router-dom"
import './App.css';
import Signup from './components/Signup'
import Home from'./components/Home'
import OverviewPage from './components/OverviewPage';
import Feeds from './components/Feeds'
import UserAlbum from './components/UserAlbum'


function App() {



  return(
    <>
   
    <Switch>
      <Route path={"/profile"} render={(props) => (<UserAlbum  {...props}/>)}/>
    <Route path={"/sign-up"} render={(props) => ( <Signup {...props}/>)}/>
    <Route path={'/feeds'} render={(props) => (<Feeds {...props} />)}/>
    <Route path={'/record-your-experience'} render={(props) => (<OverviewPage {...props}  />)}/>
    <Route path={"/"} render={(props) => ( <Home {...props} />)}/>
   
    </Switch>
    </>
  )
}

export default App;
