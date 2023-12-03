import Navbar from "../../../components/Navbar";
import './productview.css'
import Productview from "../../../components/ProductView";
import StoreView from "../../../components/StoreView";

const ProductView = () => {
    return ( 
        <>
            <Navbar />
            <div className="viewproduct">
                <h1>View Product</h1>
            </div>
            <Productview />
            <StoreView />
        </>
    );
}

export default ProductView;