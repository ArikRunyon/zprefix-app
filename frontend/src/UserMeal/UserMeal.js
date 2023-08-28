import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router';
import {TokenContext} from '../App.js'
import MealItem from '../MealItem/MealItem.js';
import './UserMeal.css'


const UserMeal = () => {
    const [inventory, setInventory] = useState([])
    const id = useParams().id
    const {userIn} = useContext(TokenContext);

    useEffect(()=>{
        fetch(`http://localhost:8080/usermeals/${id}`)
            .then(res => res.json())
            .then(data => setInventory(data))
    }, [id])

    if (userIn) {
        if(inventory.length > 0) {
            return (
                <div id='manCon'>
                    {inventory.map(item => {
                        return <MealItem value={item} key={item.id} />
                    })}
                </div>
            )
        } else {
            return <div className='message'>You haven't added any ingredients yet! To add an item click "Add New Item" above!</div>
        }
    } else {
        return <div className='message'>You aren't logged in! Login to view this page!</div>
    }
}

export default UserMeal