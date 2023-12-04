
import account from "../img/account.png"
import shopping from "../img/shoping.png"
import { IoSearch } from "react-icons/io5";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AccountNav = () => {

    const [click, setClick] = useState(true)
    const navigate = useNavigate()

    const clickLogo = () => {
        navigate("/")
    }

    const searchClick = () => {
        setClick(!click)
    }

    const clickShopping = () => {
        navigate("/shopping")
    }

    const clickLogOut = () => {
        localStorage.clear();
        navigate('/login')
    }

    

    return(
        <>
        
            <nav>
                <button className="searchIcon" onClick={searchClick}><IoSearch size={20} />
                </button><input id="searchBar" className={click ? "disabled" : ""} type="text" />
                <h1 className="lgo" onClick={clickLogo}>BENTABOUNCE</h1>
                <div className="account">
                    <button className="account" onClick={clickLogOut}><img src={account} />Log Out</button>
                    <button className="shopping" onClick={clickShopping}><img src={shopping} />Shopping</button>
                </div>
            </nav>
        
            
        </>
    )
}

export default AccountNav