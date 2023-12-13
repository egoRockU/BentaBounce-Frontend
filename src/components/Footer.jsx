import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";

const Footer = () => {

    const anchors = document.querySelectorAll('a[href*="#"]');
    const [categoryList, setCategoryList] = useState([])

    useEffect(()=>{
        getCategoriesList()
    },[])

    for (const anchor of anchors) {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
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

    return(
        <>
            <section className="section3">
                <div className="grid-containers">
                    <div className="grid-items grid-item-1">
                        <div className="logoname">
                            <h1>BENTABOUNCE</h1>
                        </div>
                        <p>BentaBounce, A playful combination of "Benta" (sale) and "Bounce" (leave), 
                        embodies its core values of promoting a bustling and dynamic online marketplace.
                        </p>
                    </div>
                    <div className="grid-items grid-item-2">
                        <h3 className="catalog">CATALOG</h3>
                        {categoryList.map((cat, key)=>
                            <a key={key} href={`/${cat.id}/categoryhome`}>{cat.category_name}</a>
                        )}
                        {/* <a href="#">Jewelry & Accessories</a>
                        <a href="#">Clothing & Shoes</a>
                        <a href="#">Home & Living</a>
                        <a href="#">Toys & Entertainment</a>
                        <a href="#">Others</a> */}
                    </div>
                    <div className="grid-items grid-item-3">
                        <h3>ABOUT US</h3>
                        <a href="#">Our Developers</a>
                        <a href="#">Sitemap</a>
                        <a href="#">FAQ</a>
                        <a href="#">About Us</a>
                        <a href="#">Terms & Conditions</a>
                    </div>
                    <div className="grid-items grid-item-4">
                        <h3>CUSTOMER SERVICES</h3>
                        <a href="#">Contact Us</a>
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                        <a href=""></a>
                    </div>
                </div>
            </section>

        <footer>
            <p>© 2023 BentaBounce , Inc.</p>
            <a href="#top">Scroll to top <FaArrowUp /></a>
        </footer>
        </>
    )
}

export default Footer