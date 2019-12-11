import React,{useState} from "react";
import { loginListener} from '../utils/events'
import { useHistory } from 'react-router-dom'
import useListener from "./hooks/useListener";
import useForm from './hooks/useForm'
import { createNavbar } from "./Navbar";
import { addUser } from "../utils/store";
import ReactDOM from 'react-dom';
import ErrorComponent from "./ErrorComponent";



const Login = ({setLoginStatus,...rest}) => {
  const [loginData, handleChange] = useForm({
    username: '',
    password: ''
  })
  const history = useHistory()
  const [stat, fstat] = useState({ recordset: [] }) 
  const [error, setError] = useState()
  const checkLogin = (event, didLogIn) => {
    console.log(didLogIn)
    if (didLogIn.logged) {
      createNavbar(didLogIn.user[0].permisos)
      addUser(didLogIn.user[0])
      setLoginStatus(true)
      console.log('Loggin true')
      history.push('/')
    } else {
      setError(response.e)
      console.log('Loggin false')
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
  
      <h1 className="titulologin">Login</h1>
      <form className="formregister" onSubmit={submitLogin}>
        <label className="label">UserName</label>
        <input className="labelinput" type="text" name='username' value={loginData.username} onChange={handleChange} ></input>
        <label className="label">Password</label>
        <input className="labelinput" type="password" name="password" value={loginData.password} onChange={handleChange} ></input>
        <input  type="submit" value="Submit" className="enter" />
      </form>
       
      <div className="errors">
                <h2 className="cerrarito">{error ? <ErrorComponent error={error}></ErrorComponent> : null}</h2>
             
                </div>
    </div>
  );
};

export default Login;
