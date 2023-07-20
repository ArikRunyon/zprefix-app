import './App.css';
import Navbar from './Navbar/Navbar.js'
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import Inventory from './Inventory/Inventory.js';
import {Routes, Route} from 'react-router-dom'
import React, {useContext, useState} from 'react'
import FullItem from './FullItem/FullItem.js';
import Homepage from './Homepage/Homepage.js';
import ManagerInven from './ManagerInven/ManagerInven';
import Newitem from './Newitem/Newitem';

export const TokenContext = React.createContext()
function App() {
  const [token, setToken] = useState([]);
  const [userIn, setUserIn] = useState(false)
  return (
    <TokenContext.Provider value={{token, setToken, userIn, setUserIn}}>
      <div className="App">
        <header className="App-header">
          <Navbar/>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/inventory/:id' element={<FullItem/>}/>
            <Route path='/userinventory/:id' element={<ManagerInven/>}/>
            <Route path='/newitem' element={<Newitem/>}/>
          </Routes>
        </header>
      </div>
    </TokenContext.Provider>
  );
}

export default App;
