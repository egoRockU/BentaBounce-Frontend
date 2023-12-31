import "./home.css"
import girlBackground from "../../../img/19.png"
import { FaBagShopping } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import GridItem from "../../../components/GridItem"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const CategoryHome = () => {

    const [items, setItems] = useState([])
    const [category, setCategory] = useState('Loading')
    const [categoryList, setCategoryList] = useState([])
    const [cheapToExp, setCheapToExp] = useState(true)
    const {categoryId} = useParams()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = items.slice(startIndex, endIndex);
    
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
                    <div className="shopnowbtn">
                        <a className="btn" href="#discover"> <FaBagShopping size={30} className="shopnowicon"/>Shop Now</a>
                    </div> 
                </div>
                <div className="right-side">
                    <img src={girlBackground}/>
                </div>
            </div>
        </section>
        <section className="section2">
            <h1 id="discover" className="title">
                {category}
            </h1>
            <div className="category">
                <div className="products">
                </div>
                <div className="filter">
                    <button className="filterbtn" onClick={changePriceSort}><FaFilter size={20} className="filtericon"/>Price</button>
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

export default CategoryHome