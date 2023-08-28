import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {TokenContext} from '../App.js'
import { useAlert } from 'react-alert'
import './Newmeal.css'


const Newmeal = () => {
    const {token, userIn} = useContext(TokenContext);
    let id = token.user_id
    const [iname, setIname] = useState(null)
    const [icook, setIcook] = useState(null)
    const [igred, setIgred] = useState(null)
    const [ireci, setIreci] = useState(null)
    const navigate = useNavigate()
    const alert = useAlert()

    useEffect(()=>{
        if (iname === null || icook === null || igred === null || ireci === null || iname === "" || icook === "" || igred === "" || ireci === "") {
            document.getElementById("saveBtn").disabled = true;
        } else {
            document.getElementById("saveBtn").disabled = false;
        }
    }, [iname, icook, igred, ireci])

    if (userIn) {
        return (
            <div id='fullwrapper'>
                <div id='fullitem'>
                    <p>Name: <input id='iname' type='text' onChange={()=>{
                        setIname(document.getElementById('iname').value)
                    }}/></p>
                    <p>Cook Time In Minutes: <input id='icook' type='number' onChange={()=>{
                        setIcook(document.getElementById('icook').value)
                    }}/></p>
                    <p>Ingredients: <textarea id='igred' onChange={()=>{
                        setIgred(document.getElementById('igred').value)
                    }}/></p>
                    <p>Recipe: <textarea id='ireci' onChange={()=>{
                        setIreci(document.getElementById('ireci').value)
                    }}/></p>
                    <div><button onClick={()=>{
                        navigate(`/meals`)
                    }}>Back to List</button><button id='saveBtn' onClick={()=>{
                        const init = {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'user_id': id, 'name': iname, 'cook_time_in_minutes': icook, 'ingredients': igred, 'recipe': ireci})
                        };
                        fetch(`http://localhost:8080/meals`, init)
                            .then(res => {
                                if(res.status === 200) {
                                    alert.success(`${iname} Posted!`, {
                                        timeout: 2000,
                                        onClose: () => {
                                            navigate(`/usermeals/${id}`)
                                        }})
                                } else {
                                    alert.error('Oh no, something went wrong!', {timeout: 2000})
                                }
                            })
                    }}>Save Item</button></div>
                </div>
            </div>
        )
    } else {
        return <div className='message'>You aren't logged in! Login to view this page!</div>
    }
}

export default Newmeal