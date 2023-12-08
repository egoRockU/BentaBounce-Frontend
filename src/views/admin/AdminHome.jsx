import axios from "axios"
import { useEffect, useState } from "react"

const AdminHome = () => {

    const [categoryList, setCategoryList] = useState([])
    const [catName1, setCatname] = useState('')

    useEffect(()=>{
        getCategoriesList()
    }, [])

    const getCategoriesList = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/categories/getCategoryList.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setCategoryList(res.data)
        })
    }

    const updateCategory = (catId) => (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("catId", catId)
        formData.append("categoryName", catName1)

        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/categories/adminUpdateCategory.php', formData, {
            headers: {
                "ngrok-skip-browser-warning": "8888",
                "Content-Type": "multipart/form-data",
            }
        }).then(()=>{
            alert(`Category ${catId} has been updated`)
            getCategoriesList()
        })
    }

    return (
        <>
            <div className="log-in-nav">
                <h1 className="titleLogIn">ADMIN DASHBOARD</h1>
            </div>
            <div className="admin-container">
                <div className="profile-container">
                    <h1>Admin Profile</h1>
                </div>
                <div className="category-contents-container">
                    <h1>Category Contents</h1>
                    {categoryList.map((cat, key)=>
                        <form key={key} className="cat-form" onSubmit={updateCategory(cat.id)}>
                            {cat.id} <input type="text" value={cat.category_name} onChange={(e)=>setCatname(e.target.value)}/>
                            <input type="submit" value="Save changes" />
                        </form>
                    )}
                </div>
            </div>
            <div className="admin-container">
                <div className="profile-container">
                    <h1>Admin Profile</h1>
                </div>
                <div className="category-contents-container">
                    
                </div>
            </div>
        </>
    )
}

export default AdminHome