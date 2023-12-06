import { MdOutlineShoppingCartCheckout } from "react-icons/md"
import { IoBagRemoveOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = ({cart_id, picture, productName, Description, price, stocks, quantity}) => {

    const [count, setCount] = useState(Number(quantity))
    const [totalPrice, setTotalPrice] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        setTotalPrice(count * Number(price))
    },[count, price])

    const decrease = () => {
        if(count > 1) {
            setCount(count - 1)
        }
    }

    const increase = () => {
        if (count < stocks){
            setCount(count + 1)
        }
    }


    const removeItem = () => {
        if (confirm(`Are you sure you want to remove ${productName}?`)){
            axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/cart/removeToCart.php', {'cart_id': cart_id}, {
                headers: {
                    "ngrok-skip-browser-warning": "8888"
                }
            }).then(()=>{
                alert(`${productName} removed`)
                navigate(0)
            })
        }
    }

    return ( 
        <>
            <div className="products">
                <img src={`data:image/jpeg;base64, ${picture}`} className="picture"/>
                <div className="productDesc">
                    <h3 className="productName">{productName}</h3>
                    <p className="Description">{Description}</p>
                </div>
                <div className="productTotal">
                    <button onClick={decrease}>-</button>
                    <p>{count}</p>
                    <button onClick={increase}>+</button>
                </div>
                <div className="price">
                    PHP {totalPrice}
                </div>
                <div>
                    <MdOutlineShoppingCartCheckout size="40"/>
                </div>
                <div>
                    <IoBagRemoveOutline size="40" onClick={removeItem}/>
                </div>
                
            </div>

                <div className="line">
                    <hr/>
                </div>
        </>
    );
}

export default Product;