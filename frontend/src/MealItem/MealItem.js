import './MealItem.css'
import {useNavigate} from 'react-router-dom'

const MealItem = ({value}) => {
    const item = value;
    const navigate = useNavigate()

    function truncate(str){
        return (str.length > 100) ? str.slice(0, 100-1) + `...` : str;
    };

    return (
        <div id="mealCon" onClick={()=>{
            navigate(`/meals/${item.id}`)
        }}>
            <p>Name: <span>{item.name}</span></p>
            <p>Cook Time In Minutes: <span>{item.cook_time_in_minutes}</span></p>
            <p>Ingredients: <span>{item.ingredients.length > 100 ? truncate(item.ingredients) : item.ingredients}</span></p>
            <p>Recipe: <span>{item.recipe.length > 100 ? truncate(item.recipe) : item.recipe}</span></p>
        </div>
    )
}

export default MealItem