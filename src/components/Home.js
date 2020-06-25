import React,{useState} from "react"
import {Link} from "react-router-dom"
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

const Topbar = () =>{

    const [email, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    
    const [authenticated,setAuthenticated] = useState(false)
  
    const loginSubmit = e => {
      e.preventDefault();
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({"email": `${email}`,"password": `${password}`});
      
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/users/login", requestOptions)
      .then(response => {
        if(response.status === 200){
          response.json().then((response) => Cookies.set('token',response))
          .then(setAuthenticated(true));
        }
        if(response.status === 400){
          alert('Invalid password')
        }
      })
          .catch((error) => {
            console.error("Error:", error);
          })
    
  
    };
  
  
    return(
        <>
        <div>
        <h1>Rover</h1>
        <br/>
        <h4>Hoard your travel memories</h4>
        <Link to='/sign-up'>Sign up</Link>
        </div>
        <div>Become a ravor to record your experience</div>
        <div> <br/><br/>
        {authenticated && <Redirect to="/record-your-experience" />}
    <form onSubmit={loginSubmit}>
      <label>
        Email:
        <input
          value={email}
          onChange={event => setUsername(event.target.value)}
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
      <button>Submit</button>
    </form>
        </div>
        </>
    )
}

export default Topbar;