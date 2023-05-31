import React from 'react'
import {Link} from'react-router-dom'
import './Sidebar.css'
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import AlignHorizontalLeftSharpIcon from '@mui/icons-material/AlignHorizontalLeftSharp';
import TwoWheelerSharpIcon from '@mui/icons-material/TwoWheelerSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

const Sidebar = () => {
  return (
    <div className='sidebar-container'>
        <div className='logo'>
            <h2>Vehicle Simulator</h2>
        </div>
        <div className='list-container'>
        <ul>
             <Link style={{textDecoration:"none",color:'black'}} to='/'><li><HomeSharpIcon/>Home </li></Link>
             <Link style={{textDecoration:"none",color:'black'}} to='/addscenario'><li> <AddBoxSharpIcon fontSize='small'/>Add Scenario
             </li></Link>
             <Link style={{textDecoration:"none",color:'black'}} to='/allscenario'><li><AlignHorizontalLeftSharpIcon/>All Scenarios</li></Link>
             <Link style={{textDecoration:"none",color:'black'}} to='/addvehicle'><li><TwoWheelerSharpIcon/>Add Vehicle</li></Link>

        </ul>
        </div>
    </div>
  )
}

export default Sidebar