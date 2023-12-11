import "./shopping.css"
import Navbar from "../../../components/Navbar";
import SummaryProduct from "../../../components/SummaryProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ShoppingSummary = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {items} = location.state || []

    useEffect(()=>{
        if (!items || items.length === 0){
            navigate('/shopping')
        }
    }, [items, navigate])

    return ( 
        <section>
            <Navbar />
            <h1 className="shoppingTitle">Shopping Summary</h1>
            <div className="itemDetails">
                <p></p>
                <p>Description</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Checkout</p>
                <p>Remove</p>
            </div>
            <div className="line">
                
            </div>
            {!items && <p>No items</p>}
            {items && items.map((item, key)=>
                <SummaryProduct 
                key={key}
                cart_id={item.cart_id}
                item_id={item.item_id}
                seller_id={item.seller_id}
                picture={item.picture}
                productName= {item.productName}
                Description= {item.description}
                price={item.price}
                stocks={item.stocks}
                quantity={item.quantity}
            />
            )}
        </section>
    );
}

export default ShoppingSummary;