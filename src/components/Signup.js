import React,{useState,useContext} from 'react';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import {useEndpoint} from '../Context/EndpointContext'
import MyContext from '../Context/PostContext'

const Signup = () =>{
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
    return(
        <>
        <div className="signup">
          <h3>Signup</h3>
        <form onSubmit={loginSubmit}>
        <label>
        Username
        <input
          value={username}
          onChange={event => setUsername(event.target.value)}
          name="username"
          type="text"
        />
      </label>
      <br />
      <label>
        Email
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          name="email"
          type="text"
        />
      </label>
      <br />
      <label>
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
      <div className="btns">
      <button>Submit</button> 
      </div>
        </form>
      </div>
        </>
    )
}

export default Signup