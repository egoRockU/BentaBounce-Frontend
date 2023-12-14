//import { MdOutlineShoppingCartCheckout } from "react-icons/md"
import { IoBagRemoveOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Product = ({cart_id, item_id, seller_id, seller_name, picture, productName, Description, price, stocks, quantity, onItemSelected, onItemUnselect}) => {

    const [count, setCount] = useState(Number(quantity))
    const [totalPrice, setTotalPrice] = useState()
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(false)


    useEffect(()=>{
        setTotalPrice(count * Number(price))
    },[count, price])

    const decrease = async () => {
        if(count > 1) {
            await setCount(count - 1)
        }
        if (isChecked){
            onItemUnselect(cart_id)
            onItemSelected({
                'cart_id': cart_id,
                'item_id': item_id,
                'productName': productName,
                'seller_id': seller_id,
                'seller_name': seller_name,
                'picture': picture,
                'description': Description,
                'price': totalPrice,
                'stocks': stocks,
                'quantity': count
            })
        }
    }

    const increase = async () => {
        if (count < stocks){
            await setCount(count + 1)
        }

        if (isChecked){
            onItemUnselect(cart_id)
            onItemSelected({
                'cart_id': cart_id,
                'item_id': item_id,
                'productName': productName,
                'seller_id': seller_id,
                'seller_name': seller_name,
                'picture': picture,
                'description': Description,
                'price': totalPrice,
                'stocks': stocks,
                'quantity': count
            })
        }
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
                'seller_name': seller_name,
                'picture': picture,
                'description': Description,
                'price': totalPrice,
                'stocks': stocks,
                'quantity': count
            })
            setIsChecked(true)
        }
    }

    // const checkOut = () => {
    //     if (Number(userPay) === Number(totalPrice)){
    //         const input = {
    //             'cart_id': cart_id,
    //             'item_id': item_id,
    //             'count': count,
    //             'stocks': stocks
    //         }
    //         axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/cart/checkOut.php', input, {
    //             headers: {
    //                 "ngrok-skip-browser-warning": "8888"
    //             }
    //         }).then(()=>{
    //             alert(`${productName} has been checked out. Thank you for Buying!!`)
    //             navigate(0)
    //         })
    //     }
    // }

    
    // const product = {
    //     description: productName,
    //     price: totalPrice
    // }
    


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
                <a href={`/${seller_id}/${item_id}/productView`}>
                <div className="productpicture">
                    <img src={`data:image/jpeg;base64, ${picture}`} className="pictureimg"/>
                </div>
                </a>
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
                    {/* <MdOutlineShoppingCartCheckout size="40" onClick={openModal}/> */}
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