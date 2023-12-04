import { IoBagAdd } from "react-icons/io5";
import bag from "../img/14.png";
import { useState } from "react";
import Navbar from "./Navbar";
import { BiEdit } from "react-icons/bi";
import StoreView from './StoreView'

const EditProduct = () => {
    
    
    const [count, setCount] = useState(1);

    const decrease = () => {
        if(count > 1) {
            setCount(count - 1)
        }
    }

    return ( 
        <>
            <Navbar />
            <h1 className="edith1">Edit Product</h1>
            <div className="containerr">
                <div className="picture">
                    <img src={bag}/>
                    <BiEdit size={30} className="editicon"/>
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
                        <div className="stocks">
                            <p className="stocksdesc">Stocks Available</p>
                            <p>100</p>
                        </div>
                    </div>
                    <button className="addToCart">Save The Changes</button>
                </div>
            </div>
            <StoreView />
        </>
    );
}

export default EditProduct;