const autoProductModel = require("../../models/autoProductModel")

const filterProductAutoController = async(req,res)=>{
    try{
            const categoryList = req?.body?.category || []

            const product = await autoProductModel.find({
                category : {
                    "$in" : categoryList
                }
            })

            res.json({
                data : product,
                message : "product",
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


module.exports = filterProductAutoController