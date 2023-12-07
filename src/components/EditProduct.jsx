import bag from "../img/14.png";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { BiEdit } from "react-icons/bi";
import StoreView from './StoreView'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    
    const userId = localStorage.getItem("user_id")
    const [categoryList, setCategoryList] = useState([])
    const [seller, setSeller] = useState([])
    const {itemId} = useParams()
    const [item, setItem] = useState([])
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()
    const [stocks, setStocks] = useState()

    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const navigate = useNavigate()
    

    useEffect(()=>{
        getSeller()
        getItem()
        getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getItem = () => {
        const input = {
            'category': 'showItem',
            'itemId': itemId
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/getItems.php', input, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            const data = res.data[0]
            setItem(data)
            setImage('data:image/png;base64,'+ data['image'])
            setName(data.name)
            setPrice(data.price)
            setDescription(data.details)
            setCategory(data.category_id)
            setStocks(data.stocks)
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

    const getCategories = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/categories/getCategoryList.php', {
            headers: {
                "Content-Type": "multipart/form-data",
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setCategoryList(res.data)
            console.log(res.data)
        })
    }


    const handleImageChange = (e) => {
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
        formData.append("itemId", itemId)

        if (stocks == 0){
            if (confirm("Stocks Empty, are you sure you want to delete this item gone?")==true){
                axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/deleteItem.php', {'itemId': itemId}, {
                headers: {
                    "ngrok-skip-browser-warning": "8888"
                }
            }).then(()=>{
                alert('Item deleted successfully')
                navigate('/editsellerprofile')
            })
            }

        } else {
            axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/updateItems.php', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "ngrok-skip-browser-warning": "8888"
                }
            }).then(()=>{
                alert('Item updated successfully')
                navigate('/editsellerprofile')
            })
        }
    }

    return ( 
        <>
            <Navbar />
            <h1 className="edith1">Edit Product</h1>
            <div className="containerr">
                <div className="picture">
                    {image && <img src={image} />}
                    {!image && <img src={bag} />}
                    <label htmlFor="image-input">
                        <BiEdit size={30} className="editicon"/>
                    </label>
                    <input id="image-input" type="file" name="image" accept="image/png, image/jpeg" onChange={handleImageChange} hidden/>
                </div>
                <div className="description">
                    <form onSubmit={handleSubmit}>
                        <h1 className="name">{item.name}</h1>
                        <input className="name" type="text" name="productName" value={name} placeholder="Product Name" onChange={(e)=>setName(e.target.value)} required></input>
                        <p className="price">PHP </p><input className="price" type="number" step="0.05" name="price" value={price} onChange={(e)=>setPrice(e.target.value)} required></input>
                        <div className="desc">
                            <p className="descTitle">Description</p>
                            <input className="descText" type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} required></input>
                        </div>
                        <div className="category">
                            <p className="descTitle">Category</p>
                            <select name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                {categoryList.map((cat, key)=>
                                    <option value={cat.id} key={key}>{cat.category_name}</option>
                                )}
                                </select>
                        </div>
                        <div className="quantity">
                            <div className="stocks">
                                <p className="stocksdesc">Stocks</p>
                                <input type="number" step="1" name="stocks" value={stocks} onChange={(e)=>setStocks(e.target.value)} required></input>
                            </div>
                        </div>
                    <button className="addToCart" type="submit">Save The Changes</button>
                    </form>
                </div>
            </div>
            <StoreView seller={seller} />
        </>
    );
}

export default EditProduct;