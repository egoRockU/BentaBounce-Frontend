import Profile from "../img/profile.jpg"
import AccountNav from "./AccountNav"
import Footer from "../components/Footer"
import { BiEdit } from "react-icons/bi";
import EditGridItem from "./EditGridItem"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const EditSellerProfile = () => {

    const userId = localStorage.getItem("user_id")
    const [userItems, setUserItems] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState()
    const [bio, setBio] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        getUser()
        getUserItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const getUser = async() => {
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/profile/profile.php', {'user_id': userId},{
        headers : {
            "ngrok-skip-browser-warning": "8888"
        }}
        ).then((res)=>{
            setUsername(res.data["username"])
            setEmail(res.data["email"])
            setPhoto(res.data["photo"])
            setBio(res.data["bio"])
        })
    }

    const getUserItems = () => {
        const input = {
            'category': 'user', 
            'userId': localStorage.getItem('user_id')
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/getItems.php', input, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setUserItems(res.data)
        })
    }

    const handleProfileChange = (e) => {
        updateProfilePic(e.target.files[0])
    }
    
    const updateProfilePic = (file) => {
        const formData = new FormData()
        formData.append("image", file)
        formData.append("user_id", userId)
        
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/profile/changePfp.php', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "ngrok-skip-browser-warning": "8888"
            }
        }).then(()=>{
            getUser()
        })
    }

    const handleOnSubmitBio = (e) => {
        e.preventDefault()
        console.log(bio)

        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/profile/changeBio.php', {'bio': bio,'user_id': userId},{
            headers : {
                "ngrok-skip-browser-warning": "8888"
        }}).then((res)=>{
            alert(res.data)
            console.log(res.data)
        })
    }

    const handleAddProduct = () => {
        navigate('/addproduct')
    }

    return ( 
        <>
        <AccountNav />
            <div className="sellerContainer">
                <div className="sellerProfile">
                    <div className="profiless">
                        {photo && <img src={`data:image/jpeg;base64, ${photo}`} className="profilepic"/>}
                        {!photo && <img src={Profile} className="profilepic"/>}
                        <label htmlFor="image-input">
                            <BiEdit size={25} className="sellerediticon"/>
                        </label>
                        <input id="image-input" type="file" name="image" accept="image/png, image/jpeg" onChange={handleProfileChange}/>
                    </div>
                    <div className="descriptions">
                        <h1 className="userName">{username}</h1>
                        <div className="profiles">
                            <p className="profileText">Profile</p>
                            <form onSubmit={handleOnSubmitBio}>
                                <input name="bio" className="profileDesc" placeholder='Say some welcoming words to your customers...' value={bio} onChange={(e)=>setBio(e.target.value)}></input>
                                <input type="submit"  hidden/>
                            </form>
                        </div>
                        <div className="profiles">
                            <p className="profileText">Email</p>
                            <p className="profileDesc">{email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="section2">
            <h1 className="title">
                Here&apos;s What I Sell
            </h1>
            <div className="editsellercategory">
                <div className="editsellerproducts">
                    <a href="#">All Products</a>
                    <button onClick={handleAddProduct}>Add My Product</button>
                </div>
            </div>
            
            <div className="grid-container">
            {userItems.map((item, key)=>
                    <EditGridItem
                    key = {key}
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
     );
}
 
export default EditSellerProfile;