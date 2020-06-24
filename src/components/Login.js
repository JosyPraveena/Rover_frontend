import React,{useState} from 'react';

const Login = () =>{
    const [email, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

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
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  };



  return (
    <form onSubmit={loginSubmit}>
      <label>
        Username:
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
  );
}

export default Login