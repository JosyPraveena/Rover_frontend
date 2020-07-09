import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";
import {useEndpoint} from '../Context/EndpointContext'
import MyContext from '../Context/PostContext'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    griditem:{
      maxWidth: '100%',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginTop: '2vh',
      // padding:20
      [theme.breakpoints.down(470)]: {
        flexWrap: 'wrap'
      },
    },
    ravor:{
      fontFamily: 'Dancing Script',
      textShadow: '2px 2px white',
      color: '#ff4500',
     
    },
    login:{
      fontFamily:'Roboto',
      color: '#ff4500',
    },
    intro:{
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    griditem2:{ 
      marginTop: '15vh',
      maxWidth: '100%',
      maxHeight: 'auto',
      [theme.breakpoints.down(470)]: {
        marginTop: '5vh',
        fontSize: '1rem'
      },
    },
    modalcontainer:{
    //  border: '1px solid red',
     maxWidth: '100%',
     maxHeight: '100%',
     marginTop: '3vh'
    },
    modal:{
      // border: '1px solid green',
      textAlign: 'center',
      fontFamily:'Roboto',
      color: '#ff4500'
    },
    modallogin:{
      // border: '1px solid blue',
      marginTop: '5vh',
      fontFamily:'Roboto',
      color: '#ff4500'
    }
  }))

const Topbar = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();
  const {setToken} = useContext(MyContext)
  const roverEndpoint = useEndpoint()
  const buttonStyle = {
    fontFamily: "Roboto",
    backgroundColor: "#FF4500",
    color: "white",
    fontSize: "1rem"
  };


  const loginSubmit = (e) => {
    if(e.key === 'Enter' || e.target.innerText === "SUBMIT"){
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ email: `${email}`, password: `${password}` });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${roverEndpoint}/user/login`, requestOptions)
      .then((response) => {
        
        if (response.status === 200) {
         
          const userToken = response.headers.get("x-authorization-token")
          Cookies.set("token", userToken);
          setToken(userToken);
          history.push('/record-your-experience')
        }
        if (response.status === 400) {
          alert("Invalid password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (email.length < 1 || password.length < 1) {
      alert("Please fill all fields");
    }
  }
  };

  return (
    <>
      <div className="Homepage">
        <Grid container justify='center' className={classes.root} >
          <Grid item xs={10} className={classes.griditem}>
          {/* <div id="homepage-navbar"> */}
          <Typography variant='h1' className={classes.ravor} style={{fontWeight: 'bold' ,fontFamily: 'Dancing Script'}}>Rover</Typography>
          <Popup trigger={<Typography className={classes.login} variant='h4'>Login</Typography>} modal closeOnDocumentClick contentStyle={{width: "350px" , height:'320px',borderRadius : "25px",backgroundColor:"#ffe6dd"}}>
            <Grid container justify='center'className={classes.modalcontainer}>
              <Grid item xs={10} className={classes.modal}>
                <Typography variant='h6'>Login</Typography>
              </Grid> <br/>
              <Grid item xs={8} className={classes.modallogin}>
              <form onKeyPress={(e) => loginSubmit(e)}>
                    <label>
                      Email <br />
                      <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        name="email"
                        type="text"
                        placeholder="   Enter Email"
                      />
                    </label><br />
                    <br />
                    <label>
                      Password <br />
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        name="password"
                        type="password"
                        placeholder="   Enter password"
                      />
                    </label>{" "}
                    <br /> <br/>
                   
                    <Button
            onClick={(e) => loginSubmit(e)}

            style={buttonStyle}
            variant="contained"
          >
            Submit{" "}
          </Button>
  
                  </form>

              </Grid>
            </Grid>
            
            {/* <div className="login-container">
              <div className="login-div">
                <h6>login</h6>
                <div className="form-div">
                  <form onSubmit={loginSubmit}>
                    <label>
                      Email <br />
                      <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        name="email"
                        type="text"
                        placeholder="   Enter Email"
                      />
                    </label>
                    <br />
                    <label>
                      Password <br />
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        name="password"
                        type="password"
                        placeholder="   Enter password"
                      />
                    </label>{" "}
                    <br />
                    <button>Submit</button>
                  </form>
                </div>
              </div>
            </div> */}
          </Popup>  
        {/* </div> */}
          </Grid>
        </Grid>
        <Grid container justify='center'>
          <Grid item xs={4} className={classes.griditem2}>
            <Typography variant='h4' className={classes.intro}>A travelogue for every kind of modern day adventurer</Typography>
            <br/><br/>
            <Typography variant='h5' className={classes.intro}> Capture, share, plan and celebrate the joy of travelling </Typography>
            <br/><br/>
            <Button
            style={buttonStyle}
            variant="contained"
            className="link"
            component={Link}
            to={"/sign-up"}
          >
            Sign up{" "}
          </Button>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        
        {/* <div className="intro-section">
          <h2 style={{fontWeight : 'bold'}}>A travelogue for every kind of modern day adventurer</h2>
          <h5>Capture, share, plan and celebrate the joy of travelling</h5>
          <Button
            style={buttonStyle}
            variant="contained"
            className="link"
            component={Link}
            to={"/sign-up"}
          >
            Sign up{" "}
          </Button>
        </div> */}
      </div>

      <div className="home">
        <div></div>
      </div>
    </>
  );
};

export default Topbar;
