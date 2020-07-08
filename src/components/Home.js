import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";
import {useEndpoint} from '../Context/EndpointContext'
import MyContext from '../Context/PostContext'

const Topbar = () => {
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
        history.push('/record-your-experience')
        if (response.status === 200) {
         
          const userToken = response.headers.get("x-authorization-token")
          Cookies.set("token", userToken);
          setToken(userToken);
         
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
  };

  return (
    <>
      <div className="Homepage">
        <div id="homepage-navbar">
          <h1 style={{fontWeight: 'bold'}}>Rover</h1>
          <Popup trigger={<h6>Login</h6>} modal closeOnDocumentClick contentStyle={{width: "400px" , height:'450px',borderRadius : "25px",backgroundColor:"#ffe6dd"}}>
            <div className="login-container">
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
            </div>
          </Popup>  
        </div>
        <div className="intro-section">
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
        </div>
      </div>

      <div className="home">
        <div></div>
      </div>
    </>
  );
};

export default Topbar;
