import { IoBagAdd } from "react-icons/io5";
import { useState } from "react";

const ProductView = ({item}) => {

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
                    <img src={`data:image/jpeg;base64, ${item.image}`}/>
                </div>
                <div className="description">
                    <h1 className="name">{item.name}</h1>
                    <p className="price">PHP {item.price}</p>
                    <div className="desc">
                        <p className="descTitle">Description</p>
                        <p className="descText">{item.details}</p>
                    </div>
                    <div className="category">
                        <p className="descTitle">Category</p>
                        <p className="descText">{item.category_name}</p>
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
                            <p>{item.stocks}</p>
                        </div>
                    </div>
                    <button className="addToCart"><IoBagAdd />Add To Shopping List</button>
                </div>
            </div>
        
        </>
    );
}

export default ProductView;