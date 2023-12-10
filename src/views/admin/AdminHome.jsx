import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminHome = () => {

    const navigate = useNavigate()
    const [adminProfile, setAdminProfile] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [catNames, setCatNames] = useState([])
    const [products, setProducts] = useState([])

    useEffect(()=>{
        getAdminProfile()
        getCategoriesList()
        getProducts()
    }, [])


    if (!sessionStorage.getItem("adminId")){
        navigate('/adminlogin')
    }

    const getAdminProfile = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/admin/getAdminProfile.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setAdminProfile(res.data)
        })
    }

    const getCategoriesList = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/categories/adminGetCategories.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setCategoryList(res.data['category_array'])
            setCatNames(res.data['category_names'])
        })
    }

    const updateCategory = (catId, catName) => (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("catId", catId)
        formData.append("categoryName", catName)

        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/categories/adminUpdateCategory.php', formData, {
            headers: {
                "ngrok-skip-browser-warning": "8888",
                "Content-Type": "multipart/form-data",
            }
        }).then(()=>{
            alert(`Category ${catId} has been updated`)
            getCategoriesList()
        })
    }


    const updateCategoryNames = (id) => (e) => {
        let newCategories = [...catNames]
        newCategories[id] = e.target.value

        setCatNames(newCategories);
    }

    const getProducts = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/adminGetItems.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setProducts(res.data)
        })
    }

    const editProduct = (productId) => {
        console.log(productId)
    }

    return (
        <>
            <div className="log-in-nav">
                <h1 className="titleLogIn">ADMIN DASHBOARD</h1>
            </div>
            <div className="admin-container">
                <div className="profile-container">
                    <h1>Admin Profile</h1>
                    <p>Username: {adminProfile.username}</p>
                    <p>Email: {adminProfile.email}</p>
                    <p>Income: ₱ {adminProfile.income}</p>
                </div>
                <div className="category-contents-container">
                    <h1>Category Contents</h1>
                    {categoryList.map((cat, key)=>
                        <form key={key} className="cat-form" onSubmit={updateCategory(cat.id, catNames[cat.id-1])}>
                            {cat.id} <input type="text" placeholder="Edit Name" value={catNames[cat.id-1]} onChange={updateCategoryNames(cat.id-1)}/>
                            <input type="submit" value="Save changes" />
                        </form>
                    )}
                </div>
            </div>
            <div className="admin-container">
                <div className="user-profiles-container">
                    <h1>User Profiles</h1>
                </div>
                <div className="product-contents-container">
                    <h1>Product Contents</h1>
                    <ul className="product-list">
                    {products.map((product, key)=>
                        <li className="product-list-item" onClick={()=>{editProduct(product.id)}} key={key}>                 
                            <div className="prod-li-key">
                                <p>{key+1}</p>
                            </div>
                            <div className="prod-li-name">
                                <p>{product.name}</p>
                            </div>
                            <div className="prod-li-price">
                                <p>₱ {product.price}</p>
                            </div>
                            <div className="prod-li-username">
                                <p>{product.username}</p>
                            </div>
                        </li>
                    )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminHome