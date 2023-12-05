import Navbar from "../../../components/Navbar";
import './productview.css'
import Productview from "../../../components/ProductView";
import StoreView from "../../../components/StoreView";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductView = () => {

    const [item, setItem] = useState([])
    const [seller, setSeller] = useState([])
    const {sellerId, itemId} = useParams()

    useEffect(()=>{
        getItem()
        getSeller()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getItem = () => {
        const input = {
            'category': 'showItem',
            'itemId': itemId
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/getItems.php', input, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setItem(res.data[0])
        })
    }

    const getSeller = () => {
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/profile/profile.php', {'user_id': sellerId}, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setSeller(res.data)
        })
    }

    return ( 
        <>
            <Navbar />
            <div className="viewproduct">
                <h1>View Product</h1>
            </div>
            <Productview item={item}/>
            <StoreView seller={seller}/>
        </>
    );
}

export default ProductView;