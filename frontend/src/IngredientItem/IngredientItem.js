import './IngredientItem.css'
import {useNavigate} from 'react-router-dom'

const IngredientItem = ({value}) => {
    const item = value;
    const navigate = useNavigate()

    function truncate(str){
        return (str.length > 100) ? str.slice(0, 100-1) + `...` : str;
    };

    return (
        <div id="ingredCon" onClick={()=>{
            navigate(`/ingredients/${item.id}`)
        }}>
            <p>Name: <span>{item.item_name}</span></p>
            <p>Grow Season: <span>{item.grow_season}</span></p>
            <p>Benefits: <span>{item.benefits.length > 100 ? truncate(item.benefits) : item.benefits}</span></p>
            <p>Drawbacks: <span>{item.drawbacks.length > 100 ? truncate(item.drawbacks) : item.drawbacks}</span></p>
        </div>
    )
}

export default IngredientItem