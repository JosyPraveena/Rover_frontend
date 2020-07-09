import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useEndpoint } from "../Context/EndpointContext";
import MyContext from "../Context/PostContext";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container1: {
      maxWidth: "100%",
      maxHeight: "100%",
      // marginTop: '2vh'
    },
    ravor: {
      fontFamily: "Dancing Script",
      textShadow: "2px 2px white",
      color: "#ff4500",
      textDecoration: "none",
    },
    root: {
      maxWidth: "100%",
      height: 800,
      justifyContent: "center",
      // marginTop: '20vh',
    },
    griditem: {
      justifyContent: "center",
      maxWidth: '100%',
      maxHeight: '100%',
      marginTop: "5vh",
     
      [theme.breakpoints.down('xs')]: {
      justifyContent: "flex-start",
      },
    },
  })
);
const Signup = () => {
  const classes = useStyles();
  const roverEndpoint = useEndpoint();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [authenticated,setAuthenticated] = useState(false)
  const history = useHistory();

  const { setToken } = useContext(MyContext);

  const loginSubmit = (e) => {
    
    if(e.key === 'Enter' || e.target.innerText === "SIGN UP") {
      e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_name: `${username}`,
      email: `${email}`,
      password: `${password}`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${roverEndpoint}/user/signup`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((res) => {
            const userToken = response.headers.get("x-authorization-token");
            Cookies.set("token", userToken);
            setToken(userToken);
            history.push("/record-your-experience");
          });
        }
        if (response.status === 204) {
          alert("Please fill all fields");
        }
        // if (response.status === 400) {
        //   alert("This id already exists");
        // }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }};

  const buttonStyle = {
    fontFamily: "Roboto",
    backgroundColor: "#FF4500",
    color: "white",
    fontSize: "1rem",
  };
  return (
    <>
      {/* <div className="signup"> */}
      <div className="signup-page">
        <Grid container className={classes.container1}>
          <Grid item xs={8}>
            <Typography
              component={Link}
              to="/"
              variant="h1"
              className={classes.ravor}
              style={{ fontWeight: "bold", fontFamily: "Dancing Script" }}
            >
              Rover
            </Typography>
          </Grid>
        </Grid>
        <Grid container jutify="center" className={classes.root}>
          <Grid item xs={3} jutify="center" className={classes.griditem}>
            <h4
              style={{
                fontFamily: "Roboto",
                color: "#ff4500",
                fontSize: "2rem",
              }}
            >
              Signup
            </h4>{" "}
            <br />
            <div>
            <form onKeyPress={(e) => loginSubmit(e)}>
              <label
                style={{
                  fontFamily: "Roboto",
                  color: "#ff4500",
                  fontSize: "1.2rem",
                }}
              >
                Username <br />
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  name="username"
                  type="text"
                />
              </label>{" "}
              <br />
              <br />
              <label
                style={{
                  fontFamily: "Roboto",
                  color: "#ff4500",
                  fontSize: "1.2rem",
                }}
              >
                Email Address <br />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  type="text"
                />
              </label>{" "}
              <br />
              <br />
              <label
                style={{
                  fontFamily: "Roboto",
                  color: "#ff4500",
                  fontSize: "1.2rem",
                }}
              >
                Password <br />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  name="password"
                  type="password"
                />
              </label>
              <br />
              <br />
              {/* <div className="btns">
      <button style={buttonStyle}>Submit</button> 
      </div> */}
              <Button style={buttonStyle} variant="contained" onClick={(e) => loginSubmit(e)}>
                Sign up{" "}
              </Button>
            </form>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* </div> */}
    </>
  );
};

export default Signup;
