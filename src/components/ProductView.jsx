import choosePhoto from "../img/insertImage.jpg";
import { IoBagAdd } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductView = ({item}) => {

    const [count, setCount] = useState(1);
    const navigate = useNavigate()

    const decrease = () => {
        if(count > 1) {
            setCount(count - 1)
        }
    }
    
    const increase = () => {
        if (count < item.stocks){
            setCount(count + 1)
        }
    }

    const addToCart = () => {
        const inputs = {
            'user_id': localStorage.getItem('user_id'),
            'item_id': item.id,
            'quantity': count
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/cart/addToCart.php', inputs, {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then(()=>{
            alert('Item is now on shopping cart')
            navigate('/shopping')
        })
    }

    return ( 
        <>
        
            <div className="containerr">
                <div className="picture">
                    {item.image && <img src={`data:image/jpeg;base64, ${item.image}`}/>}
                    {!item.image && <img src={choosePhoto}/>}
                </div>
                <div className="description">
                    <h1 className="name">{item.name}</h1>
                    <p className="price">PHP {item.price}</p>
                    <div className="desc">
                        <p className="descTitle">Description</p>
                        <p className="descText">{item.details}</p>
                    </div>
                    <div className="category">
                        <p className="descTitle">Category</p>
                        <p className="descText">{item.category_name}</p>
                    </div>
                    <div className="quantity">
                        <div className="quantityItem">
                            <p className="descTitle">Quantity</p>
                        <div className="totalItem">
                            <button onClick={decrease}>-</button>
                            <p>{count}</p>
                            <button onClick={increase}>+</button>
                        </div>
                        </div>
                        <div className="stocks">
                            <p className="stocksdesc">Stocks Available</p>
                            {item.stocks == 0 && <p>Out of stock</p>}
                            {item.stocks > 0 && <p>{item.stocks}</p>}

                        </div>
                    </div>
                    {item.stocks == 0 && <button className="addToCart" onClick={addToCart} disabled><IoBagAdd />Out of stock</button>}
                    {item.stocks > 0 && <button className="addToCart" onClick={addToCart}><IoBagAdd />Add To Shopping List</button>}
                    
                </div>
            </div>
        
        </>
    );
}

export default ProductView;