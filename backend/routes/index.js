const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignin')
const authToken = require('../middleware/authToken')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
// const UploadProductController = require('../controller/product/uploadProduct')
// const getProductController = require('../controller/product/getProduct')
// const updateProductController = require('../controller/product/updateProduct')
// const getCategoryProduct = require('../controller/product/getCategoryProductOne')
// const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
// const getProductDetails = require('../controller/product/getProductDetails')
// const addToCartController = require('../controller/user/addToCartController')
// const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
// const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
// const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
// const deleteAddToCartProduct = require('../controller/user/deleteAddtoCartProduct')
// const searchProduct = require('../controller/product/searchProduct')
// const filterProductController = require('../controller/product/filterProduct')
const { createToken, stkPush } = require('../controller/order/mpesaPaymentController')
const UploadAutoProductController = require('../controller/product/uploadAutoProduct')
const getAutoProductController = require('../controller/product/getAutoProduct')
const updateAutoProductController = require('../controller/product/updateAutoProduct')
const getCategoryAutoProduct = require('../controller/product/getCategoryAutoProductOne')
const filterProductAutoController = require('../controller/product/filterProductAuto')
const getAutoProductDetails = require('../controller/product/getAutoProductDetails')
const getCategoryWiseProductAuto = require('../controller/product/getCategoryWiseProductAuto')
const sessionToken = require('../middleware/sessionToken')
const searchProductAuto = require('../controller/product/searchProductAuto')
const deleteProduct = require('../controller/user/deleteProduct')




router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

// admin panel
router.get("/all-user", authToken, allUsers)
module.exports = router
router.post("/update-user",authToken, updateUser)

//product
// router.post("/upload-product", authToken, UploadProductController)
// router.get("/get-product",getProductController)
router.get("/get-auto-product",getAutoProductController)
// router.post("/update-product", authToken, updateProductController)
router.post("/update-auto-product", authToken, updateAutoProductController)
// router.get("/get-categoryProduct",getCategoryProduct)
// router.post("/category-product",getCategoryWiseProduct)
router.post("/category-auto-product",getCategoryWiseProductAuto)
router.get("/get-categoryAutoProduct",getCategoryAutoProduct)
// router.post("/product-details",getProductDetails)
router.post("/autoproduct-details",getAutoProductDetails)
// router.get("/search",searchProduct)
router.get("/search-auto",searchProductAuto)
// router.post("/filter-product",filterProductController)
router.post("/filter-autoproduct",filterProductAutoController)
router.post("/upload-auto-product",authToken,UploadAutoProductController)
router.post("/delete-product", authToken, deleteProduct);

//user add to cart
// router.post("/addtocart",sessionToken,addToCartController)
// router.get("/countAddToCartProduct",sessionToken,countAddToCartProduct)
// router.get("/view-cart-product",sessionToken,addToCartViewProduct)
// router.post("/update-card-product",sessionToken,updateAddToCartProduct)
// router.post("/delete-cart-product",sessionToken,deleteAddToCartProduct)


//payment & order
router.post("/mpesa-payment", createToken, stkPush)






module.exports = router