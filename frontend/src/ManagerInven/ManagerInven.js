import React, {useEffect, useState, useContext} from 'react'
import InventoryItem from '../InventoryItem/InventoryItem.js';
import { useParams } from 'react-router';
import {TokenContext} from '../App.js'
import './ManagerInven.css'


const ManagerInven = () => {
    const [inventory, setInventory] = useState([])
    const id = useParams().id
    const {token, setToken, userIn, setUserIn} = useContext(TokenContext);

    useEffect(()=>{
        fetch(`http://localhost:8080/userinventory/${id}`)
            .then(res => res.json())
            .then(data => setInventory(data))
    }, [id])

    if (userIn) {
        if(inventory.length > 0) {
            return (
                <div id='manCon'>
                    {inventory.map(item => {
                        return <InventoryItem value={item} key={item.id} />
                    })}
                </div>
            )
        } else {
            return <div className='message'>You haven't added any items yet! To add an item click "Add New Item" above!</div>
        }
    } else {
        return <div className='message'>You aren't logged in! Login to view this page!</div>
    }
}

export default ManagerInven