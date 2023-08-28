import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router'
import {TokenContext} from '../App.js'
import { useAlert } from 'react-alert'


const Newingredient = () => {
    const {token, userIn} = useContext(TokenContext);
    let id = token.user_id
    const [iname, setIname] = useState([])
    const [igrow, setIgrow] = useState([])
    const [ibene, setIbene] = useState([])
    const [idraw, setIdraw] = useState([])
    const navigate = useNavigate()
    const alert = useAlert()

    if (userIn) {
        return (
            <div id='fullwrapper'>
                <div id='fullitem'>
                    <p>Name: <input id='iname' type='text' onChange={()=>{
                        setIname(document.getElementById('iname').value)
                    }}/></p>
                    <p>Grow Season: <input id='igrow' type='text' onChange={()=>{
                        setIgrow(document.getElementById('igrow').value)
                    }}/></p>
                    <p>Benefits: <textarea id='ibene' onChange={()=>{
                        setIbene(document.getElementById('ibene').value)
                    }}/></p>
                    <p>Drawbacks: <textarea id='idraw' onChange={()=>{
                        setIdraw(document.getElementById('idraw').value)
                    }}/></p>
                    <div><button onClick={()=>{
                        navigate(`/ingredients`)
                    }}>Back to List</button><button onClick={()=>{
                        const init = {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'user_id': id, 'item_name': iname, 'grow_season': igrow, 'benefits': ibene, 'drawbacks': idraw})
                        };
                        fetch(`http://localhost:8080/ingredients`, init)
                            .then(res => {
                                if(res.status === 200) {
                                    alert.success(`${iname} Posted!`, {
                                        timeout: 2000,
                                        onClose: () => {
                                            navigate(`/useringredients/${id}`)
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

export default Newingredient