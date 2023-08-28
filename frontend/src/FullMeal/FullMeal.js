import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import './FullMeal.css'
import {TokenContext} from '../App.js'
import { useAlert } from 'react-alert'

const FullMeal = () => {
    const {token, userIn} = useContext(TokenContext);
    let id = useParams().id
    const [item, setItem] = useState([])
    const [editmode, setEditmode] = useState(false)
    const [iname, setIname] = useState([])
    const [icook, setIcook] = useState([])
    const [igred, setIgred] = useState([])
    const [ireci, setIreci] = useState([])
    const navigate = useNavigate()
    const alert = useAlert()
    useEffect(()=>{
        fetch(`http://localhost:8080/meals/${id}`)
            .then(res => res.json())
            .then(data => setItem(data[0]))
    }, [id])

    if(editmode) {
        return (
            <div id='fullwrapper'>
                <div id='fullitem'>
                    <p>Name: <input id='iname' type='text' defaultValue={item.name} onChange={()=>{
                        setIname(document.getElementById('iname').value)
                    }}/></p>
                    <p>Cook Time In Minutes: <input id='icook' type='integer' defaultValue={item.cook_time_in_minutes} onChange={()=>{
                        setIcook(document.getElementById('icook').value)
                    }}/></p>
                    <p>Ingredients: <textarea id='igred' defaultValue={item.ingredients} onChange={()=>{
                        setIgred(document.getElementById('igred').value)
                    }}/></p>
                    <p>Recipe: <textarea id='ireci' defaultValue={item.recipe} onChange={()=>{
                        setIreci(document.getElementById('ireci').value)
                    }}/></p>
                    {userIn && token.user_id === item.user_id ? <div><button onClick={()=>{
                        navigate(`/meals`)
                    }}>Back to List</button><button onClick={()=>{
                        const init = {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({'name': iname, 'cook_time_in_minutes': icook, 'ingredients': igred, 'recipe': ireci})
                        };
                        fetch(`http://localhost:8080/meals/${id}`, init)
                            .then(res => {
                                if(res.status === 200) {
                                    item.item_name = iname;
                                    item.cook_time_in_minutes = icook;
                                    item.ingredients = igred;
                                    item.recipe = ireci;
                                    setItem(item);
                                    setEditmode(false);
                                }
                            })
                    }}>Save Item</button></div> : <button onClick={()=>{
                        navigate(`/meals`)
                    }}>Back to List</button>}
                </div>
            </div>
        )
    } else if (!editmode) {
        return (
            <div id='fullwrapper'>
                <div id='fullitem'>
                    <p>Name: <span>{item.name}</span></p>
                    <p>Cook Time In Minutes: <span>{item.cook_time_in_minutes}</span></p>
                    <p>Ingredients: <span>{item.ingredients}</span></p>
                    <p>Recipe: <span>{item.recipe}</span></p>
                    {userIn && token.user_id === item.user_id ? <div><button onClick={()=>{
                        navigate(`/meals`)
                    }}>Back to List</button><button onClick={()=>{
                        setIname(item.name)
                        setIcook(item.cook_time_in_minutes)
                        setIgred(item.ingredients)
                        setIreci(item.recipe)
                        setEditmode(true);
                    }}>Edit Item</button><button onClick={()=>{
                        const init = {
                            method: 'DELETE',
                            headers: {'Content-Type': 'application/json'}
                          };
                        fetch(`http://localhost:8080/meals/${id}`, init)
                            .then(res => {
                                if(res.status === 200) {
                                    alert.success(`${item.name} Deleted!`, {
                                        timeout: 2000,
                                        onClose: () => {
                                            navigate(`/usermeals/${token.user_id}`)
                                        }})
                                } else {
                                    alert.error('Oh no, something went wrong!', {timeout: 2000})
                                }
                            })
                    }}>Delete Item</button></div> : <button onClick={()=>{
                        navigate(`/meals`)
                    }}>Back to List</button>}
                </div>
            </div>
        )
    }
}

export default FullMeal