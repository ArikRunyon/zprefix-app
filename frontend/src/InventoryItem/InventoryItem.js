import './InventoryItem.css'
import {useNavigate} from 'react-router-dom'

const InventoryItem = ({value}) => {
    const item = value;
    const navigate = useNavigate()

    function truncate(str){
        return (str.length > 100) ? str.slice(0, 100-1) + `...` : str;
    };

    return (
        <div id="itemCon" onClick={()=>{
            navigate(`/inventory/${item.id}`)
        }}>
            <p>Name: <span>{item.item_name}</span></p>
            <p>Quantity: <span>{item.quantity}</span></p>
            <p>Description: <span>{item.description.length > 100 ? truncate(item.description) : item.description}</span></p>
        </div>
    )
}

export default InventoryItem