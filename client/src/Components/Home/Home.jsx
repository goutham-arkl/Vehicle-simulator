import React, { useEffect, useContext, useState, useRef } from "react";
import { gsap } from "gsap";
import Swal from 'sweetalert2'
import { DataContext } from "../../Context/DataContext";
import axios from "axios";
import "./Home.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const Home = () => {
  const [currentScenario, setCurrentScenario] = useState("");
  const [data, setData] = useState([]);
  const { vehicle, scenario } = useContext(DataContext);
  

  useEffect(() => {
    
    if (currentScenario === "") {
      return;
    }
    const fetchVehicles = async () => {
      await axios
        .get(`http://localhost:4000/scenario/${currentScenario}`)
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
      case "Car":
        return "blue";

      case "Bus":
        return "green";

      case "Bike":
        return "gray";

      case "Truck":
        return "yellow";

      case "Lorry":
        return "white";
    }
  };


  const showAnimation =async () => {
    
    if (currentScenario === "") {
      return;
    }
    let time
    await axios.get(`http://localhost:4000/scenario/${currentScenario}`).then((res)=>{
      time=Number(res.data.time)
      
    })
    const tl = gsap.timeline({});
    

   data.map((item)=>{
    let classname="."+item.name
    
    let x,y=0


    if (item.direction === "towards") {
      x = "-1000%";
    } else if (item.direction === "backwards") {
      x = "1000%";
    } else if (item.direction === "upward") {
      y = "-1000%";
    } else if (item.direction === "downward") {
      y = "1000%";
    }


    const animation = gsap.to(classname, { x: x, y: y, duration:item.speed > 10 ? item.speed/10 :item.speed });
    tl.add(animation,0)
    


  })
  tl.duration(time)

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
        axios.delete(`http://localhost:4000/vehicle/${id}`).then((res)=>{
          Swal.fire(
            'Deleted!',
            `res.data has been deleted`,
            'success'
          )
    }).catch((err)=>{
      console.log(err)
    })
       
      }
    })
    
  }





  

  return (
    <div className="home-container">
      <div className="scenario-chooser">
        <select
          className="scenario-select"
          onChange={(e) => {setCurrentScenario(e.target.value)}}
        >
          <option disabled selected>
            --select--
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

      <div className="table-container">
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
                <td><EditIcon   style={{color:"#0B5394",cursor:"pointer"}}/></td>
                <td><DeleteIcon onClick={()=>handleDelete(item.id)} style={{color:"#de0000bd",cursor:"pointer"}}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="graph">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className={`vehicles ${item.name}`}
              style={{
                backgroundColor: `${chooseColor(item.name)}`,
                top: `${item.initialY}px`,
                left: `${item.initialX}px`,
              }}
            >
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
