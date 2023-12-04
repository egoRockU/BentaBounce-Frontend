const checkIsLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") ? true : false;
}

export {checkIsLoggedIn}