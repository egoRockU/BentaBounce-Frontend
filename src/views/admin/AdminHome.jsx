import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminHome = () => {

    const navigate = useNavigate()
    const [adminProfile, setAdminProfile] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [catNames, setCatNames] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [orderHistory, setOrderHistory] = useState([])
    const [users, setUsers] = useState([])

    useEffect(()=>{
        getAdminProfile()
        getCategoriesList()
        getProducts()
        getOrders()
        getOrderHistory()
        getUsers()
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

    const getOrders = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/orders/getOrders.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setOrders(res.data)
        })
    }

    const getOrderHistory = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/orders/orderHistory.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setOrderHistory(res.data)
        })
    }

    const getUsers = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/profile/adminGetProfiles.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setUsers(res.data)
        })
    }

    const confirmOrder = (id, sellerId, amount, shipping) => {
        const input = {
            'id': id,
            'sellerId': sellerId,
            'amount': Number(amount) - Number(shipping),
            'shipping': shipping
        }
        if (confirm("Are you sure the items have been delivered?")){
            axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/orders/updateOrder.php', input, {
                headers: {
                    "ngrok-skip-browser-warning": "8888"
                }
            }).then(()=>{
                alert(`Deliver Success`)
                navigate(0)
            })
        }
    }

    return (
        <>
            <div className="log-in-nav">
                <h1 className="titleLogIn">ADMIN DASHBOARD</h1>
            </div>
            <div className="admin-container">
                <div className="profile-container">
                    <h1>Admin Profile</h1>
                    <br />
                    <p className=" pro Uname"><b>Username:</b> {adminProfile.username}</p>
                    <p className=" pro Email"><b>Email:</b> {adminProfile.email}</p>
                    <p className=" pro Income"><b>Income:</b> ₱ {adminProfile.income}</p>
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
                <div className="product-contents-container">
                    <h1>User Profiles</h1>
                    <ul className="product-list">
                        {users.map((user, key)=>
                            <li className="product-list-item" key={key}>                 
                                <div className="prod-li-key">
                                    <p>{key+1}</p>
                                </div>
                                <div className="prod-li-name">
                                    <p>{user.username}</p>
                                </div>
                                <div className="prod-li-price">
                                    <p>PHP {user.wallet}</p>
                                </div>
                                <div className="prod-li-username">
                                    <p>{user.email}</p>
                                </div>
                            </li>
                        )}
                    </ul>
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
            <div className="admin-container">
                <div className="product-contents-container">
                    <h1>Pending Orders</h1>
                    <ul className="product-list">
                        {orders.map((order, key)=>
                            <li className="product-list-item" key={key}>                 
                            <div className="prod-li-key">
                                <p>{key+1}</p>
                            </div>
                            <div className="prod-li-name">
                                <p>{order.username}</p>
                            </div>
                            <div className="prod-li-price">
                                <p>₱ {order.amount}</p>
                            </div>
                            <div className="prod-li-username">
                                <p>{order.address}</p>
                            </div>
                            <div className="prod-li-username">
                                <p>{order.recipient}</p>
                            </div>
                            <div className="prod-li-username">
                                <p>{order.shipping}</p>
                            </div>
                            <div className="prod-li-username">
                                <button onClick={()=>confirmOrder(order.id, order.user_id, order.amount, order.shipping)}>Confirm Order</button>
                            </div>
                        </li>
                        )}
                    </ul>
                </div>
                <div className="product-contents-container">
                    <h1>Order History</h1>
                    <ul className="product-list">
                        {orderHistory.map((orderHis, key)=>
                            <li className="product-list-item" key={key}>                 
                            <div className="prod-li-key">
                                <p>{key+1}</p>
                            </div>
                            <div className="prod-li-name">
                                <p>{orderHis.username}</p>
                            </div>
                            <div className="prod-li-price">
                                <p>₱ {orderHis.amount}</p>
                            </div>
                            <div className="prod-li-username">
                                <p>{orderHis.address}</p>
                            </div>
                            <div className="prod-li-username">
                                <p>{orderHis.recipient}</p>
                            </div>
                            <div className="prod-li-username">
                                <p>{orderHis.shipping}</p>
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