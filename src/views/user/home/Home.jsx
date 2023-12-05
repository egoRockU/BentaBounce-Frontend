import "./home.css"
import girlBackground from "../../../img/19.png"
import Basket from "../../../img/basket.png"
import filter from "../../../img/filter.png"
import GridItem from "../../../components/GridItem"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"



const Home = () => {

    const [items, setItems] = useState([])
    
    useEffect(()=>{
        getItems()
    }, [])
    
    const getItems = () =>{
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/getItems.php', {'category': 'all'}, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setItems(res.data)
        })
    }

    return (
        <>
        <section className="section1">
            <Navbar />

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
                {items.map((item, key)=>
                    <GridItem
                    key = {key}
                    sellerId = {item.user_id}
                    itemId = {item.id}
                    picture={item.image}
                    desc= {item.details}
                    name= {item.name}
                    price= {item.price}
                />
                )}
            </div>
        </section>

        <Footer />
        </>
    )
}

export default Home