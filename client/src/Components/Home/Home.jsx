import React, { useEffect, useContext, useState, useRef } from "react";
import { gsap } from "gsap";
import Swal from 'sweetalert2'
import { DataContext } from "../../Context/DataContext";
import axios from "../../axios";
import "./Home.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const Home = () => {
  const [currentScenario, setCurrentScenario] = useState("");
  const [data, setData] = useState([]);
  const { vehicle, scenario,reload,setReload,width,setWidth,height,setHeight } = useContext(DataContext);
  const [modalData,setModalData] =useState({})
  const [speed ,setSpeed]=useState(modalData.speed)
  const [name ,setName]=useState(modalData.name)
  const [x ,setX]=useState(modalData.initialX)
  const [y ,setY]=useState(modalData.initialY)
  const [direction ,setDirection]=useState(modalData.direction)
  const [openModal,setOpenModal]=useState(false)
  
  const [changed,setChanged]=useState(false)



  

  useEffect(() => {
    
    if (currentScenario === "") {
      return;
    }
    const fetchVehicles = async () => {
      await axios
        .get(`/scenario/${currentScenario}`)
        .then((res) => {
          let scn = res.data;
          let ids = [];
          scn.vehicles.map((item) => {
            ids.push(Number(item.vehicleId));
          });
          let temp = [];
          vehicle.map((item) => {
            ids.includes(item.id) && temp.push(item);
          });
          setData(temp);
        });
    };
    fetchVehicles();
  }, [currentScenario]);


  let chooseColor = (name) => {
    switch (name) {
      case "CAR":
        return "blue";

      case "BUS":
        return "green";

      case "BIKE":
        return "gray";

      case "TRUCK":
        return "yellow";

      case "LORRY":
        return "white";
    }
  };


  const showAnimation =async () => {
    
    if (currentScenario === "") {
      return;
    }
    let time
    await axios.get(`/scenario/${currentScenario}`).then((res)=>{
      time=Number(res.data.time)
      
    })
    const tl = gsap.timeline({});
    

   data.map((item)=>{
    let classname="."+item.name
    
    let x,y=0


    if (item.direction === "towards") {
      x = "1500%";
    } else if (item.direction === "backwards") {
      x = "-1500%";
    } else if (item.direction === "upwards") {
      y = "-1500%";
    } else if (item.direction === "downwards") {
      y = "1500%";
    }


    const animation = gsap.to(classname, { x: x, y: y, duration:item.speed > 10 ? 10 - item.speed/10 :10 - item.speed }).timeScale(0.5);
    tl.add(animation,0)
    


  })
  tl.duration(time)
  setReload(!reload)
};


  const handleDelete=(id)=>{

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/vehicle/${id}`).then((res)=>{
          axios.get(`/scenario/${Number(currentScenario)}`).then((res)=>{
            let vehicles=res.data.vehicles
            let del={vehicleId:id}
            const index = vehicles.findIndex((vehicle) => vehicle.vehicleId === id);
            if(index > -1){
              vehicles.splice(index,1)
            }
            let obj={
              name:res.data.name,
              time:res.data.time,
              vehicles:vehicles
            }
             return axios.patch(`/scenario/${currentScenario}`,obj)

          })
          
          Swal.fire(
            'Deleted!',
            `res.data has been deleted`,
            'success'
          )
          console.log(reload)
          setReload(!reload)
    }).catch((err)=>{
      console.log(err)
    })
       
      }
    })
    
  }

  const handleopen=async(id)=>{
    
   try {
    await axios.get(`/vehicle/${id}`).then((res)=>{
     setModalData(res.data)
     setOpenModal(true)
    })
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  if (modalData) {
    setName(modalData.name);
    setSpeed(modalData.speed);
    setX(modalData.initialX);
    setY(modalData.initialY);
    setDirection(modalData.direction);
  }
}, [modalData]);



const handleEdit = async() => {
  if (!changed) {
    setOpenModal(false);
  } else {
    let id= modalData.id
    const updatedData = {
      name: name,
      speed: speed,
      initialX: x,
      initialY: y,
      direction: direction
    };
      try {
        const response = await axios.patch(`/vehicle/${id}`, updatedData);
        window.location.reload()
      } catch (error) {
        console.log(error);
      }

  }
};

useEffect(() => {
  const map = document.querySelector('.graph');
  setWidth( map.offsetWidth);
  setHeight( map.offsetHeight);

}, [width,height]);






  

  return (
    <div className="home-container">
    {openModal===false &&
      <div className="scenario-chooser">
        <select
          className="scenario-select"
          onChange={(e) => {setCurrentScenario(e.target.value)}}
        >
          <option disabled selected>
            Choose a scenario
          </option>
          {scenario &&
            scenario.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <div>
        <button className=" btn start-simulation" onClick={() => showAnimation(1)}>Start simulation</button>
        <button className=" btn kill" onClick={() => gsap.killTweensOf(".vehicles")}>Stop</button>
        </div>
        </div>
            }

        {openModal===false && <div className="table-container">
        <table cellSpacing={0} style={{ borderRadius: "12px" }}>
          <thead>
            <tr className="headings">
              <th>Vehicle Id</th>
              <th>Vehicle name</th>
              <th>Position X</th>
              <th>Position Y</th>
              <th>Speed</th>
              <th>Direction</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.initialX}</td>
                <td>{item.initialY}</td>
                <td>{item.speed}</td>
                <td>{item.direction}</td>
                <td><EditIcon className="clickables"  onClick={()=>handleopen(item.id)} style={{color:"#0B5394"}}/></td>
                <td><DeleteIcon className="clickables" onClick={()=>handleDelete(item.id)} style={{color:"#de0000bd"}}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            }

      {openModal===false && <div className="graph">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className={`vehicles ${item.name}`}
              style={{
                backgroundColor: `${chooseColor(item.name) ?chooseColor(item.name) : "gray" }`,
                top: `${item.initialY}px`,
                left: `${item.initialX}px`,
              }}
            >
              {item.name}
            </div>
          ))}
      </div>
            }

      {openModal && <div className="modal-dialog">
      <div className="modal-body">
      <div className='add-scenario-container'>

      {modalData && <div className='values-div'>

      <div className='input-container'>
      <label>Scenario List</label>
      <select className='scenario-select' onChange={(e)=>{setCurrentScenario(e.target.value),setChanged(true)}}>
           {scenario && scenario.map((item)=>( 
             <option key={item.id} value={item.id}>{item.name}</option>
           )) }
           </select>    
          </div>

    <div className='input-container'>
      <label>Vehicle Name</label>
      <input onChange={(e)=>{setName(e.target.value),setChanged(true)}} value={name}  type={'text'} placeholder='Name'/>
      </div>

      <div className='input-container'>
      <label>Speed</label>
      <input onChange={(e)=>{setSpeed(e.target.value),setChanged(true)}} value={speed} type={'number'} placeholder='10'/>
      </div>

      <div className='input-container'>
      <label>Position X</label>
      <input onChange={(e)=>{setX(e.target.value),setChanged(true)}} value={x} type={'number'} placeholder='10'/>
      </div>

      <div className='input-container'>
      <label>Position Y</label>
      <input onChange={(e)=>{setY(e.target.value),setChanged(true)}} value={y} type={'number'} placeholder='10'/>
      </div>
    

      <div className='input-container'>
      <label>Direction</label>
      <select onChange={(e)=>{setDirection(e.target.value),setChanged(true)}} className='scenario-select'>
       <option selected>{direction}</option>
       <option>upwards</option>
       <option>downwards</option>
       <option>towards</option>
       <option>backwards</option>

      </select>
      </div>
      <button className='save' onClick={handleEdit} >Save changes</button>
      <button className='save' onClick={()=>setOpenModal(false)} style={{backgroundColor:"#b33f40", border:"none"}}>Cancel</button>
      </div>}


    
  </div>
      </div>
  </div>
           }


    </div>
  );
};

export default Home;
