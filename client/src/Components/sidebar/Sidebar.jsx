import React from 'react'
import {Link} from'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
        <div className='logo'>
            <h2>Vehicle Simulator</h2>
        </div>
        <div className='list-container'>
        <ul>
             <Link style={{textDecoration:"none",color:'black'}} to='/'><li>Home</li></Link>
             <Link style={{textDecoration:"none",color:'black'}} to='/addscenario'><li>Add Scenario</li></Link>
             <Link style={{textDecoration:"none",color:'black'}} to='/allscenario'><li>All Scenarios</li></Link>
             <Link style={{textDecoration:"none",color:'black'}} to='/addvehicle'><li>Add Vehicle</li></Link>

        </ul>
        </div>
    </div>
  )
}

export default Sidebar