import "./home.css"
import girlBackground from "../../../img/19.png"
import Basket from "../../../img/basket.png"
import filter from "../../../img/filter.png"
import GridItem from "../../../components/GridItem"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'



const Home = () => {

    const [items, setItems] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [cheapToExp, setCheapToExp] = useState(true)
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = items.slice(startIndex, endIndex);

    useEffect(()=>{
        getItems()
        getCategoriesList()
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

    const getCategoriesList = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/categories/getCategoryList.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setCategoryList(res.data)
        })
    }

    const changePriceSort = () => {
        cheapToExp ? setCheapToExp(false) : setCheapToExp(true);
        SortItems()
    }

    const SortItems = () => {
        if (cheapToExp){
            items.sort((a,b)=>{
                return a.price - b.price;
            })
        } else {
            items.sort((a,b)=>{
                return b.price - a.price;
            })
        }

    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
      };

    return (
        <>
        <section className="section1">
            {SortItems()}
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
                    <button className="filter" onClick={changePriceSort} ><img src={filter}/>Price</button>
                </div>
            </div>
            
            <div className="grid-container">
                {items.length === 0 && <p>Loading...</p>}
                {items.length > 0 && currentItems.map((item, key)=>
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
            <Stack justifyContent={"center"} spacing={2}>
                <Pagination 
                count={Math.ceil(items.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange} />
            </Stack>
        </section>
        <Footer />
        </>
    )
}

export default Home