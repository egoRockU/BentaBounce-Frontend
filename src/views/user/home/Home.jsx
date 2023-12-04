import "./home.css"
import { useNavigate } from "react-router-dom"
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
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"

import { useState } from "react"

const Home = () => {

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

            <landing>
                <div className="left-side">
                    <h1>Lorem Ipsum</h1>
                    <h3>you can explore ans shop many differnt collection
                    from various barands here.</h3>
                    <button><img src={Basket}  />Shop Now</button>
                </div>
                <div className="right-side">
                    <img src={girlBackground}/>
                </div>
            </landing>
        </section>
        <section className="section2">
            <h1 className="title">
                Discover More
            </h1>
            <div className="categoriess">
                <div className="productss">
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

        <Footer />
        </>
    )
}

export default Home