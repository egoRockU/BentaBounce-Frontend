import { useNavigate } from "react-router-dom"

const GridItem = ({picture, desc, name, price}) => {

    const navigate = useNavigate()
    
    const clickProduct = () => {
        navigate('/productView')
    }

    return (
        <div className="grid-item" >
            <div className="picture">
                <img src={`data:image/jpeg;base64, ${picture}`} onClick={clickProduct} />
            </div>
            <div className="desc">
                <p className="productName">{desc}</p>
                <div className="name-price">
                    <p className="name">{name}</p>
                    <p className="price">PHP {price}</p>
                </div>
            </div>
        </div>
    )
}

export default GridItem