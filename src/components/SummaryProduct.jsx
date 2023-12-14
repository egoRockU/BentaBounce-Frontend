const SummaryProduct = ({picture, productName, Description, price, quantity}) => {
    
    return ( 
        <>
            <div className="products">
                <div className="productpicture">
                    <img src={`data:image/jpeg;base64, ${picture}`} className="pictureimg"/>
                </div>
                <div className="productDesc">
                    <h3 className="productName">{productName}</h3>
                    <p className="Description">{Description}</p>
                </div>
                <div className="productTotal">
                    <p>{quantity}</p>
                </div>
                <div className="price">
                    PHP {price}
                </div>
                <div>
                    {/* <MdOutlineShoppingCartCheckout size="40" onClick={openModal}/> */}
                </div>
                <div>
                    {/* <IoBagRemoveOutline size="40" onClick={removeItem}/> */}
                </div>
                
            </div>

                <div className="line">
                    <hr/>
                </div>
        </>
    );
}

export default SummaryProduct;