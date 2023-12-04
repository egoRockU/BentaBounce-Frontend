import { IoStorefront } from "react-icons/io5";
import profile from "../img/pf.png"
import { useNavigate } from "react-router-dom";

const StoreView = () => {

    const navigate = useNavigate()

const clickViewSeller = () => {
    navigate('/seller')
}

    return ( 
        <>
            <div className="profile">
                <div className="pfImage">
                    <img src={profile}/>
                </div>
                <div className="store">
                    <h5>Storename</h5>
                    <button onClick={clickViewSeller}><IoStorefront /> View Seller</button>
                </div>
            </div>
        </>
    );
}

export default StoreView;