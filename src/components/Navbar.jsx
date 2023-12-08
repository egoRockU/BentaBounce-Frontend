import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkIsLoggedIn } from "../utils/checkIsLoggedIn";

const Navbar = () => {

    const [click, setClick] = useState(true)
    const [searchItem, setSearchItem] = useState('')    
    const navigate = useNavigate()

    const clickLogo = () => {
        navigate("/")
    }

    const clickLogin = () => {
        navigate("/login")
    }

    const searchClick = () => {
        setClick(!click)
    }

    const clickShopping = () => {
        navigate("/shopping")
    }

    const clickAccount = () => {
        navigate("/editsellerprofile")
    }

    const search = (e) => {
        e.preventDefault()
        navigate(`/${searchItem}/searchresults`)
    }
    

    return(
        <>
            <nav id="top">
                <div className="search">
                    <button className="searchIcon" onClick={searchClick}><IoSearch size={25} className="searcicon" /></button>
                    <form onSubmit={search}>
                        <input id="searchBar" className={click ? "disabled" : ""} onChange={(e)=>setSearchItem(e.target.value)} type="text" /><input type="submit" hidden />
                    </form>
                </div>
                <h1 className="logo" onClick={clickLogo}>BENTABOUNCE</h1>
                <div className="account">
                    {checkIsLoggedIn() && <button className="account" onClick={clickAccount}><FaUser size={25} className="accicon" />Account</button>}
                    {!checkIsLoggedIn() && <button className="account" onClick={clickLogin}><FaUser size={25} className="accicon" />Log In</button>}
                    <button className="shopping" onClick={clickShopping}><FaBagShopping size={25} className="shoppingicon" />Shopping</button>
                </div>
            </nav>
        
            
        </>
    )
}

export default Navbar