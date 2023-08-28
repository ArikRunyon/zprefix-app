import React, {useState, useEffect, useContext} from 'react'
import './Register.css'
import { useAlert } from 'react-alert'
import {useNavigate} from 'react-router-dom'
import {TokenContext} from '../App.js'

const Register = () => {
    const {token, setToken, userIn, setUserIn} = useContext(TokenContext);
    const [firstnameInput, setFirstnameInput] = useState('');
    const [lastnameInput, setLastnameInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordInputVerify, setPasswordInputVerify] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [userTakenCheck, setUserTakenCheck] = useState(false);
    const alert = useAlert()
    const navigate = useNavigate();

    const newUser = {
        'first_name': firstnameInput,
        'last_name': lastnameInput,
        'username': usernameInput,
        'password': passwordInput
    }

    useEffect(()=>{
        const init = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({'username': usernameInput})
          }
        fetch('http://localhost:8080/usercheck', init)
            .then(res => res.json())
            .then(data => {
                if(data.check === 'good') {
                    setUserTakenCheck(false)
                } else {
                    setUserTakenCheck(true)
                }
            })
    }, [usernameInput])

    useEffect(() => {
        if(passwordVerify) {
            if(passwordInput !== passwordInputVerify) {
                setPasswordVerify(false)
                document.getElementById("subBtn").disabled = true;
            } else {
                document.getElementById("subBtn").disabled = false;
            }
        }
        if(!passwordVerify && passwordInput.length >= 10 && passwordInput === passwordInputVerify) {
            document.getElementById("subBtn").disabled = false;
            setPasswordVerify(true);
        } else if (!passwordVerify) {
            document.getElementById("subBtn").disabled = true;
        }
    }, [passwordVerify, passwordInput, passwordInputVerify])

    return (
        <div id='regwrapper'>
            <div id='regCon'>
                Please Enter Your Registration Information...
                <input id='fname' type='text' placeholder='First Name...' onChange={()=>{
                    setFirstnameInput(document.getElementById('fname').value)
                }}/>
                <input id='lname' type='text' placeholder='Last Name...' onChange={()=>{
                    setLastnameInput(document.getElementById('lname').value)
                }}/>
                <input id='uname' type='text' placeholder='Username...' onChange={()=>{
                    setUsernameInput(document.getElementById('uname').value)
                }}/>{userTakenCheck ? <span>Username Taken!</span> : <></>}
                <input id='pword' type='password' placeholder='Password...' onChange={()=>{
                    setPasswordInput(document.getElementById('pword').value)
                }}/>
                <input id='pwordv' type='password' placeholder='Confirm Password...' onChange={()=>{
                    setPasswordInputVerify(document.getElementById('pwordv').value)
                }}/>{passwordVerify ? <></> : <span>Passwords must match!</span>}{passwordInput.length >= 10 ? <></> : <span>Password must be 10 characters or more!</span>}
                <button id="subBtn" onClick={()=>{
                if(passwordVerify && passwordInput.length > 10) {
                    const init = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(newUser)
                      };

                    fetch('http://localhost:8080/register', init)
                        .then(data => {
                            if (data.status === 201) {
                                alert.success('Thank you for registering!', {
                                    timeout: 2000,
                                    onClose: () => {
                                        const init2 = {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({'username': newUser.username, 'password': newUser.password})
                                          };
                                      fetch('http://localhost:8080/login', init2)
                                          .then(async data => {
                                            if (data.status === 200) {
                                                await setToken(await data.json())
                                                await setUserIn(true)
                                                navigate('/ingredients')
                                            } else if (data.status === 400) {
                                                alert.error('Oh no, something went wrong!', {timeout: 2000})
                                            }
                                          })
                                    }
                                  })
                            } else if (data.status === 400) {
                                alert.error('Oh no, something went wrong!', {timeout: 2000})
                            }
                        })
                        .catch((error) => console.error('Error:', error))
                }
            }}>Confirm Registration</button>
            </div>
        </div>
    )
}

export default Register