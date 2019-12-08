import React,{useState} from "react";
import useForm from './hooks/useForm'
import {createListener} from '../utils/events'
import useListener from './hooks/useListener'

const Root = (props) => {
  const [stat,fstat]= useState('') 
  const listener = createListener('rootCommand', (event, toLog) => {
    fstat(toLog)
  })


    const [Command, handleChange] = useForm({   

      Log:''
    })

    const sendCommand = (event) => {
      event.preventDefault()
      console.log(Command);
      listener.send(Command.Log); 
      const xd = new XMLHttpRequest();
      xd.open(GET,)
  
    }

    useListener(listener)

  
    return (
      <div className="Root_Container">
        <h1 className="TitleRoot">Admin</h1>
        <form className="Root" onSubmit={sendCommand} >
          <label className="label">Console</label>
<<<<<<< HEAD
          <input className="labelinput" type="text" name='Log' value={Command.Log} onChange={handleChange} ></input>;
=======
          <input className="labelinput" type="text" name='Log' value={Command.Log} onChange={handleChange} ></input>
>>>>>>> b6b6fa271a9f1ccd82d1acab551a41c051445cf7
          <input  type="submit" value="Submit" className="enter" />
          <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
          
        </form>
        <div>{JSON.stringify(stat)}</div>
      </div>
    );
  };


  
  export default Root 