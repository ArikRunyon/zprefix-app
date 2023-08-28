import './App.css';
import Navbar from './Navbar/Navbar.js'
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import Ingredients from './Ingredients/Ingredients.js';
import {Routes, Route} from 'react-router-dom'
import React, {useState} from 'react'
import FullItem from './FullItem/FullItem.js';
import Homepage from './Homepage/Homepage.js';
import UserIngred from './UserIngred/UserIngred';
import Newingredient from './Newingredient/Newingredient';
import Meals from './Meals/Meals'
import FullMeal from './FullMeal/FullMeal'
import UserMeal from './UserMeal/UserMeal'
import Newmeal from './Newmeal/Newmeal'

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
            <Route path='/ingredients' element={<Ingredients/>}/>
            <Route path='/meals' element={<Meals/>}/>
            <Route path='/ingredients/:id' element={<FullItem/>}/>
            <Route path='/meals/:id' element={<FullMeal/>}/>
            <Route path='/useringredients/:id' element={<UserIngred/>}/>
            <Route path='/usermeals/:id' element={<UserMeal/>}/>
            <Route path='/newingredient' element={<Newingredient/>}/>
            <Route path='/newmeal' element={<Newmeal/>}/>
          </Routes>
        </header>
      </div>
    </TokenContext.Provider>
  );
}

export default App;
