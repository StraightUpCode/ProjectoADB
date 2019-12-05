import React from "react";
import useForm from './hooks/useForm'

const Root = (props) => {
  const sendCommand = (event) => {
    event.preventDefault()
    console.log(Command);

  }
    const [Command, handleChange] = useForm({   

      Log:''
    })
  
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