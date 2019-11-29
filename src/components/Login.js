import React, {useState, useEffect } from "react";
import { loginListener, setLoginStatus } from '../utils/events'
const Login = (props) => {
  const [loginData, setLogin] = useState({
    username: '',
    password: ''
  })
  const handleCredenciales = (e) => setLogin({
    ...loginData,
    [e.target.name ]: e.target.value
  })

  const checkLogin = (event, didLogIn) => {
    if (didLogIn) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }
  const listeners = loginListener(checkLogin)

  const submitLogin = (event) => {
    event.preventDefault()
    listeners.send(loginData.username, loginData.password)
    
  }

  useEffect(() => {
    listeners.listener()

    return () => listeners.clear()
  })
  return (
    <div className="ui container">
      <h1>Login</h1>
      <form onSubmit={submitLogin}>
        <input type="text" name='username' value={loginData.username} onChange={handleCredenciales} ></input>
        <input type="password" name="password" value={loginData.password} onChange={handleCredenciales} ></input>
        <input type="submit" value="Submit" />
      </form>
       
    </div>
  );
};

export default Login;
