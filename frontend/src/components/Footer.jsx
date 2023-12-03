import arrowtop from "../img/arrowtop.png"

const Footer = () => {

    return(
        <>
            <section className="section3">
            <div className="grid-containers">
                <div className="grid-items grid-item-1">
                    <div className="logoname">
                        <h1>BENTABOUNCE</h1>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua
                    </p>
                </div>
                <div className="grid-items grid-item-2">
                    <h3>CATALOG</h3>
                    <a href="#">Necklaces</a>
                    <a href="#">Hoodies</a>
                    <a href="#">Jewelry Box</a>
                    <a href="#">T-shirt</a>
                    <a href="#">Jacket</a>
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
            <p>Scroll to top <img src={arrowtop}/></p>
        </footer>
        </>
    )
}

export default Footer