import "./shopping.css"
import Navbar from "../../../components/Navbar";
import SummaryProduct from "../../../components/SummaryProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PayPalCheckoutButton from "../../../components/PayPalCheckoutButton";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ShoppingSummary = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const {items} = location.state || []
    const groupedItems = Object.groupBy(items, ({seller_name})=> seller_name)
    const [showModalKey, setShowModalKey] = useState(null)
    const [userPay, setUserPay] = useState(0)
    const [address, setAddress] = useState('')
    const [recipient, setRecipient] = useState('')

    useEffect(()=>{
        if (!items || items.length === 0){
            navigate('/shopping')
        }
    }, [items, navigate])

    const openModal = (key) => {
        setShowModalKey(key)

    }

    const closeModal = () => {
        setShowModalKey(null)
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

    const itemsToUpdate = (items) => {
        let itemsArr = []
        items.map((item)=>
            itemsArr.push({
                'item_id': item.item_id,
                'quantity': item.quantity,
                'cart_id': item.cart_id
            })
            
        )

        return itemsArr
    }

    const checkOut = (totalAmount, sellerId, shipping, itemsToUpdate, products) => {
        let orderName = ''
        products.map((product)=>{
            orderName = orderName + `${product.productName}(${product.quantity}) + `
        })

        if (Number(userPay) === Number(totalAmount)){
            const input = {
                'user_id': sellerId,
                'order_name': orderName.slice(0,-3),
                'amount': totalAmount,
                'address': address,
                'recipient': recipient,
                'shipping': shipping,
                'itemsToUpdate': itemsToUpdate
            }
            axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/cart/orders.php', input, {
                headers: {
                    "ngrok-skip-browser-warning": "8888"
                }
            }).then(()=>{
                alert(`Items has been checked out. Thank you for Buying!`)
                nav()
            })
        } else {
            alert('Invalid Payment Amount!')
        }
    }

    const nav = () => {
        navigate('/shopping')
    }

    const formatPrice = (price) => {
        const formattedPrice = Number(price).toFixed(2);
        return formattedPrice === Math.floor(formattedPrice) ? `${formattedPrice}.00` : formattedPrice;
      };

    return ( 
        <section>
            <Navbar />
            <h1 className="shoppingTitle">Shopping Summary</h1>
            <div className="itemDetails">
                <p></p>
                <p>Description</p>
                <p>Quantity</p>
                <p>Price</p>
            </div>  
            {!items && <p>No items</p>}
            {items && Object.keys(groupedItems).map((seller)=>
                <>
                   
                    
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
                    
                    <div className="sellercontainer">
                        <p className="sellerLabel">Seller: </p>
                        <p className="sellerName">{seller}</p>
                    </div>

                    <div className="subtotalsummary">
                        <div className="summaryleft">
                            <p className="subtotallabel">Subtotal</p>
                            <p>{groupedItems[seller].length} items</p>
                        </div>
                        <div className="summarycenter">
                            <p className="totalsflabel">Shipping Fee:</p>
                            <p>PHP {countShipping(countQuantity(groupedItems[seller]))}</p>
                        </div>
                        <div className="summaryright">
                            <p className="totalpricelabel">PHP</p>
                            <p className="pricetotal">{formatPrice(countTotal(groupedItems[seller]))}</p>
                        </div>
                    </div>
                    <div className="checkoutsummarycontainer">
                        <button className="checkoutsummarybtn" onClick={()=>openModal(seller)}><p className="checkoutsummarylabel">Checkout</p></button>
                    </div>
                    <Dialog open={showModalKey === seller} onClose={closeModal}>
                        <DialogTitle>Check out</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Enter the right amount to proceed. (PHP {Number(countTotal(groupedItems[seller])) + Number(countShipping(countQuantity(groupedItems[seller])))})
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="PHP"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={userPay}
                            onChange={e=>setUserPay(e.target.value)}
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter Your Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={address}
                            onChange={e=>setAddress(e.target.value)}
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter Recipient (Who will pick up the item)"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={recipient}
                            onChange={e=>setRecipient(e.target.value)}
                            required
                        />
                        <DialogContentText align="center">
                            OR
                        </DialogContentText>
                        {/* <PayPalScriptProvider options={{ clientId: "test" }}>
                                <PayPalButtons style={{ layout: "horizontal" }} />
                        </PayPalScriptProvider> */}
                        <PayPalCheckoutButton 
                            products={groupedItems[seller]} 
                            totalAmount={Number(countTotal(groupedItems[seller])) + Number(countShipping(countQuantity(groupedItems[seller])))} 
                            sellerId={groupedItems[seller][0].seller_id} 
                            shipping={countShipping(countQuantity(groupedItems[seller]))}
                            itemsToUpdate={itemsToUpdate(groupedItems[seller])}
                        />

                        </DialogContent>
                        <DialogActions>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button onClick={()=>checkOut(
                            Number(countTotal(groupedItems[seller])) + Number(countShipping(countQuantity(groupedItems[seller]))),
                            groupedItems[seller][0].seller_id,
                            countShipping(countQuantity(groupedItems[seller])),
                            itemsToUpdate(groupedItems[seller]),
                            groupedItems[seller]
                            )}>CheckOut</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </section>
    );
}

export default ShoppingSummary;