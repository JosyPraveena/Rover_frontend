import React,{useState,useContext} from 'react';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import {useEndpoint} from '../Context/EndpointContext'
import MyContext from '../Context/PostContext'
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      maxWidth: '100%',
      height: 800,
      justifyContent: 'center',
      // marginTop: '20vh',
    },
    griditem:{
      justifyContent:'center',
      width: 500,
      height: 500,
      // marginTop: '5vh',
      // border: '1px solid red',
      paddingLeft: 10
    }
  }))
const Signup = () =>{

  const classes = useStyles();
  const roverEndpoint = useEndpoint()
    const [username,setUsername] = useState(null)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [authenticated,setAuthenticated] = useState(false)
    const history = useHistory();

    const {setToken} = useContext(MyContext)
    const loginSubmit = e => {
        e.preventDefault();
        
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"user_name":`${username}`,"email":`${email}`,"password":`${password}`});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${roverEndpoint}/user/signup`, requestOptions)
  .then(response => {
    history.push('/record-your-experience')
    if(response.status === 200){
      response.json().then((res) => {
       
        const userToken = response.headers.get("x-authorization-token")
        Cookies.set('token',userToken)
        // console.log(userToken)
        setToken(userToken)
        
      })
    }
    if(response.status === 204){
      alert('Please fill all fields')
    }
    if(response.status === 400){
      alert('This id already exists')
    }

  })
      .catch((error) => {
        console.error("Error:", error);
      })
    
    }

    const buttonStyle = {
      fontFamily: "Roboto",
      backgroundColor: "#FF4500",
      color: "white",
      fontSize: "1rem"
    };
    return(
        <>
        {/* <div className="signup"> */}
        <div className='signup-page'>
        <Grid container jutify='center' className={classes.root}> 
        <Grid container>
          <Grid item xs={12}>
          <h1 style={{fontWeight: 'bold',fontFamily:'Dancing Script',color: '#ff4500'}}>Rover</h1>
          </Grid>
        </Grid>
          <Grid item xs={3} jutify='center' className={classes.griditem}>
          <h4 style={{fontFamily:'Roboto',color:'#ff4500',fontSize:'2rem'}}>Signup</h4>
        <form onSubmit={loginSubmit}>
        <label style={{fontFamily:'Roboto',color:'#ff4500',fontSize:'1.2rem'}}>
        Username
        <input
          value={username}
          onChange={event => setUsername(event.target.value)}
          name="username"
          type="text"
        />
      </label>
      <br />
      <label style={{fontFamily:'Roboto',color:'#ff4500',fontSize:'1.2rem'}}>
        Email Address
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          name="email"
          type="text"
        />
      </label>
      <br />
      <label style={{fontFamily:'Roboto',color:'#ff4500',fontSize:'1.2rem'}}>
        Password
        <input
          value={password}
          onChange={event => setPassword(event.target.value)}
          name="password"
          type="password"
        />
      </label>
      <br />
      <br/>
      {/* <div className="btns">
      <button style={buttonStyle}>Submit</button> 
      </div> */}
      <Button
            style={buttonStyle}
            variant="contained"
            // className="link"
            // component={Link}
            // to={"/sign-up"}
          >
            Sign up{" "}
          </Button>
        </form>
        </Grid>
        </Grid>
        </div>
      {/* </div> */}
        </>
    )
}

export default Signup