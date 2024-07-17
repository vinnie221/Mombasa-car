const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")
const autoProductModel = require("../../models/autoProductModel")

async function UploadAutoProductController(req,res){
    try {
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadProduct = new autoProductModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product uploaded Successfully",
            error : false,
            success : true,
            data : saveProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })


    }
}

module.exports = UploadAutoProductController