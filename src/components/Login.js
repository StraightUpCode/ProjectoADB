import React from "react";
import { loginListener, setLoginStatus } from '../utils/events'
import { useHistory } from 'react-router-dom'
import useListener from "./hooks/userListener";
import useForm from './hooks/useForm'
const Login = (props) => {
  const [loginData, handleChange] = useForm({
    username: 'sa',
    password: 'Roberto4$'
  })
  const history = useHistory()
  const checkLogin = (event, didLogIn) => {
    console.log(didLogIn)
    if (didLogIn ) {
      setLoginStatus(true)
      history.push('/registrarUsuario')
    } else {
      setLoginStatus(false)
    }
  }
  const listeners = loginListener(checkLogin)

  const submitLogin = (event) => {
    event.preventDefault()
    listeners.send(loginData.username, loginData.password)
    
  }

  useListener(listeners)
  return (
    <div className="ui container">
      <h1>Login</h1>
      <form onSubmit={submitLogin}>
        <input type="text" name='username' value={loginData.username} onChange={handleChange} ></input>
        <input type="password" name="password" value={loginData.password} onChange={handleChange} ></input>
        <input type="submit" value="Submit" />
      </form>
       
    </div>
  );
};

export default Login;
