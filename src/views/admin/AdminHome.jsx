import axios from "axios"
import { useEffect, useState } from "react"

const AdminHome = () => {

    const [adminProfile, setAdminProfile] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const [catNames, setCatNames] = useState([])

    useEffect(()=>{
        getAdminProfile()
        getCategoriesList()
    }, [])


    const getAdminProfile = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/admin/getAdminProfile.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setAdminProfile(res.data)
        })
    }

    const getCategoriesList = () => {
        axios.get('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/categories/adminGetCategories.php', {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res) => {
            setCategoryList(res.data['category_array'])
            setCatNames(res.data['category_names'])
        })
    }

    const updateCategory = (catId, catName) => (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("catId", catId)
        formData.append("categoryName", catName)

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


    const updateCategoryNames = (id) => (e) => {
        let newCategories = [...catNames]
        newCategories[id] = e.target.value

        setCatNames(newCategories);
    }

    return (
        <>
            <div className="log-in-nav">
                <h1 className="titleLogIn">ADMIN DASHBOARD</h1>
            </div>
            <div className="admin-container">
                <div className="profile-container">
                    <h1>Admin Profile</h1>
                    <p>Username: {adminProfile.username}</p>
                    <p>Email: {adminProfile.email}</p>
                    <p>Income: ₱ {adminProfile.income}</p>
                </div>
                <div className="category-contents-container">
                    <h1>Category Contents</h1>
                    {categoryList.map((cat, key)=>
                        <form key={key} className="cat-form" onSubmit={updateCategory(cat.id, catNames[cat.id-1])}>
                            {cat.id} <input type="text" placeholder="Edit Name" value={catNames[cat.id-1]} onChange={updateCategoryNames(cat.id-1)}/>
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