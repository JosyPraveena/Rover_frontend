import React,{useState} from 'react';
import {Switch,Route,Link} from "react-router-dom"
import './App.css';
import Postpage from './components/Postpage'
import Signup from './components/Signup'
import overpassClient from './components/overpassClient'
import {getRestaurantsByLocation} from './components/overpassQueries'
import Login from './components/Login'
import Home from'./components/Home'
import OverviewPage from './components/OverviewPage';

function App() {

  const[record,setRecord] = useState(false)

  const handleClick = () =>{
    setRecord(true)
  }

  const handleSubmit =() =>{
      setRecord(false)
  }
  return(
    <>
   
    <Switch>
    {/* <Route path={'/post'} render={(props) => (<Postpage {...props} />)}/> */}
    <Route path={'/record-your-experience'} render={(props) => (<OverviewPage {...props} handleClick={handleClick} record={record} handleSubmit={handleSubmit}/>)}/>
    <Route path={"/"} render={(props) => ( <Home {...props}/>)}/>
    <Route path={"/sign-up"} render={(props) => ( <Signup {...props}/>)}/>
    </Switch>
    </>
  )
}

export default App;
