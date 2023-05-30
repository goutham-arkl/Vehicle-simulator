import{useContext} from 'react'
import './AllScenarios.css'
import Swal from 'sweetalert2'
import {DataContext} from '../../Context/DataContext'
import axios from 'axios'

const AllScenarios = () => {


    const {scenario,vehicle}=useContext(DataContext)
    let data= scenario

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
              axios.delete(`http://localhost:4000/scenario/${item.id}`)
              
            })
            
            vehicle.map((item)=>{
              axios.delete(`http://localhost:4000/vehicle/${item.id}`)
              
            })

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
      

  return (
    <div className='all-scenarios-container'>
       

        <span>All Scenarios</span>

        
        

        <div className='table-container'>
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
              <td>icon</td>
              <td>icon</td>
              <td>icon</td>
              
              </tr>
              )
              )}
              </tbody>
            
            </table>
        </div>
        <div className='buttons-div'> 
        <button style={{backgroundColor:'#4B74C5',width:"150px",height:"50px"}}>New Scenario</button>
        <button style={{backgroundColor:'#6EC54B',width:"150px",height:"50px"}}>Add Vehicle</button>
        <button style={{backgroundColor:'#C5564B',width:"150px",height:"50px"}} onClick={handledelete}>Delete All</button>
        </div>
    </div>
  )
}

export default AllScenarios