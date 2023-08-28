import React, {useEffect, useState} from 'react'
import IngredientItem from '../IngredientItem/IngredientItem.js';
import './Ingredients.css'

const Ingredients = () => {
    const [inventory, setInventory] = useState([])

    useEffect(()=>{
        fetch('http://localhost:8080/ingredients')
            .then(res => res.json())
            .then(data => setInventory(data))
    }, [])

    if(inventory.length > 0) {
        return (
            <div id='invenCon'>
                {inventory.map(item => {
                    return <IngredientItem value={item} key={item.id} />
                })}
            </div>
        )
    }
}

export default Ingredients