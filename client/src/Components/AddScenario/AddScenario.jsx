import React, { useContext, useState } from 'react'
import axios from 'axios'
import './AddScenario.css'
import { DataContext } from '../../Context/DataContext'
const AddScenario = () => {

  const [name,setName]=useState('')
  const [time,setTime]=useState(0)
  const {setReload,reload}=useContext(DataContext)

  const addScenario=()=>{
    let obj={
      name:name,
      time:time
    }
    axios.post(`http://localhost:4000/scenario`,obj).then((res)=>{
      console.log('data added')
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className='add-scenario-container'>
        <span className='heading'>Add Scenario</span>
        <div className='values-div'>
           <div className='input-container'>
           <label>Scenario Name</label>
           <input onChange={(e)=>{setName(e.target.value)}} type={'text'} placeholder='Test Scenario'/>
           </div>

           <div className='input-container'>
           <label>Scenario Time (seconds)</label>
           <input onChange={(e)=>{setTime(e.target.value)}} type={'number'} placeholder='10'/>
           </div>

        </div>

        <div className='button-div'>
        <button onClick={addScenario} style={{backgroundColor:"#6EC54B"}}>Add</button>
        <button style={{backgroundColor:"#C5564B"}}>Reset</button>
        <button style={{backgroundColor:"#4B74C5"}}>Go Back</button>

        </div>
    </div>
  )
}

export default AddScenario