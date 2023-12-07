import "./home.css"
import girlBackground from "../../../img/19.png"
import Basket from "../../../img/basket.png"
import filter from "../../../img/filter.png"
import GridItem from "../../../components/GridItem"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"



const CategoryHome = () => {

    const [items, setItems] = useState([])
    const [category, setCategory] = useState('Loading')
    const [categoryList, setCategoryList] = useState([])
    const {categoryId} = useParams()
    
    useEffect(()=>{
        getItems()
        getCategoriesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const getItems = () =>{
        const input = {
            'category': 'category',
            'category_id': Number(categoryId)
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/getItems.php', input, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setItems(res.data)
        })
    }

    const getCategoriesList = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/categories/getCategoryList.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setCategoryList(res.data)
            setCategory(res.data[categoryId-1].category_name)
        })
    }

    return (
        <>
        <section className="section1">
            <Navbar />

            <menu>
                {categoryList.map((cat, key)=>
                    <a key={key} href={`/${cat.id}/categoryhome`}>{cat.category_name}</a>
                )}
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
                {category}
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
                {items.length === 0 && <p>Loading...</p>}
                {items.length > 0 && items.map((item, key)=>
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

export default CategoryHome