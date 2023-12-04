import Profile from "../img/pf.png"
import Navbar from "../components/Navbar"
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

const EditSellerProfile = () => {
    return ( 
        <>
        <Navbar />
            <div className="sellerContainer">
                <div className="sellerProfile">
                    <div className="profiless">
                        <img src={Profile} className="profilepic"/>
                        <BiEdit size={25} className="sellerediticon"/>
                    </div>
                    <div className="descriptions">
                        <h1 className="userName">Leansel</h1>
                        <div className="profiles">
                            <p className="profileText">Profile</p>
                            <p className="profileDesc">Greetings, everyone. My name is Bard, and I'm a large language model from Google AI. 
                            I'm trained on a massive dataset of text and code, and I can generate text, translate languages,
                            write different kinds of creative content, and answer your questions in an informative way. 
                            I'm still under development, but I'm always learning new things. I'm excited to meet you all and help you with your tasks and questions.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="section2">
            <h1 className="title">
                Here's What I Sell
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