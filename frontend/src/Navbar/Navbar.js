import React, {useContext, useState, useEffect} from 'react'
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import {TokenContext} from '../App.js'

const Navbar = () => {
    const {token, setToken, userIn, setUserIn} = useContext(TokenContext);
    const navigate = useNavigate()
    useEffect(()=>{
        if(token.length > 0) {
            console.log(token)
            const init = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(token)
              };
            fetch('http://localhost:8080/logcheck', init)
                .then(res => res.json())
                .then(data => {
                    if (data.check === 'good') {
                        setUserIn(true);
                    } else {
                        setUserIn(false)
                    }
                })
        }
    }, [token, setUserIn])

    return (
        <div id='navbarContainer'>
            <div>
                {userIn ? <button className='navButton' onClick={async ()=>{
                    await setToken([])
                    await setUserIn(false)
                    navigate('/login')
                }}>Logout</button> : <button className='navButton' onClick={()=>{
                    navigate('/login')
                }}>Login</button>}
                {userIn ? <>|<button className='navButton' onClick={()=>{
                    navigate(`/useringredients/${token.user_id}`)
                }}>My Ingredients</button>|<button className='navButton' onClick={()=>{
                    navigate(`/usermeals/${token.user_id}`)
                }}>My Meals</button>|<button className='navButton' onClick={()=>{
                    navigate('/ingredients')
                }}>View All Ingredients</button>|<button className='navButton' onClick={()=>{
                    navigate('/meals')
                }}>View All Meals</button>|<button className='navButton' onClick={()=>{
                    navigate('/newingredient')
                }}>Add New Ingredient</button>|<button className='navButton' onClick={()=>{
                    navigate('/newmeal')
                }}>Add New Meal</button></> : <>|<button className='navButton' onClick={()=>{
                    navigate('/ingredients')
                }}>View All Ingredients</button>|<button className='navButton' onClick={()=>{
                    navigate('/meals')
                }}>View All Meals</button></>}
            </div>
            {userIn && token.length > 0 ? <span id='username'>Welcome, {token.username.toUpperCase()}!</span> : <></>}
            <Link id="appTitle" to= '/' style={{ textDecoration: 'none' }}>Zapp Foods</Link>
        </div>
    )
}

export default Navbar