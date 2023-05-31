import {createContext,useEffect,useState} from 'react'
import axios from '../axios'
export const DataContext = createContext();
export const DataContextProvider =({children})=>{
    const [vehicle,setVehicle]=useState([])
    const [scenario,setScenario]=useState([])
    const [reload,setReload] =useState(false)
    const [width,setWidth]=useState(0)
    const [height,setHeight]=useState(0)


    useEffect(() => {
        const fetchData = async () => {
        
          try {
        
            const response = await axios.get('/scenario');
            setScenario(response.data);
            const resp= await axios.get(`/vehicle`)
            setVehicle(resp.data)
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      },[reload]);

      return(
        <DataContext.Provider value={{vehicle,scenario,setReload,reload,width,height,setHeight,setWidth}}>
        {children}
        </DataContext.Provider>
      );
}
