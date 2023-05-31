import React from 'react'
import './Modal.css'
const Modal = ({props}) => {
  return (
    <div className="modal-dialog">
       
        <div className="modal-body">
        <div className='add-scenario-container'>

        <div className='values-div'>
           <div className='input-container'>
           <label>Scenario Name</label>
           <input  type={'text'} placeholder='Test Scenario'/>
           </div>

           <div className='input-container'>
           <label>Scenario Time (seconds)</label>
           <input  type={'number'} placeholder='10'/>
           </div>

           <button className='save' >Save changes</button>
           <button className='save' style={{backgroundColor:"#b33f40", border:"none"}}>Cancel</button>

        </div>

      
    </div>
        </div>
    </div>

  )
}

export default Modal