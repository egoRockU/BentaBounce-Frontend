import Profile from "../img/profile.jpg"
import AccountNav from "./AccountNav"
import bag from "../img/14.png"
import jagger from "../img/15.png"
import glasses from "../img/16.png"
import hoodie from "../img/yellow.png"
import scarf from "../img/top-product.png"
import nikerepel from "../img/nikerepel.png"
import nikeair from "../img/nikeair.png"
import dressgreen from "../img/dressgreen.png"
import Footer from "../components/Footer"
import { BiEdit } from "react-icons/bi";
import EditGridItem from "./EditGridItem"
import axios from "axios"
import { useState, useEffect } from "react"

const EditSellerProfile = () => {

    const userId = localStorage.getItem("user_id")
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState()
    const [bio, setBio] = useState('')
    
    useEffect(()=>{
        getUser()
    },[photo])
    
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
                            {!bio && <p className="profileDesc">{email}</p>}
                            {bio && <p className="profileDesc">{bio}</p>}
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
                    <button>Add My Product</button>
                </div>
            </div>
            
            <div className="grid-container">
                <EditGridItem
                    picture={jagger}
                    desc= 'Adicolor Classics Joggers'
                    name= 'Dress'
                    price= '63.85'
                    
                />
                <EditGridItem
                    picture={bag}
                    desc= 'Nike Sportswear Futura Luxe'
                    name= 'Bag'
                    price= '63.85'
                />
                <EditGridItem
                    picture={scarf}
                    desc= 'Geometric print Scarf'
                    name= 'Scarf'
                    price= '63.85'
                />
                <EditGridItem
                    picture={hoodie}
                    desc= 'Yellow Reserved Hoodie'
                    name= 'Dress'
                    price= '63.85'
                />
                <EditGridItem
                    picture={dressgreen}
                    desc= 'Basic Dress Green'
                    name= 'Dress'
                    price= '63.85'
                />
                <EditGridItem
                    picture={nikeair}
                    desc= 'Nike Air Zoom Pegasus'
                    name= 'Shoe'
                    price= '63.85'
                />
                <EditGridItem
                    picture={nikerepel}
                    desc= 'Nike Repel Miler'
                    name= 'Dress'
                    price= '63.85'
                />
                <EditGridItem
                    picture={glasses}
                    desc= 'Nike Sportswear Futura Luxe'
                    name= 'Glasses'
                    price= '63.85'
                />
            </div>
        </section>

        <Footer />
        </>
     );
}
 
export default EditSellerProfile;