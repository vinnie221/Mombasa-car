//const { default: SignUp } = require("../pages/SignUp");



//import allUsers from "../../../backend/controller/allUsers"

const backendDomain =  process.env.REACT_APP_BACKEND_URL //"http://localhost:8080"

const SummaryApi = {
    SignUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn :{
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomain}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : 'post'
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : 'post'
    },
    uploadAutoProduct : {
        url : `${backendDomain}/api/upload-auto-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'get'
    },
    allAutoProduct : {
        url : `${backendDomain}/api/get-auto-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : 'post'
    },
    updateAutoProduct : {
        url : `${backendDomain}/api/update-auto-product`,
        method : 'post'
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryAutoProduct : {
        url : `${backendDomain}/api/get-categoryAutoProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    deleteProduct : {
        url : `${backendDomain}/api/delete-product`,
        method : 'post'
    },
    categoryWiseProductAuto : {
        url : `${backendDomain}/api/category-auto-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    productAutoDetails : {
        url : `${backendDomain}/api/autoproduct-details`,
        method : 'post'
    },
    addToCartProduct : {
        
        url : `${backendDomain}/api/addtocart`,
        method : 'post'
    },
    addToCartProductcount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : "get"
    },
    addToCartProductView : {
        url : `${backendDomain}/api/view-cart-product`,
        method : 'get'
    },
    updateCardProduct : {
        url : `${backendDomain}/api/update-card-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    searchProductAuto : {
        url : `${backendDomain}/api/search-auto`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    },
    filterAutoProduct : {
        url : `${backendDomain}/api/filter-autoproduct`,
        method : 'post'
    },
    mpesaPayment : {
        url : `${backendDomain}/api/mpesa-payment`,
        method : "post"
    }
}

export default SummaryApi