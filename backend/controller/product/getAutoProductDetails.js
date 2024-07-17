const autoProductModel = require("../../models/autoProductModel")


const getAutoProductDetails = async(req,res)=>{
    try {
        const { productId } = req.body

        const product = await autoProductModel.findById(productId)

        res.json({
            data : product,
            message : "OK",
            success : true,
            error : false

        })

    }catch(err){
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = getAutoProductDetails