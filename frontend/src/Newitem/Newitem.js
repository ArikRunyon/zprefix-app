import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router'
import {TokenContext} from '../App.js'
import { useAlert } from 'react-alert'


const Newitem = () => {
    const {token, userIn} = useContext(TokenContext);
    let id = token.user_id
    const [iname, setIname] = useState([])
    const [iquan, setIquan] = useState([])
    const [idesc, setIdesc] = useState([])
    const navigate = useNavigate()
    const alert = useAlert()

    if (userIn) {
        return (
            <div id='fullwrapper'>
                <div id='fullitem'>
                    <p>Name: <input id='iname' type='text' onChange={()=>{
                        setIname(document.getElementById('iname').value)
                    }}/></p>
                    <p>Quantity: <input id='iquan' type='integer' onChange={()=>{
                        setIquan(document.getElementById('iquan').value)
                    }}/></p>
                    <p>Description: <textarea id='idesc' onChange={()=>{
                        setIdesc(document.getElementById('idesc').value)
                    }}/></p>
                    <div><button onClick={()=>{
                        navigate(`/inventory`)
                    }}>Back to List</button><button onClick={()=>{
                        const init = {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'user_id': id, 'item_name': iname, 'quantity': iquan, 'description': idesc})
                        };
                        fetch(`http://localhost:8080/inventory`, init)
                            .then(res => {
                                if(res.status === 200) {
                                    alert.success(`${iname} Posted!`, {
                                        timeout: 2000,
                                        onClose: () => {
                                            navigate(`/userinventory/${id}`)
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

export default Newitem