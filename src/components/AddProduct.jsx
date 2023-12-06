import bag from "../img/14.png";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { CgSoftwareUpload } from "react-icons/cg";
import StoreView from './StoreView'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const userId = localStorage.getItem("user_id")
    const [seller, setSeller] = useState([])
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [stocks, setStocks] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        getSeller()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const imageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("image", imageFile)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("stocks", stocks)
        formData.append("user_id", userId)
        
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/addItems.php', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "ngrok-skip-browser-warning": "8888"
            }
        }).then(()=>{
            alert('Item added successfully')
            navigate('/editsellerprofile')
        })
        
    }

    const getSeller = () => {
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/profile/profile.php', {'user_id': userId}, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setSeller(res.data)
        })
    }

    return ( 
        <>
            <Navbar />
            <h1 className="edith1">Add Product</h1>
            <div className="containerr">
                <div className="picture">
                <form onSubmit={handleSubmit}>
                    { !image && <img src={bag}/>}
                    { image && <img src={image}/>}
                    <label htmlFor="image-input">
                        <CgSoftwareUpload size={30} className="editicon"/>
                    </label>
                    <input id="image-input" type="file" name="image" accept="image/png, image/jpeg" onChange={imageChange} required hidden/>
                </div>
                <div className="description">
                    
                        <h1 className="name">Product Name</h1>
                        <input className="name" type="text" name="productName" placeholder="Product Name" onChange={(e)=>setName(e.target.value)} required></input>
                        <p className="price">PHP</p><input className="price" type="number" step="0.05" name="price" onChange={(e)=>setPrice(e.target.value)} required></input>
                        <div className="desc">
                            <p className="descTitle">Description</p>
                            <input className="descText" type="text" name="description" onChange={(e)=>setDescription(e.target.value)} required></input>
                        </div>
                        <div className="category">
                            <p className="descTitle">Category</p>
                            <select name="category" defaultValue="7" onChange={(e)=>setCategory(e.target.value)}>
                                <option value="1">Jewerly & Accessories</option>
                                <option value="2">Clothing & Shoes</option>
                                <option value="3">Home & Living</option>
                                <option value="4">Wedding & Party</option>
                                <option value="5">Toys & Entertainment</option>
                                <option value="6">Art & Collectibles</option>
                                <option value="7">Others</option>
                            </select>
                        </div>
                        <div className="quantity">
                            <div className="stocks">
                                <p className="stocksdesc">Stocks Available</p>
                                <input type="number" step="1" name="stocks" onChange={(e)=>setStocks(e.target.value)} required></input>
                            </div>
                        </div>
                        <button className="addToCart" type="submit">Add My Product</button>
                    </form>
                </div>
            </div>
            <StoreView seller={seller}/> 
        </>
    );
}

export default AddProduct;