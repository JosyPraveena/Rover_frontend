import React,{useState,useEffect} from 'react';
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Signup = () =>{
    const [username,setUsername] = useState(null)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [authenticated,setAuthenticated] = useState(false)
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

fetch("http://localhost:3000/users/signup", requestOptions)
  .then(response => {
    if(response.status === 200){
      response.json().then((response) => Cookies.set('token',response))
      .then(setAuthenticated(true));
    }
    if(response.status === 400){
      alert('This id already exists')
    }
  })
      .catch((error) => {
        console.error("Error:", error);
      })

  setUsername("")
        setEmail("")
        setPassword('')
      }


    return(
        <>
        {authenticated && <Redirect to="/record-your-experience" />}
        <form onSubmit={loginSubmit}>
        <label>
        Username:
        <input
          value={username}
          onChange={event => setUsername(event.target.value)}
          name="username"
          type="text"
        />
      </label>
      <br />
      <label>
        Email:
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          name="email"
          type="text"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          value={password}
          onChange={event => setPassword(event.target.value)}
          name="password"
          type="password"
        />
      </label>
      <br />
      <button>Signup</button>
    </form>
        </>
    )
}

export default Signup