import React, {useEffect, useState} from 'react'
import MealItem from '../MealItem/MealItem.js';
import './Meals.css'

const Meals = () => {
    const [inventory, setInventory] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8080/meals')
            .then(res => res.json())
            .then(data => setInventory(data))
    }, [])

    if(inventory.length > 0) {
        return (
            <div id='invenCon'>
                {inventory.map(item => {
                    return <MealItem value={item} key={item.id} />
                })}
            </div>
        )
    }
}

export default Meals