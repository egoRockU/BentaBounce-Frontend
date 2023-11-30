import "./home.css"
import { useNavigate } from "react-router-dom"
import searchIcon from "../../../img/searchicon.png"
import girlBackground from "../../../img/19.png"
import Basket from "../../../img/basket.png"
import filter from "../../../img/filter.png"
import bag from "../../../img/14.png"
import jagger from "../../../img/15.png"
import glasses from "../../../img/16.png"
import hoodie from "../../../img/yellow.png"
import scarf from "../../../img/top-product.png"
import nikerepel from "../../../img/nikerepel.png"
import nikeair from "../../../img/nikeair.png"
import dressgreen from "../../../img/dressgreen.png"
import GridItem from "../../../components/GridItem"
import arrowtop from "../../../img/arrowtop.png"
import account from "../../../img/account.png"
import shopping from "../../../img/shoping.png"

import { useState } from "react"

const Home = () => {

    const [click, setClick] = useState(true)
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

    return (
        <>
        <section className="section1">
            <nav>
                <img className="searchIcon" onClick={searchClick} src={ searchIcon }/><input id="searchBar" className={click ? "disabled" : ""} type="text" />
                <h1 className="lgo" onClick={clickLogo}>BENTABOUNCE</h1>
                <div className="account">
                    <button className="account" onClick={clickLogin}><img src={account} />Account</button>
                    <button><img src={shopping} />Shopping</button>
                </div>
            </nav>

            <menu>
                <a href="http://">Jewelry & Accessories</a>
                <a href="http://">Clothing & Shoes</a>
                <a href="http://">Home & Living</a>
                <a href="http://">Wedding & Party</a>
                <a href="http://">Toys & Entertainment</a>
                <a href="http://">Art & Collectibles</a>
                <a href="http://">Others</a>
            </menu>

            <div className="landing">
                <div className="left-side">
                    <h1>Lorem Ipsum</h1>
                    <h3>you can explore ans shop many differnt collection
                    from various barands here.</h3>
                    <button><img src={Basket}  />Shop Now</button>
                </div>
                <div className="right-side">
                    <img src={girlBackground}/>
                </div>
            </div>
        </section>
        <section className="section2">
            <h1 className="title">
                Discover More
            </h1>
            <div className="category">
                <div className="products">
                    <a href="#">All Products</a>
                    <a href="#">T-shirt</a>
                    <a href="#">Hoodies</a>
                    <a href="#">Jacket</a>
                </div>
                <div>
                    <button className="filter" ><img src={filter}/>Filter</button>
                </div>
            </div>
            
            <div className="grid-container">
                <GridItem
                    picture={jagger}
                    desc= 'Adicolor Classics Joggers'
                    name= 'Dress'
                    price= '63.85'
                />
                <GridItem
                    picture={bag}
                    desc= 'Nike Sportswear Futura Luxe'
                    name= 'Bag'
                    price= '63.85'
                />
                <GridItem
                    picture={scarf}
                    desc= 'Geometric print Scarf'
                    name= 'Scarf'
                    price= '63.85'
                />
                <GridItem
                    picture={hoodie}
                    desc= 'Yellow Reserved Hoodie'
                    name= 'Dress'
                    price= '63.85'
                />
                <GridItem
                    picture={dressgreen}
                    desc= 'Basic Dress Green'
                    name= 'Dress'
                    price= '63.85'
                />
                <GridItem
                    picture={nikeair}
                    desc= 'Nike Air Zoom Pegasus'
                    name= 'Shoe'
                    price= '63.85'
                />
                <GridItem
                    picture={nikerepel}
                    desc= 'Nike Repel Miler'
                    name= 'Dress'
                    price= '63.85'
                />
                <GridItem
                    picture={glasses}
                    desc= 'Nike Sportswear Futura Luxe'
                    name= 'Glasses'
                    price= '63.85'
                />
            </div>
        </section>

        <section className="section3">
            <div className="grid-containers">
                <div className="grid-items grid-item-1">
                    <div className="logoname">
                        <h1>BENTABOUNCE</h1>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua
                    </p>
                </div>
                <div className="grid-items grid-item-2">
                    <h3>CATALOG</h3>
                    <a href="#">Necklaces</a>
                    <a href="#">Hoodies</a>
                    <a href="#">Jewelry Box</a>
                    <a href="#">T-shirt</a>
                    <a href="#">Jacket</a>
                </div>
                <div className="grid-items grid-item-3">
                    <h3>ABOUT US</h3>
                    <a href="#">Our Developers</a>
                    <a href="#">Sitemap</a>
                    <a href="#">FAQ</a>
                    <a href="#">About Us</a>
                    <a href="#">Terms & Conditions</a>
                </div>
                <div className="grid-items grid-item-4">
                    <h3>CUSTOMER SERVICES</h3>
                    <a href="#">Contact Us</a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                </div>
            </div>
        </section>

        <footer>
            <p>© 2023 BentaBounce , Inc.</p>
            <p>Scroll to top <img src={arrowtop}/></p>
        </footer>
        </>
    )
}

export default Home