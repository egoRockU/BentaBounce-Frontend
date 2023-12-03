import Bag from "../img/14.png"
import { MdOutlineShoppingCartCheckout } from "react-icons/md"
import { IoBagRemoveOutline } from "react-icons/io5";
import { useState } from "react";

const Product = ({picture, productName, Description, price, quantity}) => {
    const [count, setCount] = useState(quantity)

    const decrease = () => {
        if(count > 1) {
            setCount(count - 1)
        }
    }

    return ( 
        <>
            <div className="products">
                <img src={picture} className="picture"/>
                <div className="productDesc">
                    <h3 className="productName">{productName}</h3>
                    <p className="Description">{Description}</p>
                </div>
                <div className="productTotal">
                    <button onClick={decrease}>-</button>
                    <p>{count}</p>
                    <button onClick={() => setCount(count + 1)}>+</button>
                </div>
                <div className="price">
                    PHP {price}
                </div>
                <div>
                    <MdOutlineShoppingCartCheckout size="40"/>
                </div>
                <div>
                    <IoBagRemoveOutline size="40"/>
                </div>
                
            </div>

                <div className="line">
                    <hr/>
                </div>
        </>
    );
}

export default Product;