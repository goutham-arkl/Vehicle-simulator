import{useContext, useEffect, useState} from 'react'
import './AllScenarios.css'
import Swal from 'sweetalert2'
import {DataContext} from '../../Context/DataContext'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AllScenarios = () => {


    const {scenario,vehicle,reload,setReload}=useContext(DataContext)
    let data= scenario
    const [openModal,setOpenModal]=useState(false)
    const [changed,setChanged]=useState(false)
    const [modalData,setModalData]=useState({})
    const [name,setName]=useState(modalData.name)
    const [time,setTime]=useState(modalData.time)
    const [addvehicle,setAddVehicle]=useState(false)
    const [currentScenario,setCurrentScenario]=useState({})
    const [currentVehicle,setcurrentVehicle]=useState({})



    const handledelete= ()=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          try{
            scenario.map((item)=>{
              axios.delete(`/scenario/${item.id}`)
              
            })
            
            vehicle.map((item)=>{
              axios.delete(`/vehicle/${item.id}`)
              
            })
            setReload(!reload)

                Swal.fire(
                  'Deleted!',
                  'All scenarios has been removed',
                  'success'
                )
          
          
            
          }catch(err){
            console.log(err)
          }
         
        }
      })
    }


    const deleteScenario=(id)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete '
      }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            axios.delete(`/scenario/${id}`).then((res)=>{
              setReload(!reload)
              Swal.fire(
                'Deleted!',
                'success'
              )
        
            })
          }  
          catch(err){
            console.log(err)
          }
         
        }
      })
     
    }

    const handleModelOpen=(id)=>{
      axios.get(`/scenario/${id}`).then((res)=>{
        setModalData(res.data)
        setOpenModal(true)
      })

    }

    useEffect(() => {
      if (modalData) {
        setName(modalData.name);
        setTime(modalData.time);
      }
    }, [modalData]);


    const editScenario = async() => {
      if (!changed) {
        setOpenModal(false);
      } else {
        let id= modalData.id
        const updatedData = {
          name: name,
          time: time,
        };
          try {
            const response = await axios.patch(`/scenario/${id}`, updatedData);
            Swal.fire(
              'Edited Succesfully',
              'success'
            )
            location.reload()
          } catch (error) {
            console.log(error);
          }
    
      }
    };

   const openAddvehicle=(scenario)=>{
    setCurrentScenario(scenario)
    setAddVehicle(true)
   
 
   }

   const addVehicleToScenario =()=>{
   try {

    const newVehicle={vehicleId:Number(currentVehicle)};
    console.log(newVehicle)
    currentScenario.vehicles ? currentScenario.vehicles.push(newVehicle):currentScenario.vehicles=[newVehicle]
      const id=Number(currentScenario.id)
      console.log(id)
      axios.patch(`/scenario/${id}`,currentScenario).then((res)=>{
        console.log(res.data)
        setReload(!reload)
        Swal.fire(
          'Vehcle Added',
          'success'
        )
  
      })
   } catch (error) {
    console.log(error)
   }
      
   }

  return (
    <div className='all-scenarios-container'>
       

       <h1>All Scenarios</h1>

       {addvehicle && <div className="modal-container">
      <div className="modal-body">
      <div className='add-scenario-container'>

      {modalData && <div className='values-div'>


    <div className='input-container'>
      <label>Scenario Name</label>
      <input disabled value={currentScenario.name}  type={'text'} placeholder='Name'/>
      </div>
      
      <div className="scenario-chooser">
      
        <select
          className="scenario-select"
          onChange={(e) => {setcurrentVehicle(e.target.value)}}>
          <option disabled selected>
            Choose a Vehicle
          </option>
          {scenario &&
            vehicle.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
       
        </div>

      
      <button className='save' onClick={addVehicleToScenario} >Save changes</button>
      <button className='save' onClick={()=>setAddVehicle(false)} style={{backgroundColor:"#b33f40", border:"none"}}>Cancel</button>
      </div>}


    
  </div>
      </div>
  </div>}

       
        
        

        {!openModal && <div className='table-container'>
            <table cellSpacing={0} style={{borderRadius:"12px"}}>
            <thead>
            <tr className='headings'>
            <th>Scenarios Id</th>
            <th>Scenarios name</th>
            <th>Scenarios Time</th>
            <th>Number of vehicles</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {data && data.map((item)=>(
              <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.time}s</td>
              <td>{item.vehicles ? item.vehicles.length :0}</td>
              <td className='clickables'onClick={()=>openAddvehicle(item)} style={{color:"#00A86B"}}><AddCircleIcon/></td>
              <td className='clickables' onClick={()=>handleModelOpen(item.id)} style={{color:"#0B5394"}}><EditIcon/></td>
              <td className='clickables'  onClick={()=>deleteScenario(item.id)} style={{color:"#de0000bd"}}><DeleteIcon/></td>
              
              </tr>
              )
              )}
              </tbody>
            
            </table>
        </div>
            }

        {!openModal && <div className='buttons-div'> 
        <Link to={'/addscenario'}>
        <button style={{backgroundColor:'#4B74C5',width:"150px",height:"50px"}}>New Scenario</button>
        </Link>
        <Link to={'/addvehicle'}>
        <button style={{backgroundColor:'#6EC54B',width:"150px",height:"50px"}}>Add Vehicle</button>
        </Link>
        <button style={{backgroundColor:'#C5564B',width:"150px",height:"50px"}} onClick={handledelete}>Delete All</button>
        </div>
      }



        {openModal && <div className="modal-dialog">
      <div className="modal-body">
      <div className='add-scenario-container'>

      {modalData && <div className='values-div'>


    <div className='input-container'>
      <label>Scenario Name</label>
      <input onChange={(e)=>{setName(e.target.value),setChanged(true)}} value={name}  type={'text'} placeholder='Name'/>
      </div>

      <div className='input-container'>
      <label>Time</label>
      <input onChange={(e)=>{setTime(e.target.value),setChanged(true)}} value={time} type={'number'} placeholder='10'/>
      </div>

      
      <button className='save' onClick={editScenario} >Save changes</button>
      <button className='save' onClick={()=>setOpenModal(false)} style={{backgroundColor:"#b33f40", border:"none"}}>Cancel</button>
      </div>}


    
  </div>
      </div>
  </div>
           }
    </div>
  )
}

export default AllScenarios