import { MdOutlineShoppingCartCheckout } from "react-icons/md"
import { IoBagRemoveOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalCheckoutButton from "./PayPalCheckoutButton";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Product = ({cart_id, item_id, seller_id, picture, productName, Description, price, stocks, quantity, onItemSelected, onItemUnselect}) => {

    const [count, setCount] = useState(Number(quantity))
    const [totalPrice, setTotalPrice] = useState()
    const [userPay, setUserPay] = useState(0)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [isChecked, setIsChecked] = useState(false)


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

    const openModal = () => {
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
    }

    const sendItemsToShopping = () => {
        if (isChecked){
            onItemUnselect(cart_id)
            setIsChecked(false)
        } else {
            onItemSelected({
                'cart_id': cart_id,
                'item_id': item_id,
                'productName': productName,
                'seller_id': seller_id,
                'picture': picture,
                'description': Description,
                'price': totalPrice,
                'stocks': stocks,
                'quantity': count
            })
            setIsChecked(true)
        }
    }

    const checkOut = () => {
        if (Number(userPay) === Number(totalPrice)){
            const input = {
                'cart_id': cart_id,
                'item_id': item_id,
                'count': count,
                'stocks': stocks
            }
            axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/cart/checkOut.php', input, {
                headers: {
                    "ngrok-skip-browser-warning": "8888"
                }
            }).then(()=>{
                alert(`${productName} has been checked out. Thank you for Buying!!`)
                navigate(0)
            })
        }
    }

    
    const product = {
        description: productName,
        price: totalPrice
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
                    <input type="checkbox" onChange={sendItemsToShopping}></input>
                    <MdOutlineShoppingCartCheckout size="40" onClick={openModal}/>
                </div>
                <div>
                    <IoBagRemoveOutline size="40" onClick={removeItem}/>
                </div>
                
            </div>

                <div className="line">
                    <hr/>
                </div>


        <Dialog open={show} onClose={closeModal}>
            <DialogTitle>Check out</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Enter the right amount to proceed. (PHP {totalPrice})
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
            />
            <DialogContentText align="center">
                OR
            </DialogContentText>
            {/* <PayPalScriptProvider options={{ clientId: "test" }}>
                    <PayPalButtons style={{ layout: "horizontal" }} />
            </PayPalScriptProvider> */}
            <PayPalCheckoutButton product={product} />

            </DialogContent>
            <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={checkOut}>CheckOut</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default Product;