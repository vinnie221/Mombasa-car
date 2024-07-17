const autoProductModel = require("../../models/autoProductModel")


const getAutoProductController = async(req,res)=>{
    try{
        const allProduct = await autoProductModel.find().sort({createdAt : -1})

        res.json({
            message : "All products",
            success : true,
            error : false,
            data : allProduct
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = getAutoProductController