import "./seller.css"
import Profile from "../../../img/profile.jpg"
import Navbar from "../../../components/Navbar"
import GridItem from "../../../components/GridItem"
import Footer from "../../../components/Footer"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'


const Seller = () => {

    const { sellerId } = useParams()
    const [items, setItems] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState()
    const [bio, setBio] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = items.slice(startIndex, endIndex);

    useEffect(()=>{
        getUser()
        getItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getUser = async() => {
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/profile/profile.php', {'user_id': sellerId},{
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

    const getItems = () => {
        const input = {
            'category': 'user', 
            'userId': sellerId
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/items/getItems.php', input, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setItems(res.data)
        })
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
      };

    return (
        <>
            <Navbar />
            <div className="sellerContainer">
                <div className="sellerProfile">
                    <div className="profiless">
                        {photo && <img src={`data:image/jpeg;base64, ${photo}`} className="profilepic"/>}
                        {!photo && <img src={Profile} className="profilepic"/>}
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
            <div className="sellercategory">
                <div className="sellerproducts">
                    <p>All Products</p>
                </div>
            </div>
            
            <div className="grid-container">
                {currentItems.map((item, key)=>
                    <GridItem
                    key = {key}
                    sellerId = {sellerId}
                    itemId = {item.id}
                    picture={item.image}
                    desc= {item.details}
                    name= {item.name}
                    price= {item.price}
                />
                )}
            </div>
        </section>
        <Stack className="pagination">
                <Pagination 
                count={Math.ceil(items.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange} />
            </Stack>
        <Footer />
        </>
    )
}

export default Seller