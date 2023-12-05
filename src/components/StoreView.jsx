import { IoStorefront } from "react-icons/io5";
import profile from "../img/profile.jpg"
import { useNavigate } from "react-router-dom";

const StoreView = ({seller}) => {

    const navigate = useNavigate()

    const clickViewSeller = () => {
        navigate(`/${seller.id}/seller`)
    }

    return ( 
        <>
            <div className="profile">
                <div className="pfImage">
                    {!seller.photo && <img src={profile}/>}
                    {seller.photo && <img src={`data:image/jpeg;base64, ${seller.photo}`}/>}
                </div>
                <div className="store">
                    <h5>{seller.username}</h5>
                    <button onClick={clickViewSeller}><IoStorefront /> View Seller</button>
                </div>
            </div>
        </>
    );
}

export default StoreView;