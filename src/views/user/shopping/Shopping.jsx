import "./shopping.css"
import Navbar from "../../../components/Navbar";
import Product from "../../../components/Product";
import { useState, useEffect } from "react";
import axios from "axios";

const Shopping = () => {

    const [items, setItems] = useState([])

    useEffect(()=>{
        getItems()
    }, [])

    const getItems = () => {
        const input = {
            'user_id': localStorage.getItem('user_id')
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/cart/getCart.php', input, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setItems(res.data)
        })
    }

    return ( 
        <>
            <Navbar />
            <h1 className="shoppingTitle">My Shopping List</h1>
            <div className="itemDetails">
                <p></p>
                <p>Description</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Checkout</p>
                <p>Remove</p>
            </div>
            <div className="line"></div>
            {items.map((item, key)=>
                <Product 
                key={key}
                cart_id={item.cart_id}
                item_id={item.item_id}
                picture={item.image}
                productName= {item.name}
                Description= {item.details}
                price={item.price}
                stocks={item.stocks}
                quantity={item.quantity}
            />
            )}
        </>
    );
}

export default Shopping;