import React,{useState} from "react"
import {Switch,Route,Link} from "react-router-dom"
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import Signup from '../components/Signup'
import Login from '../components/Login'
import Button from '@material-ui/core/Button';


const Topbar = ({login,signup,handleClick}) =>{

    const [email, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    
    const [authenticated,setAuthenticated] = useState(false)
  
    // const loginSubmit = e => {
    //   e.preventDefault();
  
    //   const myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
      
    //   const raw = JSON.stringify({"email": `${email}`,"password": `${password}`});
      
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //   };
      
    //   fetch("http://localhost:3000/users/login", requestOptions)
    //   .then(response => {
    //     if(response.status === 200){
    //       response.json().then((response) => Cookies.set('token',response))
    //       .then(setAuthenticated(true));
    //     }
    //     if(response.status === 400){
    //       alert('Invalid password')
    //     }
    //   })
    //       .catch((error) => {
    //         console.error("Error:", error);
    //       })
    
  
    // };
  
    const buttonStyle = {
      fontFamily : 'Pangolin',
    
    }
  
    return(
        <>
        
        <div className="Homepage">
        <div className="home">
          <div id="login-button"><Button style={buttonStyle} onClick={handleClick} variant="contained" color="primary" component={Link} to={'/login'}>Login </Button></div>
        
        <div >
        <Button style={buttonStyle} onClick={handleClick} variant="contained" color="primary" className="link" component={Link} to={'/sign-up'}>Sign up </Button>
        </div>
       
        </div>
        <div className="topbar-homepage">
        <div className="title">
        <h1>Rover</h1>
        <h4>Hoard your travel memories</h4>
        </div>
        
        </div>    
        {login ? <Login/> : null}  
        {signup ? <Signup/>: null} 
        {authenticated && <Redirect to="/record-your-experience" />}
        {/* <Switch>
    <Route path={"/login"} render={(props) => ( <Login {...props}/>)}/>
    <Route path={"/sign-up"} render={(props) => ( <Signup {...props}/>)}/>
    </Switch> */}

        </div>
     
        </>
    )
}

export default Topbar;