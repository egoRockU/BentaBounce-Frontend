import "./shopping.css"
import Navbar from "../../../components/Navbar";
import SummaryProduct from "../../../components/SummaryProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ShoppingSummary = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {items} = location.state || []
    const groupedItems = Object.groupBy(items, ({seller_name})=> seller_name)

    useEffect(()=>{
        if (!items || items.length === 0){
            navigate('/shopping')
        }
    }, [items, navigate])

    const checkout = () => {

    }

    const countTotal = (prices) => {
        const priceArr = prices.map((item)=>item.price)
        const sum = priceArr.reduce((a, b)=> a+b, 0)
        return sum
    }

    const countQuantity = (quantity) => {
        const quantityArr = quantity.map((item)=>item.quantity)
        const sum = quantityArr.reduce((a, b)=> a+b, 0)
        return sum
    }

    const countShipping = (itemCount) => {
        if(itemCount <= 5){
            return 50
        } else if (itemCount <= 10) {
            return 100
        } else if (itemCount <= 20){
            return 150
        } else if (itemCount > 20){
            return 200
        }
    }

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
            {items && Object.keys(groupedItems).map((seller)=>
                <>
                    <p>Seller: {seller}</p>
                    {groupedItems[seller].map((item, key)=>
                        <>
                            <SummaryProduct 
                            key={key}
                            cart_id={item.cart_id}
                            item_id={item.item_id}
                            seller_id={item.seller_id}
                            seller_name={item.seller_name}
                            picture={item.picture}
                            productName= {item.productName}
                            Description= {item.description}
                            price={item.price}
                            stocks={item.stocks}
                            quantity={item.quantity}
                            />
                        </>
                    )}
                    <div>
                        <p>Subtotal</p>
                        <p>{groupedItems[seller].length} items</p>
                        <p>Shipping: PHP {countShipping(countQuantity(groupedItems[seller]))}</p>
                        <h4>PHP {countTotal(groupedItems[seller])}</h4>
                        <button onClick={checkout}>Checkout</button>
                    </div>
                </>
            )}
        </section>
    );
}

export default ShoppingSummary;