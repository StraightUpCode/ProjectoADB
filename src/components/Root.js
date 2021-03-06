import React,{useState} from "react";
import useForm from './hooks/useForm'
import {createListener} from '../utils/events'
import useListener from './hooks/useListener'
import ErrorComponent from "./ErrorComponent";
import Dialog from './Dialog'
import useDialog from './hooks/useDialog'

const Root = (props) => {
  const [stat, fstat] = useState({ recordset: [] }) 
  const [error, setError] = useState()
  const [isOpen, toggleOpen] = useDialog()
  const listener = createListener('rootCommand', (event, response) => {

    setError()


    if (response.ok) {
      fstat(response.response)
    }
    
    else if (response.e) {
      toggleOpen()
      setError(response.e)
      console.log(response.e)
    }
    console.log(stat)
  })


    const [Command, handleChange] = useForm({   

      Log:''
    })

    const sendCommand = (event) => {
      event.preventDefault()
      console.log(Command);
      fstat({ recordset : []})
      listener.send(Command.Log); 
  
    }

    useListener(listener)

    console.log(error)
    return (
      <div className="Root_Container">
        <h1 className="TitleRoot">Admin</h1>
        <form className="Root" onSubmit={sendCommand} >
          <label className="label">Console</label>
          <textarea className="labelinput" type="text" name='Log' value={Command.Log} onChange={handleChange} ></textarea>
          <input href="#popup1" type="submit" value="Submit" className="enter" />
          
          
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
       
        
       
                <div className="errors">
                <h2 className="cerrarito">{error ? <ErrorComponent error={error}></ErrorComponent> : null}</h2>
             
                </div>

       


      </div>
    );
  };


  
  export default Root 