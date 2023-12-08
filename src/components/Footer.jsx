import { FaArrowUp } from "react-icons/fa";

const Footer = () => {

    const anchors = document.querySelectorAll('a[href*="#"]');

    for (const anchor of anchors) {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
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
                    <h3>CATALOG</h3>
                    <a href="#">Jewelry & Accessories</a>
                    <a href="#">Clothing & Shoes</a>
                    <a href="#">Home & Living</a>
                    <a href="#">Toys & Entertainment</a>
                    <a href="#">Others</a>
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