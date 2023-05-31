import axios from 'axios'
import {useContext,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import { DataContext } from '../../Context/DataContext'
import './AddVehicle.css'
const AddVehicle = () => {

  const {scenario,setReload,reload}=useContext(DataContext)
  const [currentScenario,setCurrentScenario] = useState('')
  const [name,setName]=useState('')
  const [speed,setSpeed]=useState(0)
  const [x,setX]=useState(0)
  const [y,setY]=useState(0)
  const [direction,setDirection]=useState('')
  const [err,setErr]=useState(false)

 const addVehicle=()=>{
  setErr(false)
  const obj = {
    name: name,
    speed: speed ,
    initialX: x,
    initialY: y,
    direction: direction,
  };
  
  let chk = { name: obj.name, speed: obj.speed, direction: obj.direction };
  let initialVal = [0, ''];
  let error = false; 

  initialVal.forEach((item) => {
    if (Object.values(chk).includes(item)) {
      setErr(true);
      error = true; 
      return; 
    }
  });

  if (error) {
    return; 
  }

 
  axios.post(`http://localhost:4000/vehicle`,obj).then((res)=>{
    let newVehicleId=res.data.id
    console.log(currentScenario)
    const url=`http://localhost:4000/scenario/${currentScenario}`
    axios.get(url).then((res)=>{
      const scenario=res.data
      const newVehicle={vehicleId:newVehicleId};
      scenario.vehicles ?scenario.vehicles.push(newVehicle):scenario.vehicles=[newVehicle]
      return axios.patch(url,scenario)
    }).then((res)=>{
      setErr(false)
      setReload(!reload)
      Swal.fire(
        'Vehcle Added',
        'success'
      )
    })
  }).catch((err)=>{
    console.log(err)
  })

 }






  return (
    <div className='add-scenario-container'>
    <span className='heading'>Add Vehicle</span>
    <div className='values-div'>
    
    <div className='input-container'>
    <label>Scenario List</label>
    <select className='scenario-select' onChange={(e)=>setCurrentScenario(e.target.value)}>
    <option disabled selected>--select--</option>
    {scenario && scenario.map((item)=>(
      <option key={item.id} value={item.id}>{item.name}</option>
      )) }
      </select>    
      </div>
      
       <div className='input-container'>
       <label>Vehicle Name</label>
       <input onChange={(e)=>setName(e.target.value)}  type={'text'} placeholder='Name'/>
       </div>
       
       <div className='input-container'>
       <label>Speed</label>
       <input onChange={(e)=>setSpeed(e.target.value)} value={speed} type={'text'} placeholder='10'/>
       </div>
       
       <div className='input-container'>
       <label>Position X</label>
       <input onChange={(e)=>setX(e.target.value)} type={'text'} placeholder='10'/>
       </div>
       
       <div className='input-container'>
       <label>Position Y</label>
       <input onChange={(e)=>setY(e.target.value)} type={'text'} placeholder='10'/>
       </div>

       <div className='input-container'>
       <label>Direction</label>
       <select onChange={(e)=>setDirection(e.target.value)} className='scenario-select'>
       <option disabled selected>--select--</option>
       <option>upwards</option>
        <option>downwards</option>
        <option>towards</option>
        <option>backwards</option>
        
        
        
        </select>
        </div>

        </div>
        
        <div className='button-div'>
        <button onClick={addVehicle} style={{backgroundColor:"#6EC54B"}}>Add</button>
        <button onClick={()=>location.reload()}  style={{backgroundColor:"#C5564B"}}>Reset</button>
        <Link to={'/'}>
        <button style={{backgroundColor:"#4B74C5"}}>Go Back</button>
        </Link>
        
        </div>
        {err &&<span className='err'>Enter valid Information</span>}
</div>
  )
}

export default AddVehicle