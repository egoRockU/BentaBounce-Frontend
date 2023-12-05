import { useNavigate } from "react-router-dom"
import { BiEdit } from "react-icons/bi";

const EditGridItem = ({picture, desc, name, price}) => {

    const navigate = useNavigate()
    
    const clickProduct = () => {
        navigate('/editproduct')
    }

    return (
        <div className="grid-item" >
            <div className="picture">
                <img src={`data:image/jpeg;base64, ${picture}`} onClick={clickProduct} />
                <BiEdit size={20} className="editicon"/>
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

export default EditGridItem