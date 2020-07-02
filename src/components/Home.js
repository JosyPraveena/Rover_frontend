import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";

const Topbar = ({ login, signup, handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const buttonStyle = {
    fontFamily: "Pangolin",
    backgroundColor: "#FF4500",
    fontColor: "white"
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

    fetch("http://localhost:8080/user/login", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          Cookies.set("token", response.headers.get("x-authorization-token"));
          setAuthenticated(true);
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
          <h1>Rover</h1>
          {/* <Link to="/login" style={{ textDecoration: 'none' }}><h6>Login</h6></Link> */}
          <Popup trigger={<h6>Login</h6>} modal closeOnDocumentClick>
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

          {/* <div id="login-button">
            <Button
              style={buttonStyle}
              onClick={handleClick}
              variant="contained"
              color="primary"
              component={Link}
              to={"/login"}
            >
              Login{" "}
            </Button>
          </div> */}
        </div>

        <div className="intro-section">
          <h2>One stop destination</h2>
          <br />
          <h2>to hoard your travel memories</h2>
          <br />
          <Button
            style={buttonStyle}
            onClick={handleClick}
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
      {/* {login ? <Login /> : null}
        {signup ? <Signup /> : null} */}
      {authenticated && <Redirect to="/record-your-experience" />}
      {/* <Switch>
    <Route path={"/login"} render={(props) => ( <Login {...props}/>)}/>
    <Route path={"/sign-up"} render={(props) => ( <Signup {...props}/>)}/>
    </Switch>  */}
    </>
  );
};

export default Topbar;
