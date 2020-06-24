import React,{useState} from 'react';

const Signup = () =>{
    const [username,setUsername] = useState(null)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
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
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  setUsername("")
        setEmail("")
        setPassword('')
      };
    return(
        <>
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