import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import './FullItem.css'
import {TokenContext} from '../App.js'
import { useAlert } from 'react-alert'

const FullItem = () => {
    const {token, userIn} = useContext(TokenContext);
    let id = useParams().id
    const [item, setItem] = useState([])
    const [editmode, setEditmode] = useState(false)
    const [iname, setIname] = useState([])
    const [igrow, setIgrow] = useState([])
    const [ibene, setIbene] = useState([])
    const [idraw, setIdraw] = useState([])
    const navigate = useNavigate()
    const alert = useAlert()
    useEffect(()=>{
        fetch(`http://localhost:8080/ingredients/${id}`)
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
                    <p>Grow Season: <input id='igrow' type='text' defaultValue={item.grow_season} onChange={()=>{
                        setIgrow(document.getElementById('igrow').value)
                    }}/></p>
                    <p>Benefits: <textarea id='ibene' defaultValue={item.benefits} onChange={()=>{
                        setIbene(document.getElementById('ibene').value)
                    }}/></p>
                    <p>Drawbacks: <textarea id='idraw' defaultValue={item.drawbacks} onChange={()=>{
                        setIdraw(document.getElementById('idraw').value)
                    }}/></p>
                    {userIn && token.user_id === item.user_id ? <div><button onClick={()=>{
                        navigate(`/ingredients`)
                    }}>Back to List</button><button onClick={()=>{
                        const init = {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'item_name': iname, 'benefits': ibene, 'drawbacks': idraw, 'grow_season': igrow})
                        };
                        fetch(`http://localhost:8080/ingredients/${id}`, init)
                            .then(res => {
                                if(res.status === 200) {
                                    item.item_name = iname;
                                    item.benefits = ibene;
                                    item.drawbacks = idraw;
                                    item.grow_season = igrow;
                                    setItem(item);
                                    setEditmode(false);
                                }
                            })
                    }}>Save Item</button></div> : <button onClick={()=>{
                        navigate(`/ingredients`)
                    }}>Back to List</button>}
                </div>
            </div>
        )
    } else if (!editmode) {
        return (
            <div id='fullwrapper'>
                <div id='fullitem'>
                    <p>Name: <span>{item.item_name}</span></p>
                    <p>Grow Season: <span>{item.grow_season}</span></p>
                    <p>Benefits: <span>{item.benefits}</span></p>
                    <p>Drawbacks: <span>{item.drawbacks}</span></p>
                    {userIn && token.user_id === item.user_id ? <div><button onClick={()=>{
                        navigate(`/ingredients`)
                    }}>Back to List</button><button onClick={()=>{
                        setIdraw(item.drawbacks)
                        setIname(item.item_name)
                        setIbene(item.benefits)
                        setIgrow(item.grow_season)
                        setEditmode(true);
                    }}>Edit Item</button><button onClick={()=>{
                        const init = {
                            method: 'DELETE',
                            headers: {'Content-Type': 'application/json'}
                          };
                        fetch(`http://localhost:8080/ingredients/${id}`, init)
                            .then(res => {
                                if(res.status === 200) {
                                    alert.success(`${item.item_name} Deleted!`, {
                                        timeout: 2000,
                                        onClose: () => {
                                            navigate(`/useringredients/${token.user_id}`)
                                        }})
                                } else {
                                    alert.error('Oh no, something went wrong!', {timeout: 2000})
                                }
                            })
                    }}>Delete Item</button></div> : <button onClick={()=>{
                        navigate(`/ingredients`)
                    }}>Back to List</button>}
                </div>
            </div>
        )
    }
}

export default FullItem