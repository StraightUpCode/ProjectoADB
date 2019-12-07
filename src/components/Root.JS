import React,{useState} from "react";
import useForm from './hooks/useForm'
import {createListener} from './utils/events'
import {useListener} from './utils/events'

const Root = (props) => {
  const [stat,fstat]= useState() 
  const listener = createListener('rootCommand', (toLog) => {
    fstat(toLog)
  })


    const [Command, handleChange] = useForm({   

      Log:''
    })

    const sendCommand = (event) => {
      event.preventDefault()
      console.log(Command);
      listener.send(Command); 
  
    }

    useListener(listener)

  
    return (
      <div className="Root_Container">
        <h1 className="TitleRoot">Admin</h1>
        <form className="Root" onSubmit={sendCommand} >
          <label className="label">Console</label>
          <input className="labelinput" type="text" name='Log' value={Command.Log} onChange={handleChange} ></input>
          
          <input  type="submit" value="Submit" className="enter" />
        </form>
    
      </div>
    );
  };


  
  export default Root 