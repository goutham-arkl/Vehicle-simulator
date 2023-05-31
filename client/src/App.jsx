import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Content from './Components/content/Content';
import Sidebar from './Components/sidebar/Sidebar';
import Home from './Components/Home/Home';
import AddVehicle from './Components/AddVehicle/AddVehicle';
import AddScenario from './Components/AddScenario/AddScenario';
import AllScenarios from './Components/AllScenarios/AllScenarios';

function App() {
  return (
    <div className="App">
    <div className='app-container'>
    <Sidebar />

    <Routes>
    <Route path="/" element={<Content ren={Home} />} />
    <Route path="/addscenario" element={<Content ren={AddScenario} />} />
    <Route path="/allscenario" element={<Content ren={AllScenarios} />} />
    <Route path="/addvehicle" element={<Content ren={AddVehicle} />} />
    
    
    </Routes>
    
    </div>
   
    </div>
  );
}

export default App;
