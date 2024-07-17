const autoProductModel = require("../../models/autoProductModel")
const productModel = require("../../models/productModel")

const searchProductAuto = async(req,res)=>{
    try{
        const query = req.query.q

        const regex = new RegExp(query,'i','g')

        const product = await autoProductModel.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex
                },
                {
                    brandName : regex
                }
            ]
        })

        res.json({
            data : product,
            message : "Search Product List",
            error : false,
            success : true
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}



module.exports = searchProductAuto