import React, {useEffect, useState} from 'react'
import InventoryItem from '../InventoryItem/InventoryItem.js';
import './Inventory.css'

const Inventory = () => {
    const [inventory, setInventory] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8080/inventory')
            .then(res => res.json())
            .then(data => setInventory(data))
    }, [])

    if(inventory.length > 0) {
        return (
            <div id='invenCon'>
                {inventory.map(item => {
                    return <InventoryItem value={item} key={item.id} />
                })}
            </div>
        )
    }
}

export default Inventory