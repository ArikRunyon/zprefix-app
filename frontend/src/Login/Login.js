import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
import {TokenContext} from '../App.js'

const Login = () => {
    const {token, setToken, userIn, setUserIn} = useContext(TokenContext);
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const navigate = useNavigate()

    return (
        <div id='loginwrapper'>
            <div id='logincontainer'>
                Please Enter Your Login Information Below:
                <input id='usernameinput' className='loginput' type='text' placeholder='Enter Username...' onChange={()=>{
                    setUsername(document.getElementById('usernameinput').value)
                }}/>
                <input id='passwordinput' className='loginput' type='text' placeholder='Enter Password...' onChange={()=>{
                    setPassword(document.getElementById('passwordinput').value)
                }}/>
                <div id='loginbuttons'>
                    <button onClick={() => {
                        const init = {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'username': username, 'password': password})
                          };
                        fetch('http://localhost:8080/login', init)
                            .then(async data => {
                                if (data.status === 200) {
                                    await setToken(await data.json())
                                    await setUserIn(true)
                                    navigate('/inventory')
                                } else if (data.status === 400) {
                                    alert.error('Oh no, something went wrong!', {timeout: 2000})
                                }
                            })
                    }}>Login</button>
                    <button onClick={()=>{
                    window.location=`http://localhost:3000/register`
                }}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Login