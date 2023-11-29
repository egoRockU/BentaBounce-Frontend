const GridItem = ({picture, desc, name, price}) => {
    return (
        <div className="grid-item">
            <div className="picture">
                <img src={picture}  />
            </div>
            <div className="desc">
                <p className="productName">{desc}</p>
                <div className="name-price">
                    <p className="name">{name}</p>
                    <p className="price">${price}</p>
                </div>
            </div>
        </div>    
    )
}

export default GridItem