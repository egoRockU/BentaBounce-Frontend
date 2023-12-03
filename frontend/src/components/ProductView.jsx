import { IoBagAdd } from "react-icons/io5";
import bag from "../img/14.png";
import { useState } from "react";

const ProductView = () => {

    const [count, setCount] = useState(1);

    const decrease = () => {
        if(count > 1) {
            setCount(count - 1)
        }
    }

    return ( 
        <>
        
            <div className="containerr">
                <div className="picture">
                    <img src={bag}/>
                </div>
                <div className="description">
                    <h1 className="name">Product Name</h1>
                    <p className="price">PHP 120.00</p>
                    <div className="desc">
                        <p className="descTitle">Description</p>
                        <p className="descText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="category">
                        <p className="descTitle">Category</p>
                        <p className="descText">Bag</p>
                    </div>
                    <div className="quantity">
                        <div className="quantityItem">
                            <p className="descTitle">Quantity</p>
                        <div className="totalItem">
                            <button onClick={decrease}>-</button>
                            <p>{count}</p>
                            <button onClick={() => setCount(count + 1)}>+</button>
                        </div>
                        </div>
                        <div className="stocks">
                            <p className="stocksdesc">Stocks Available</p>
                            <p>100</p>
                        </div>
                    </div>
                    <button className="addToCart"><IoBagAdd />Add To Shopping List</button>
                </div>
            </div>
        
        </>
    );
}

export default ProductView;