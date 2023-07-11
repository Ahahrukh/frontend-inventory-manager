import './App.css';
import {Routes ,Route } from 'react-router-dom'
import Login from './components/Login';
import Inventory from './components/Inventory';
import InventoryChange from './components/InventoryChange';
import CreateInventoryChange from './components/CreateInventoryChange';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/inventory' element={<Inventory />}/>
        <Route path='/order' element={<InventoryChange />}/>
        <Route path='/create-inventory' element={<CreateInventoryChange />}/>
      </Routes>
    </div>
  );
}

export default App;
