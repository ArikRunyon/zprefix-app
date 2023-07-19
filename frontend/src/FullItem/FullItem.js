import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import './FullItem.css'
import {TokenContext} from '../App.js'

const FullItem = () => {
    const {token, setToken, userIn, setUserIn} = useContext(TokenContext);
    let id = useParams().id
    const [item, setItem] = useState([])
    const [editmode, setEditmode] = useState(false)
    const [iname, setIname] = useState([])
    const [iquan, setIquan] = useState([])
    const [idesc, setIdesc] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        fetch(`http://localhost:8080/inventory/${id}`)
            .then(res => res.json())
            .then(data => setItem(data[0]))
    }, [id])

    if(editmode) {
        return (
            <div id='fullwrapper'>
                <div id='fullitem'>
                    <p>Name: <input id='iname' type='text' defaultValue={item.item_name} onChange={()=>{
                        setIname(document.getElementById('iname').value)
                    }}/></p>
                    <p>Quantity: <input id='iquan' type='integer' defaultValue={item.quantity} onChange={()=>{
                        setIquan(document.getElementById('iquan').value)
                    }}/></p>
                    <p>Description: <textarea id='idesc' defaultValue={item.description} onChange={()=>{
                        setIdesc(document.getElementById('idesc').value)
                    }}/></p>
                    {userIn && token.user_id === item.user_id ? <div><button onClick={()=>{
                        navigate(`/inventory`)
                    }}>Back to List</button><button onClick={()=>{
                        const init = {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'item_name': iname, 'quantity': iquan, 'description': idesc})
                        };
                        fetch(`http://localhost:8080/inventory/${id}`, init)
                            .then(res => {
                                if(res.status === 200) {
                                    item.item_name = iname;
                                    item.quantity = iquan;
                                    item.description = idesc;
                                    setItem(item);
                                    setEditmode(false);
                                }
                            })
                    }}>Save Item</button></div> : <button onClick={()=>{
                        navigate(`/inventory`)
                    }}>Back to List</button>}
                </div>
            </div>
        )
    } else if (!editmode) {
        return (
            <div id='fullwrapper'>
                <div id='fullitem'>
                    <p>Name: <span>{item.item_name}</span></p>
                    <p>Quantity: <span>{item.quantity}</span></p>
                    <p>Description: <span>{item.description}</span></p>
                    {userIn && token.user_id === item.user_id ? <div><button onClick={()=>{
                        navigate(`/inventory`)
                    }}>Back to List</button><button onClick={()=>{
                        setIdesc(item.description)
                        setIname(item.item_name)
                        setIquan(item.quantity)
                        setEditmode(true);
                    }}>Edit Item</button></div> : <button onClick={()=>{
                        navigate(`/inventory`)
                    }}>Back to List</button>}
                </div>
            </div>
        )
    }
}

export default FullItem