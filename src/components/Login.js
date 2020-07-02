import React,{useState} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import Navbar from '../components/Navbar'



const Login = () =>{
  
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
    
    fetch("http://localhost:8080/user/login", requestOptions)
    .then(response => {
      if(response.status === 200){
        Cookies.set('token', response.headers.get('x-authorization-token'))
        setAuthenticated(true);
      }
      if(response.status === 400){
        alert('Invalid password')
      }
    })
        .catch((error) => {
          console.error("Error:", error);
        })
  
        if(email.length < 1 || password.length < 1){
    alert("Please fill all fields");}
  };

  return (
    <>
     {authenticated && <Redirect to="/record-your-experience" />}
     <div className="login-page">

     <Navbar/>
     <div className="login">
      
    <form onSubmit={loginSubmit}>
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
      <br/>
      <label>
        Password
        <input
          value={password}
          onChange={event => setPassword(event.target.value)}
          name="password"
          type="password"
        />
      </label>
      <div className="btnlogin"><button>Submit</button></div>
      
    </form>
    </div>
     </div>
    
    </>
  );
}

export default Login