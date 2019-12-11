import React,{useState} from "react";
import useForm from './hooks/useForm'
import {createListener} from '../utils/events'
import useListener from './hooks/useListener'

const Root = (props) => {
  const [stat,fstat]= useState({recordset: []}) 
  const listener = createListener('rootCommand', (event, response) => {
    if (response.ok && response.recordset) {
      fstat(response.response)
    }
    console.log(stat)
  })


    const [Command, handleChange] = useForm({   

      Log:''
    })

    const sendCommand = (event) => {
      event.preventDefault()
      console.log(Command);
      listener.send(Command.Log); 
  
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
        <div>
            {
              stat.recordset.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr className="tablanombre">
                     
                      
                      {Object.keys(stat.recordset[0]).map(el => <th>{el}</th>)}
                      
                      
                    </tr>
                  </thead>
                  <tbody>
                    {stat.recordset.map((element, index) => {
                      return (
                        <tr key={index}>
                          {Object.values(element).map(val => <td>{val}</td>)}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : null
        }
      </div>
      </div>
    );
  };


  
  export default Root 