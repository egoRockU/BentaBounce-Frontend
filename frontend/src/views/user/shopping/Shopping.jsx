import "./shopping.css"
import Navbar from "../../../components/Navbar";
import Product from "../../../components/Product";
import bag from "../../../img/14.png"
import shade from "../../../img/16.png"

const Shopping = () => {

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
            <Product 
                picture={bag}
                productName='Celine'
                Description='BAG NA MALUPET'
                price='1000.00'
                quantity={1}
            />
            <Product 
                picture={shade}
                productName='Shade ni john lloyd'
                Description='Pangboso'
                price='1000.00'
                quantity={2}
            />
        </>
    );
}

export default Shopping;