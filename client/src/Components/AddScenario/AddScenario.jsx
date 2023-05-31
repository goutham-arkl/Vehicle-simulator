import React, { useContext, useState } from 'react'
import axios from '../../axios'
import './AddScenario.css'
import { DataContext } from '../../Context/DataContext'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
const AddScenario = () => {

  const [name,setName]=useState('')
  const [time,setTime]=useState(0)
  const {setReload,reload}=useContext(DataContext)

  const addScenario=()=>{
    let obj={
      name:name,
      time:time,
      vehicles:[]
    }
    axios.post(`/scenario`,obj).then((res)=>{
      Swal.fire(
        'Successfully Added Scenario',
      )
      setReload(!reload)
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className='add-scenario-container'>
        <h1>Add Scenario</h1>
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
        <button onClick={()=>window.location.reload()} style={{backgroundColor:"#C5564B"}} >Reset</button>
        <Link to='/'><button style={{backgroundColor:"#4B74C5"}}>Go Back</button></Link>

        </div>
    </div>
  )
}

export default AddScenario